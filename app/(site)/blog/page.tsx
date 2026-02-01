import { Metadata } from 'next';
import { BlogListingPage } from '@/components/pages/BlogListingPage';
import { mockBlogPosts, mockComparisonPosts, mockListiclePosts } from '@/lib/mocks/data';

export const metadata: Metadata = {
  title: 'SEO Blog | Insights & Strategies | Anil Varma',
  description: 'Expert SEO insights, strategies, and best practices. Learn from 15+ years of experience in organic search optimization.',
  openGraph: {
    title: 'SEO Blog | Insights & Strategies | Anil Varma',
    description: 'Expert SEO insights, strategies, and best practices. Learn from 15+ years of experience in organic search optimization.',
    type: 'website',
  },
};

// Combine all post types for the listing
const allPosts = [
  ...mockBlogPosts.map(post => ({ ...post, postType: 'article' as const })),
  ...mockComparisonPosts.map(post => ({ ...post, postType: 'comparison' as const })),
  ...mockListiclePosts.map(post => ({ ...post, postType: 'listicle' as const })),
].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

// Extract unique categories
const categories = Array.from(new Set(allPosts.map(post => post.category))).filter(Boolean);

export default function BlogPage() {
  return (
    <BlogListingPage
      posts={allPosts}
      categories={categories as string[]}
      featuredPost={allPosts[0]}
    />
  );
}
