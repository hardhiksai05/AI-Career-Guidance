"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/components/ui/Toast";
import {
  Bell,
  Settings,
  Menu,
  User,
  LogOut,
  Sun,
  Moon,
  ChevronDown,
  Check,
} from "lucide-react";

interface DashboardHeaderProps {
  onOpenMobileMenu: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onOpenMobileMenu }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { showToast } = useToast();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowProfileMenu(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const displayName =
    user?.displayName || (user?.email ? user.email.split("@")[0] : "Student Scholar");
  const displayEmail = user?.email || "student@university.edu";
  const initials =
    displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "SS";

  // Friendly page title based on pathname
  const getPageTitle = (path: string): string => {
    if (path === "/dashboard") return "Student Workspace";
    if (path === "/dashboard/chatbot") return "AI Career Mentor";
    if (path === "/dashboard/profile") return "Student Profile";
    if (path === "/dashboard/recommendations") return "Career Recommendations";
    if (path.startsWith("/dashboard/roadmaps/courses")) return "Course Catalogue";
    if (path.startsWith("/dashboard/roadmaps")) return "Learning Roadmaps";
    if (path === "/dashboard/opportunities") return "Career Opportunities";
    if (path === "/dashboard/settings") return "Settings";
    return "Dashboard";
  };

  const handleLogout = async () => {
    setShowProfileMenu(false);
    try {
      await logout();
      showToast({
        type: "info",
        title: "Signed Out",
        description: "Your session has ended successfully.",
      });
      router.push("/login");
    } catch {
      router.push("/login");
    }
  };

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

  return (
    <header className="h-16 bg-[#080b18]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30 w-full shrink-0">
      <div className="w-full max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Area: Mobile Menu Toggle & Context */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-purple/50"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-accent-cyan" />
            <span className="font-semibold text-slate-200 tracking-tight">
              {getPageTitle(pathname)}
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400 text-[11px]">AI Career Guidance</span>
          </div>
        </div>

        {/* Right Area: Notifications, Settings & Interactive Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Notification Bell */}
          <div className="relative" ref={notificationsRef}>
            <button
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors relative focus:outline-none focus:ring-2 focus:ring-accent-purple/50 ${
                showNotifications
                  ? "bg-white/10 border-accent-purple/50 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border-white/10"
              }`}
              aria-label="Notifications"
              aria-expanded={showNotifications}
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-accent-cyan absolute top-2 right-2 animate-pulse" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-2xl bg-[#0e1329]/95 backdrop-blur-2xl border border-white/10 shadow-2xl p-4 z-50 text-left animate-popover">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Notifications
                  </span>
                  <span className="text-[10px] text-accent-cyan font-medium">3 New</span>
                </div>
                <div className="space-y-2">
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
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-purple/50"
            title="Workspace Settings"
            aria-label="Workspace Settings"
          >
            <Settings className="w-4 h-4" />
          </Link>

          {/* Interactive Student Profile Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              aria-expanded={showProfileMenu}
              aria-haspopup="menu"
              className={`h-9 px-2 sm:px-2.5 rounded-xl flex items-center gap-2 border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-purple/50 ${
                showProfileMenu
                  ? "bg-white/10 border-accent-purple/50 text-white shadow-glow-purple"
                  : "bg-white/[0.03] hover:bg-white/[0.07] border-white/10 text-slate-200 hover:text-white"
              }`}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-tr from-accent-purple to-accent-cyan flex items-center justify-center font-bold text-white text-[10px] sm:text-[11px] shadow-glow-purple shrink-0">
                {initials}
              </div>
              <div className="hidden md:block text-left leading-none">
                <span className="block text-xs font-semibold text-white truncate max-w-[120px]">
                  {displayName}
                </span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Student Scholar</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  showProfileMenu ? "rotate-180 text-white" : ""
                }`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div
                role="menu"
                aria-orientation="vertical"
                className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] rounded-2xl bg-[#0e1329]/95 backdrop-blur-2xl border border-white/10 shadow-2xl p-2.5 z-50 text-left animate-popover"
              >
                {/* Dropdown Header: Authenticated Student Details */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 mb-1.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-purple to-accent-cyan flex items-center justify-center font-bold text-white text-sm shadow-glow-purple shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-white truncate">{displayName}</p>
                      <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent-purple/20 text-accent-purple-light border border-accent-purple/30 shrink-0">
                        Scholar
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{displayEmail}</p>
                    <p className="text-[10px] text-accent-cyan font-medium mt-0.5">Role: Student Scholar</p>
                  </div>
                </div>

                <div className="h-px bg-white/5 my-1" />

                {/* Option 1: Student Profile */}
                <Link
                  href="/dashboard/profile"
                  role="menuitem"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-accent-purple-light group-hover:scale-105 transition-transform shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                      Student Profile
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">View and manage coursework & CV</p>
                  </div>
                </Link>

                {/* Option 2: Settings */}
                <Link
                  href="/dashboard/settings"
                  role="menuitem"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-accent-cyan group-hover:scale-105 transition-transform shrink-0">
                    <Settings className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                      Settings
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">Preferences & notification controls</p>
                  </div>
                </Link>

                <div className="h-px bg-white/5 my-1" />

                {/* Option 3: Appearance (Theme Switching) */}
                <div className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 my-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs font-semibold text-slate-200">Appearance</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase text-accent-cyan">
                      {theme === "dark" ? "Dark Active" : "Light Active"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 bg-black/20 p-1 rounded-xl border border-white/5">
                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                        theme === "dark"
                          ? "bg-accent-purple text-white shadow-md shadow-purple-500/25 font-semibold"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                      }`}
                    >
                      <Moon className="w-3 h-3" />
                      <span>Dark</span>
                      {theme === "dark" && <Check className="w-3 h-3 ml-0.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                        theme === "light"
                          ? "bg-accent-cyan text-slate-900 shadow-md shadow-cyan-500/25 font-semibold"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                      }`}
                    >
                      <Sun className="w-3 h-3" />
                      <span>Light</span>
                      {theme === "light" && <Check className="w-3 h-3 ml-0.5" />}
                    </button>
                  </div>
                </div>

                <div className="h-px bg-white/5 my-1" />

                {/* Option 4: Log Out */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors group text-left cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform shrink-0">
                    <LogOut className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-rose-400 group-hover:text-rose-300 transition-colors">
                      Log Out
                    </p>
                    <p className="text-[10px] text-slate-500">Sign out of Firebase session</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
