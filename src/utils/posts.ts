// import matter from 'gray-matter';
// import { Post } from '../types';

// // Use Vite's glob import to get all markdown files in the content folder
// // 'eager: true' loads them at build time, 'query: ?raw' gets the string content
// const postFiles = import.meta.glob('/src/content/posts/*.md', {
//   query: '?raw',
//   eager: true,
// }) as Record<string, { default: string }>;

// /**
//  * Parses all markdown files and returns an array of Post objects.
//  */
// export const getPosts = async (): Promise<Post[]> => {
//   console.log(postFiles)
//   const posts: Post[] = Object.entries(postFiles).map(([filepath, module]) => {
//     // const rawContent1 = module.default;
//     console.log(filepath)
//     // console.log(rawContent1)

//     const rawContent = `---
// title: Hello
// slug: home
// ---
// <h1>Hello world!</h1>`

//     const { data, content } = matter(rawContent);

//     // Extract slug from filename (e.g., /src/content/posts/my-post.md -> my-post)
//     const slug = filepath.split('/').pop()?.replace('.md', '') || '';

//     return {
//       id: slug,
//       slug: slug,
//       title: data.title || 'Untitled',
//       date: data.date || '',
//       excerpt: data.excerpt || '',
//       tags: data.tags || [],
//       readTime: data.readTime || '',
//       content: content,
//     };
//   });

//   // Sort by date descending
//   return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
// };

// /**
//  * Finds a specific post by its slug.
//  */
// export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
//   const allPosts = await getPosts();
//   return allPosts.find((p) => p.slug === slug);
// };