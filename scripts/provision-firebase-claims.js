/**
 * AI CAREER GUIDANCE - FIREBASE CLAIMS PROVISIONING SCRIPT
 *
 * Scans all existing Firebase users and assigns the 'role: authenticated' custom
 * claim required by Supabase PostgreSQL and Row Level Security (RLS).
 *
 * Usage:
 *   node scripts/provision-firebase-claims.js
 */

const fs = require("fs");
const path = require("path");

// Helper to strip matching outer quotes ("..." or '...')
function stripOuterQuotes(str) {
  if (typeof str !== "string") return str;
  const trimmed = str.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

// 1. Determine Project Root directory reliably (regardless of where the script is invoked from)
const projectRoot = path.resolve(__dirname, "..");

// 2. Try loading via Next.js native env loader first
try {
  const { loadEnvConfig } = require("@next/env");
  loadEnvConfig(projectRoot, true, { info: () => {}, error: () => {} });
} catch {
  // @next/env unavailable; handled by direct parser below
}

// 3. Fallback direct .env.local parser to guarantee variables are loaded even if @next/env is bypassed
const candidatePaths = [
  path.join(projectRoot, ".env.local"),
  path.join(process.cwd(), ".env.local"),
  path.join(projectRoot, ".env"),
  path.join(process.cwd(), ".env"),
];

for (const envFilePath of candidatePaths) {
  if (fs.existsSync(envFilePath)) {
    try {
      const fileContent = fs.readFileSync(envFilePath, "utf8");
      // Split on lines, preserving quoted blocks if present
      fileContent.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          const idx = trimmed.indexOf("=");
          if (idx !== -1) {
            const key = trimmed.slice(0, idx).trim();
            const rawVal = trimmed.slice(idx + 1).trim();
            const cleaned = stripOuterQuotes(rawVal);
            if (!process.env[key] || process.env[key].trim().length === 0) {
              process.env[key] = cleaned;
            }
          }
        }
      });
    } catch {
      // Continue to next candidate if read error
    }
  }
}

// 4. Import modular Firebase Admin SDK (v14+ compatible)
const { initializeApp, getApps, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

/**
 * Initializes and returns the Firebase Admin App instance.
 * Safe against undefined properties and supports modular SDK v12/13/14+.
 */
function initAdmin() {
  const existingApps = getApps();
  if (Array.isArray(existingApps) && existingApps.length > 0) {
    return existingApps[0];
  }

  // Handle JSON Service Account Key string option if present
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const rawSa = stripOuterQuotes(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      const sa = JSON.parse(rawSa);
      return initializeApp({ credential: cert(sa) });
    } catch (parseErr) {
      console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY JSON string:", parseErr.message);
      process.exit(1);
    }
  }

  const projectId = stripOuterQuotes(
    process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || ""
  );
  const clientEmail = stripOuterQuotes(
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL || ""
  );
  let privateKey = stripOuterQuotes(
    process.env.FIREBASE_ADMIN_PRIVATE_KEY || ""
  );

  const isConfigured = Boolean(
    projectId &&
      clientEmail &&
      privateKey &&
      !clientEmail.includes("xxxxx") &&
      !projectId.includes("your_project_id") &&
      privateKey.trim().length > 0
  );

  if (!isConfigured) {
    console.error("❌ Firebase Admin credentials are not configured in .env.local.");
    console.error("Please supply valid values for:");
    console.error(`  - FIREBASE_ADMIN_PROJECT_ID: ${projectId ? "DETECTED" : "MISSING"}`);
    console.error(`  - FIREBASE_ADMIN_CLIENT_EMAIL: ${clientEmail ? "DETECTED" : "MISSING"}`);
    console.error(`  - FIREBASE_ADMIN_PRIVATE_KEY: ${privateKey ? "DETECTED" : "MISSING"}`);
    console.error("\nRefer to SUPABASE_SETUP_GUIDE.md (Step 3) for instructions on downloading your service account key.");
    process.exit(1);
  }

  // Preserve support for escaped \n characters in the private key string
  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

async function runProvisioning() {
  console.log("==================================================================");
  console.log("  AI CAREER GUIDANCE - FIREBASE USER CLAIMS PROVISIONING TOOL     ");
  console.log("==================================================================");

  const supabaseUrl = stripOuterQuotes(process.env.NEXT_PUBLIC_SUPABASE_URL || "");
  const supabaseKey = stripOuterQuotes(process.env.SUPABASE_SERVICE_ROLE_KEY || "");

  const app = initAdmin();
  const auth = getAuth(app);

  let nextPageToken;
  let totalScanned = 0;
  let updatedCount = 0;
  let alreadyValidCount = 0;

  do {
    const listResult = await auth.listUsers(100, nextPageToken);
    for (const user of listResult.users) {
      totalScanned++;
      const claims = user.customClaims || {};

      if (claims.role === "authenticated") {
        alreadyValidCount++;
        console.log(`[OK] User ${user.email || user.uid}: already has role=authenticated`);
      } else {
        const newClaims = { ...claims, role: "authenticated" };
        await auth.setCustomUserClaims(user.uid, newClaims);
        updatedCount++;
        console.log(`[PROVISIONED] User ${user.email || user.uid}: assigned role=authenticated`);
      }

      // Also ensure user profile exists in Supabase PostgreSQL
      if (supabaseUrl && supabaseKey) {
        try {
          const { createClient } = require("@supabase/supabase-js");
          const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
          await supabaseAdmin.from("profiles").upsert(
            {
              firebase_uid: user.uid,
              email: user.email || "",
              full_name: user.displayName || null,
              profile_picture_url: user.photoURL || null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "firebase_uid" }
          );
        } catch (dbErr) {
          console.warn(`[WARN] Profile sync for ${user.email || user.uid} failed:`, dbErr.message);
        }
      }
    }
    nextPageToken = listResult.pageToken;
  } while (nextPageToken);

  console.log("\n------------------------------------------------------------------");
  console.log("Summary:");
  console.log(`  Total users scanned:   ${totalScanned}`);
  console.log(`  Already provisioned:   ${alreadyValidCount}`);
  console.log(`  Newly provisioned:     ${updatedCount}`);
  console.log("------------------------------------------------------------------");
  console.log("Claim provisioning complete.\n");
}

runProvisioning().catch((err) => {
  console.error("Fatal error during claim provisioning:", err);
  process.exit(1);
});
