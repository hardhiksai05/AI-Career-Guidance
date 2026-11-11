import { NextRequest, NextResponse } from "next/server";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing authentication session" },
        { status: 401 }
      );
    }

    if (!isSupabaseAdminConfigured()) {
      return NextResponse.json(
        { error: "Supabase Admin is not configured" },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => null);
    const tempFileRef = body?.tempFileRef;
    const extractedData = body?.extractedData;

    const supabaseAdmin = getSupabaseAdminClient();

    let resumeRecord: any = null;

    // 1. If a staged temporary resume exists, migrate it to the user's permanent path
    if (tempFileRef?.storagePath) {
      const sanitizedName = (tempFileRef.originalFilename || "resume.pdf").replace(
        /[^a-zA-Z0-9._-]/g,
        "_"
      );
      const permanentStoragePath = `${user.uid}/${Date.now()}_${sanitizedName}`;

      // Download from temporary pending path
      const { data: fileBlob, error: downloadError } = await supabaseAdmin.storage
        .from("student-resumes")
        .download(tempFileRef.storagePath);

      if (!downloadError && fileBlob) {
        const fileBuffer = Buffer.from(await fileBlob.arrayBuffer());

        // Upload to user's private folder
        const { error: moveError } = await supabaseAdmin.storage
          .from("student-resumes")
          .upload(permanentStoragePath, fileBuffer, {
            contentType: tempFileRef.fileType || "application/pdf",
            upsert: true,
          });

        if (!moveError) {
          // Clean up the temporary pending file
          await supabaseAdmin.storage
            .from("student-resumes")
            .remove([tempFileRef.storagePath])
            .catch(() => {});

          // Insert into PostgreSQL 'resumes' table
          const { data: newResume, error: insertError } = await supabaseAdmin
            .from("resumes")
            .insert({
              firebase_uid: user.uid,
              original_filename: tempFileRef.originalFilename || "Uploaded_CV.pdf",
              storage_path: permanentStoragePath,
              file_type: tempFileRef.fileType || "application/pdf",
              file_size: tempFileRef.fileSize || 0,
              upload_status: "verified",
            })
            .select()
            .single();

          if (!insertError && newResume) {
            resumeRecord = newResume;
          }
        }
      }
    }

    // 2. Persist extracted profile and skills data
    if (extractedData) {
      const { error: profileError } = await supabaseAdmin.from("profiles").upsert(
        {
          firebase_uid: user.uid,
          email: user.email || extractedData.email || "",
          full_name: extractedData.fullName || "Student",
          university: extractedData.university || null,
          degree: extractedData.degree || null,
          branch: extractedData.branch || null,
          graduation_year: extractedData.graduationYear || null,
          gpa: extractedData.gpa || null,
          phone: extractedData.phone || null,
          bio: extractedData.bio || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "firebase_uid" }
      );

      if (profileError) {
        console.warn("[ClaimCV] Profile upsert note:", profileError);
      }

      const technicalSkills: string[] = Array.isArray(extractedData.technicalSkills)
        ? extractedData.technicalSkills
        : [];

      if (technicalSkills.length > 0) {
        await supabaseAdmin.from("career_preferences").upsert(
          {
            firebase_uid: user.uid,
            target_skills: technicalSkills,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "firebase_uid" }
        );
      }
    }

    return NextResponse.json({
      success: true,
      resume: resumeRecord,
      message: "Onboarding CV and profile successfully linked to account.",
    });
  } catch (err: any) {
    console.error("[ClaimCV] Error associating CV with user account:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to link CV with user account." },
      { status: 500 }
    );
  }
}
