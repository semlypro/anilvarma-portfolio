import {z} from 'zod';

/**
 * Environment Variable Validation
 *
 * Validates required environment variables at build/runtime
 * Provides type-safe access to environment variables
 */

const envSchema = z.object({
  // Sanity
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, 'Sanity project ID is required'),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1, 'Sanity dataset is required'),
  SANITY_API_TOKEN: z.string().min(1, 'Sanity API token is required'),

  // Anthropic
  ANTHROPIC_API_KEY: z.string().min(1, 'Anthropic API key is required'),

  // Resend
  RESEND_API_KEY: z.string().min(1, 'Resend API key is required'),
  EMAIL_FROM: z.string().email('Valid sender email is required').optional(),
  CONTACT_NOTIFICATION_EMAIL: z.string().email('Valid notification email is required').optional(),

  // Vercel KV (optional for rate limiting)
  KV_REST_API_URL: z.string().url().optional(),
  KV_REST_API_TOKEN: z.string().optional(),

  // Site
  NEXT_PUBLIC_SITE_URL: z.string().url('Valid site URL is required').optional(),

  // Node env
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validate environment variables
 *
 * @throws Error if validation fails
 */
export function validateEnv(): Env {
  try {
    return envSchema.parse({
      // Sanity
      NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
      SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,

      // Anthropic
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,

      // Resend
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      EMAIL_FROM: process.env.EMAIL_FROM,
      CONTACT_NOTIFICATION_EMAIL: process.env.CONTACT_NOTIFICATION_EMAIL,

      // Vercel KV
      KV_REST_API_URL: process.env.KV_REST_API_URL,
      KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,

      // Site
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,

      // Node env
      NODE_ENV: process.env.NODE_ENV
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join('\n');

      throw new Error(
        `Environment validation failed:\n${missingVars}\n\nPlease check your .env.local file.`
      );
    }
    throw error;
  }
}

/**
 * Get validated environment variables
 *
 * Only validates once and caches the result
 */
let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (!cachedEnv) {
    cachedEnv = validateEnv();
  }
  return cachedEnv;
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Check if running in test
 */
export function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}
