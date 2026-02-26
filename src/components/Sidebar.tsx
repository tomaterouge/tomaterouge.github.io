import { Tag } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export function Sidebar({ tags, selectedTag, onSelectTag }: SidebarProps) {
  return (
    <aside className="w-full space-y-8">
      <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 sticky top-24">
        <h3 className="font-bold text-zinc-100 mb-4 flex items-center gap-2">
          <Tag size={18} className="text-teal-500" /> Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectTag(null)}
            className={clsx(
              "cursor-pointer text-xs px-3 py-1.5 rounded-full border transition-all",
              selectedTag === null
                ? "bg-teal-500/10 text-teal-400 border-teal-500/50"
                : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500"
            )}
          >
            All
          </button>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
              className={clsx(
                "cursor-pointer text-xs px-3 py-1.5 rounded-full border transition-all",
                selectedTag === tag
                  ? "bg-teal-500/10 text-teal-400 border-teal-500/50"
                  : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}