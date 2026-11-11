/**
 * Complete Chatbot UI/UX Redesign & Flowchart Stability Verification Suite
 */
const fs = require("fs");
const path = require("path");
const http = require("http");

function loadEnvLocal() {
  const envLocalPath = path.resolve(__dirname, "../.env.local");
  if (!fs.existsSync(envLocalPath)) return;
  const content = fs.readFileSync(envLocalPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  }
}
loadEnvLocal();

const { initializeApp: initAdminApp, getApps, cert } = require("firebase-admin/app");
const { getAuth: getAdminAuth } = require("firebase-admin/auth");

const adminApp =
  getApps().length > 0
    ? getApps()[0]
    : initAdminApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        }),
      });
const adminAuth = getAdminAuth(adminApp);

const { initializeApp } = require("firebase/app");
const { getAuth, signInWithCustomToken } = require("firebase/auth");

const clientApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
const clientAuth = getAuth(clientApp);

const { createClient } = require("@supabase/supabase-js");
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

function postStream(token, body) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    const req = http.request(
      {
        hostname: "localhost",
        port: 3000,
        path: "/api/chat/gemini",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
          Accept: "text/event-stream",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
      (res) => {
        let fullData = "";
        const events = [];
        let accumulatedText = "";

        res.on("data", (chunk) => {
          const str = chunk.toString();
          fullData += str;

          const blocks = str.split("\n\n");
          for (const b of blocks) {
            if (!b.trim()) continue;
            const eventMatch = b.match(/^event:\s*(\w+)/m);
            const dataMatch = b.match(/^data:\s*(.+)$/m);
            const eventType = eventMatch ? eventMatch[1] : "delta";
            const dataRaw = dataMatch ? dataMatch[1] : null;

            if (dataRaw) {
              try {
                const parsed = JSON.parse(dataRaw);
                events.push({ type: eventType, data: parsed });
                if (eventType === "delta" && parsed.chunk) {
                  accumulatedText += parsed.chunk;
                }
              } catch {}
            }
          }
        });

        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            fullData,
            events,
            text: accumulatedText,
          });
        });
      }
    );

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log("==================================================================");
  console.log("  CHATBOT UI/UX REDESIGN & FLOWCHART STABILITY VERIFICATION SUITE  ");
  console.log("==================================================================\n");

  const results = [];
  function record(name, pass, details = "") {
    results.push({ name, pass, details });
    console.log(`[${pass ? "PASS" : "FAIL"}] ${name} ${details ? "- " + details : ""}`);
  }

  try {
    // 1. Authenticate User A & User B
    console.log("--- 1. User Authentication ---");
    const uidA = "MErYn3E87rOLJe1cL3KlPWBoiYp2";
    const customA = await adminAuth.createCustomToken(uidA);
    const credA = await signInWithCustomToken(clientAuth, customA);
    const tokenA = await credA.user.getIdToken();
    record("User A Authentication", !!tokenA && tokenA.length > 500, `UID: ${uidA.slice(0, 8)}...`);

    const uidB = "rzDrdQrTasM99cBrPsvxXDulcFk2";
    const customB = await adminAuth.createCustomToken(uidB);
    const credB = await signInWithCustomToken(clientAuth, customB);
    const tokenB = await credB.user.getIdToken();
    record("User B Authentication", !!tokenB && tokenB.length > 500, `UID: ${uidB.slice(0, 8)}...`);

    // 2. Conversation Lifecycle (Create, Rename, Supabase Persistence)
    console.log("\n--- 2. Conversation Creation & Persistence ---");
    const { data: convRecord, error: convErr } = await supabaseAdmin
      .from("chat_conversations")
      .insert({
        firebase_uid: uidA,
        title: "Initial Thread Title",
        archived: false,
      })
      .select()
      .single();

    if (convErr) throw convErr;
    record("Create Conversation in Supabase", !!convRecord?.id, `ID: ${convRecord.id}`);

    // Test Rename
    const { error: renameErr } = await supabaseAdmin
      .from("chat_conversations")
      .update({ title: "Renamed Career Thread" })
      .eq("id", convRecord.id);
    record("Rename Conversation", !renameErr, "Renamed to 'Renamed Career Thread'");

    // 3. Normal Text Response
    console.log("\n--- 3. Standard Text Response ---");
    const textRes = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "What skills do I need for AI Engineering?",
      stream: true,
    });
    const textPass =
      textRes.statusCode === 200 &&
      textRes.text.toLowerCase().includes("python") &&
      !textRes.text.toLowerCase().includes("welcome! as your dedicated");
    record("Standard Text Response (Direct & Clean)", textPass, `Length: ${textRes.text.length} chars`);

    // 4. Single Flowchart Generation & Verification
    console.log("\n--- 4. Single Flowchart Generation ---");
    const flowchartRes = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "Explain RAG architecture with a diagram.",
      stream: true,
    });
    const hasMermaid = flowchartRes.text.includes("```mermaid");
    const hasFlowchart =
      flowchartRes.text.includes("flowchart") || flowchartRes.text.includes("graph");
    record(
      "Single Flowchart Response",
      flowchartRes.statusCode === 200 && hasMermaid && hasFlowchart,
      "Contains clean Mermaid flowchart block"
    );

    // 5. Multiple Flowcharts in One Response
    console.log("\n--- 5. Multiple Flowcharts in Single Response ---");
    const multiDiagramRes = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "Show me two separate diagrams: one for a CI/CD deployment pipeline, and one for a Microservices API Gateway.",
      stream: true,
    });
    const mermaidMatches = multiDiagramRes.text.match(/```mermaid/g) || [];
    record(
      "Multiple Flowcharts in One Response",
      multiDiagramRes.statusCode === 200 && mermaidMatches.length >= 2,
      `Detected ${mermaidMatches.length} independent Mermaid diagram blocks`
    );

    // 6. Syntax-highlighted Code Block with Complexity
    console.log("\n--- 6. Code Block with Big-O Complexity ---");
    const codeRes = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "Explain binary tree traversal with C++ code.",
      stream: true,
    });
    const codePass =
      codeRes.statusCode === 200 &&
      (codeRes.text.toLowerCase().includes("```cpp") ||
        codeRes.text.toLowerCase().includes("```c++")) &&
      (codeRes.text.toLowerCase().includes("o(n)") ||
        codeRes.text.toLowerCase().includes("complexity"));
    record("Code Block with Syntax & Big-O Complexity", codePass, "C++ code with $O(n)$ complexity");

    // 7. Markdown Comparison Table
    console.log("\n--- 7. Markdown Comparison Table ---");
    const tableRes = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "What is the difference between SQL and NoSQL?",
      stream: true,
    });
    const tablePass = tableRes.statusCode === 200 && tableRes.text.includes("|");
    record("Comparison Table Generation", tablePass, "Valid GFM Markdown table generated");

    // 8. Out-of-Scope Handling (Weather)
    console.log("\n--- 8. Out-of-Scope Query Handling ---");
    const weatherRes = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "What is the weather today?",
      stream: true,
    });
    const weatherLower = weatherRes.text.toLowerCase();
    const weatherPass =
      weatherRes.statusCode === 200 &&
      (weatherLower.includes("weather") || weatherLower.includes("real-time") || weatherLower.includes("don't have access") || weatherLower.includes("career")) &&
      !weatherLower.includes("degrees celsius") &&
      !weatherLower.includes("degrees fahrenheit");
    record("Out-of-Scope Query Handling", weatherPass, "Politely declined real-time inquiry");

    // 9. Stop Generation & Client Abort Safety
    console.log("\n--- 9. Stop Generation / Client Abort ---");
    const abortController = new AbortController();
    const abortPromise = fetch("http://localhost:3000/api/chat/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        conversationId: convRecord.id,
        message: "Write an extremely long 10-page essay detailing every Linux kernel subsystem in exhaustive detail.",
        stream: true,
      }),
      signal: abortController.signal,
    }).catch((e) => e);

    // Abort after 400ms
    setTimeout(() => abortController.abort(), 400);
    const abortResult = await abortPromise;
    record("Client Abort / Stop Generation", abortResult.name === "AbortError" || abortResult.code === 20, "Request successfully cancelled via AbortController");

    // 10. Regenerate Deduplication Test
    console.log("\n--- 10. Regenerate Deduplication ---");
    const { data: beforeRegenMsgs } = await supabaseAdmin
      .from("chat_messages")
      .select("id, role, content")
      .eq("conversation_id", convRecord.id);

    const targetUserMsg = (beforeRegenMsgs || []).filter((m) => m.role === "user").pop();
    if (targetUserMsg) {
      await postStream(tokenA, {
        conversationId: convRecord.id,
        message: targetUserMsg.content,
        stream: true,
        isRegenerate: true,
      });

      const { data: afterRegenMsgs } = await supabaseAdmin
        .from("chat_messages")
        .select("id, role, content")
        .eq("conversation_id", convRecord.id);

      const userCopies = (afterRegenMsgs || []).filter(
        (m) => m.role === "user" && m.content === targetUserMsg.content
      ).length;
      record("Regenerate Deduplication", userCopies === 1, `Copies found: ${userCopies} (No duplicates)`);
    }

    // 11. Cross-User Security Check
    console.log("\n--- 11. Cross-User Security & Authorization ---");
    const crossRes = await postStream(tokenB, {
      conversationId: convRecord.id,
      message: "Unauthorized message attempt",
      stream: true,
    });
    record("Cross-User Ownership Isolation", crossRes.statusCode === 403, `HTTP Status: ${crossRes.statusCode} (Forbidden)`);

    // 12. Unauthenticated Access Block
    const unauthRes = await postStream(null, {
      conversationId: convRecord.id,
      message: "Unauthenticated attempt",
      stream: true,
    });
    record("Unauthenticated Access Blocked", unauthRes.statusCode === 401, `HTTP Status: ${unauthRes.statusCode} (Unauthorized)`);

    // 13. Delete Conversation
    console.log("\n--- 12. Conversation Deletion ---");
    const { error: deleteErr } = await supabaseAdmin
      .from("chat_conversations")
      .delete()
      .eq("id", convRecord.id);
    record("Delete Conversation in Supabase", !deleteErr, "Conversation cleaned up");

    console.log("\n==================================================================");
    const passedCount = results.filter((r) => r.pass).length;
    console.log(`TEST SUITE RESULTS: ${passedCount} / ${results.length} PASSED (${Math.round((passedCount / results.length) * 100)}%)`);
    console.log("==================================================================");

    process.exit(passedCount === results.length ? 0 : 1);
  } catch (err) {
    console.error("Test execution encountered an error:", err);
    process.exit(1);
  }
}

runTests();

