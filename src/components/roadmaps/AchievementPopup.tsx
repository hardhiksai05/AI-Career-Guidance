"use client";

import React, { useEffect } from "react";
import { Crown, Sparkles, Zap, Award, Flame, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AchievementPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  xpEarned: number;
  nextLevelName?: string;
}

export const AchievementPopup: React.FC<AchievementPopupProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  xpEarned,
  nextLevelName,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="pointer-events-auto max-w-md w-full rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#1b1542] via-[#0f112e] to-[#080918] border-2 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.4)] text-center relative overflow-hidden"
        >
          {/* Ambient golden burst glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-yellow-400/20 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-10 right-10 w-40 h-40 bg-pink-500/15 blur-[60px] pointer-events-none" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Golden Crown Crest */}
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-0.5 shadow-[0_0_30px_#facc15] mb-4 flex items-center justify-center animate-bounce">
            <div className="w-full h-full rounded-3xl bg-[#0d1226] flex items-center justify-center">
              <Crown className="w-8 h-8 text-amber-400 fill-amber-400" />
            </div>
          </div>

          {/* Level Up Banner Text */}
          <span className="text-xs font-mono font-black tracking-widest uppercase text-amber-300 bg-amber-950/60 border border-amber-500/50 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-pink-400" /> MISSION CLEARED • LEVEL UP!
          </span>

          <h3 className="text-2xl font-black text-white tracking-tight mt-1">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-xs mx-auto">
            {subtitle}
          </p>

          {/* XP Boost Crest */}
          <div className="my-5 p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center gap-3">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
            <span className="text-lg font-black font-mono text-amber-300">
              +{xpEarned} XP GAINED
            </span>
          </div>

          {nextLevelName && (
            <div className="text-[11px] font-mono text-accent-cyan flex items-center justify-center gap-1.5">
              <span>Next Quest Unlocked:</span>
              <strong className="text-white">{nextLevelName}</strong>
            </div>
          )}

          <div className="pt-4 mt-2 border-t border-white/10 flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Claim & Continue Quest
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

