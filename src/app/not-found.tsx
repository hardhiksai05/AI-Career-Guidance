import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070913] text-slate-100 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
        <Compass className="w-8 h-8 animate-pulse" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-black mb-3 text-white">404 — Path Not Found</h1>
      <p className="text-slate-400 max-w-md mb-8 text-sm sm:text-base">
        The destination you are looking for does not exist or has been shifted in your career galaxy.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-colors shadow-lg shadow-purple-500/25"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Orbit
      </Link>
    </div>
  );
}

