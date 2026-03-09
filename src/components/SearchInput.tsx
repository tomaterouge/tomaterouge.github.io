import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="mb-8 relative">
      <input
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-3 pl-12 pr-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all placeholder:text-zinc-200"
      />
      <Search className="absolute left-4 top-3.5 text-zinc-200" size={20} />
    </div>
  );
}