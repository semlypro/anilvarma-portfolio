import {z} from 'zod';

/**
 * Validation Schemas
 *
 * Centralized Zod schemas for API request validation
 */

// Agent Request Schema
export const agentRequestSchema = z.object({
  agentId: z.string().min(1, 'Agent ID is required'),
  inputs: z.record(z.string(), z.string())
});

export type AgentRequestData = z.infer<typeof agentRequestSchema>;

// Download Request Schema
export const downloadRequestSchema = z.object({
  templateId: z.string().min(1, 'Template ID is required'),
  email: z.string().email('Valid email is required'),
  name: z.string().optional()
});

export type DownloadRequestData = z.infer<typeof downloadRequestSchema>;

// Subscribe Request Schema
export const subscribeRequestSchema = z.object({
  email: z.string().email('Valid email is required'),
  source: z.string().optional(),
  tags: z.array(z.string()).optional()
});

export type SubscribeRequestData = z.infer<typeof subscribeRequestSchema>;

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Search Query Schema
export const searchQuerySchema = z.object({
  q: z.string().min(1, 'Search query is required'),
  type: z.enum(['all', 'blog', 'template', 'agent', 'glossary']).optional(),
  limit: z.number().min(1).max(50).optional()
});

export type SearchQueryData = z.infer<typeof searchQuerySchema>;

/**
 * Validate and parse request body
 *
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Parsed data or throws validation error
 */
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  return schema.parse(data);
}

/**
 * Safe validation that returns success/error result
 *
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Success result with data or error result
 */
export function safeValidateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);

  if (result.success) {
    return {success: true, data: result.data};
  }

  const errors = result.error.errors.map(err => err.message);
  return {success: false, errors};
}
