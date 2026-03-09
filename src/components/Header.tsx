import { Link } from '@tanstack/react-router';
import { Terminal, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium text-zinc-200 hover:text-white transition-colors [&.active]:text-teal-400">
            Blog
          </Link>
          <Link to="/about" className="text-sm font-medium text-zinc-200 hover:text-white transition-colors [&.active]:text-teal-400">
            About
          </Link>
          {/* <a href="https://github.com/orange-jaune" target="_blank" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            GitHub
          </a> */}
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-zinc-200 hover:text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-6 flex flex-col space-y-4 animate-in slide-in-from-top duration-200">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-medium text-zinc-100 active:text-teal-400">Blog</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="text-lg font-medium text-zinc-100 active:text-teal-400">About</Link>
          {/* <a href="https://github.com/orange-jaune" className="text-lg font-medium text-zinc-300">GitHub</a> */}
        </nav>
      )}
    </header>
  );
}