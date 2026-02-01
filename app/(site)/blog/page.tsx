import { Metadata } from 'next';
import { BlogListingPage } from '@/components/pages/BlogListingPage';
import { getAllBlogPosts, getAllComparisonPosts, getAllListiclePosts } from '@/lib/sanity/fetch';
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

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  // Fetch from Sanity
  const [blogPosts, comparisonPosts, listiclePosts] = await Promise.all([
    getAllBlogPosts().catch(() => []),
    getAllComparisonPosts().catch(() => []),
    getAllListiclePosts().catch(() => []),
  ]);

  // Use Sanity data if available, otherwise fall back to mock data
  const useBlogPosts = blogPosts.length > 0 ? blogPosts : mockBlogPosts;
  const useComparisonPosts = comparisonPosts.length > 0 ? comparisonPosts : mockComparisonPosts;
  const useListiclePosts = listiclePosts.length > 0 ? listiclePosts : mockListiclePosts;

  // Combine all post types for the listing
  const allPosts = [
    ...useBlogPosts.map(post => ({ ...post, postType: 'article' as const })),
    ...useComparisonPosts.map(post => ({ ...post, postType: 'comparison' as const })),
    ...useListiclePosts.map(post => ({ ...post, postType: 'listicle' as const })),
  ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // Extract unique categories
  const categories = Array.from(new Set(allPosts.map(post => post.category))).filter(Boolean);

  return (
    <BlogListingPage
      posts={allPosts}
      categories={categories as string[]}
      featuredPost={allPosts[0]}
    />
  );
}
