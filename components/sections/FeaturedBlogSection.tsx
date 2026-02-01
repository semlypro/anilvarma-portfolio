'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { formatDateShort } from '@/lib/utils';
import type { BlogPost } from '@/types';

interface FeaturedBlogSectionProps {
  posts: BlogPost[];
}

export function FeaturedBlogSection({ posts }: FeaturedBlogSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (!posts || posts.length === 0) return null;

  return (
    <section ref={ref} className="section bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="overline">From the Blog</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-neutral-800">
              Latest SEO Insights
            </h2>
            <p className="mt-4 text-neutral-600 text-lg max-w-xl">
              Practical tips, strategies, and industry updates to help you stay
              ahead in search.
            </p>
          </div>

          <Link href="/blog" className="btn-ghost shrink-0">
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug.current}`} className="group block">
                <div className="card-hover h-full">
                  {/* Image */}
                  <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 mb-5 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      📊
                    </div>
                  </div>

                  {/* Category Badge */}
                  {post.categories?.[0] && (
                    <span className="badge-primary text-xs mb-3">
                      {post.categories[0].title}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors line-clamp-2 mb-3">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-neutral-600 line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDateShort(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readingTime} min read
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
