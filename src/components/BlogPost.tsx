import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/cn';

interface BlogPostProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  image: {
    src: string;
    alt: string;
  };
  className?: string;
}

export function BlogPost({
  title,
  description,
  slug,
  date,
  image,
  className,
}: BlogPostProps) {
  return (
    <article className={cn('flex flex-col overflow-hidden rounded-lg shadow-lg', className)}>
      <div className="relative h-48 w-full overflow-hidden">
        <Link href={`/blog/${slug}`} className="absolute inset-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-primary">
            {date}
          </p>
          <Link href={`/blog/${slug}`} className="mt-2 block">
            <h3 className="text-xl font-semibold text-gray-900 hover:underline">{title}</h3>
            <p className="mt-3 text-base text-gray-500">{description}</p>
          </Link>
        </div>
      </div>
    </article>
  );
}
