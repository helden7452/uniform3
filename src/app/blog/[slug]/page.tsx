import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, formatDate } from '@/data/blog';
import authors from '@/data/authors';
import OptimizedImage from '@/components/OptimizedImage';
import BlogCard from '@/components/BlogCard';
import Breadcrumb from '@/components/Breadcrumb';
import AuthorBio from '@/components/AuthorBio';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post || post?.slug === 'not-found') {
    return {
      title: 'مقال غير موجود',
      description: 'المقال الذي تبحث عنه غير موجود'
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage || '/images/blog/default.jpg',
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    }
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  
  if (!post || post.slug === 'not-found') {
    return notFound();
  }
  
  // Find the author in the array or use the first one
  const authorArray = Array.isArray(authors) ? authors : [authors];
  const author = authorArray.find((a: any) => a.id === post.authorId) || authorArray[0] || null;
  
  // Make sure we're passing a string to getRelatedPosts
  const relatedPosts = getRelatedPosts(post.slug, String(post.category || ''));
  const formattedDate = formatDate(post.date);
  
  return (
    <>
      <Breadcrumb 
        items={[
          { label: 'الرئيسية', href: '/' },
          { label: 'المدونة', href: '/blog' },
          { label: post.title, href: `/blog/${post.slug}`, isCurrent: true }
        ]} 
      />
      
      <article className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
        {post.coverImage && (
          <div className="relative h-[400px] w-full">
            <OptimizedImage
              src={post.coverImage || '/images/blog/default.jpg'}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}
        
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-8">
            <div className="ml-4">
              <span className="text-sm">نُشر في: {formattedDate}</span>
            </div>
            <span className="mx-2">|</span>
            <div>
              <span className="text-sm">{post.readingTime || '5 دقائق'} للقراءة</span>
            </div>
          </div>
          
          <div className="prose max-w-none">
            {/* If post.content exists, render it here */}
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p className="lead text-lg font-semibold mb-6">
                {post.excerpt}
              </p>
            )}
            
            {/* Placeholder content if no actual content exists */}
            {!post.content && (
              <>
                <h2>محتوى المقال</h2>
                <p>
                  هذا المقال يتناول موضوع {post.title} بشكل تفصيلي، ويقدم معلومات قيمة حول أحدث التوجهات والابتكارات في مجال الأزياء الموحدة.
                </p>
                <p>
                  يمكنك العثور على مزيد من المعلومات حول هذا الموضوع في مقالاتنا ذات الصلة أدناه.
                </p>
              </>
            )}
          </div>
          
          {/* Author Bio */}
          {author && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <AuthorBio 
                name={author.name}
                title={author.role || ''}
                bio={author.bio || ''}
                image={author.image || ''}
              />
            </div>
          )}
        </div>
      </article>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">مقالات ذات صلة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <BlogCard
                key={relatedPost.slug}
                post={relatedPost}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}