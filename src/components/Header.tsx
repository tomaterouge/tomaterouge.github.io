import { Link } from '@tanstack/react-router';
import { Terminal } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-teal-500/10 p-2 rounded-lg group-hover:bg-teal-500/20 transition-colors">
            <Terminal className="text-teal-400" size={24} />
          </div>
          <span className="font-bold text-lg tracking-tight text-zinc-100">
            Tensor<span className="text-teal-400">Log</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors [&.active]:text-teal-400">
            Blog
          </Link>
          <a href="https://github.com" target="_blank" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
