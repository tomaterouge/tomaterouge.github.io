import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import { generateId } from './Markdown';

interface TOCProps {
  content: string;
}

export function TableOfContents({ content }: TOCProps) {
  // Extract h2 and h3 headings from raw markdown
  const headings = content.match(/^(#{2,3})\s+(.*)$/gm);

  if (!headings) return null;

  return (
    <nav className="sticky top-24 hidden lg:block w-64 pl-4 border-l border-zinc-700/50 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h4 className="font-semibold text-zinc-50 mb-4 text-sm uppercase tracking-wider">
        On this page
      </h4>
      <ul className="space-y-2 text-sm">
        {headings.map((heading, idx) => {
          // Determine level (h2 vs h3)
          const level = heading.startsWith('###') ? 3 : 2;
          
          // Remove the '## ' or '### ' prefix to get the raw text (e.g., "The $O(N)$ Algorithm")
          const text = heading.replace(/^#{2,3}\s+/, '');
          
          // Create an ID: simplify text to lowercase, replace spaces with dashes
          // Note: This must match the ID generation logic in your Markdown.tsx renderer
          // const id = text
          //   .toLowerCase()
          //   .replace(/[^\w\s-]/g, '') // Remove special chars (like $ for math) to keep IDs clean
          //   .replace(/\s+/g, '-');
          const id = generateId(text);

          return (
            <li key={idx} className={level === 3 ? 'pl-4' : ''}>
              <a 
                href={`#${id}`} 
                className="text-zinc-200 hover:text-teal-400 transition-colors block leading-relaxed truncate"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {/* Render the text as Markdown so Math/Bold works */}
                <ReactMarkdown
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeKatex]}
                  // disallowedElements removes <p> tags which are invalid inside <a>
                  disallowedElements={['p']}
                  unwrapDisallowed={true}
                >
                  {text}
                </ReactMarkdown>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}