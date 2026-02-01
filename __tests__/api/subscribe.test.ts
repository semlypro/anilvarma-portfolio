import {describe, it, expect, beforeEach, vi} from 'vitest';
import {NextRequest} from 'next/server';
import {POST} from '@/app/api/subscribe/route';

// Mock dependencies
vi.mock('@/lib/sanity/client', () => ({
  client: {
    fetch: vi.fn(),
    create: vi.fn(),
    patch: vi.fn(() => ({
      set: vi.fn(() => ({
        commit: vi.fn()
      }))
    }))
  }
}));

vi.mock('@/lib/email/resend', () => ({
  sendEmail: vi.fn()
}));

vi.mock('@/lib/utils/validation', () => ({
  subscribeRequestSchema: {
    safeParse: vi.fn()
  }
}));

import {client} from '@/lib/sanity/client';
import {sendEmail} from '@/lib/email/resend';
import {subscribeRequestSchema} from '@/lib/utils/validation';

describe('Subscribe API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/subscribe', () => {
    const createMockRequest = (body: any): NextRequest => {
      return new NextRequest('http://localhost:3000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    };

    it('should return 400 on validation failure', async () => {
      vi.mocked(subscribeRequestSchema.safeParse).mockReturnValue({
        success: false,
        error: {
          errors: [
            {message: 'Invalid email format', path: ['email']}
          ]
        }
      } as any);

      const request = createMockRequest({email: 'invalid-email'});

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid request data');
      expect(data.details).toContain('Invalid email format');
    });

    it('should return already subscribed message if email exists with newsletter tag', async () => {
      vi.mocked(subscribeRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'existing@example.com',
          source: 'newsletter',
          tags: []
        }
      });

      const existingContact = {
        _id: 'contact-123',
        email: 'existing@example.com',
        source: 'newsletter',
        tags: ['newsletter']
      };

      vi.mocked(client.fetch).mockResolvedValue(existingContact);

      const request = createMockRequest({email: 'existing@example.com'});

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('You are already subscribed to the newsletter');
      expect(data.alreadySubscribed).toBe(true);
      expect(client.create).not.toHaveBeenCalled();
      expect(client.patch).not.toHaveBeenCalled();
      expect(sendEmail).not.toHaveBeenCalled();
    });

    it('should return already subscribed if source is newsletter', async () => {
      vi.mocked(subscribeRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'existing@example.com',
          source: 'newsletter',
          tags: []
        }
      });

      const existingContact = {
        _id: 'contact-123',
        email: 'existing@example.com',
        source: 'newsletter',
        tags: []
      };

      vi.mocked(client.fetch).mockResolvedValue(existingContact);

      const request = createMockRequest({email: 'existing@example.com'});

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.alreadySubscribed).toBe(true);
    });

    it('should update existing contact and send welcome email if not newsletter subscriber', async () => {
      vi.mocked(subscribeRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'existing@example.com',
          source: 'newsletter',
          tags: ['blog']
        }
      });

      const existingContact = {
        _id: 'contact-456',
        email: 'existing@example.com',
        source: 'template_download',
        tags: ['template-download']
      };

      const mockPatch = {
        set: vi.fn(() => ({
          commit: vi.fn().mockResolvedValue({})
        }))
      };

      vi.mocked(client.fetch).mockResolvedValue(existingContact);
      vi.mocked(client.patch).mockReturnValue(mockPatch as any);
      vi.mocked(sendEmail).mockResolvedValue({id: 'email-123'} as any);

      const request = createMockRequest({
        email: 'existing@example.com',
        tags: ['blog']
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Successfully subscribed to newsletter');
      expect(data.alreadySubscribed).toBe(false);

      expect(client.patch).toHaveBeenCalledWith('contact-456');
      expect(mockPatch.set).toHaveBeenCalledWith({
        tags: ['template-download', 'newsletter', 'blog']
      });

      expect(sendEmail).toHaveBeenCalledWith({
        to: 'existing@example.com',
        subject: "Welcome to Anil Varma's Newsletter!",
        react: expect.anything()
      });
    });

    it('should create new contact and send welcome email for new subscriber', async () => {
      vi.mocked(subscribeRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'newuser@example.com',
          source: 'newsletter',
          tags: ['seo-tips']
        }
      });

      vi.mocked(client.fetch).mockResolvedValue(null); // No existing contact
      vi.mocked(client.create).mockResolvedValue({_id: 'contact-789'} as any);
      vi.mocked(sendEmail).mockResolvedValue({id: 'email-456'} as any);

      const request = createMockRequest({
        email: 'newuser@example.com',
        tags: ['seo-tips']
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Successfully subscribed to newsletter');
      expect(data.alreadySubscribed).toBe(false);

      expect(client.create).toHaveBeenCalledWith({
        _type: 'contact',
        email: 'newuser@example.com',
        source: 'newsletter',
        tags: ['newsletter', 'seo-tips'],
        createdAt: expect.any(String),
        metadata: {
          subscribedAt: expect.any(String),
          subscriptionSource: 'newsletter'
        }
      });

      expect(sendEmail).toHaveBeenCalledWith({
        to: 'newuser@example.com',
        subject: "Welcome to Anil Varma's Newsletter!",
        react: expect.anything()
      });
    });

    it('should use default source and tags if not provided', async () => {
      vi.mocked(subscribeRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'user@example.com'
          // source and tags will use defaults
        }
      });

      vi.mocked(client.fetch).mockResolvedValue(null);
      vi.mocked(client.create).mockResolvedValue({_id: 'contact-123'} as any);
      vi.mocked(sendEmail).mockResolvedValue({id: 'email-123'} as any);

      const request = createMockRequest({email: 'user@example.com'});

      await POST(request);

      expect(client.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'user@example.com',
          source: 'newsletter',
          tags: ['newsletter']
        })
      );
    });

    it('should handle errors gracefully', async () => {
      vi.mocked(subscribeRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'user@example.com',
          source: 'newsletter',
          tags: []
        }
      });

      vi.mocked(client.fetch).mockRejectedValue(new Error('Database error'));

      const request = createMockRequest({email: 'user@example.com'});

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to process subscription');
      expect(data.message).toBe('Database error');
    });

    it('should handle email sending failure gracefully', async () => {
      vi.mocked(subscribeRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'user@example.com',
          source: 'newsletter',
          tags: []
        }
      });

      vi.mocked(client.fetch).mockResolvedValue(null);
      vi.mocked(client.create).mockResolvedValue({_id: 'contact-123'} as any);
      vi.mocked(sendEmail).mockRejectedValue(new Error('Email service unavailable'));

      const request = createMockRequest({email: 'user@example.com'});

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to process subscription');
      expect(data.message).toBe('Email service unavailable');

      // Contact should still be created before email fails
      expect(client.create).toHaveBeenCalled();
    });

    it('should preserve existing tags when updating contact', async () => {
      vi.mocked(subscribeRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'existing@example.com',
          source: 'newsletter',
          tags: ['promo-2024']
        }
      });

      const existingContact = {
        _id: 'contact-123',
        email: 'existing@example.com',
        source: 'template_download',
        tags: ['template-download', 'seo']
      };

      const mockPatch = {
        set: vi.fn(() => ({
          commit: vi.fn().mockResolvedValue({})
        }))
      };

      vi.mocked(client.fetch).mockResolvedValue(existingContact);
      vi.mocked(client.patch).mockReturnValue(mockPatch as any);
      vi.mocked(sendEmail).mockResolvedValue({id: 'email-123'} as any);

      const request = createMockRequest({
        email: 'existing@example.com',
        tags: ['promo-2024']
      });

      await POST(request);

      expect(mockPatch.set).toHaveBeenCalledWith({
        tags: ['template-download', 'seo', 'newsletter', 'promo-2024']
      });
    });

    it('should handle existing contact with no tags field', async () => {
      vi.mocked(subscribeRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'existing@example.com',
          source: 'newsletter',
          tags: []
        }
      });

      const existingContact = {
        _id: 'contact-123',
        email: 'existing@example.com',
        source: 'template_download'
        // No tags field
      };

      const mockPatch = {
        set: vi.fn(() => ({
          commit: vi.fn().mockResolvedValue({})
        }))
      };

      vi.mocked(client.fetch).mockResolvedValue(existingContact);
      vi.mocked(client.patch).mockReturnValue(mockPatch as any);
      vi.mocked(sendEmail).mockResolvedValue({id: 'email-123'} as any);

      const request = createMockRequest({email: 'existing@example.com'});

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(mockPatch.set).toHaveBeenCalledWith({
        tags: ['newsletter']
      });
    });

    it('should create proper metadata for new subscriber', async () => {
      const now = new Date();
      vi.mocked(subscribeRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'newuser@example.com',
          source: 'blog-cta',
          tags: []
        }
      });

      vi.mocked(client.fetch).mockResolvedValue(null);
      vi.mocked(client.create).mockResolvedValue({_id: 'contact-123'} as any);
      vi.mocked(sendEmail).mockResolvedValue({id: 'email-123'} as any);

      const request = createMockRequest({
        email: 'newuser@example.com',
        source: 'blog-cta'
      });

      await POST(request);

      const createCall = vi.mocked(client.create).mock.calls[0][0];
      expect(createCall.metadata.subscriptionSource).toBe('blog-cta');
      expect(createCall.metadata.subscribedAt).toBeDefined();
      expect(new Date(createCall.metadata.subscribedAt).getTime()).toBeGreaterThanOrEqual(
        now.getTime() - 1000
      );
    });
  });
});
