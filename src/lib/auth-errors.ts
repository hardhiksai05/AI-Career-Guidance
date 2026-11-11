/**
 * Firebase Authentication Error Handler
 * Translates Firebase error codes into clear, friendly student messages.
 */

export interface AuthErrorFeedback {
  title: string;
  message: string;
  isConfigError?: boolean;
}

export function formatAuthError(error: any): AuthErrorFeedback {
  const code = error?.code || "";

  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return {
        title: "Invalid Credentials",
        message: "The email or password you entered does not match our records. Please try again or reset your password.",
      };

    case "auth/user-not-found":
      return {
        title: "Account Not Found",
        message: "No account was found with this email address. Please check your spelling or register a new account.",
      };

    case "auth/email-already-in-use":
      return {
        title: "Email Already Registered",
        message: "An account with this email address already exists. Please sign in instead, or use password reset.",
      };

    case "auth/weak-password":
      return {
        title: "Password Too Weak",
        message: "Your password must be at least 8 characters long and include an uppercase letter and a number.",
      };

    case "auth/invalid-email":
      return {
        title: "Invalid Email Format",
        message: "Please enter a valid academic or professional email address (e.g., student@university.edu).",
      };

    case "auth/too-many-requests":
      return {
        title: "Temporarily Restricted",
        message: "Too many failed attempts from this device. Access is temporarily restricted. Please wait a few minutes before retrying.",
      };

    case "auth/popup-closed-by-user":
      return {
        title: "Sign-In Cancelled",
        message: "The authentication window was closed before signing in. Click the provider button again to complete authentication.",
      };

    case "auth/popup-blocked":
      return {
        title: "Popup Blocked by Browser",
        message: "Your browser blocked the authentication popup window. Please allow popups for this site and try again.",
      };

    case "auth/account-exists-with-different-credential":
      return {
        title: "Account Conflict",
        message: "An account already exists with this email address under a different sign-in method. Please sign in using the provider you used initially (e.g. Email/Password or Google).",
      };

    case "auth/operation-not-allowed":
      return {
        title: "Provider Not Enabled",
        message: "This authentication method is currently disabled in your Firebase Console. Please enable this sign-in provider in Firebase Console > Authentication > Sign-in method.",
        isConfigError: true,
      };

    case "auth/unauthorized-domain":
      return {
        title: "Domain Not Authorized",
        message: "The current domain is not in your Firebase Authorized Domains list. Add 'localhost' in Firebase Console > Authentication > Settings > Authorized domains.",
        isConfigError: true,
      };

    case "auth/network-request-failed":
      return {
        title: "Network Connection Error",
        message: "Could not communicate with Firebase Authentication servers. Please verify your internet connection.",
      };

    case "auth/user-disabled":
      return {
        title: "Account Disabled",
        message: "This account has been disabled. Please contact your campus administrator for assistance.",
      };

    case "auth/requires-recent-login":
      return {
        title: "Re-Authentication Required",
        message: "This sensitive action requires recent authentication. Please sign out and sign in again.",
      };

    default:
      return {
        title: "Authentication Error",
        message: error?.message || "An unexpected authentication error occurred. Please try again.",
      };
  }
}

