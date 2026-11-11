import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import { APP_CONFIG } from "@/lib/constants";
import { ToastProvider } from "@/components/ui/Toast";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: `${APP_CONFIG.name} — ${APP_CONFIG.tagline}`,
  description: APP_CONFIG.heroDescription,
  keywords: [
    "AI Career Guidance",
    "Career Mentorship",
    "Student Roadmaps",
    "Artificial Intelligence",
    "Resume Analysis",
    "Tech Careers",
    "Skill Gap Analysis",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning style={{ backgroundColor: "#070913", colorScheme: "dark" }}>
      <body
        className="bg-background text-slate-100 min-h-screen flex flex-col antialiased selection:bg-purple-500/30 selection:text-white"
        suppressHydrationWarning
        style={{ backgroundColor: "#070913", color: "#f8fafc" }}
      >
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
