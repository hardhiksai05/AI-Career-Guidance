"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Copy, Check, Terminal } from "lucide-react";
import { MermaidDiagram } from "./MermaidDiagram";

interface MarkdownRendererProps {
  content: string;
  isStreaming?: boolean;
}

const MarkdownRendererComponent: React.FC<MarkdownRendererProps> = ({ content, isStreaming = false }) => {
  return (
    <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-slate-200 select-text">
      <ReactMarkdown
        skipHtml={true}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-lg sm:text-xl font-extrabold text-white mt-5 mb-2.5 pb-1 border-b border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-accent-purple" />
              <span>{children}</span>
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base sm:text-lg font-bold text-white mt-4 mb-2 flex items-center gap-2">
              <span className="w-1 h-3.5 rounded-full bg-accent-cyan" />
              <span>{children}</span>
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm sm:text-base font-semibold text-purple-200 mt-3 mb-1">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs sm:text-sm font-semibold text-slate-300 mt-2.5 mb-1">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-3 last:mb-0 leading-relaxed text-slate-200">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-4 space-y-1.5 mb-3 text-slate-200">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-4 space-y-1.5 mb-3 text-slate-200">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-3 pl-3.5 border-l-2 border-accent-purple/70 italic text-slate-300 bg-white/[0.02] py-1.5 rounded-r-lg">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-4 border-white/10" />,
          table: ({ children }) => (
            <div className="my-3.5 overflow-x-auto rounded-xl border border-white/10 bg-[#070915]">
              <table className="w-full text-left text-xs border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#121832] text-slate-200 font-bold border-b border-white/10">
              {children}
            </thead>
          ),
          th: ({ children }) => <th className="p-2.5 font-bold">{children}</th>,
          td: ({ children }) => (
            <td className="p-2.5 border-b border-white/5 last:border-b-0">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan hover:underline font-medium inline-flex items-center gap-0.5"
            >
              {children}
            </a>
          ),
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const rawCode = String(children).replace(/\n$/, "");

            // 1. Check for Mermaid diagrams
            if (language === "mermaid") {
              return <MermaidDiagram code={rawCode} isStreaming={isStreaming} />;
            }

            // 2. Inline code
            if (inline || !match) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded-md bg-white/10 text-purple-300 font-mono text-[11px] sm:text-xs border border-white/5"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            // 3. Syntax-highlighted code block with Copy button
            return <CodeBlock language={language} code={rawCode} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export const MarkdownRenderer = React.memo<MarkdownRendererProps>(
  MarkdownRendererComponent,
  (prev, next) => prev.content === next.content && prev.isStreaming === next.isStreaming
);

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="my-3.5 rounded-2xl bg-[#070a18] border border-white/10 overflow-hidden shadow-xl text-left">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/5 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5 font-mono text-purple-300">
          <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
          <span className="uppercase font-semibold tracking-wider text-[10px]">
            {language || "code"}
          </span>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 hover:text-white transition-all text-[11px]"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-3.5 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed bg-[#050711]">
        <pre className="m-0 p-0 whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
