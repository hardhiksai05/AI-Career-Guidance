"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/ui/Logo";
import { ShieldCheck, Sparkles, Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, isAuthenticated, isEmailVerified } = useAuth();

  useEffect(() => {
    if (loading) return;

    // 1. Not authenticated -> Redirect to /login with return destination
    if (!isAuthenticated) {
      const returnUrl = encodeURIComponent(pathname || "/dashboard");
      router.replace(`/login?redirect=${returnUrl}`);
      return;
    }

    // 2. Authenticated but email not yet verified -> Redirect to /verify-email
    if (!isEmailVerified) {
      const returnUrl = encodeURIComponent(pathname || "/dashboard");
      router.replace(`/verify-email?redirect=${returnUrl}`);
      return;
    }
  }, [loading, isAuthenticated, isEmailVerified, pathname, router]);

  // Loading Screen while Firebase evaluates session
  if (loading) {
    return (
      <div className="min-h-screen bg-[#070913] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent-purple/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent-cyan/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-4 max-w-sm">
          <Logo size="lg" />
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-accent-cyan bg-cyan-950/40 border border-cyan-800/40 px-3.5 py-1.5 rounded-full">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Verifying Firebase Authentication...</span>
          </div>
          <p className="text-xs text-slate-400">
            Securing student workspace session and decrypting credentials.
          </p>
        </div>
      </div>
    );
  }

  // If not authenticated or not verified, return loading screen while redirect happens
  if (!isAuthenticated || !isEmailVerified) {
    return (
      <div className="min-h-screen bg-[#070913] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-accent-purple animate-spin" />
      </div>
    );
  }

  // Authenticated & verified user -> Render protected dashboard content
  return <>{children}</>;
};

