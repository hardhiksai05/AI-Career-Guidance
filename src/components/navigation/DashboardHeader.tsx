"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Bell,
  Settings,
  Menu,
  Sparkles,
  CheckCircle,
  ExternalLink,
  X,
} from "lucide-react";

interface DashboardHeaderProps {
  onOpenMobileMenu: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onOpenMobileMenu }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const displayName = user?.displayName || (user?.email ? user.email.split("@")[0] : "Student Scholar");
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "SS";

  const notifications = [
    {
      id: "notif-1",
      title: "New AI Engineering Roadmap Ready",
      time: "10 mins ago",
      href: "/dashboard/roadmaps",
      read: false,
    },
    {
      id: "notif-2",
      title: "Anthropic Labs Fellowship Deadline in 25 Days",
      time: "2 hours ago",
      href: "/dashboard/opportunities",
      read: false,
    },
    {
      id: "notif-3",
      title: "Profile analysis completed at 94% compatibility",
      time: "Yesterday",
      href: "/dashboard/recommendations",
      read: true,
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/dashboard/roadmaps`);
  };

  return (
    <header className="h-16 bg-[#080b18]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left Area: Mobile menu & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/10"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-sm hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search careers, roadmaps, skills..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accent-purple focus:bg-white/[0.06] transition-all"
          />
        </form>
      </div>

      {/* Right Area: Actions & Avatar */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-accent-cyan absolute top-1.5 right-1.5 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0e1329] border border-white/10 shadow-2xl p-4 z-50 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Notifications
                </span>
                <span className="text-[10px] text-accent-cyan font-medium">3 New</span>
              </div>
              <div className="space-y-2.5">
                {notifications.map((n) => (
                  <Link
                    key={n.id}
                    href={n.href}
                    onClick={() => setShowNotifications(false)}
                    className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-colors block text-xs"
                  >
                    <p className="font-semibold text-slate-200">{n.title}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{n.time}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings Shortcut */}
        <Link
          href="/dashboard/settings"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
          title="Workspace Settings"
        >
          <Settings className="w-4 h-4" />
        </Link>

        {/* User Avatar */}
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2.5 pl-2 border-l border-white/10 group"
          title="View Student Profile"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-accent-purple to-accent-cyan flex items-center justify-center font-bold text-white text-xs shadow-glow-purple group-hover:scale-105 transition-transform">
            {initials}
          </div>
          <div className="hidden md:block text-left">
            <span className="block text-xs font-semibold text-white group-hover:text-accent-cyan transition-colors truncate max-w-[120px]">
              {displayName}
            </span>
            <span className="block text-[10px] text-slate-400">Student Scholar</span>
          </div>
        </Link>
      </div>
    </header>
  );
};
