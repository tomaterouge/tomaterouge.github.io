import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { CodeBlock } from './CodeBlock';

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <CodeBlock 
              code={String(children).replace(/\n$/, '')} 
              language={match[1]} 
            />
          ) : (
            <code {...rest} className="bg-zinc-800 text-zinc-200 px-1.5 py-0.5 rounded text-sm font-mono border border-zinc-700">
              {children}
            </code>
          );
        },
        h1: ({children}) => <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>,
        h2: ({children}) => <h2 id={String(children).toLowerCase().replace(/\s+/g, '-')} className="text-2xl font-semibold text-white mt-8 mb-4 border-b border-zinc-700 pb-2 scroll-mt-24">{children}</h2>,
        h3: ({children}) => <h3 id={String(children).toLowerCase().replace(/\s+/g, '-')} className="text-xl font-semibold text-zinc-100 mt-6 mb-3 scroll-mt-24">{children}</h3>,
        p: ({children}) => <p className="leading-7 text-zinc-300 mb-4">{children}</p>,
        ul: ({children}) => <ul className="list-disc list-inside mb-4 text-zinc-300 space-y-1">{children}</ul>,
        ol: ({children}) => <ol className="list-decimal list-inside mb-4 text-zinc-300 space-y-1">{children}</ol>,
        blockquote: ({children}) => <blockquote className="border-l-4 border-teal-500 pl-4 italic my-4 text-zinc-400">{children}</blockquote>,
        a: ({children, href}) => <a href={href} className="text-teal-400 hover:text-teal-300 hover:underline transition-colors">{children}</a>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
