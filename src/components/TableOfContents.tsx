interface TOCProps {
  content: string;
}

export function TableOfContents({ content }: TOCProps) {
  // Simple regex to extract h2 and h3
  const headings = content.match(/^(#{2,3})\s+(.*)$/gm);

  if (!headings) return null;

  return (
    <nav className="sticky top-24 hidden lg:block w-64 pl-4 border-l border-zinc-700/50 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h4 className="font-semibold text-zinc-100 mb-4 text-sm uppercase tracking-wider">On this page</h4>
      <ul className="space-y-2 text-sm">
        {headings.map((heading, idx) => {
          const level = heading.startsWith('###') ? 3 : 2;
          const text = heading.replace(/^#{2,3}\s+/, '');
          const id = text.toLowerCase().replace(/\s+/g, '-');
          
          return (
            <li key={idx} className={level === 3 ? 'pl-4' : ''}>
              <a 
                href={`#${id}`} 
                className="text-zinc-400 hover:text-teal-400 transition-colors block leading-relaxed"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
