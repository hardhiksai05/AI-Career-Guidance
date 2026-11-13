import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-server";
import { extractCvContent } from "@/lib/services/cv-extractor";
import { preprocessDocumentToMarkdown } from "@/lib/services/document-to-markdown";
import {
  checkCvUploadRateLimit,
  cvExtractionHashCache,
  getCvCacheKey,
} from "@/lib/server-rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user from Firebase Bearer token
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing authentication token" },
        { status: 401 }
      );
    }

    if (!isSupabaseAdminConfigured()) {
      return NextResponse.json(
        { error: "Service Unavailable: Supabase Admin not configured" },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => null);
    const resumeId = body?.resumeId;
    const forceReprocess = Boolean(body?.forceReprocess);

    if (!resumeId || typeof resumeId !== "string") {
      return NextResponse.json(
        { error: "Bad Request: resumeId is required" },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdminClient();

    // 2. Fetch target resume record and strictly verify ownership
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
        { error: "Forbidden: You do not have access to this resume document" },
        { status: 403 }
      );
    }

    // 3. Download file bytes from Supabase Storage
    const { data: fileBlob, error: downloadErr } = await supabaseAdmin.storage
      .from("student-resumes")
      .download(resume.storage_path);

    if (downloadErr || !fileBlob) {
      console.error("[Resume Extract API] Storage download error:", downloadErr);
      await supabaseAdmin
        .from("resumes")
        .update({ upload_status: "failed", updated_at: new Date().toISOString() })
        .eq("id", resumeId);

      return NextResponse.json(
        { error: "Storage Error: Could not read resume file from storage" },
        { status: 500 }
      );
    }

    const arrayBuffer = await fileBlob.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    const contentHash = crypto.createHash("sha256").update(fileBuffer).digest("hex");
    const userCacheKey = getCvCacheKey(user.uid, contentHash);

    const extractedStoragePath = `${resume.storage_path}.extracted.json`;
    const markdownStoragePath = `${resume.storage_path}.normalized.md`;

    // 4. Duplicate CV Detection: Check namespaced in-memory hash cache first
    if (!forceReprocess && cvExtractionHashCache.has(userCacheKey)) {
      const cached = cvExtractionHashCache.get(userCacheKey)!;
      console.log(`[Resume Extract API] In-memory cache hit for hash ${contentHash.slice(0, 10)}. Reusing extraction without Gemini call.`);

      // Sync cached extraction to storage for this resume record
      const jsonBuffer = Buffer.from(JSON.stringify(cached.extractedData, null, 2), "utf8");
      await supabaseAdmin.storage
        .from("student-resumes")
        .upload(extractedStoragePath, jsonBuffer, {
          contentType: "application/json",
          upsert: true,
        });

      await supabaseAdmin
        .from("resumes")
        .update({ upload_status: "extracted", updated_at: new Date().toISOString() })
        .eq("id", resumeId);

      return NextResponse.json({
        success: true,
        cached: true,
        resumeId: resume.id,
        originalFilename: resume.original_filename,
        uploadedAt: resume.created_at,
        extractedData: cached.extractedData,
        normalizedMarkdown: cached.normalizedMarkdown,
        tokenMetrics: cached.tokenMetrics,
      });
    }

    // Check storage cache for this specific resume
    if (!forceReprocess && (resume.upload_status === "extracted" || resume.upload_status === "verified")) {
      const { data: cachedBlob } = await supabaseAdmin.storage
        .from("student-resumes")
        .download(extractedStoragePath);

      if (cachedBlob) {
        try {
          const cachedJson = JSON.parse(await cachedBlob.text());
          let normalizedMarkdown = "";

          const { data: mdBlob } = await supabaseAdmin.storage
            .from("student-resumes")
            .download(markdownStoragePath);
          if (mdBlob) {
            normalizedMarkdown = await mdBlob.text();
          }

          if (cachedJson?._preprocessingMetrics?.contentHash === contentHash) {
            console.log(`[Resume Extract API] Storage cache hit for hash ${contentHash.slice(0, 8)}. Skipping Gemini reprocessing.`);
            cvExtractionHashCache.set(userCacheKey, {
              extractedData: cachedJson,
              normalizedMarkdown,
              tokenMetrics: cachedJson._preprocessingMetrics,
              cachedAt: Date.now(),
            });

            return NextResponse.json({
              success: true,
              cached: true,
              resumeId: resume.id,
              originalFilename: resume.original_filename,
              uploadedAt: resume.created_at,
              extractedData: cachedJson,
              normalizedMarkdown,
              tokenMetrics: cachedJson._preprocessingMetrics,
            });
          }
        } catch {
          // If cached file corrupted, proceed to reprocess
        }
      }
    }

    // 5. Server-side Rate Limiting: 3 documents per rolling 20-minute window
    const rateLimit = checkCvUploadRateLimit(user.uid);
    if (!rateLimit.allowed) {
      console.warn(`[Resume Extract API] User ${user.uid} hit CV upload rate limit. Retry in ${rateLimit.retryAfterSeconds}s.`);
      return NextResponse.json(
        {
          error: "Rate Limit Exceeded",
          message: "You have reached the CV upload limit. You can upload up to 3 CV documents every 20 minutes. Please try again later.",
          retryAfter: rateLimit.retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        }
      );
    }

    // 6. Update status to 'processing'
    await supabaseAdmin
      .from("resumes")
      .update({ upload_status: "processing", updated_at: new Date().toISOString() })
      .eq("id", resumeId);

    // 6. Preprocess Document to Markdown locally first
    let preprocessingResult;
    try {
      preprocessingResult = await preprocessDocumentToMarkdown(
        fileBuffer,
        resume.original_filename,
        resume.file_type || undefined
      );

      // Save the normalized Markdown document to private storage immediately
      const mdBuffer = Buffer.from(preprocessingResult.markdown, "utf8");
      await supabaseAdmin.storage
        .from("student-resumes")
        .upload(markdownStoragePath, mdBuffer, {
          contentType: "text/markdown; charset=utf-8",
          upsert: true,
        });
    } catch (prepErr: any) {
      console.error("[Resume Extract API] Document preprocessing error:", prepErr);
      await supabaseAdmin
        .from("resumes")
        .update({ upload_status: "failed", updated_at: new Date().toISOString() })
        .eq("id", resumeId);

      return NextResponse.json(
        {
          error: "Document Preprocessing Failed",
          message: prepErr?.message || "Failed to parse document format or extract text locally.",
        },
        { status: 422 }
      );
    }

    // 7. Extract structured CV profile using Gemini AI
    try {
      const { extractedData } = await extractCvContent(
        fileBuffer,
        resume.file_type || "application/pdf",
        resume.original_filename
      );

      // Save structured JSON alongside resume in private storage
      const jsonBuffer = Buffer.from(JSON.stringify(extractedData, null, 2), "utf8");
      await supabaseAdmin.storage
        .from("student-resumes")
        .upload(extractedStoragePath, jsonBuffer, {
          contentType: "application/json",
          upsert: true,
        });

      // Update resume status to 'extracted'
      await supabaseAdmin
        .from("resumes")
        .update({
          upload_status: "extracted",
          updated_at: new Date().toISOString(),
        })
        .eq("id", resumeId);

      // Cache extracted result by user-namespaced SHA-256 content hash
      cvExtractionHashCache.set(userCacheKey, {
        extractedData,
        normalizedMarkdown: preprocessingResult.markdown,
        tokenMetrics: extractedData._preprocessingMetrics,
        cachedAt: Date.now(),
      });

      return NextResponse.json({
        success: true,
        cached: false,
        resumeId: resume.id,
        originalFilename: resume.original_filename,
        uploadedAt: resume.created_at,
        extractedData,
        normalizedMarkdown: preprocessingResult.markdown,
        tokenMetrics: extractedData._preprocessingMetrics,
      });
    } catch (geminiErr: any) {
      console.error("[Resume Extract API] Gemini AI extraction error:", geminiErr);

      // Mark as failed/retryable without corrupting existing profile
      await supabaseAdmin
        .from("resumes")
        .update({
          upload_status: "failed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", resumeId);

      return NextResponse.json(
        {
          error: "Gemini Extraction Failed",
          message:
            geminiErr?.message || "Gemini AI was unavailable or timed out. You can retry extraction.",
          isRetryable: true,
          normalizedMarkdown: preprocessingResult.markdown,
          tokenMetrics: {
            rawSizeBytes: preprocessingResult.rawSizeBytes,
            markdownSizeBytes: preprocessingResult.markdownSizeBytes,
            estimatedRawTokens: preprocessingResult.estimatedRawTokens,
            estimatedMarkdownTokens: preprocessingResult.estimatedMarkdownTokens,
            tokenReductionPercentage: preprocessingResult.tokenReductionPercentage,
          },
        },
        { status: 503 }
      );
    }
  } catch (error: any) {
    console.error("[Resume Extract API] Unhandled route error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error?.message || "Failed to process resume document",
      },
      { status: 500 }
    );
  }
}
