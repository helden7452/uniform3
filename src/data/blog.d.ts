// Type definitions for blog.js
declare module '@/data/blog' {
  export interface Category {
    name: string;
    slug: string;
    description: string;
    postCount?: number;
  }

  export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content?: string;
    coverImage?: string;
    date: string;
    category: string;
    authorId?: number;
    readingTime?: string;
  }

  export const categories: Category[];
  
  export function getCategoryBySlug(slug: string): Category;
  export function getPostsByCategory(categorySlug: string): BlogPost[];
  export function getAllCategoriesWithCount(): Category[];
  export function getPostBySlug(slug: string): BlogPost;
  export function getRelatedPosts(currentSlug: string, categoryName?: string, limit?: number): BlogPost[];
  export function formatDate(dateString: string): string;
} 