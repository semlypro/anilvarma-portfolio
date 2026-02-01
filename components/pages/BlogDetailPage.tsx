'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock, Calendar, ArrowLeft, Share2, Bookmark,
  Twitter, Linkedin, Link2, ChevronRight, User,
  GitCompare, List, FileText, CheckCircle
} from 'lucide-react';
import { formatDateLong } from '@/lib/utils';
import { BlogCard } from '@/components/blog/BlogCard';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ComparisonTable } from '@/components/blog/ComparisonTable';
import type { BlogPost, ComparisonPost, ListiclePost } from '@/types';

type PostWithType = (BlogPost | ComparisonPost | ListiclePost) & {
  postType: 'article' | 'comparison' | 'listicle';
};

interface BlogDetailPageProps {
  post: PostWithType;
  relatedPosts: PostWithType[];
}

export function BlogDetailPage({ post, relatedPosts }: BlogDetailPageProps) {
  const isComparison = post.postType === 'comparison';
  const isListicle = post.postType === 'listicle';

  const TypeIcon = isComparison ? GitCompare : isListicle ? List : FileText;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-neutral-500 mb-8"
          >
            <Link href="/blog" className="hover:text-primary-600 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-neutral-700">{post.category}</span>
          </motion.nav>

          <div className="max-w-4xl">
            {/* Type Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                isComparison
                  ? 'bg-purple-100 text-purple-700'
                  : isListicle
                    ? 'bg-teal-100 text-teal-700'
                    : 'bg-blue-100 text-blue-700'
              }`}
            >
              <TypeIcon className="w-4 h-4" />
              {isComparison ? 'Comparison' : isListicle ? 'Listicle' : 'Article'}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight mb-6"
            >
              {post.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-neutral-600 leading-relaxed mb-8"
            >
              {post.excerpt}
            </motion.p>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap items-center gap-6"
            >
              {/* Author */}
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.image?.asset?.url ? (
                    <Image
                      src={post.author.image.asset.url}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-neutral-800">{post.author.name}</p>
                    {post.author.role && (
                      <p className="text-sm text-neutral-500">{post.author.role}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDateLong(post.publishedAt)}
                </span>
                {post.readTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readTime} min read
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage?.asset?.url && (
        <section className="container-custom -mt-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src={post.featuredImage.asset.url}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar - Table of Contents */}
            <aside className="lg:w-64 shrink-0">
              <div className="lg:sticky lg:top-24">
                <TableOfContents />

                {/* Share Buttons */}
                <div className="mt-8 pt-8 border-t border-neutral-200">
                  <p className="text-sm font-medium text-neutral-500 mb-4">Share this article</p>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors">
                      <Link2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg bg-neutral-100 text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <article className="flex-1 max-w-3xl">
              {/* Key Takeaways / TL;DR */}
              {'keyTakeaways' in post && post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-12 p-6 bg-primary-50 rounded-2xl border border-primary-100"
                >
                  <h2 className="text-lg font-semibold text-primary-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Key Takeaways
                  </h2>
                  <ul className="space-y-2">
                    {post.keyTakeaways.map((takeaway: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-primary-700">
                        <span className="w-6 h-6 rounded-full bg-primary-200 text-primary-800 flex items-center justify-center text-sm font-medium shrink-0">
                          {index + 1}
                        </span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Comparison Table for Comparison Posts */}
              {isComparison && 'items' in post && (
                <ComparisonTable post={post as ComparisonPost} />
              )}

              {/* Listicle Items */}
              {isListicle && 'items' in post && (
                <div className="space-y-8 mb-12">
                  {(post as ListiclePost).items?.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="flex gap-6"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-neutral-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Article Body - Placeholder for Portable Text */}
              <div className="prose prose-lg prose-neutral max-w-none">
                <p className="text-neutral-600 leading-relaxed">
                  This is where the article content would be rendered from Sanity's Portable Text.
                  The content includes rich formatting, images, code blocks, and more.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  Once the backend is connected, this will be replaced with the actual
                  content from the CMS using @portabletext/react.
                </p>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-neutral-200">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${tag}`}
                        className="px-4 py-2 bg-neutral-100 rounded-full text-sm text-neutral-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.slug?.current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogCard post={relatedPost} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="py-12 bg-white">
        <div className="container-custom text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>
        </div>
      </section>
    </main>
  );
}
