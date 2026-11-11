# Firebase Authentication Setup & Deployment Guide

This guide details the complete configuration required to connect your **AI Career Guidance** platform to Firebase Authentication for local development and production deployment.

---

## A. Firebase Web Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your existing Firebase project: **AI Career Guidance** (or create one if needed).
3. In Project Overview, click the **Settings Gear (⚙️)** > **Project Settings**.
4. In the **General** tab, scroll to **Your apps**.
5. If not already registered, click the **Web icon (`</>`)**, enter `AI Career Guidance Web`, and register the app.
6. Under **Firebase SDK snippet**, choose **Config** (modular).
7. Copy the configuration properties:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

---

## B. Email/Password Provider Configuration

1. In the Firebase Console left navigation, select **Build > Authentication**.
2. Click the **Sign-in method** tab.
3. Under **Sign-in providers**, click **Email/Password**.
4. Toggle **Enable** to ON.
5. *(Optional)* Leave "Email link (passwordless sign-in)" disabled unless required.
6. Click **Save**.

> **Note on Email Verification:**  
> When a student registers, Firebase `sendEmailVerification()` sends an activation link automatically. You can customize the sender name, email subject, and template by navigating to **Authentication > Templates > Email address verification**.

---

## C. Google Authentication Configuration

1. In **Authentication > Sign-in method**, click **Add new provider** and select **Google**.
2. Toggle **Enable** to ON.
3. Choose a **Project public-facing name** (e.g. `AI Career Guidance`).
4. Select a **Project support email** from the dropdown list.
5. Click **Save**.

---

## D. GitHub OAuth Provider Configuration

To enable student sign-in with GitHub:

1. Open a new browser tab and navigate to [GitHub Developer Settings](https://github.com/settings/developers).
2. Under **OAuth Apps**, click **New OAuth App**.
3. Fill in the application details:
   - **Application name:** `AI Career Guidance`
   - **Homepage URL:** `http://localhost:3000` (or your production Vercel domain)
   - **Application description:** `AI-powered career discovery and roadmap mentorship`
4. Return to the Firebase Console:
   - In **Authentication > Sign-in method**, click **Add new provider** > **GitHub**.
   - Toggle **Enable** to ON.
   - Copy the **Authorization callback URL** provided by Firebase (format: `https://<your-project-id>.firebaseapp.com/__/auth/handler`).
5. Return to the GitHub OAuth form:
   - Paste the Firebase callback URL into **Authorization callback URL**.
   - Click **Register application**.
6. On your GitHub application page:
   - Copy the **Client ID**.
   - Click **Generate a new client secret** and copy the **Client Secret**.
7. Return to the Firebase Console:
   - Paste the GitHub **Client ID** and **Client Secret**.
   - Click **Save**.

> **Security Rule:** Never place the GitHub Client Secret in frontend code or client-side `.env.local`. Firebase manages the secret securely on its auth servers.

---

## E. Authorized Domains

Firebase blocks OAuth popups (Google, GitHub) from unauthorized domains with an `auth/unauthorized-domain` error.

1. In Firebase Console, open **Authentication > Settings > Authorized domains**.
2. Verify the following domains are present in the list:
   - `localhost` (Default for local development — do NOT include port numbers like `localhost:3000`)
   - `<your-project-id>.firebaseapp.com`
   - `<your-project-id>.web.app`
   - `<your-vercel-domain>.vercel.app` (Add after deploying to Vercel)
   - `yourcustomdomain.com` (If using a custom domain)

---

## F. Local Environment Variables (`.env.local`)

In your project root, create a file named `.env.local` containing your credentials:

```bash
# Firebase Client SDK Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ai-career-guidance.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ai-career-guidance
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ai-career-guidance.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

> `.env.local` is listed in `.gitignore` and must never be committed to source control.

---

## G. Running the Application Locally

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Run TypeScript typecheck to verify contracts
npx tsc --noEmit

# 3. Start local development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

---

## H. Configuring Environment Variables in Vercel

When deploying to [Vercel](https://vercel.com/):

1. Go to your Vercel Project Dashboard.
2. Navigate to **Settings > Environment Variables**.
3. Add the 6 environment variables:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
4. Select all environments (**Production**, **Preview**, **Development**).
5. Trigger a redeploy.

---

## I. Testing Authentication Workflows

### 1. Email Registration & Verification
- Navigate to `/signup`.
- Complete Steps 1–4.
- In Step 4, click **Complete Registration**.
- Verify that Firebase sends an activation link to your inbox.
- Step 5 opens showing the pending verification state and 45-second resend cooldown.
- Open the email, click the link, and click **Check Verification Status**.
- Confirm redirect to `/dashboard`.

### 2. Login & Protected Routes
- Sign out using the dashboard sidebar.
- Try accessing `http://localhost:3000/dashboard` directly in your browser.
- Verify redirect to `/login?redirect=%2Fdashboard`.
- Sign in with verified credentials and verify instant return to `/dashboard`.

### 3. Password Reset
- On `/login`, click **Forgot Password?**.
- Enter your registered email and submit.
- Check inbox for password reset instructions.

