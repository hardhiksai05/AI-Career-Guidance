import { NextRequest, NextResponse } from "next/server";
import { authenticateFirebaseUser } from "@/lib/server-auth";
import { getStudentJobRecommendations } from "@/lib/services/job-recommendation-service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateFirebaseUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing authentication token" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const forceSync = searchParams.get("sync") === "true";

    const result = await getStudentJobRecommendations(user.uid, { forceSync });

    return NextResponse.json({
      success: true,
      jobs: result.recommendations,
      total: result.totalAvailable,
      cached: result.cached,
      modelUsed: result.modelUsed,
      source: result.source,
      lastUpdated: result.lastUpdated,
    });
  } catch (error: any) {
    console.error("[API Jobs] Unhandled error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error?.message || "Failed to load job recommendations",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
