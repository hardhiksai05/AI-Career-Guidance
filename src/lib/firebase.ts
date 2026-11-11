import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  Auth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

/**
 * Validates whether real Firebase credentials are provided in the environment.
 */
export const isFirebaseConfigured = (): boolean => {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  return Boolean(
    key &&
    projectId &&
    !key.includes("Dummy") &&
    !key.includes("your_firebase_api_key") &&
    key !== "AIzaSyDemoDummyKeyForFrontendPreview"
  );
};

// Safe Firebase App Initialization (Prevents duplicate instances during hot reloads)
let app: FirebaseApp;
let auth: Auth;

try {
  if (getApps().length > 0) {
    app = getApp();
  } else {
    app = initializeApp(firebaseConfig);
  }
  auth = getAuth(app);
} catch (error) {
  if (typeof window !== "undefined") {
    console.warn("Firebase initialization alert:", error);
  }
  // Safe empty shell to prevent build-time crashes if keys are not yet provided
  app = {} as FirebaseApp;
  auth = {} as Auth;
}

// Pre-configured OAuth Identity Providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const githubProvider = new GithubAuthProvider();
githubProvider.addScope("read:user");
githubProvider.addScope("user:email");

export { app, auth };
