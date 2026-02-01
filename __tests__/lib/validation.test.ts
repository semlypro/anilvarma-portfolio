import {describe, it, expect} from 'vitest';
import {
  agentRequestSchema,
  downloadRequestSchema,
  subscribeRequestSchema,
  contactFormSchema,
  searchQuerySchema,
  validateRequest,
  safeValidateRequest
} from '@/lib/utils/validation';
import {z} from 'zod';

describe('Validation Schemas', () => {
  describe('agentRequestSchema', () => {
    it('should validate valid agent request', () => {
      const validData = {
        agentId: 'test-agent',
        inputs: {
          url: 'https://example.com',
          keywords: 'seo, test'
        }
      };

      const result = agentRequestSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should reject empty agentId', () => {
      const invalidData = {
        agentId: '',
        inputs: {}
      };

      const result = agentRequestSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Agent ID is required');
      }
    });

    it('should reject missing agentId', () => {
      const invalidData = {
        inputs: {}
      };

      const result = agentRequestSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it('should validate empty inputs object', () => {
      const validData = {
        agentId: 'test-agent',
        inputs: {}
      };

      const result = agentRequestSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it('should validate inputs with multiple fields', () => {
      const validData = {
        agentId: 'test-agent',
        inputs: {
          field1: 'value1',
          field2: 'value2',
          field3: 'value3'
        }
      };

      const result = agentRequestSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });
  });

  describe('downloadRequestSchema', () => {
    it('should validate valid download request', () => {
      const validData = {
        templateId: 'seo-template',
        email: 'user@example.com',
        name: 'John Doe'
      };

      const result = downloadRequestSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should validate download request without name', () => {
      const validData = {
        templateId: 'seo-template',
        email: 'user@example.com'
      };

      const result = downloadRequestSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidData = {
        templateId: 'seo-template',
        email: 'invalid-email',
        name: 'John Doe'
      };

      const result = downloadRequestSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Valid email is required');
      }
    });

    it('should reject empty templateId', () => {
      const invalidData = {
        templateId: '',
        email: 'user@example.com'
      };

      const result = downloadRequestSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Template ID is required');
      }
    });

    it('should reject missing email', () => {
      const invalidData = {
        templateId: 'seo-template',
        name: 'John Doe'
      };

      const result = downloadRequestSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });
  });

  describe('subscribeRequestSchema', () => {
    it('should validate valid subscribe request', () => {
      const validData = {
        email: 'user@example.com',
        source: 'newsletter',
        tags: ['seo', 'marketing']
      };

      const result = subscribeRequestSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should validate subscribe request with email only', () => {
      const validData = {
        email: 'user@example.com'
      };

      const result = subscribeRequestSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'not-an-email'
      };

      const result = subscribeRequestSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Valid email is required');
      }
    });

    it('should validate empty tags array', () => {
      const validData = {
        email: 'user@example.com',
        tags: []
      };

      const result = subscribeRequestSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it('should validate with source but no tags', () => {
      const validData = {
        email: 'user@example.com',
        source: 'blog-cta'
      };

      const result = subscribeRequestSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });
  });

  describe('contactFormSchema', () => {
    it('should validate valid contact form', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Inquiry',
        message: 'This is a test message with enough characters.'
      };

      const result = contactFormSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should validate contact form without subject', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message with enough characters.'
      };

      const result = contactFormSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it('should reject name shorter than 2 characters', () => {
      const invalidData = {
        name: 'J',
        email: 'john@example.com',
        message: 'This is a test message.'
      };

      const result = contactFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Name must be at least 2 characters');
      }
    });

    it('should reject message shorter than 10 characters', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Short'
      };

      const result = contactFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Message must be at least 10 characters');
      }
    });

    it('should reject invalid email', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid',
        message: 'This is a valid message.'
      };

      const result = contactFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Valid email is required');
      }
    });
  });

  describe('searchQuerySchema', () => {
    it('should validate valid search query', () => {
      const validData = {
        q: 'seo optimization',
        type: 'blog' as const,
        limit: 10
      };

      const result = searchQuerySchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should validate search query with q only', () => {
      const validData = {
        q: 'test'
      };

      const result = searchQuerySchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it('should reject empty query string', () => {
      const invalidData = {
        q: ''
      };

      const result = searchQuerySchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('Search query is required');
      }
    });

    it('should validate all valid type values', () => {
      const types = ['all', 'blog', 'template', 'agent', 'glossary'] as const;

      types.forEach(type => {
        const validData = {
          q: 'test',
          type
        };

        const result = searchQuerySchema.safeParse(validData);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid type', () => {
      const invalidData = {
        q: 'test',
        type: 'invalid'
      };

      const result = searchQuerySchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it('should reject limit less than 1', () => {
      const invalidData = {
        q: 'test',
        limit: 0
      };

      const result = searchQuerySchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it('should reject limit greater than 50', () => {
      const invalidData = {
        q: 'test',
        limit: 51
      };

      const result = searchQuerySchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it('should validate limit at boundaries', () => {
      const validMin = {q: 'test', limit: 1};
      const validMax = {q: 'test', limit: 50};

      expect(searchQuerySchema.safeParse(validMin).success).toBe(true);
      expect(searchQuerySchema.safeParse(validMax).success).toBe(true);
    });
  });

  describe('validateRequest', () => {
    const testSchema = z.object({
      name: z.string(),
      age: z.number()
    });

    it('should return parsed data for valid input', () => {
      const validData = {name: 'John', age: 30};

      const result = validateRequest(testSchema, validData);

      expect(result).toEqual(validData);
    });

    it('should throw error for invalid input', () => {
      const invalidData = {name: 'John', age: 'thirty'};

      expect(() => validateRequest(testSchema, invalidData)).toThrow();
    });

    it('should throw error for missing required fields', () => {
      const invalidData = {name: 'John'};

      expect(() => validateRequest(testSchema, invalidData)).toThrow();
    });
  });

  describe('safeValidateRequest', () => {
    const testSchema = z.object({
      email: z.string().email(),
      count: z.number().min(1)
    });

    it('should return success result for valid input', () => {
      const validData = {email: 'test@example.com', count: 5};

      const result = safeValidateRequest(testSchema, validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should return error result for invalid input', () => {
      const invalidData = {email: 'not-an-email', count: 5};

      const result = safeValidateRequest(testSchema, invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toBeInstanceOf(Array);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('should return multiple error messages', () => {
      const invalidData = {email: 'not-an-email', count: 0};

      const result = safeValidateRequest(testSchema, invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.length).toBeGreaterThanOrEqual(2);
      }
    });

    it('should extract error messages from Zod errors', () => {
      const invalidData = {email: 'invalid', count: -1};

      const result = safeValidateRequest(testSchema, invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.every(err => typeof err === 'string')).toBe(true);
      }
    });

    it('should handle complex nested schemas', () => {
      const nestedSchema = z.object({
        user: z.object({
          name: z.string(),
          email: z.string().email()
        }),
        tags: z.array(z.string())
      });

      const validData = {
        user: {
          name: 'John',
          email: 'john@example.com'
        },
        tags: ['tag1', 'tag2']
      };

      const result = safeValidateRequest(nestedSchema, validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });
  });
});
