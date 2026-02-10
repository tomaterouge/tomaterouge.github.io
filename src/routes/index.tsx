import { useState, useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { usePosts } from '../hooks/usePosts';
import { SearchInput } from '../components/SearchInput';
import { Sidebar } from '../components/Sidebar';
import { Pagination } from '../components/Pagination';
import { PostCard, PostCardSkeleton } from '../components/PostCard';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { data: posts = [], isLoading, error } = usePosts();
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 5;

  // Derive unique tags from posts
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

  // Handlers to reset page when filters change
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    setPage(1);
  };

  if (error) {
    return <div className="p-12 text-center text-red-400">Failed to load articles.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Main Feed */}
        <div className="flex-1 min-w-0">
          <SearchInput value={search} onChange={handleSearchChange} />

          <div className="space-y-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
            ) : paginatedPosts.length > 0 ? (
              paginatedPosts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="text-center py-20 text-zinc-500 border border-zinc-800/50 rounded-2xl border-dashed">
                No posts found matching your criteria.
              </div>
            )}
          </div>

          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={setPage} 
          />
        </div>

        {/* Sidebar */}
        <Sidebar 
          tags={allTags} 
          selectedTag={selectedTag} 
          onSelectTag={handleTagSelect} 
        />
        
      </div>
    </div>
  );
}