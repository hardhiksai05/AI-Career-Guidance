"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "@/components/navigation/DashboardSidebar";
import { DashboardHeader } from "@/components/navigation/DashboardHeader";
import { ProtectedRoute } from "@/components/authentication/ProtectedRoute";
import { AnimatePresence, motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isChatbot = pathname === "/dashboard/chatbot";

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#070913] text-slate-100 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <DashboardSidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
          />
        </div>

        {/* Mobile Drawer Sidebar */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-72 max-w-[85vw] h-full"
              >
                <DashboardSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col min-w-0 h-screen ${
            isChatbot ? "overflow-hidden" : "overflow-y-auto"
          }`}
        >
          <DashboardHeader onOpenMobileMenu={() => setMobileSidebarOpen(true)} />
          <main
            className={`flex-1 w-full mx-auto ${
              isChatbot
                ? "p-2 sm:p-3 md:p-4 h-[calc(100vh-64px)] flex flex-col min-h-0 overflow-hidden max-w-7xl"
                : "p-4 sm:p-6 lg:p-8 max-w-7xl space-y-8"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
