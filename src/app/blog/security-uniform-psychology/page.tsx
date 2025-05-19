'use client';

import React from 'react';
import type { Metadata } from 'next';
import { ArticleHero } from '@/components/ArticleHero';
import { Container } from '@/components/Container';
import { ArticleBody } from '@/components/ArticleBody';
import { ArticleBreadcrumb } from '@/components/ArticleBreadcrumb';
import { AuthorCard } from '@/components/AuthorCard';
import { getAllAuthors } from '@/utils/getAllAuthors';
import Image from 'next/image';
import { MDXProvider } from '@/components/MDXProvider';

// Metadata removed due to conflict with use client directive

export default async function Article() {
  const authors = await getAllAuthors();
  const teamAuthor = authors.find((author) => author.name === 'فريق فخر الخليج');

  return (
    <>
      <ArticleHero
        title="علم نفس الزي الموحد الأمني"
        image={{
          src: '/images/security-uniforms/security-uniform-psychology.jpg',
          alt: 'علم نفس الزي الموحد الأمني',
          width: 1024,
          height: 576,
        }} />

      <Container className="mt-8 sm:mt-10 lg:mt-12">
        <ArticleBreadcrumb
          breadcrumbs={[
            { label: 'الرئيسية', href: '/' },
            { label: 'المدونة', href: '/blog' },
            { label: 'علم نفس الزي الموحد الأمني', href: '/blog/security-uniform-psychology', isCurrent: true }
          ]}
        />
      </Container>

      <div className="bg-white py-8 sm:py-10">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            <ArticleBody className="lg:w-2/3">
              <MDXProvider>
                <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-lead:text-slate-500 prose-a:font-semibold prose-a:underline">
                  <h2 className="text-xl font-bold mb-6">علم نفس الزي الموحد الأمني</h2>
                  
                  <p className="text-lg leading-relaxed mb-6">
                    محتوى المدونة هنا...
                  </p>
                </div>
              </MDXProvider>
            </ArticleBody>

            <aside className="lg:w-1/3 space-y-8">
              {teamAuthor && (
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold mb-4">كاتب المقال</h3>
                  <AuthorCard author={teamAuthor} />
                </div>
              )}
              
              <div className="bg-primary-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold mb-4">خدمات ذات صلة</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/security-uniforms" className="flex items-center text-primary hover:text-primary-dark">
                      <span className="ml-2">⟨</span>
                      <span>الزي الموحد الأمني</span>
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </>
  );
}
