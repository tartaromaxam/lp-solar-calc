import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  readingTime: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

// Calculate reading time based on word count
function calculateReadingTime(content: string): string {
  const wpm = 225;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return `${time} min de leitura`;
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title || '',
    description: data.description || '',
    category: data.category || '',
    image: data.image || '',
    date: data.date || '',
    readingTime: calculateReadingTime(content),
    content: content,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories).filter(Boolean);
}
