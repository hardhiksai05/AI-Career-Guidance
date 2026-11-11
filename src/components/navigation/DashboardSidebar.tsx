"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import {
  LayoutDashboard,
  BotMessageSquare,
  UserCircle,
  Sparkles,
  Compass,
  Briefcase,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Career Chatbot", href: "/dashboard/chatbot", icon: BotMessageSquare, badge: "AI" },
  { label: "Student Profile", href: "/dashboard/profile", icon: UserCircle },
  { label: "Career Recommendations", href: "/dashboard/recommendations", icon: Sparkles, badge: "Match" },
  { label: "Learning Roadmaps", href: "/dashboard/roadmaps", icon: Compass },
  { label: "Career Opportunities", href: "/dashboard/opportunities", icon: Briefcase },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface DashboardSidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onCloseMobile?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  collapsed = false,
  onToggleCollapse,
  onCloseMobile,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isConfigured } = useAuth();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      showToast({
        type: "info",
        title: "Signed Out",
        description: "Your session has ended successfully.",
      });
      router.push("/login");
    } catch (err: any) {
      router.push("/login");
    }
  };

  const displayName = user?.displayName || (user?.email ? user.email.split("@")[0] : "Student Scholar");
  const displayEmail = user?.email || "student@university.edu";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "SS";

  return (
    <aside
      className={`h-screen bg-[#080b18] border-r border-white/10 flex flex-col justify-between transition-all duration-300 relative z-30 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Header */}
      <div>
        <div className="p-5 flex items-center justify-between border-b border-white/5 h-16">
          <Logo iconOnly={collapsed} size="sm" />
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Auth Status Badge */}
        {!collapsed && (
          <div className="mx-4 my-3 px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center gap-2 text-[11px] text-purple-300">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shrink-0" />
            <span>{isConfigured ? "Firebase Session Active" : "Student Workspace Active"}</span>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="p-3 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? "bg-accent-purple/20 text-white border border-accent-purple/40 shadow-glow-purple font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive ? "text-accent-cyan" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white/10 text-accent-cyan">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Logout */}
      <div className="p-3 border-t border-white/5 space-y-2">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 border border-transparent hover:border-rose-900/30 transition-all ${
            collapsed ? "justify-center" : ""
          }`}
          title="Sign Out"
        >
          <LogOut className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-rose-400" />
          {!collapsed && <span>Sign Out</span>}
        </button>

        {!collapsed && (
          <Link
            href="/dashboard/profile"
            className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 flex items-center gap-3 transition-colors group block"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-purple to-accent-cyan flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-glow-purple">
              {initials}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate group-hover:text-accent-cyan transition-colors">
                {displayName}
              </p>
              <p className="text-[10px] text-slate-500 truncate">{displayEmail}</p>
            </div>
          </Link>
        )}
      </div>
    </aside>
  );
};
