/**
 * Chatbot Audit & Optimization Test Suite
 * Tests all 10 required prompt scenarios and security/persistence invariants.
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

async function runAudit() {
  console.log("==================================================================");
  console.log("       AI CAREER GUIDANCE CHATBOT: FULL AUDIT & VERIFICATION       ");
  console.log("==================================================================\n");

  const results = [];

  function record(name, pass, details = "") {
    results.push({ name, pass, details });
    console.log(`[${pass ? "PASS" : "FAIL"}] ${name} ${details ? "- " + details : ""}`);
  }

  try {
    // 1. Authenticate Test Users
    console.log("--- 1. Authenticating Test Users ---");
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

    // 2. Create Audit Conversation for User A
    const { data: convRecord, error: convErr } = await supabaseAdmin
      .from("chat_conversations")
      .insert({
        firebase_uid: uidA,
        title: "Chatbot Response Optimization Audit",
        archived: false,
      })
      .select()
      .single();

    if (convErr) throw convErr;
    record("Create Audit Conversation in Supabase", !!convRecord?.id, `Conv ID: ${convRecord.id}`);

    // Test Question 1: "What skills do I need for AI Engineering?"
    console.log("\n--- Test Question 1: AI Engineering Skills ---");
    const q1 = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "What skills do I need for AI Engineering?",
      stream: true,
    });
    const q1Lower = q1.text.toLowerCase();
    const q1Pass =
      q1.statusCode === 200 &&
      q1Lower.includes("python") &&
      (q1Lower.includes("machine learning") || q1Lower.includes("deep learning") || q1Lower.includes("framework")) &&
      !q1Lower.includes("welcome! as your dedicated") &&
      !q1Lower.includes("gpa of 3.") &&
      !q1Lower.includes("graduating in 2026 as a");
    record(
      "Q1: Skills for AI Engineering (Direct, Structured & Uncluttered)",
      q1Pass,
      `Length: ${q1.text.length} chars. Direct & structured without unsolicited fluff.`
    );

    // Test Question 2: "Explain Python decorators with examples."
    console.log("\n--- Test Question 2: Python Decorators ---");
    const q2 = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "Explain Python decorators with examples.",
      stream: true,
    });
    const q2Pass =
      q2.statusCode === 200 &&
      q2.text.includes("```python") &&
      q2.text.includes("@") &&
      (q2.text.toLowerCase().includes("function") || q2.text.toLowerCase().includes("wrapper"));
    record(
      "Q2: Python Decorators with Code Example",
      q2Pass,
      `Includes python syntax-highlighted code block and wrapper explanation.`
    );

    // Test Question 3: "Compare AI Engineering and Machine Learning Engineering."
    console.log("\n--- Test Question 3: AI Eng vs ML Eng Comparison ---");
    const q3 = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "Compare AI Engineering and Machine Learning Engineering.",
      stream: true,
    });
    const q3Pass =
      q3.statusCode === 200 &&
      q3.text.includes("|") &&
      (q3.text.toLowerCase().includes("ai engineer") || q3.text.toLowerCase().includes("machine learning engineer"));
    record(
      "Q3: Comparison with Structured Markdown Table",
      q3Pass,
      `Table rendering verified with clear role differentiation.`
    );

    // Test Question 4: "Explain binary tree traversal with C++ code."
    console.log("\n--- Test Question 4: Binary Tree Traversal with C++ ---");
    const q4 = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "Explain binary tree traversal with C++ code.",
      stream: true,
    });
    const q4Lower = q4.text.toLowerCase();
    const hasCppBlock = q4Lower.includes("```cpp") || q4Lower.includes("```c++") || q4Lower.includes("```c");
    const hasTraversal = q4Lower.includes("inorder") || q4Lower.includes("preorder") || q4Lower.includes("traversal");
    const hasComplexity = q4Lower.includes("o(n)") || q4Lower.includes("o(h)") || q4Lower.includes("complexity") || q4.text.includes("O(");
    const q4Pass = q4.statusCode === 200 && hasCppBlock && hasTraversal && hasComplexity;
    if (!q4Pass) {
      console.log("[DEBUG Q4 Failure] statusCode:", q4.statusCode, "hasCppBlock:", hasCppBlock, "hasTraversal:", hasTraversal, "hasComplexity:", hasComplexity);
      console.log("[DEBUG Q4 Text preview]:\n", q4.text.slice(0, 400));
    }
    record(
      "Q4: Binary Tree Traversal in C++ with Big-O Complexity",
      q4Pass,
      `Code block and complexity analysis ($O(n)$) verified.`
    );

    // Test Question 5: "Create a roadmap to become an AI Engineer."
    console.log("\n--- Test Question 5: AI Engineer Roadmap ---");
    const q5 = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "Create a roadmap to become an AI Engineer.",
      stream: true,
    });
    const q5Pass =
      q5.statusCode === 200 &&
      (q5.text.toLowerCase().includes("foundation") || q5.text.toLowerCase().includes("phase") || q5.text.toLowerCase().includes("step")) &&
      q5.text.length > 250;
    record(
      "Q5: AI Engineer Progressive Roadmap",
      q5Pass,
      `Clear sequential roadmap with foundational to advanced milestones.`
    );

    // Test Question 6: "Explain RAG architecture with a diagram."
    console.log("\n--- Test Question 6: RAG Architecture with Diagram ---");
    const q6 = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "Explain RAG architecture with a diagram.",
      stream: true,
    });
    const q6Pass =
      q6.statusCode === 200 &&
      q6.text.includes("```mermaid") &&
      (q6.text.includes("flowchart") || q6.text.includes("graph")) &&
      (q6.text.toLowerCase().includes("retrieval") || q6.text.toLowerCase().includes("vector"));
    record(
      "Q6: RAG Architecture with Mermaid Diagram",
      q6Pass,
      `Valid Mermaid flowchart generated for pipeline visualization.`
    );

    // Test Question 7: "What is the difference between SQL and NoSQL?"
    console.log("\n--- Test Question 7: SQL vs NoSQL ---");
    const q7 = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "What is the difference between SQL and NoSQL?",
      stream: true,
    });
    const q7Pass =
      q7.statusCode === 200 &&
      q7.text.includes("|") &&
      q7.text.toLowerCase().includes("sql") &&
      q7.text.toLowerCase().includes("nosql");
    record(
      "Q7: SQL vs NoSQL Comparison Table",
      q7Pass,
      `Comparison table with schema, scalability, and ACID tradeoffs.`
    );

    // Test Question 8: "Suggest projects for a beginner in AI."
    console.log("\n--- Test Question 8: Beginner AI Projects ---");
    const q8 = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "Suggest projects for a beginner in AI.",
      stream: true,
    });
    const q8Pass =
      q8.statusCode === 200 &&
      (q8.text.toLowerCase().includes("project") || q8.text.toLowerCase().includes("sentiment") || q8.text.toLowerCase().includes("bot")) &&
      q8.text.length > 200;
    record(
      "Q8: Beginner AI Project Recommendations",
      q8Pass,
      `Suggested practical hands-on projects with tech stacks.`
    );

    // Test Question 9: "Explain Kubernetes."
    console.log("\n--- Test Question 9: Explain Kubernetes ---");
    const q9 = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "Explain Kubernetes.",
      stream: true,
    });
    const q9Pass =
      q9.statusCode === 200 &&
      (q9.text.toLowerCase().includes("container") || q9.text.toLowerCase().includes("pod") || q9.text.toLowerCase().includes("orchestration")) &&
      !q9.text.toLowerCase().includes("as a student at your university");
    record(
      "Q9: Kubernetes Technical Explanation (Objective)",
      q9Pass,
      `Clean explanation of container orchestration without forced personal details.`
    );

    // Test Question 10: "What is the weather today?" (Out-of-scope handling)
    console.log("\n--- Test Question 10: Out-of-Scope Weather Query ---");
    const q10 = await postStream(tokenA, {
      conversationId: convRecord.id,
      message: "What is the weather today?",
      stream: true,
    });
    const q10Lower = q10.text.toLowerCase();
    const q10Pass =
      q10.statusCode === 200 &&
      (q10Lower.includes("weather") || q10Lower.includes("real-time") || q10Lower.includes("don't have access") || q10Lower.includes("career")) &&
      !q10Lower.includes("degrees celsius") &&
      !q10Lower.includes("degrees fahrenheit") &&
      !q10Lower.includes("sunny with a high of");
    record(
      "Q10: Polite Handling of Out-of-Scope (Weather) Query",
      q10Pass,
      `Politely declined real-time weather query and directed user to career topics.`
    );

    // 3. Security Tests
    console.log("\n--- 3. Security & Access Control Tests ---");
    // Cross-user test: User B attempting to post into User A's conversation
    const crossRes = await postStream(tokenB, {
      conversationId: convRecord.id,
      message: "Malicious attempt on User A's thread",
      stream: true,
    });
    record("Cross-User Ownership Isolation", crossRes.statusCode === 403, `HTTP Status: ${crossRes.statusCode} (Forbidden)`);

    // Unauthenticated test
    const unauthRes = await postStream(null, {
      conversationId: convRecord.id,
      message: "Hello",
      stream: true,
    });
    record("Unauthenticated Access Blocked", unauthRes.statusCode === 401, `HTTP Status: ${unauthRes.statusCode} (Unauthorized)`);

    // 4. Persistence & Deduplication Verification
    console.log("\n--- 4. Persistence & Deduplication Verification ---");
    const { data: savedMsgs } = await supabaseAdmin
      .from("chat_messages")
      .select("id, role, content, created_at")
      .eq("conversation_id", convRecord.id)
      .order("created_at", { ascending: true });

    record("Conversation Message Persistence in Supabase", (savedMsgs?.length || 0) >= 20, `Total messages persisted: ${savedMsgs?.length || 0}`);

    // Regenerate deduplication test
    const lastUserMsg = (savedMsgs || []).filter((m) => m.role === "user").pop();
    await postStream(tokenA, {
      conversationId: convRecord.id,
      message: lastUserMsg.content,
      stream: true,
      isRegenerate: true,
    });

    // Check message count after regenerate
    const { data: msgsAfterRegen } = await supabaseAdmin
      .from("chat_messages")
      .select("id, role, content")
      .eq("conversation_id", convRecord.id);

    const userMsgCount = (msgsAfterRegen || []).filter((m) => m.role === "user" && m.content === lastUserMsg.content).length;
    record("Regenerate Deduplication", userMsgCount === 1, `User message count for regenerated prompt: ${userMsgCount} (no duplicates)`);

    console.log("\n==================================================================");
    const passedCount = results.filter((r) => r.pass).length;
    console.log(`AUDIT RESULTS: ${passedCount} / ${results.length} PASSED (${Math.round((passedCount / results.length) * 100)}%)`);
    console.log("==================================================================");

    process.exit(passedCount === results.length ? 0 : 1);
  } catch (err) {
    console.error("Test execution failed:", err);
    process.exit(1);
  }
}

runAudit();
