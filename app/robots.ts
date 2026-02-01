import { MetadataRoute } from 'next';

/**
 * Robots.txt Generator
 *
 * Controls crawler access to the site
 * Allows AI crawlers for AEO (AI Engine Optimization)
 */

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anilvarma.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/', '/_next/', '/admin/'],
      },
      // AI Crawlers (AEO - AI Engine Optimization)
      {
        userAgent: [
          'GPTBot', // OpenAI
          'ChatGPT-User', // ChatGPT
          'anthropic-ai', // Claude
          'Claude-Web', // Claude
          'PerplexityBot', // Perplexity
          'GoogleOther', // Google Bard/Gemini
        ],
        allow: '/',
        disallow: ['/studio/', '/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
