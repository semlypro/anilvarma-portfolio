import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity/client';
import { groq } from 'next-sanity';

/**
 * RSS Feed Generator
 * GET /feed.xml
 *
 * Generates RSS feed for blog posts
 */

interface BlogPostForRSS {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  author: {
    name: string;
  };
  categories: Array<{
    name: string;
  }>;
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anilvarma.com';

  try {
    // Fetch all published blog posts
    const posts = await client.fetch<BlogPostForRSS[]>(
      groq`*[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...50] {
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        author->{
          name
        },
        categories[]->{
          name
        }
      }`
    );

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Anil Varma - SEO Expert</title>
    <link>${baseUrl}</link>
    <description>International SEO &amp; Technical SEO insights, strategies, and case studies</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/images/logo.png</url>
      <title>Anil Varma - SEO Expert</title>
      <link>${baseUrl}</link>
    </image>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <author>anil@anilvarma.com (${post.author?.name || 'Anil Varma'})</author>
      ${
        post.categories
          ?.map((cat) => `<category><![CDATA[${cat.name}]]></category>`)
          .join('\n      ') || ''
      }
    </item>`
      )
      .join('\n')}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('RSS Feed Error:', error);
    return new NextResponse('Failed to generate RSS feed', { status: 500 });
  }
}
