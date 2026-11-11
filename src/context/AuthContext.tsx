"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  reload,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth, googleProvider, githubProvider, isFirebaseConfigured } from "@/lib/firebase";
import { ensureSupabaseRoleClaim } from "@/lib/claim-provisioner";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  isConfigured: boolean;
  signUp: (email: string, pass: string, displayName?: string) => Promise<User>;
  signIn: (email: string, pass: string, rememberMe?: boolean) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  signInWithGitHub: () => Promise<User>;
  signOutUser: () => Promise<void>;
  sendVerification: () => Promise<void>;
  resendVerification: () => Promise<void>;
  refreshUser: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<void>;
  // Backward compatibility alias for existing code
  logout: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, displayName?: string) => Promise<User | null>;
  sendPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isConfigured = isFirebaseConfigured();

  // Monitor real-time Firebase Authentication state
  useEffect(() => {
    if (!auth || typeof auth.onAuthStateChanged !== "function") {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
        if (firebaseUser) {
          // Provision Supabase authenticated role claim in background
          ensureSupabaseRoleClaim(firebaseUser).catch((e) =>
            console.warn("Claim provisioning warning:", e)
          );
        }
      },
      (error) => {
        console.error("Firebase auth state listener error:", error);
        setUser(null);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  /**
   * Register with Email and Password
   * Automatically updates display name and dispatches real email verification.
   */
  const signUp = async (email: string, pass: string, displayName?: string): Promise<User> => {
    if (!auth || !auth.app?.name) {
      throw new Error(
        "Firebase Authentication is not configured. Please supply NEXT_PUBLIC_FIREBASE_* environment variables in .env.local."
      );
    }

    const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    const createdUser = cred.user;

    // Update display name if provided
    if (displayName && displayName.trim()) {
      try {
        await updateProfile(createdUser, { displayName: displayName.trim() });
      } catch (profileErr) {
        console.warn("Could not set initial display name:", profileErr);
      }
    }

    // Send real verification email via Firebase
    try {
      await sendEmailVerification(createdUser);
    } catch (verifErr) {
      console.warn("sendEmailVerification alert:", verifErr);
    }

    setUser(createdUser);
    return createdUser;
  };

  /**
   * Sign In with Email and Password
   * Supports session vs local persistence based on rememberMe preference.
   */
  const signIn = async (email: string, pass: string, rememberMe = true): Promise<User> => {
    if (!auth || !auth.app?.name) {
      throw new Error(
        "Firebase Authentication is not configured. Please supply NEXT_PUBLIC_FIREBASE_* environment variables in .env.local."
      );
    }

    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
    } catch {
      // Persistence setting fallback if browser restricts storage
    }

    const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
    setUser(cred.user);
    return cred.user;
  };

  /**
   * Google Sign-In with popup
   */
  const signInWithGoogle = async (): Promise<User> => {
    if (!auth || !auth.app?.name) {
      throw new Error(
        "Firebase Authentication is not configured. Please supply NEXT_PUBLIC_FIREBASE_* environment variables in .env.local."
      );
    }

    const cred = await signInWithPopup(auth, googleProvider);
    setUser(cred.user);
    return cred.user;
  };

  /**
   * GitHub OAuth Sign-In with popup
   */
  const signInWithGitHub = async (): Promise<User> => {
    if (!auth || !auth.app?.name) {
      throw new Error(
        "Firebase Authentication is not configured. Please supply NEXT_PUBLIC_FIREBASE_* environment variables in .env.local."
      );
    }

    const cred = await signInWithPopup(auth, githubProvider);
    setUser(cred.user);
    return cred.user;
  };

  /**
   * Sign Out current user from Firebase
   */
  const signOutUser = async (): Promise<void> => {
    if (auth && typeof auth.signOut === "function") {
      await signOut(auth);
    }
    setUser(null);
  };

  /**
   * Send or resend Firebase email verification to the active user
   */
  const sendVerification = async (): Promise<void> => {
    if (!auth.currentUser) {
      throw new Error("No active authenticated user to receive verification email.");
    }
    await sendEmailVerification(auth.currentUser);
  };

  const resendVerification = async (): Promise<void> => {
    return sendVerification();
  };

  /**
   * Reload current Firebase user to verify updated emailVerified status
   */
  const refreshUser = useCallback(async (): Promise<boolean> => {
    if (!auth.currentUser) return false;
    await reload(auth.currentUser);
    const updated = auth.currentUser;
    setUser(updated);
    return Boolean(updated?.emailVerified);
  }, []);

  /**
   * Send Password Reset Email
   */
  const resetPassword = async (email: string): Promise<void> => {
    if (!auth || !auth.app?.name) {
      throw new Error(
        "Firebase Authentication is not configured. Please supply NEXT_PUBLIC_FIREBASE_* environment variables in .env.local."
      );
    }
    await sendPasswordResetEmail(auth, email.trim());
  };

  // Backward-compatible adapters
  const logout = signOutUser;
  const signInWithEmail = async (email: string, pass: string) => {
    await signIn(email, pass);
  };
  const signUpWithEmail = async (email: string, pass: string, displayName?: string) => {
    return await signUp(email, pass, displayName);
  };
  const sendPasswordReset = resetPassword;

  const isAuthenticated = Boolean(user);
  const isEmailVerified = Boolean(user?.emailVerified);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isEmailVerified,
        isConfigured,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithGitHub,
        signOutUser,
        sendVerification,
        resendVerification,
        refreshUser,
        resetPassword,
        logout,
        signInWithEmail,
        signUpWithEmail,
        sendPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
