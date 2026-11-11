import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import { APP_CONFIG } from "@/lib/constants";
import { ToastProvider } from "@/components/ui/Toast";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('app_theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');document.documentElement.style.colorScheme='light';}else{document.documentElement.classList.remove('light');document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className="bg-background text-slate-100 min-h-screen flex flex-col antialiased selection:bg-purple-500/30 selection:text-white"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>{children}</AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
