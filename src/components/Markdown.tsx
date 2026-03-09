import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm  from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import { CodeBlock } from './CodeBlock';
import { Mermaid } from './Mermaid';

interface MarkdownProps {
  content: string;
}

// Helper to generate IDs from children (which might be mixed text/nodes)
export const generateId = (children: React.ReactNode) => {
  // Convert React children to a simple string
  const text = Array.isArray(children) 
    ? children.map(child => (typeof child === 'string' ? child : '')).join('') 
    : typeof children === 'string' ? children : String(children);
    
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Strip special chars (like math symbols)
    .replace(/\s+/g, '-');
};

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';

          if (language === 'mermaid') {

            return (
            <div className='h-min-64 mb-8'>
              <Mermaid chart={String(children).replace(/\n$/, '')} /> 
            </div>
            );
          }

          return match ? (
            <CodeBlock 
              code={String(children).replace(/\n$/, '')} 
              language={language} 
            />
          ) : (
            <code {...rest} className="bg-zinc-800 text-zinc-50 px-1.5 py-0.5 rounded text-sm font-mono border border-zinc-700">
              {children}
            </code>
          );
        },
        h1: ({children}) => <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>,
        // Apply the safe ID generation to H2 and H3
        h2: ({children}) => <h2 id={generateId(children)} className="text-2xl font-semibold text-white mt-8 mb-4 border-b border-zinc-700 pb-2 scroll-mt-24">{children}</h2>,
        h3: ({children}) => <h3 id={generateId(children)} className="text-xl font-semibold text-white mt-6 mb-3 scroll-mt-24">{children}</h3>,
        p: ({children}) => <p className="leading-7 text-white mb-4">{children}</p>,
        ul: ({children}) => <ul className="list-disc list-inside mb-4 text-zinc-50 space-y-1">{children}</ul>,
        ol: ({children}) => <ol className="list-decimal list-inside mb-4 text-zinc-50 space-y-1">{children}</ol>,
        blockquote: ({children}) => <blockquote className="border-l-4 border-teal-500 pl-4 italic my-4 text-zinc-100">{children}</blockquote>,
        a: ({children, href}) => <a href={href} className="text-teal-400 hover:text-teal-300 hover:underline transition-colors">{children}</a>,
        // --- Table Formatting ---
        table: ({children}) => (
          <div className="overflow-x-auto my-8 border border-zinc-700 rounded-lg">
            <table className="w-full text-left border-collapse text-sm">
              {children}
            </table>
          </div>
        ),
        thead: ({children}) => <thead className="bg-zinc-800/80 text-zinc-50 border-b border-zinc-600">{children}</thead>,
        tbody: ({children}) => <tbody className="divide-y divide-zinc-600/50 bg-zinc-900/30">{children}</tbody>,
        tr: ({children}) => <tr className="hover:bg-zinc-800/40 transition-colors">{children}</tr>,
        th: ({children}) => <th className="px-4 py-3 font-semibold whitespace-nowrap">{children}</th>,
        td: ({children}) => <td className="px-4 py-3 text-zinc-50 align-top">{children}</td>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}