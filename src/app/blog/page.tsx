import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/Container';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/data/blog-posts';

export default function BlogPage() {
  // Featured posts (first 3)
  const featuredPosts = blogPosts.slice(0, 3);
  
  // Regular posts (rest)
  const regularPosts = blogPosts.slice(3);
  
  // Pagination
  const postsPerPage = 9;
  const totalPages = Math.ceil(regularPosts.length / postsPerPage);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-primary text-white py-16 mb-12 overflow-hidden">
        {/* Using a CSS pattern instead of an image */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="pattern-dots h-full w-full"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">مدونة فخر الخليج</h1>
            <p className="text-xl max-w-2xl mx-auto">
              أحدث المقالات والنصائح حول الزي الموحد للقطاعات المختلفة
            </p>
          </div>
        </Container>
      </div>
      
      {/* Featured Posts Section */}
      <Container>
        <h2 className="text-2xl font-bold mb-6">مقالات مميزة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} featured />
          ))}
        </div>
        
        {/* Regular Posts Section */}
        <h2 className="text-2xl font-bold mb-6">جميع المقالات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {regularPosts.slice(0, postsPerPage).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center my-8">
            <nav className="inline-flex rounded-md shadow">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Link 
                  key={i + 1}
                  href={i === 0 ? '/blog' : `/blog/page/${i + 1}`}
                  className={`px-4 py-2 border ${
                    i === 0 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  {i + 1}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </Container>
    </div>
  );
}