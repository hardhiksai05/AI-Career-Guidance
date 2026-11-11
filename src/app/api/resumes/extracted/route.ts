import { NextRequest, NextResponse } from "next/server";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing token" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const resumeId = searchParams.get("resumeId");

    if (!resumeId) {
      return NextResponse.json(
        { error: "Bad Request: resumeId query parameter is required" },
        { status: 400 }
      );
    }

    if (!isSupabaseAdminConfigured()) {
      return NextResponse.json(
        { error: "Service Unavailable: Supabase Admin not configured" },
        { status: 503 }
      );
    }

    const supabaseAdmin = getSupabaseAdminClient();

    const { data: resume, error: fetchErr } = await supabaseAdmin
      .from("resumes")
      .select("*")
      .eq("id", resumeId)
      .maybeSingle();

    if (fetchErr || !resume) {
      return NextResponse.json(
        { error: "Not Found: Resume document not found" },
        { status: 404 }
      );
    }

    if (resume.firebase_uid !== user.uid) {
      return NextResponse.json(
        { error: "Forbidden: Access denied" },
        { status: 403 }
      );
    }

    const extractedStoragePath = `${resume.storage_path}.extracted.json`;
    const markdownStoragePath = `${resume.storage_path}.normalized.md`;

    let extractedData = null;
    let normalizedMarkdown = "";

    const { data: jsonBlob } = await supabaseAdmin.storage
      .from("student-resumes")
      .download(extractedStoragePath);

    if (jsonBlob) {
      try {
        const jsonText = await jsonBlob.text();
        extractedData = JSON.parse(jsonText);
      } catch {
        extractedData = null;
      }
    }

    const { data: mdBlob } = await supabaseAdmin.storage
      .from("student-resumes")
      .download(markdownStoragePath);

    if (mdBlob) {
      try {
        normalizedMarkdown = await mdBlob.text();
      } catch {
        normalizedMarkdown = "";
      }
    }

    return NextResponse.json({
      success: true,
      resumeId: resume.id,
      filename: resume.original_filename,
      uploadedAt: resume.created_at,
      uploadStatus: resume.upload_status,
      extractedData,
      normalizedMarkdown,
      tokenMetrics: extractedData?._preprocessingMetrics || null,
    });
  } catch (error: any) {
    console.error("[Resume Extracted API] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error?.message || "Failed to retrieve extraction" },
      { status: 500 }
    );
  }
}
