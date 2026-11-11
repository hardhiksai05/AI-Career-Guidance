import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { extractCvContent } from "@/lib/services/cv-extractor";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream",
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No document attached. Please select a PDF or DOCX file." },
        { status: 400 }
      );
    }

    // 1. Validate file extension & mime
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!["pdf", "docx", "doc"].includes(ext)) {
      return NextResponse.json(
        { error: "Unsupported file format. Please upload a PDF or DOCX document." },
        { status: 400 }
      );
    }

    // 2. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the 10 MB limit.`,
        },
        { status: 400 }
      );
    }

    // 3. Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // 4. Temporarily stage document in private Supabase Storage if configured
    let tempFileRef: {
      storagePath: string;
      originalFilename: string;
      fileSize: number;
      fileType: string;
      tempId: string;
    } | null = null;

    const tempId = crypto.randomUUID();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const pendingStoragePath = `pending/${tempId}_${sanitizedName}`;

    if (isSupabaseAdminConfigured()) {
      try {
        const supabaseAdmin = getSupabaseAdminClient();
        const { error: uploadError } = await supabaseAdmin.storage
          .from("student-resumes")
          .upload(pendingStoragePath, fileBuffer, {
            contentType: file.type || "application/pdf",
            upsert: true,
          });

        if (!uploadError) {
          tempFileRef = {
            storagePath: pendingStoragePath,
            originalFilename: file.name,
            fileSize: file.size,
            fileType: file.type || "application/pdf",
            tempId,
          };
        } else {
          console.warn("[OnboardingExtract] Staging upload notice:", uploadError);
        }
      } catch (storageErr) {
        console.warn("[OnboardingExtract] Supabase staging error:", storageErr);
      }
    }

    // 5. Extract structured data using local markdown preprocessing and Gemini AI
    const result = await extractCvContent(
      fileBuffer,
      file.type || "application/pdf",
      file.name
    );

    return NextResponse.json({
      success: true,
      extractedData: result.extractedData,
      tempFileRef,
      message: "CV successfully analyzed.",
    });
  } catch (err: any) {
    console.error("[OnboardingExtract] Extraction failed:", err);
    return NextResponse.json(
      {
        error:
          err?.message ||
          "Could not analyze the uploaded document. Please check the file or enter your academic details manually.",
      },
      { status: 500 }
    );
  }
}
