'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BlogCard } from '@/components/blog/BlogCard';
import { FeaturedBlogCard } from '@/components/blog/FeaturedBlogCard';
import type { BlogPost, ComparisonPost, ListiclePost } from '@/types';

type PostWithType = (BlogPost | ComparisonPost | ListiclePost) & {
  postType: 'article' | 'comparison' | 'listicle';
};

interface BlogListingPageProps {
  posts: PostWithType[];
  categories: string[];
  featuredPost?: PostWithType;
}

export function BlogListingPage({ posts, categories, featuredPost }: BlogListingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Exclude featured post from regular listing
      if (featuredPost && post.slug?.current === featuredPost.slug?.current) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesExcerpt = post.excerpt?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesExcerpt) return false;
      }

      // Category filter
      if (selectedCategory && post.category !== selectedCategory) {
        return false;
      }

      // Type filter
      if (selectedType && post.postType !== selectedType) {
        return false;
      }

      return true;
    });
  }, [posts, searchQuery, selectedCategory, selectedType, featuredPost]);

  const postTypes = [
    { value: 'article', label: 'Articles' },
    { value: 'comparison', label: 'Comparisons' },
    { value: 'listicle', label: 'Listicles' },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="overline">Blog</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-neutral-800">
              SEO Insights & Strategies
            </h1>
            <p className="mt-6 text-xl text-neutral-600 leading-relaxed">
              In-depth articles, comparison guides, and actionable listicles to help you
              master search engine optimization.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-200 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-800 placeholder:text-neutral-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-white">
          <div className="container-custom">
            <FeaturedBlogCard post={featuredPost} />
          </div>
        </section>
      )}

      {/* Filters & Posts */}
      <section className="py-12 bg-neutral-50">
        <div className="container-custom">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-4 mb-10"
          >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex gap-2 md:ml-auto">
              <button
                onClick={() => setSelectedType(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedType
                    ? 'bg-accent-500 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                All Types
              </button>
              {postTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedType === type.value
                      ? 'bg-accent-500 text-white'
                      : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug?.current || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-neutral-500 text-lg">
                No posts found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                  setSelectedType(null);
                }}
                className="mt-4 text-primary-600 font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Load More (placeholder for pagination) */}
          {filteredPosts.length > 0 && (
            <div className="mt-12 text-center">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-neutral-200 rounded-xl font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                Load More Articles
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
              Get SEO Insights Delivered
            </h2>
            <p className="text-neutral-600 mb-8">
              Join 5,000+ marketers receiving weekly SEO tips and strategies.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
