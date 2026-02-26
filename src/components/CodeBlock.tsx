import { useEffect, useState } from 'react';
import { createHighlighter, Highlighter } from 'shiki';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Check, Copy } from 'lucide-react';
// import clsx from 'clsx';

// Singleton highlighter instance to avoid reloading languages
let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighterInstance() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark', 'tokyo-night'],
      langs: ['python', 'typescript', 'bash', 'cpp', 'rust', 'json'],
    });
  }
  return highlighterPromise;
}

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [html, setHtml] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    getHighlighterInstance().then((highlighter) => {
      if (mounted) {
        try {
          const out = highlighter.codeToHtml(code, {
            lang: language,
            theme: 'github-dark', // Dark theme matching zinc-900
          });
          setHtml(out);
        } catch (e) {
          // Fallback if language not found
          setHtml(`<pre class="bg-zinc-950 p-4 rounded overflow-auto"><code>${code}</code></pre>`);
        }
      }
    });

    return () => { mounted = false; };
  }, [code, language]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!html) {
    return (
      <div className="animate-pulse bg-zinc-800 h-24 rounded-lg my-4 border border-zinc-700"></div>
    );
  }

  return (
    <div className="relative group my-6 rounded-lg overflow-hidden border border-zinc-700 bg-[#0d1117]">
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-300 transition-colors cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
        </button>
      </div>
        <div 
          // dangerouslySetInnerHTML={{ __html: html }} 
          className="text-sm [&>pre]:bg-transparent! [&>pre]:p-4! [&>pre]:overflow-auto [&_code]:font-mono"
        >
        <ReactMarkdown
          // rehype-raw is required to render the HTML string Shiki produces
          rehypePlugins={[rehypeRaw]}
        >
          {/* Passing the Shiki output directly inside the markdown string */}
          {html}
        </ReactMarkdown>
      </div>
    </div>
  );
}
