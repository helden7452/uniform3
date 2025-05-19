import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/Container';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/data/blog-posts';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const postsPerPage = 9;
  const totalPages = Math.ceil((blogPosts.length - 3) / postsPerPage);
  
  return Array.from({ length: totalPages }).map((_, i) => ({
    page: String(i + 1)
  }));
}

export default function BlogPaginationPage({ params }) {
  const currentPage = parseInt(params.page, 10);
  
  // Skip featured posts (first 3)
  const regularPosts = blogPosts.slice(3);
  
  // Pagination
  const postsPerPage = 9;
  const totalPages = Math.ceil(regularPosts.length / postsPerPage);
  
  // Validate page number
  if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
    notFound();
  }
  
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = regularPosts.slice(startIndex, endIndex);
  
  return (
    <div className="bg-gray-50">
      {/* Hero Section - Smaller version for pagination pages */}
      <div className="relative bg-primary text-white py-10 mb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="pattern-dots h-full w-full"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">مدونة فخر الخليج</h1>
            <p className="text-lg max-w-2xl mx-auto">
              الصفحة {currentPage} من {totalPages}
            </p>
          </div>
        </Container>
      </div>
      
      {/* Posts Grid */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center my-8">
          <nav className="inline-flex rounded-md shadow">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Link
                key={i + 1}
                href={i === 0 ? '/blog' : `/blog/page/${i + 1}`}
                className={`px-4 py-2 border ${
                  i + 1 === currentPage 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                }`}
              >
                {i + 1}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </div>
  );
} 