"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";

// In-memory module-level cache for rendered Mermaid diagrams
// Key: stable hash of cleaned diagram code; Value: rendered SVG HTML
const svgCache = new Map<string, string>();

let mermaidInstancePromise: Promise<any> | null = null;

async function getMermaidInstance() {
  if (!mermaidInstancePromise) {
    mermaidInstancePromise = (async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        securityLevel: "strict",
        themeVariables: {
          darkMode: true,
          background: "#0c1026",
          primaryColor: "#8b5cf6",
          primaryTextColor: "#f8fafc",
          primaryBorderColor: "#7c3aed",
          lineColor: "#38bdf8",
          secondaryColor: "#06b6d4",
          tertiaryColor: "#1e293b",
        },
        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
      });
      return mermaid;
    })();
  }
  return mermaidInstancePromise;
}

function hashDiagramCode(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash |= 0;
  }
  return `m_${Math.abs(hash).toString(36)}`;
}

interface MermaidDiagramProps {
  code: string;
  isStreaming?: boolean;
}

const MermaidDiagramComponent: React.FC<MermaidDiagramProps> = ({ code, isStreaming = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanCode = useMemo(() => code.trim(), [code]);
  const cacheKey = useMemo(() => hashDiagramCode(cleanCode), [cleanCode]);

  // Synchronously initialize from cache if available
  const [svgHtml, setSvgHtml] = useState<string>(() => svgCache.get(cacheKey) || "");
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isRendering, setIsRendering] = useState<boolean>(!svgCache.has(cacheKey));

  useEffect(() => {
    let isMounted = true;

    if (!cleanCode) {
      setSvgHtml("");
      setError(null);
      setIsRendering(false);
      return;
    }

    // 1. If already cached, reuse immediately without re-rendering
    if (svgCache.has(cacheKey)) {
      setSvgHtml(svgCache.get(cacheKey)!);
      setError(null);
      setIsRendering(false);
      return;
    }

    // 2. If currently streaming and not cached, defer rendering to avoid token-by-token reloads
    if (isStreaming) {
      setIsRendering(true);
      return;
    }

    // 3. Render once the diagram code block is complete
    async function renderDiagram() {
      try {
        setIsRendering(true);
        setError(null);

        const mermaid = await getMermaidInstance();

        // Validate diagram syntax
        const isValid = await mermaid.parse(cleanCode).catch(() => false);
        if (!isValid) {
          if (isMounted) {
            setError("Diagram syntax is updating or contains an unsupported structure.");
            setIsRendering(false);
          }
          return;
        }

        // Render with unique deterministic ID derived from cacheKey
        const renderId = `mermaid-svg-${cacheKey}`;
        const { svg } = await mermaid.render(renderId, cleanCode);

        // Store in module cache
        svgCache.set(cacheKey, svg);

        if (isMounted) {
          setSvgHtml(svg);
          setError(null);
          setIsRendering(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || "Failed to render Mermaid diagram");
          setIsRendering(false);
        }
      }
    }

    const timer = setTimeout(renderDiagram, 100);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [cleanCode, cacheKey, isStreaming]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {}
  };

  // Loading Placeholder during active token streaming
  if (isStreaming && !svgHtml) {
    return (
      <div className="my-4 p-5 rounded-2xl bg-[#080d22]/80 border border-purple-500/20 flex items-center justify-center gap-3 text-xs text-purple-300 shadow-md">
        <div className="w-4 h-4 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin" />
        <span>Generating interactive flowchart...</span>
      </div>
    );
  }

  return (
    <div className="my-4 rounded-2xl bg-[#070a18] border border-purple-500/20 overflow-hidden shadow-lg select-text">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.03] border-b border-white/5 text-[11px] text-slate-400">
        <span className="font-semibold text-purple-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent-cyan" />
          <span>Interactive Diagram</span>
        </span>
        <button
          onClick={handleCopyCode}
          className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded-lg hover:bg-white/5 transition-colors"
          title="Copy diagram source"
        >
          {isCopied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy Source</span>
            </>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 flex items-center justify-center overflow-x-auto min-h-[120px]">
        {error ? (
          <div className="space-y-2 w-full text-left">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Diagram Rendering Preview</span>
            </div>
            <pre className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
              {cleanCode}
            </pre>
          </div>
        ) : svgHtml ? (
          <div
            ref={containerRef}
            className="w-full flex justify-center [&>svg]:max-w-full [&>svg]:h-auto"
            dangerouslySetInnerHTML={{ __html: svgHtml }}
          />
        ) : isRendering ? (
          <div className="flex items-center gap-2 text-xs text-slate-400 py-4">
            <div className="w-4 h-4 border-2 border-accent-purple border-t-transparent rounded-full animate-spin" />
            <span>Rendering diagram...</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const MermaidDiagram = React.memo(
  MermaidDiagramComponent,
  (prev, next) => prev.code.trim() === next.code.trim() && prev.isStreaming === next.isStreaming
);

export default MermaidDiagram;
