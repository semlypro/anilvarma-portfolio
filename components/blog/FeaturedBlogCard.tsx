'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Star } from 'lucide-react';
import { formatDateLong } from '@/lib/utils';
import type { BlogPost, ComparisonPost, ListiclePost } from '@/types';

type PostWithType = (BlogPost | ComparisonPost | ListiclePost) & {
  postType: 'article' | 'comparison' | 'listicle';
};

interface FeaturedBlogCardProps {
  post: PostWithType;
}

export function FeaturedBlogCard({ post }: FeaturedBlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/blog/${post.slug?.current}`}
        className="group block"
      >
        <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700">
          {/* Background Image Overlay */}
          {post.featuredImage?.asset?.url && (
            <div className="absolute inset-0">
              <Image
                src={post.featuredImage.asset.url}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}

          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('/grid-white.svg')] opacity-5" />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700/90 via-primary-600/70 to-transparent" />

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Text Content */}
            <div className="flex-1 max-w-2xl">
              {/* Featured Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                <Star className="w-4 h-4 fill-current" />
                Featured Article
              </div>

              {/* Category */}
              {post.category && (
                <p className="text-primary-200 text-sm font-medium mb-3">
                  {post.category}
                </p>
              )}

              {/* Title */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-primary-100 transition-colors">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-primary-100 text-lg leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-6 text-primary-200">
                <span>{formatDateLong(post.publishedAt)}</span>
                {post.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime} min read
                  </span>
                )}
              </div>

              {/* Read More */}
              <div className="mt-8">
                <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                  Read Article
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </div>

            {/* Optional Side Image */}
            {post.featuredImage?.asset?.url && (
              <div className="hidden lg:block relative w-80 h-64 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={post.featuredImage.asset.url}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
