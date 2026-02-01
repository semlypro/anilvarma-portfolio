import {describe, it, expect, beforeEach, vi} from 'vitest';
import {NextRequest} from 'next/server';
import {POST, GET} from '@/app/api/revalidate/route';
import {createHmac} from 'crypto';

// Mock Next.js cache functions
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn()
}));

import {revalidatePath, revalidateTag} from 'next/cache';

describe('Revalidate API Route', () => {
  const validSecret = 'test-webhook-secret';

  beforeEach(() => {
    vi.clearAllMocks();
    // Set environment variable for tests
    process.env.SANITY_WEBHOOK_SECRET = validSecret;
  });

  describe('POST /api/revalidate', () => {
    const createValidSignature = (body: string): string => {
      const hash = createHmac('sha256', validSecret)
        .update(body)
        .digest('hex');
      return `sha256=${hash}`;
    };

    const createMockRequest = (
      payload: any,
      signature?: string
    ): NextRequest => {
      const body = JSON.stringify(payload);
      const headers = new Headers();

      if (signature !== undefined) {
        headers.set('sanity-webhook-signature', signature);
      }

      return new NextRequest('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers,
        body
      });
    };

    it('should return 500 if SANITY_WEBHOOK_SECRET is not configured', async () => {
      delete process.env.SANITY_WEBHOOK_SECRET;

      const payload = {_id: '123', _type: 'blogPost'};
      const request = createMockRequest(payload);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Webhook not configured');
    });

    it('should return 401 if signature is missing', async () => {
      const payload = {_id: '123', _type: 'blogPost'};
      const request = createMockRequest(payload); // No signature

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Invalid signature');
    });

    it('should return 401 if signature is invalid', async () => {
      const payload = {_id: '123', _type: 'blogPost'};
      const request = createMockRequest(payload, 'sha256=invalid-signature');

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Invalid signature');
    });

    it('should revalidate blog post paths with valid signature', async () => {
      const payload = {
        _id: 'blog-post-123',
        _type: 'blogPost',
        slug: {current: 'my-blog-post'}
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.revalidated).toContain('/blog');
      expect(data.revalidated).toContain('/blog/my-blog-post');
      expect(data.revalidated).toContain('/');
      expect(revalidatePath).toHaveBeenCalledWith('/blog');
      expect(revalidatePath).toHaveBeenCalledWith('/blog/my-blog-post');
      expect(revalidatePath).toHaveBeenCalledWith('/');
      expect(revalidateTag).toHaveBeenCalledWith('blog-post-123');
    });

    it('should revalidate template paths', async () => {
      const payload = {
        _id: 'template-123',
        _type: 'template',
        slug: {current: 'my-template'}
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.revalidated).toContain('/templates');
      expect(data.revalidated).toContain('/templates/my-template');
      expect(data.revalidated).toContain('/');
    });

    it('should revalidate seoAgent paths', async () => {
      const payload = {
        _id: 'agent-123',
        _type: 'seoAgent',
        slug: {current: 'my-agent'}
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.revalidated).toContain('/seo-agents');
      expect(data.revalidated).toContain('/seo-agents/my-agent');
    });

    it('should revalidate case study paths', async () => {
      const payload = {
        _id: 'case-study-123',
        _type: 'caseStudy',
        slug: {current: 'my-case-study'}
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.revalidated).toContain('/case-studies');
      expect(data.revalidated).toContain('/case-studies/my-case-study');
    });

    it('should revalidate glossary paths', async () => {
      const payload = {
        _id: 'glossary-123',
        _type: 'glossaryTerm',
        slug: {current: 'my-term'}
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.revalidated).toContain('/glossary');
      expect(data.revalidated).toContain('/glossary/my-term');
    });

    it('should revalidate homepage for homepage document', async () => {
      const payload = {
        _id: 'homepage',
        _type: 'homepage'
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.revalidated).toContain('/');
    });

    it('should revalidate about page for about document', async () => {
      const payload = {
        _id: 'about',
        _type: 'about'
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.revalidated).toContain('/about');
    });

    it('should revalidate homepage for siteSettings', async () => {
      const payload = {
        _id: 'site-settings',
        _type: 'siteSettings'
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.revalidated).toContain('/');
    });

    it('should revalidate homepage for navigation', async () => {
      const payload = {
        _id: 'navigation',
        _type: 'navigation'
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.revalidated).toContain('/');
    });

    it('should revalidate multiple pages for testimonial', async () => {
      const payload = {
        _id: 'testimonial-123',
        _type: 'testimonial'
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.revalidated).toContain('/');
      expect(data.revalidated).toContain('/case-studies');
    });

    it('should revalidate blog category paths', async () => {
      const payload = {
        _id: 'category-123',
        _type: 'blogCategory',
        slug: {current: 'my-category'}
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.revalidated).toContain('/blog');
      expect(data.revalidated).toContain('/blog/category/my-category');
    });

    it('should revalidate templates page for templateCategory', async () => {
      const payload = {
        _id: 'template-category-123',
        _type: 'templateCategory'
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.revalidated).toContain('/templates');
    });

    it('should revalidate newsletter page for newsletterIssue', async () => {
      const payload = {
        _id: 'newsletter-123',
        _type: 'newsletterIssue'
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.revalidated).toContain('/newsletter');
    });

    it('should revalidate speaking page for speakingEvent', async () => {
      const payload = {
        _id: 'event-123',
        _type: 'speakingEvent'
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.revalidated).toContain('/speaking');
    });

    it('should revalidate homepage for unknown document types', async () => {
      const payload = {
        _id: 'unknown-123',
        _type: 'unknownType'
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.revalidated).toContain('/');
    });

    it('should handle documents without slug gracefully', async () => {
      const payload = {
        _id: 'blog-post-no-slug',
        _type: 'blogPost'
        // No slug provided
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.revalidated).toContain('/blog');
      expect(data.revalidated).toContain('/');
      // Should not include the document-specific path
      expect(data.revalidated).not.toContain('/blog/undefined');
    });

    it('should return timestamp in response', async () => {
      const payload = {
        _id: '123',
        _type: 'blogPost'
      };

      const body = JSON.stringify(payload);
      const signature = createValidSignature(body);
      const request = createMockRequest(payload, signature);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.timestamp).toBeDefined();
      expect(new Date(data.timestamp)).toBeInstanceOf(Date);
    });

    it('should return 500 on JSON parse error', async () => {
      const invalidBody = 'not-valid-json';
      const signature = createValidSignature(invalidBody);
      const headers = new Headers();
      headers.set('sanity-webhook-signature', signature);

      const request = new NextRequest('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers,
        body: invalidBody
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Revalidation failed');
      expect(data.message).toBeDefined();
    });
  });

  describe('GET /api/revalidate', () => {
    it('should return 405 Method Not Allowed', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.error).toBe('Method not allowed. Use POST.');
    });
  });
});
