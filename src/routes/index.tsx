import { useState, useMemo } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../utils/posts';
import { Search, Calendar, Clock, Tag } from 'lucide-react';
import clsx from 'clsx';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 5;

  // Extract unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [posts]);

  // Filter Logic
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [posts, search, selectedTag]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Main Feed */}
        <div className="flex-1">
          <div className="mb-8 relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-3 pl-12 pr-4 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all placeholder:text-zinc-600"
            />
            <Search className="absolute left-4 top-3.5 text-zinc-500" size={20} />
          </div>

          <div className="space-y-8">
            {isLoading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="animate-pulse space-y-4 border border-zinc-800 p-6 rounded-2xl bg-zinc-900/50">
                  <div className="h-6 bg-zinc-800 rounded w-3/4"></div>
                  <div className="h-4 bg-zinc-800 rounded w-full"></div>
                  <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
                </div>
              ))
            ) : paginatedPosts.length > 0 ? (
              paginatedPosts.map(post => (
                <article key={post.id} className="group relative border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 rounded-2xl hover:border-zinc-600 hover:bg-zinc-800/40 transition-all duration-300">
                  <Link to="/posts/$slug" params={{ slug: post.slug }}>
                    <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-100 mb-3 group-hover:text-teal-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-zinc-400 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </article>
              ))
            ) : (
              <div className="text-center py-20 text-zinc-500">
                No posts found matching your criteria.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 disabled:opacity-50 hover:bg-zinc-700 transition"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-zinc-500">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 disabled:opacity-50 hover:bg-zinc-700 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-8">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50">
            <h3 className="font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <Tag size={18} className="text-teal-500" /> Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setSelectedTag(null); setPage(1); }}
                className={clsx(
                  "text-xs px-3 py-1.5 rounded-full border transition-all",
                  selectedTag === null
                    ? "bg-teal-500/10 text-teal-400 border-teal-500/50"
                    : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500"
                )}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => { setSelectedTag(tag === selectedTag ? null : tag); setPage(1); }}
                  className={clsx(
                    "text-xs px-3 py-1.5 rounded-full border transition-all",
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
      </div>
    </div>
  );
}
