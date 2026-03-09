import { useState, useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { usePosts } from '../hooks/usePosts';
import { SearchInput } from '../components/SearchInput';
import { Sidebar } from '../components/Sidebar';
import { Pagination } from '../components/Pagination';
import { PostCard, PostCardSkeleton } from '../components/PostCard';
import { ProfileCard } from '../components/ProfileCard';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { data: posts = [], isLoading, error } = usePosts();

  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 5;

  // 1. Extract unique tags from all posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [posts]);

  // 2. Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const searchLower = search.toLowerCase();
      const matchesSearch = post.title.toLowerCase().includes(searchLower) || 
                            post.excerpt.toLowerCase().includes(searchLower);
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [posts, search, selectedTag]);

  // 3. Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  // 4. Handlers
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1); // Reset to first page on search
  };

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    setPage(1); // Reset to first page on tag filter
  };

  if (error) {
    return (
      <div className="p-12 text-center">
        <div className="inline-block p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
          Failed to load articles. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* --- Main Content Area --- */}
        <div className="flex-1 min-w-0">
          <SearchInput value={search} onChange={handleSearchChange} />

          {/* Mobile: Show Profile Card here (hidden on large screens) */}
          <div className="block lg:hidden mb-8">
            <ProfileCard />
          </div>

          <div className="space-y-6">
            {isLoading ? (
              // Loading Skeletons
              Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
            ) : paginatedPosts.length > 0 ? (
              // Post List
              paginatedPosts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
              // Empty State
              <div className="text-center py-20 px-6 text-zinc-200 border border-zinc-800/50 rounded-2xl border-dashed bg-zinc-900/20">
                <p className="text-lg font-medium text-zinc-100 mb-2">No posts found</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
                <button 
                  onClick={() => { setSearch(''); setSelectedTag(null); }}
                  className="mt-4 text-teal-400 hover:text-teal-300 hover:underline text-sm"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={setPage} 
          />
        </div>

        {/* --- Sidebar Area --- */}
        <aside className="w-full lg:w-80 space-y-8 shrink-0">
          {/* Desktop: Show Profile Card here (hidden on small screens) */}
          <div className="hidden lg:block">
            <ProfileCard />
          </div>

          <Sidebar 
            tags={allTags} 
            selectedTag={selectedTag} 
            onSelectTag={handleTagSelect} 
          />
        </aside>
        
      </div>
    </div>
  );
}