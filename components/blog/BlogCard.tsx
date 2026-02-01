'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, GitCompare, List, FileText } from 'lucide-react';
import { formatDateLong } from '@/lib/utils';
import type { BlogPost, ComparisonPost, ListiclePost } from '@/types';

type PostWithType = (BlogPost | ComparisonPost | ListiclePost) & {
  postType: 'article' | 'comparison' | 'listicle';
};

interface BlogCardProps {
  post: PostWithType;
}

const typeIcons = {
  article: FileText,
  comparison: GitCompare,
  listicle: List,
};

const typeLabels = {
  article: 'Article',
  comparison: 'Comparison',
  listicle: 'Listicle',
};

const typeColors = {
  article: 'bg-blue-100 text-blue-700',
  comparison: 'bg-purple-100 text-purple-700',
  listicle: 'bg-teal-100 text-teal-700',
};

export function BlogCard({ post }: BlogCardProps) {
  const Icon = typeIcons[post.postType];
  const typeLabel = typeLabels[post.postType];
  const typeColor = typeColors[post.postType];

  return (
    <Link
      href={`/blog/${post.slug?.current}`}
      className="group block h-full"
    >
      <article className="card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
          {post.featuredImage?.asset?.url ? (
            <Image
              src={post.featuredImage.asset.url}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <Icon className="w-12 h-12 text-primary-400" />
            </div>
          )}

          {/* Type Badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${typeColor} flex items-center gap-1.5`}>
            <Icon className="w-3 h-3" />
            {typeLabel}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Category */}
          {post.category && (
            <span className="text-sm font-medium text-primary-600 mb-2">
              {post.category}
            </span>
          )}

          {/* Title */}
          <h3 className="text-lg font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors mb-3 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-neutral-600 text-sm mb-4 line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <span>{formatDateLong(post.publishedAt)}</span>
              {post.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime} min
                </span>
              )}
            </div>

            <ArrowRight className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}
