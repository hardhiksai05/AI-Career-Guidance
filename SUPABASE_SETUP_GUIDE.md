# COMPLETE SUPABASE & FIREBASE THIRD-PARTY AUTH SETUP GUIDE

**Project:** AI Career Guidance Platform  
**Target Architecture:** Supabase PostgreSQL Database + Supabase Private Storage integrated with Firebase Authentication (Third-Party Auth Bridge)  
**Supabase Project Name:** AI Career Guidance  
**Supabase Region:** Singapore (Nano Compute, Free Plan)  

---

## TABLE OF CONTENTS
1. [Overview & Architecture](#1-overview--architecture)
2. [Step 1: Configure Firebase Third-Party Auth in Supabase Dashboard](#step-1-configure-firebase-third-party-auth-in-supabase-dashboard)
3. [Step 2: Server-Side Custom Claim Provisioning (`role: authenticated`)](#step-2-server-side-custom-claim-provisioning-role-authenticated)
4. [Step 3: Environment Variables Configuration](#step-3-environment-variables-configuration)
5. [Step 4: Execute Database Migrations (SQL Editor)](#step-4-execute-database-migrations-sql-editor)
6. [Step 5: Verify Private Storage Bucket & Storage RLS](#step-5-verify-private-storage-bucket--storage-rls)
7. [Step 6: Automated Claim Provisioning for Existing Users](#step-6-automated-claim-provisioning-for-existing-users)
8. [Step 7: Two-User Security & RLS Isolation Verification](#step-7-two-user-security--rls-isolation-verification)
9. [Step 8: Future Production Deployment (Vercel)](#step-8-future-production-deployment-vercel)
10. [Troubleshooting & FAQ](#troubleshooting--faq)

---

## 1. Overview & Architecture

In this architecture:
- **Firebase Authentication** is the sole identity provider for user registration, email verification, Google OAuth, session management, and password reset.
- **Supabase** acts as the primary data and storage engine (PostgreSQL + S3 Storage).
- **Official Third-Party Auth Integration**: Rather than maintaining a secondary Supabase Auth session or passwords, Supabase natively trusts Firebase-issued JWT tokens.
- **Identity Claim**: Every database table and private storage folder is keyed to the student's unique Firebase UID, verified in PostgreSQL Row Level Security (RLS) via:
  ```sql
  (auth.jwt()->>'sub') = firebase_uid
  ```
- **Postgres Role**: Supabase requires the Firebase ID token to contain the custom claim `{ "role": "authenticated" }`. This claim is provisioned securely on the server using the Firebase Admin SDK.

```
+------------------------------------------------------------------------+
|                      CLIENT BROWSER (Next.js)                         |
+------------------------------------------------------------------------+
     |                                                      |
     | 1. Login / OAuth                                     | 3. Query / Upload with
     v                                                      |    Firebase JWT token
+-----------------------+                                  v
| Firebase Auth Service |                           +---------------------+
| (Generates ID Token)  |                           | Supabase PostgreSQL |
+-----------------------+                           | & Storage Buckets   |
     |                                              +---------------------+
     | 2. Checks token; if role missing,                       ^
     |    requests Server to provision claim                   | 4. Verifies Firebase
     v                                                         |    OIDC signature &
+---------------------------------------------------+          |    RLS policies
| Server Route: POST /api/auth/claim-role           | ---------+
| (Firebase Admin SDK assigns role='authenticated') |
+---------------------------------------------------+
```

---

## Step 1: Configure Firebase Third-Party Auth in Supabase Dashboard

Supabase provides native OIDC third-party auth support for Firebase.

1. **Obtain your Firebase Project ID:**
   - Open the [Firebase Console](https://console.firebase.google.com/).
   - Click on your project **"AI Career Guidance"**.
   - Click the **Gear icon (⚙️) -> Project Settings**.
   - Under the **General** tab, copy the **Project ID** (e.g., `ai-career-guidance-xxxxx`).

2. **Enable Firebase in Supabase Dashboard:**
   - Open the [Supabase Dashboard](https://supabase.com/dashboard/).
   - Select your project **"AI Career Guidance"**.
   - In the left sidebar, navigate to **Authentication** (the key icon).
   - Click **Providers** or **Third-Party Auth**.
   - Scroll down to **Firebase**.
   - Toggle **Enable Firebase**.
   - Paste your **Firebase Project ID** into the `Project ID` field.
   - Click **Save**.

*Note: Supabase automatically connects to `https://securetoken.google.com/<project-id>/.well-known/openid-configuration` to verify incoming Firebase tokens.*

---

## Step 2: Server-Side Custom Claim Provisioning (`role: authenticated`)

Supabase Postgres Row Level Security checks the Postgres role of the incoming request. For Firebase ID tokens, Supabase requires the token payload to include:
```json
{
  "role": "authenticated"
}
```

### How our implementation handles this:
1. **Automatic Provisioning via API Route**:
   When any student signs in or registers, the client calls our server route:
   [`src/app/api/auth/claim-role/route.ts`](file:///c:/Users/05har/OneDrive/Desktop/AI%20CAREER%20GUIDANCE/src/app/api/auth/claim-role/route.ts)
   - It verifies the user's Firebase token server-side.
   - Checks if `role === 'authenticated'`.
   - If missing, it calls `admin.auth().setCustomUserClaims(uid, { ...existingClaims, role: 'authenticated' })`.
   - Then forces a client token refresh `getIdToken(true)` so subsequent database queries succeed immediately.
2. **One-Time Script for Existing Users**:
   A batch script is provided to provision all existing Firebase users in one go:
   ```bash
   npm run provision-claims
   ```

---

## Step 3: Environment Variables Configuration

Open your local [`.env.local`](file:///c:/Users/05har/OneDrive/Desktop/AI%20CAREER%20GUIDANCE/.env.local) file and configure the following:

### 1. Supabase Client Keys (Public)
Obtain from: **Supabase Dashboard -> Project Settings (⚙️) -> API**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_or_publishable_key
```

### 2. Firebase Admin SDK Keys (Server-Only)
Obtain from: **Firebase Console -> Project Settings (⚙️) -> Service accounts**:
1. Click **Generate new private key** -> confirm download of the JSON file.
2. Open the downloaded JSON file in a text editor and copy the values:
```env
FIREBASE_ADMIN_PROJECT_ID=your_firebase_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```
*(Tip: Make sure the `\n` line breaks in the private key are enclosed in double quotes).*

---

## Step 4: Execute Database Migrations (SQL Editor)

All migrations have been prepared inside the [`supabase/migrations/`](file:///c:/Users/05har/OneDrive/Desktop/AI%20CAREER%20GUIDANCE/supabase/migrations/) directory.

For convenience, a consolidated SQL script containing all migrations (including Part 9 Security Hardening) is available at:
[`supabase/migrations/all_migrations.sql`](file:///c:/Users/05har/OneDrive/Desktop/AI%20CAREER%20GUIDANCE/supabase/migrations/all_migrations.sql)

*(If you already executed earlier migrations, you can execute just [`supabase/migrations/010_rpc_permission_hardening.sql`](file:///c:/Users/05har/OneDrive/Desktop/AI%20CAREER%20GUIDANCE/supabase/migrations/010_rpc_permission_hardening.sql) in SQL Editor).*

### Privileged RPC Hardening (Migration 010):
- **Functions:** `insert_verified_assistant_reply` and `verify_and_unlock_achievement`
- **Permissions:** All `EXECUTE` privileges revoked from `PUBLIC`, `anon`, and `authenticated`.
- **Allowed Roles:** Exclusively `service_role` and `postgres`.
- **Execution Architecture:**
  - Frontend client components **cannot** execute these functions directly.
  - Operations route through dedicated server-side API endpoints:
    - `POST /api/chat/assistant-reply`
    - `POST /api/achievements/unlock`
  - The server authenticates the student's Firebase ID token, verifies conversation ownership, and validates genuine roadmap progress before invoking the RPC functions with the server's `SUPABASE_SERVICE_ROLE_KEY`.

### How to apply the migrations:
1. Open the [Supabase Dashboard](https://supabase.com/dashboard/).
2. Select **"AI Career Guidance"**.
3. In the left navigation, click **SQL Editor**.
4. Click **+ New Query**.
5. Copy the entire contents of [`supabase/migrations/all_migrations.sql`](file:///c:/Users/05har/OneDrive/Desktop/AI%20CAREER%20GUIDANCE/supabase/migrations/all_migrations.sql) and paste into the editor.
6. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`).
7. Confirm that the query succeeds with **"Success. No rows returned"**.

### Tables Created:
| Table Name | Description | RLS Policy Key |
|---|---|---|
| `profiles` | Student profile, academic credentials, GPA, university | `firebase_uid = (auth.jwt()->>'sub')` |
| `career_preferences` | Preferred career domains, target skills, learning style | `firebase_uid = (auth.jwt()->>'sub')` |
| `resumes` | CV file metadata (file size, mime type, storage path) | `firebase_uid = (auth.jwt()->>'sub')` |
| `chat_conversations` | Conversation threads with timestamps and titles | `firebase_uid = (auth.jwt()->>'sub')` |
| `chat_messages` | Individual dialogue messages (user & assistant) | `firebase_uid = (auth.jwt()->>'sub')` |
| `roadmap_progress` | Career track progression, completed nodes & XP | `firebase_uid = (auth.jwt()->>'sub')` |
| `achievements` | RPG milestone badge definitions catalog | Read-only for `authenticated, anon` |
| `user_achievements` | Unlocked achievements tracking | `firebase_uid = (auth.jwt()->>'sub')` |

---

## Step 5: Verify Private Storage Bucket & Storage RLS

Migration 007 automatically created the private storage bucket `student-resumes` with folder-based Row Level Security:

1. In Supabase Dashboard, click **Storage** in the left sidebar.
2. Confirm the bucket **`student-resumes`** is listed and shows as **Private** (Public: Off).
3. **Storage Security Policies Applied**:
   - Files are stored under: `student-resumes/{firebase_uid}/{timestamp}_{filename}`
   - **Upload (INSERT)**: Allowed only when `(storage.foldername(name))[1] = (auth.jwt()->>'sub')`
   - **Download (SELECT)**: Allowed only when `(storage.foldername(name))[1] = (auth.jwt()->>'sub')`
   - **Replace (UPDATE)**: Allowed only for the owning student.
   - **Delete (DELETE)**: Allowed only for the owning student.
   - Max file size: **10 MB**
   - Allowed MIME types: PDF (`application/pdf`), DOC (`application/msword`), DOCX (`application/vnd.openxmlformats-officedocument.wordprocessingml.document`).

---

## Step 6: Automated Claim Provisioning for Existing Users

If you have already created user accounts in Firebase during Part 2 testing, run the provisioning script to grant them the `role: authenticated` claim:

```bash
npm run provision-claims
```

Output will display:
```
==================================================================
  AI CAREER GUIDANCE - FIREBASE USER CLAIMS PROVISIONING TOOL     
==================================================================
[PROVISIONED] User student@university.edu: assigned role=authenticated
------------------------------------------------------------------
Summary:
  Total users scanned:   1
  Already provisioned:   0
  Newly provisioned:     1
------------------------------------------------------------------
Claim provisioning complete.
```

---

## Step 7: Two-User Security & RLS Isolation Verification

To verify complete data isolation between students:

1. **Create Account A**:
   - Register `student_a@university.edu`.
   - Verify email, complete onboarding, and upload `resume_a.pdf`.
   - Add a chat message: *"I want to focus on PyTorch"*.
   - Complete Level 1 in the AI Engineer roadmap (+150 XP).
2. **Create Account B**:
   - In an incognito / private browser window, register `student_b@university.edu`.
   - Verify email and complete onboarding with different details.
3. **Verify Isolation**:
   - When logged in as **Student B**, open `/dashboard/profile`: only Student B's details and resumes are visible.
   - Open `/dashboard/chatbot`: none of Student A's conversations appear.
   - Open `/dashboard/roadmaps`: Student A's progress and XP do not carry over to Student B.
   - Direct API requests attempting to query `profiles` or `resumes` belonging to Student A's `firebase_uid` will return `0 rows` or `403 Forbidden` due to PostgreSQL RLS.

---

## Step 8: Future Production Deployment (Vercel)

When deploying to Vercel in future milestones:
1. Go to **Vercel Dashboard -> Project Settings -> Environment Variables**.
2. Add all variables from `.env.local`:
   - `NEXT_PUBLIC_FIREBASE_*` (All 6 Firebase keys)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `FIREBASE_ADMIN_PROJECT_ID`
   - `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `FIREBASE_ADMIN_PRIVATE_KEY`
3. Ensure `FIREBASE_ADMIN_PRIVATE_KEY` contains the complete PEM string with `\n` line breaks.

---

## Troubleshooting & FAQ

#### Q: Getting "new row violates row-level security policy for table profiles"
**Reason:** The user's Firebase token does not have the custom claim `{ "role": "authenticated" }` or Supabase Firebase third-party provider is not enabled.  
**Resolution:**
1. Check that **Firebase Third-Party Auth** is enabled in Supabase Dashboard with the matching Firebase Project ID.
2. Confirm `FIREBASE_ADMIN_*` credentials are set in `.env.local` so the server can assign custom claims.
3. Run `npm run provision-claims` to assign the claim to the account.
4. Log out and log back in (or refresh the token) so the client receives the fresh claim.

#### Q: Resumes upload fails with "Bucket not found"
**Reason:** The storage bucket hasn't been created yet.  
**Resolution:** Execute `supabase/migrations/007_create_storage_policies.sql` in the Supabase SQL Editor.

#### Q: Download link gives 403 Forbidden
**Reason:** Document download requires a signed URL because `student-resumes` is a private bucket.  
**Resolution:** Our [`resume-service.ts`](file:///c:/Users/05har/OneDrive/Desktop/AI%20CAREER%20GUIDANCE/src/lib/services/resume-service.ts) automatically generates 60-second temporary signed URLs via `supabase.storage.from('student-resumes').createSignedUrl(path, 60)`.

