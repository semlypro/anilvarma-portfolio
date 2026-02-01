import {NextRequest, NextResponse} from 'next/server';
import {client} from '@/lib/sanity/client';
import {searchQuerySchema} from '@/lib/utils/validation';
import {groq} from 'next-sanity';

/**
 * Search API Route
 * GET /api/search?q=query&type=all&limit=20
 *
 * Searches across blog posts, templates, agents, and glossary terms
 */

interface SearchResult {
  type: 'blog' | 'template' | 'agent' | 'glossary' | 'case-study';
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all';
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    // Validate query parameters
    const validation = searchQuerySchema.safeParse({
      q: query,
      type,
      limit
    });

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid search parameters',
          details: validation.error.errors.map(err => err.message)
        },
        {status: 400}
      );
    }

    const {q, type: searchType, limit: maxResults} = validation.data;

    // Build search queries based on type
    const results: SearchResult[] = [];

    // Search blog posts
    if (searchType === 'all' || searchType === 'blog') {
      const blogQuery = groq`
        *[_type == "blogPost" && (
          title match $searchTerm ||
          excerpt match $searchTerm ||
          pt::text(content) match $searchTerm
        )] | order(_score desc) [0...${maxResults}] {
          "type": "blog",
          title,
          "slug": slug.current,
          excerpt,
          "category": categories[0]->name
        }
      `;

      const blogResults = await client.fetch<SearchResult[]>(blogQuery, {
        searchTerm: `*${q}*`
      });
      results.push(...blogResults);
    }

    // Search templates
    if (searchType === 'all' || searchType === 'template') {
      const templateQuery = groq`
        *[_type == "template" && (
          name match $searchTerm ||
          shortDescription match $searchTerm ||
          pt::text(description) match $searchTerm
        )] | order(_score desc) [0...${maxResults}] {
          "type": "template",
          "title": name,
          "slug": slug.current,
          "excerpt": shortDescription,
          "category": category->name
        }
      `;

      const templateResults = await client.fetch<SearchResult[]>(
        templateQuery,
        {searchTerm: `*${q}*`}
      );
      results.push(...templateResults);
    }

    // Search SEO agents
    if (searchType === 'all' || searchType === 'agent') {
      const agentQuery = groq`
        *[_type == "seoAgent" && (
          name match $searchTerm ||
          description match $searchTerm ||
          pt::text(longDescription) match $searchTerm
        )] | order(_score desc) [0...${maxResults}] {
          "type": "agent",
          "title": name,
          "slug": slug.current,
          "excerpt": description,
          "category": category->name
        }
      `;

      const agentResults = await client.fetch<SearchResult[]>(agentQuery, {
        searchTerm: `*${q}*`
      });
      results.push(...agentResults);
    }

    // Search glossary terms
    if (searchType === 'all' || searchType === 'glossary') {
      const glossaryQuery = groq`
        *[_type == "glossaryTerm" && (
          term match $searchTerm ||
          shortDefinition match $searchTerm ||
          pt::text(fullExplanation) match $searchTerm
        )] | order(_score desc) [0...${maxResults}] {
          "type": "glossary",
          "title": term,
          "slug": slug.current,
          "excerpt": shortDefinition
        }
      `;

      const glossaryResults = await client.fetch<SearchResult[]>(
        glossaryQuery,
        {searchTerm: `*${q}*`}
      );
      results.push(...glossaryResults);
    }

    // Limit total results
    const limitedResults = results.slice(0, maxResults || 20);

    return NextResponse.json({
      query: q,
      type: searchType,
      count: limitedResults.length,
      results: limitedResults
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to perform search',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      {status: 500}
    );
  }
}
