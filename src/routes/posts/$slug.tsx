import { createFileRoute, Link } from '@tanstack/react-router';
import { usePost } from '../../hooks/usePosts'; // Updated import
import { Markdown } from '../../components/Markdown';
import { TableOfContents } from '../../components/TableOfContents';
import { Calendar, ChevronLeft } from 'lucide-react';

export const Route = createFileRoute('/posts/$slug')({
  component: PostDetail,
  loader: async ({ params: { slug } }) => {
    return { slug };
  },
});

function PostDetail() {
  const { slug } = Route.useLoaderData();
  const { data: post, isLoading, isError } = usePost(slug);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-4xl animate-pulse">
        <div className="h-4 w-24 bg-zinc-800 rounded mb-8"></div>
        <div className="h-12 w-3/4 bg-zinc-800 rounded mb-4"></div>
        <div className="h-6 w-1/2 bg-zinc-800 rounded mb-12"></div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">404</h1>
        <p className="text-zinc-100 mb-8">Post not found</p>
        <Link to="/" className="text-teal-400 hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Link to="/" className="inline-flex items-center text-sm text-zinc-100 hover:text-teal-400 mb-8 transition-colors">
        <ChevronLeft size={16} className="mr-1" /> Back to blog
      </Link>

      <header className="mb-12 max-w-4xl">
        <div className="flex gap-4 text-sm text-zinc-100 mb-4 font-mono">
          <span className="flex items-center gap-1.5"><Calendar size={15} /> {post.date}</span>
          {/* <span className="flex items-center gap-1.5"><Clock size={15} /> {post.readTime}</span> */}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full bg-teal-900/30 text-teal-300 text-xs border border-teal-800/50">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        <article className="flex-1 min-w-0 text-zinc-50">
          <Markdown content={post.content}  />
        </article>
        
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <TableOfContents content={post.content} />
          </div>
        </aside>
      </div>
    </div>
  );
}