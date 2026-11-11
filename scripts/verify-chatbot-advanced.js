const fs = require("fs");
const path = require("path");
const http = require("http");

const { loadEnvConfig } = require("@next/env");
loadEnvConfig(process.cwd());

const { initializeApp: initAdmin, getApps, cert } = require("firebase-admin/app");
const { getAuth: getAdminAuth } = require("firebase-admin/auth");

const adminApp =
  getApps().length > 0
    ? getApps()[0]
    : initAdmin({
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

function postStream(pathname, token, body) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    const req = http.request(
      {
        hostname: "localhost",
        port: 3000,
        path: pathname,
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
        let accumulatedChunks = "";

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
                  accumulatedChunks += parsed.chunk;
                }
              } catch {
                // ignore
              }
            }
          }
        });

        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            fullData,
            events,
            accumulatedChunks,
          });
        });
      }
    );

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

function postJson(pathname, token, body) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    const req = http.request(
      {
        hostname: "localhost",
        port: 3000,
        path: pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
      (res) => {
        let resData = "";
        res.on("data", (c) => (resData += c));
        res.on("end", () => {
          try {
            resolve({ statusCode: res.statusCode, data: JSON.parse(resData), headers: res.headers });
          } catch {
            resolve({ statusCode: res.statusCode, raw: resData, headers: res.headers });
          }
        });
      }
    );
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log("==================================================================");
  console.log("  ADVANCED CHATBOT VERIFICATION SUITE (TASK 5)");
  console.log("==================================================================\n");

  const results = [];
  function assert(name, condition, details = "") {
    if (condition) {
      console.log(`[PASS] ${name}${details ? ` -> ${details}` : ""}`);
      results.push({ name, pass: true, details });
    } else {
      console.error(`[FAIL] ${name}${details ? ` -> ${details}` : ""}`);
      results.push({ name, pass: false, details });
    }
  }

  // 1. Authenticate User A & User B
  console.log("--- Test 1: Authentication ---");
  const uidA = "MErYn3E87rOLJe1cL3KlPWBoiYp2";
  const customA = await adminAuth.createCustomToken(uidA);
  const credA = await signInWithCustomToken(clientAuth, customA);
  const tokenA = await credA.user.getIdToken();
  assert("User A Authenticated via Firebase", Boolean(tokenA && tokenA.length > 500));

  const uidB = "rzDrdQrTasM99cBrPsvxXDulcFk2";
  const customB = await adminAuth.createCustomToken(uidB);
  const credB = await signInWithCustomToken(clientAuth, customB);
  const tokenB = await credB.user.getIdToken();
  assert("User B Authenticated via Firebase", Boolean(tokenB && tokenB.length > 500));

  // 2. Create Persistent Conversation for User A in Supabase
  console.log("\n--- Test 2: Conversation Creation & Supabase Persistence ---");
  const convTitle = "Advanced Algorithms & System Design";
  const { data: convRecord, error: convErr } = await supabaseAdmin
    .from("chat_conversations")
    .insert({
      firebase_uid: uidA,
      title: convTitle,
    })
    .select()
    .single();

  assert("Conversation created in Supabase", Boolean(!convErr && convRecord?.id), `ID: ${convRecord?.id}`);
  const convId = convRecord.id;

  // 3. SSE Real-Time Streaming & Programming Question (Code blocks & Complexity)
  console.log("\n--- Test 3: SSE Streaming & Programming Response (Code & Big-O) ---");
  const progStream = await postStream("/api/chat/gemini", tokenA, {
    conversationId: convId,
    message: "Explain Binary Search in Python with clean code and explain the Big-O time and space complexity.",
    stream: true,
  });

  assert("SSE Stream HTTP 200", progStream.statusCode === 200);
  assert("SSE Event delta chunks received", progStream.events.some((e) => e.type === "delta"));
  assert("SSE Complete event received", progStream.events.some((e) => e.type === "complete"));

  const fullProgText = progStream.accumulatedChunks;
  assert("Contains Markdown Heading (##)", /##\s+/i.test(fullProgText));
  assert("Contains Python Code Block (```python)", /```python/i.test(fullProgText));
  assert("Contains Big-O Complexity Analysis", /O\((log\s*n|1)\)/i.test(fullProgText) || /time complexity/i.test(fullProgText));

  // 4. Mathematical Expressions (KaTeX)
  console.log("\n--- Test 4: Mathematical Expressions (KaTeX Math) ---");
  const mathStream = await postStream("/api/chat/gemini", tokenA, {
    conversationId: convId,
    message: "What is Euler's formula and Gaussian distribution? Write their mathematical formulas using standard KaTeX notation.",
    stream: true,
  });

  const mathText = mathStream.accumulatedChunks;
  assert("Contains KaTeX Math Formulas ($...$ or $$...$$)", /\$[^$]+\$|\$\$.+\$\$/s.test(mathText));

  // 5. Mermaid Flowchart / Architecture Diagram
  console.log("\n--- Test 5: Mermaid Diagram Generation ---");
  const diagramStream = await postStream("/api/chat/gemini", tokenA, {
    conversationId: convId,
    message: "Create a Mermaid flowchart showing the steps of a modern DevOps CI/CD pipeline from code commit to Kubernetes cluster deployment.",
    stream: true,
  });

  const diagramText = diagramStream.accumulatedChunks;
  assert("Contains Mermaid Diagram Block (```mermaid)", /```mermaid\s+(flowchart|graph|sequenceDiagram)/i.test(diagramText));

  // 6. Comparison Table
  console.log("\n--- Test 6: Markdown Comparison Table ---");
  const tableStream = await postStream("/api/chat/gemini", tokenA, {
    conversationId: convId,
    message: "Compare PostgreSQL vs MongoDB for modern web applications. Include a Markdown comparison table with key features.",
    stream: true,
  });

  const tableText = tableStream.accumulatedChunks;
  assert("Contains Markdown Table (| Col | Col |)", /\|.+\|.+\|\r?\n\|[-:\s|]+\|/i.test(tableText));

  // 7. Multi-Turn Context Retention
  console.log("\n--- Test 7: Multi-Turn Context Retention ---");
  const followUpStream = await postStream("/api/chat/gemini", tokenA, {
    conversationId: convId,
    message: "Between those two databases, which one is better suited for storing financial transactional ledgers and why?",
    stream: true,
  });

  const followUpText = followUpStream.accumulatedChunks;
  assert("Context Retained (References PostgreSQL / ACID / transactions)", /postgre|relational|acid/i.test(followUpText));

  // 8. Message Persistence in Supabase
  console.log("\n--- Test 8: Supabase Message Persistence ---");
  const { data: dbMessages } = await supabaseAdmin
    .from("chat_messages")
    .select("*")
    .eq("conversation_id", convId)
    .order("created_at", { ascending: true });

  assert("Messages saved in Supabase", dbMessages && dbMessages.length >= 6, `Count: ${dbMessages?.length}`);
  const hasUserMsg = dbMessages?.some((m) => m.role === "user");
  const hasAssistantMsg = dbMessages?.some((m) => m.role === "assistant");
  assert("Both user and assistant roles persisted", hasUserMsg && hasAssistantMsg);

  // 9. Rename Conversation
  console.log("\n--- Test 9: Rename Conversation ---");
  const updatedTitle = "Full-Stack Architecture & Distributed Systems";
  await supabaseAdmin
    .from("chat_conversations")
    .update({ title: updatedTitle })
    .eq("id", convId)
    .eq("firebase_uid", uidA);

  const { data: renamedConv } = await supabaseAdmin
    .from("chat_conversations")
    .select("title")
    .eq("id", convId)
    .single();
  assert("Conversation title updated in Supabase", renamedConv.title === updatedTitle, `Title: ${renamedConv.title}`);

  // 10. Security: Cross-User Conversation Isolation
  console.log("\n--- Test 10: Cross-User Isolation (User B cannot access User A conversation) ---");
  const crossUserReq = await postJson("/api/chat/gemini", tokenB, {
    conversationId: convId,
    message: "Inject unauthorized message into User A conversation.",
  });
  assert("User B blocked with HTTP 403 Forbidden", crossUserReq.statusCode === 403);

  // 11. Security: Unauthenticated Request Block
  console.log("\n--- Test 11: Unauthenticated Access Block ---");
  const unauthReq = await postJson("/api/chat/gemini", null, {
    conversationId: convId,
    message: "Unauthenticated ping.",
  });
  assert("Unauthenticated request blocked with HTTP 401", unauthReq.statusCode === 401);

  // 12. Security: Credential Exposure Prevention
  console.log("\n--- Test 12: Credential Exposure Prevention ---");
  const rawHeaders = JSON.stringify(progStream.headers);
  const rawBody = progStream.fullData;
  const apiKeyExposed =
    rawHeaders.includes(process.env.GEMINI_API_KEY) ||
    rawBody.includes(process.env.GEMINI_API_KEY) ||
    rawHeaders.includes(process.env.SUPABASE_SERVICE_ROLE_KEY) ||
    rawBody.includes(process.env.SUPABASE_SERVICE_ROLE_KEY);
  assert("Credentials NEVER exposed in network headers or stream body", !apiKeyExposed);

  // 13. Clean up Test Conversation
  console.log("\nCleaning up test conversation...");
  await supabaseAdmin.from("chat_messages").delete().eq("conversation_id", convId);
  await supabaseAdmin.from("chat_conversations").delete().eq("id", convId);

  console.log("\n==================================================================");
  console.log("  VERIFICATION SUMMARY");
  console.log("==================================================================");
  const total = results.length;
  const passed = results.filter((r) => r.pass).length;
  const failed = total - passed;

  console.log(`Total Checks: ${total}`);
  console.log(`Passed:       ${passed}`);
  console.log(`Failed:       ${failed}`);

  if (failed > 0) {
    console.error("Some tests failed!");
    process.exit(1);
  } else {
    console.log("ALL CHATBOT ADVANCED EXPERIENCE TESTS PASSED!");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Fatal test error:", err);
  process.exit(1);
});

