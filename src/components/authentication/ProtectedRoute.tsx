"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PremiumLoadingScreen } from "@/components/ui/PremiumLoadingScreen";

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

  // Premium Loading Screen while Firebase evaluates session
  if (loading) {
    return <PremiumLoadingScreen preset="auth" fullScreen={true} />;
  }

  // If not authenticated or not verified, return loading screen while redirect happens
  if (!isAuthenticated || !isEmailVerified) {
    return <PremiumLoadingScreen preset="auth" fullScreen={true} />;
  }

  // Authenticated & verified user -> Render protected dashboard content
  return <>{children}</>;
};

