import { Link } from '@tanstack/react-router';
import { Calendar } from 'lucide-react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 rounded-2xl hover:border-zinc-600 hover:bg-zinc-800/40 transition-all duration-300">
      <Link to="/posts/$slug" params={{ slug: post.slug }} className="block h-full">
        <div className="flex items-center gap-4 text-xs text-zinc-200 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {post.date}
          </span>
          {/* <span className="flex items-center gap-1">
            <Clock size={14} /> {post.readTime}
          </span> */}
        </div>
        
        <h2 className="text-2xl font-bold text-zinc-50 mb-3 group-hover:text-teal-400 transition-colors">
          {post.title}
        </h2>
        
        <p className="text-zinc-100 leading-relaxed mb-4">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="animate-pulse space-y-4 border border-zinc-800 p-6 rounded-2xl bg-zinc-900/50">
      <div className="h-6 bg-zinc-800 rounded w-3/4"></div>
      <div className="h-4 bg-zinc-800 rounded w-full"></div>
      <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
    </div>
  );
}