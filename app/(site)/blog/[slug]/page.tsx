import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogDetailPage } from '@/components/pages/BlogDetailPage';
import { mockBlogPosts, mockComparisonPosts, mockListiclePosts } from '@/lib/mocks/data';

interface Props {
  params: { slug: string };
}

// Combine all posts for lookup
const allPosts = [
  ...mockBlogPosts.map(post => ({ ...post, postType: 'article' as const })),
  ...mockComparisonPosts.map(post => ({ ...post, postType: 'comparison' as const })),
  ...mockListiclePosts.map(post => ({ ...post, postType: 'listicle' as const })),
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = allPosts.find(p => p.slug?.current === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Anil Varma SEO Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name || 'Anil Varma'],
      images: post.featuredImage?.asset?.url ? [post.featuredImage.asset.url] : [],
    },
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug?.current,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = allPosts.find(p => p.slug?.current === params.slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug?.current !== post.slug?.current)
    .slice(0, 3);

  return <BlogDetailPage post={post} relatedPosts={relatedPosts} />;
}
