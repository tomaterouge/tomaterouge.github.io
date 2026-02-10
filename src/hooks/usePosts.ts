import { useQuery } from '@tanstack/react-query';
import matter from 'gray-matter';
import { Post } from '../types';

interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime: string;
}

// 1. Load all markdown files as RAW strings
// 'eager: true' bundles them directly (good for metadata list)
const postFiles = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
}) as Record<string, string>;

/**
 * Hook to fetch the list of all posts (parsed metadata).
 */
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[]> => {
      const posts = Object.entries(postFiles).map(([filepath, rawContent]) => {
        const slug = filepath.split('/').pop()?.replace('.md', '') || '';
        const { data } = matter(rawContent);
        const meta = data as PostFrontmatter;

        return {
          id: slug,
          slug,
          title: meta.title || 'Untitled',
          excerpt: meta.excerpt || '',
          date: meta.date || '',
          tags: meta.tags || [],
          readTime: meta.readTime || '',
          content: '', // Empty content for list view
        };
      });

      return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },
    staleTime: Infinity,
  });
};

/**
 * Hook to fetch a single post by slug.
 */
export const usePost = (slug: string) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: async (): Promise<Post> => {
      // Reconstruct the filepath from slug
      const filepath = `/src/content/posts/${slug}.md`;
      const rawContent = postFiles[filepath];

      if (!rawContent) {
        throw new Error(`Post not found: ${slug}`);
      }

      const { data, content } = matter(rawContent);
      const meta = data as PostFrontmatter;

      return {
        id: slug,
        slug,
        title: meta.title,
        excerpt: meta.excerpt,
        date: meta.date,
        tags: meta.tags,
        readTime: meta.readTime,
        content: content, // The actual markdown body
      };
    },
    enabled: !!slug,
  });
};