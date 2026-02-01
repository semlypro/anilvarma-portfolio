import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity/client';
import { groq } from 'next-sanity';

/**
 * Dynamic Sitemap Generator
 *
 * Generates XML sitemap for all pages and content
 */

interface SitemapEntry {
  slug: string;
  updatedAt: string;
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anilvarma.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/agents`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Try to fetch dynamic content from Sanity
  // If Sanity is not configured, return only static pages
  try {
    // Fetch blog posts
    const blogPosts = await client.fetch<SitemapEntry[]>(
      groq`*[_type == "blogPost" && !(_id in path("drafts.**"))]{
        "slug": slug.current,
        "updatedAt": _updatedAt
      }`
    );

    const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    // Fetch comparison posts
    const comparisonPosts = await client.fetch<SitemapEntry[]>(
      groq`*[_type == "comparisonPost" && !(_id in path("drafts.**"))]{
        "slug": slug.current,
        "updatedAt": _updatedAt
      }`
    );

    const comparisonPostPages: MetadataRoute.Sitemap = comparisonPosts.map(
      (post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    );

    // Fetch listicle posts
    const listiclePosts = await client.fetch<SitemapEntry[]>(
      groq`*[_type == "listiclePost" && !(_id in path("drafts.**"))]{
        "slug": slug.current,
        "updatedAt": _updatedAt
      }`
    );

    const listiclePostPages: MetadataRoute.Sitemap = listiclePosts.map(
      (post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    );

    // Fetch templates
    const templates = await client.fetch<SitemapEntry[]>(
      groq`*[_type == "template" && !(_id in path("drafts.**"))]{
        "slug": slug.current,
        "updatedAt": _updatedAt
      }`
    );

    const templatePages: MetadataRoute.Sitemap = templates.map((template) => ({
      url: `${baseUrl}/templates/${template.slug}`,
      lastModified: new Date(template.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    // Fetch SEO agents
    const agents = await client.fetch<SitemapEntry[]>(
      groq`*[_type == "seoAgent" && !(_id in path("drafts.**"))]{
        "slug": slug.current,
        "updatedAt": _updatedAt
      }`
    );

    const agentPages: MetadataRoute.Sitemap = agents.map((agent) => ({
      url: `${baseUrl}/agents/${agent.slug}`,
      lastModified: new Date(agent.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    // Fetch case studies
    const caseStudies = await client.fetch<SitemapEntry[]>(
      groq`*[_type == "caseStudy" && !(_id in path("drafts.**"))]{
        "slug": slug.current,
        "updatedAt": _updatedAt
      }`
    );

    const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((study) => ({
      url: `${baseUrl}/case-studies/${study.slug}`,
      lastModified: new Date(study.updatedAt),
      changeFrequency: 'yearly',
      priority: 0.7,
    }));

    // Fetch glossary terms
    const glossaryTerms = await client.fetch<SitemapEntry[]>(
      groq`*[_type == "glossaryTerm" && !(_id in path("drafts.**"))]{
        "slug": slug.current,
        "updatedAt": _updatedAt
      }`
    );

    const glossaryPages: MetadataRoute.Sitemap = glossaryTerms.map((term) => ({
      url: `${baseUrl}/glossary/${term.slug}`,
      lastModified: new Date(term.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    return [
      ...staticPages,
      ...blogPostPages,
      ...comparisonPostPages,
      ...listiclePostPages,
      ...templatePages,
      ...agentPages,
      ...caseStudyPages,
      ...glossaryPages,
    ];
  } catch (error) {
    // If Sanity is not configured, return only static pages
    console.warn('Sitemap: Could not fetch dynamic content from Sanity', error);
    return staticPages;
  }
}
