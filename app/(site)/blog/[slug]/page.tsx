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

  const authorName = 'author' in post && post.author?.name ? post.author.name : 'Anil Varma';
  const imageUrl = post.featuredImage?.asset?.url;

  return {
    title: `${post.title} | Anil Varma SEO Blog`,
    description: post.excerpt || post.seo?.metaDescription || '',
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [authorName],
      images: imageUrl ? [imageUrl] : [],
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
