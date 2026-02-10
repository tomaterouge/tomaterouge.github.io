
export type Theme = 'dark' | 'light';


export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime: string;
}

export interface Post extends PostMetadata {
  id: string;
  content: string;
}