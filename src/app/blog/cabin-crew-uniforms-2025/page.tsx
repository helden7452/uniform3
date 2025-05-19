'use client';

import React from 'react';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import AuthorBio from '@/components/AuthorBio';
import OptimizedImage from '@/components/OptimizedImage';
import { getAuthorImagePath } from '@/utils/imageUtils';

export default function CabinCrewUniforms2025Page() {
  return (
    <>
      <Breadcrumb 
        items={[
          { label: 'الرئيسية', href: '/' },
          { label: 'المدونة', href: '/blog' },
          { label: 'أزياء طاقم الضيافة الجوية 2025', href: '/blog/cabin-crew-uniforms-2025', isCurrent: true }
        ]} 
      />
      
      <article className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
        <div className="relative h-[400px] w-full">
          <OptimizedImage
            src="/images/aviation-uniforms/cabin-crew-2025-main.jpg"
            alt="أزياء طاقم الضيافة الجوية 2025: اتجاهات مستقبلية ومفاهيم مبتكرة"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-4">أزياء طاقم الضيافة الجوية 2025: اتجاهات مستقبلية ومفاهيم مبتكرة</h1>
          
          <div className="flex items-center text-gray-600 mb-8">
            <div className="ml-4">
              <span className="text-sm">نُشر في: 15 مايو 2025</span>
            </div>
            <span className="mx-2">|</span>
            <div>
              <span className="text-sm">9 دقائق للقراءة</span>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <p className="lead text-lg font-semibold mb-6">
              مع اقتراب عام 2025، تشهد صناعة الطيران تحولات كبيرة في تصميم أزياء طاقم الضيافة الجوية، تجمع بين الابتكار التقني والاستدامة البيئية والتعبير الثقافي المميز.
            </p>

            <p className="mb-6">
              محتوى المقال هنا...
            </p>
          </div>
        </div>
      </article>
    </>
  );
} 