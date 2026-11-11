import { NextRequest, NextResponse } from "next/server";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import { getStudentJobRecommendations } from "@/lib/services/job-recommendation-service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing authentication token" },
        { status: 401 }
      );
    }

    const result = await getStudentJobRecommendations(user.uid, { forceSync: true });

    return NextResponse.json({
      success: true,
      message: "Successfully synchronized live job opportunities from Adzuna API.",
      jobs: result.recommendations,
      total: result.totalAvailable,
      cached: false,
      modelUsed: result.modelUsed,
      source: result.source,
      lastUpdated: result.lastUpdated,
    });
  } catch (error: any) {
    console.error("[API Jobs Sync] Unhandled error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error?.message || "Failed to synchronize job listings",
      },
      { status: 500 }
    );
  }
}
