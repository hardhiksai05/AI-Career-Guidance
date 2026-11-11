"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X, Sparkles } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastOptions {
  id?: string;
  title: string;
  description?: string;
  quote?: string;
  type?: ToastType;
  duration?: number; // ms, default 4000
}

interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ duration = 4000, ...options }: ToastOptions) => {
      const id = options.id || `toast-${Date.now()}-${Math.random()}`;
      const newToast: ToastItem = { ...options, id, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast Render Portal */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-md w-full px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`pointer-events-auto rounded-2xl p-4 sm:p-5 backdrop-blur-2xl border shadow-2xl relative overflow-hidden ${
                toast.type === "error"
                  ? "bg-[#180d19]/95 border-rose-500/40 shadow-rose-950/40 text-rose-100"
                  : toast.type === "warning"
                  ? "bg-[#1c140d]/95 border-amber-500/40 shadow-amber-950/40 text-amber-100"
                  : "bg-[#0f142e]/95 border-purple-500/40 shadow-glow-purple text-slate-100"
              }`}
            >
              {/* Purple/Cyan gradient accent glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-purple via-accent-cyan to-indigo-500" />

              <div className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    toast.type === "error"
                      ? "bg-rose-950/80 border-rose-700/50 text-rose-400"
                      : toast.type === "warning"
                      ? "bg-amber-950/80 border-amber-700/50 text-amber-400"
                      : "bg-purple-950/80 border-purple-700/50 text-accent-cyan shadow-glow-cyan"
                  }`}
                >
                  {toast.type === "error" ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : toast.type === "warning" ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : toast.quote ? (
                    <Sparkles className="w-5 h-5 text-accent-cyan" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="text-sm font-bold text-white tracking-tight">{toast.title}</h4>

                  {toast.description && (
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.description}</p>
                  )}

                  {toast.quote && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
                      <p className="text-xs text-purple-200 italic font-medium leading-relaxed">
                        &ldquo;{toast.quote}&rdquo;
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

