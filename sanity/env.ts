export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-01'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

// Read token is used for fetching data from Sanity in the app
export const readToken = process.env.SANITY_API_READ_TOKEN || ''

// Write token is used for mutations (creating/updating documents)
export const writeToken = process.env.SANITY_API_TOKEN || ''

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
