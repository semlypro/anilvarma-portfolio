import { createClient, type QueryParams } from 'next-sanity'
import { apiVersion, dataset, projectId, readToken } from '@/sanity/env'

/**
 * Sanity client for fetching data with CDN enabled
 * Use this for public data that doesn't need real-time updates
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Enable CDN for faster responses
  perspective: 'published', // Only published documents
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
})

/**
 * Sanity client for fetching preview/draft content
 * Use this when you need to see unpublished changes
 */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN for real-time draft content
  token: readToken, // Use read token for authenticated requests
  perspective: 'previewDrafts', // Include draft documents
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
})

/**
 * Get the appropriate client based on preview mode
 * @param preview - Whether to use preview mode
 * @returns Sanity client instance
 */
export function getClient(preview?: boolean) {
  return preview ? previewClient : client
}

/**
 * Fetch data from Sanity using GROQ query
 * This wrapper adds Next.js caching support to Sanity queries
 *
 * @param query - GROQ query string
 * @param params - Query parameters
 * @param options - Fetch options
 * @returns Query result
 */
export async function sanityFetch<T = unknown>({
  query,
  params = {},
  preview = false,
  tags = [],
}: {
  query: string
  params?: QueryParams
  preview?: boolean
  tags?: string[]
}): Promise<T> {
  const isDraftMode = preview

  // Use preview client if in draft mode, otherwise use production client
  const sanityClient = isDraftMode ? previewClient : client

  // For draft mode, always fetch fresh data
  // For production, use Next.js cache with revalidation
  if (isDraftMode) {
    return sanityClient.fetch<T>(query, params)
  }

  // In production mode, fetch with caching options
  // The cache is handled by Next.js fetch automatically
  return sanityClient.fetch<T>(query, params, {
    cache: 'force-cache',
    next: {
      tags,
      revalidate: 60, // Revalidate every 60 seconds
    },
  } as any) // Type cast needed due to Sanity client type limitations
}
