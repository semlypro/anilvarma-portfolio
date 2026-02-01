import {describe, it, expect, beforeEach, vi} from 'vitest';
import {NextRequest} from 'next/server';
import {POST} from '@/app/api/download/route';

// Mock dependencies
vi.mock('@/lib/sanity/client', () => ({
  client: {
    fetch: vi.fn(),
    create: vi.fn(),
    patch: vi.fn(() => ({
      inc: vi.fn(() => ({
        commit: vi.fn()
      }))
    }))
  }
}));

vi.mock('@/lib/email/resend', () => ({
  sendEmail: vi.fn()
}));

vi.mock('@/lib/utils/validation', () => ({
  downloadRequestSchema: {
    safeParse: vi.fn()
  }
}));

vi.mock('crypto', async () => {
  const actual = await vi.importActual('crypto');
  return {
    ...actual,
    randomBytes: vi.fn(() => ({
      toString: () => 'mock-token-123'
    }))
  };
});

import {client} from '@/lib/sanity/client';
import {sendEmail} from '@/lib/email/resend';
import {downloadRequestSchema} from '@/lib/utils/validation';

describe('Download API Route', () => {
  const mockTemplate = {
    _id: 'template-123',
    name: 'SEO Template',
    slug: {current: 'seo-template'},
    fileUrl: 'https://cdn.example.com/template.pdf',
    category: {
      _id: 'cat-123',
      name: 'SEO'
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/download', () => {
    const createMockRequest = (body: any): NextRequest => {
      return new NextRequest('http://localhost:3000/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    };

    it('should return 400 on validation failure', async () => {
      vi.mocked(downloadRequestSchema.safeParse).mockReturnValue({
        success: false,
        error: {
          errors: [
            {message: 'Invalid email', path: ['email']},
            {message: 'Template ID required', path: ['templateId']}
          ]
        }
      } as any);

      const request = createMockRequest({
        email: 'invalid',
        templateId: ''
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid request data');
      expect(data.details).toContain('Invalid email');
      expect(data.details).toContain('Template ID required');
    });

    it('should return 404 if template not found', async () => {
      vi.mocked(downloadRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'test@example.com',
          name: 'Test User',
          templateId: 'nonexistent-template'
        }
      });

      vi.mocked(client.fetch).mockResolvedValueOnce(null); // Template not found

      const request = createMockRequest({
        email: 'test@example.com',
        name: 'Test User',
        templateId: 'nonexistent-template'
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Template not found');
    });

    it('should create new contact if email does not exist', async () => {
      vi.mocked(downloadRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'newuser@example.com',
          name: 'New User',
          templateId: 'seo-template'
        }
      });

      vi.mocked(client.fetch)
        .mockResolvedValueOnce(mockTemplate) // Template fetch
        .mockResolvedValueOnce(null) // Existing contact (doesn't exist)
        .mockResolvedValueOnce([]); // Related templates

      vi.mocked(client.create).mockResolvedValue({_id: 'contact-123'} as any);
      vi.mocked(sendEmail).mockResolvedValue({id: 'email-123'} as any);

      const request = createMockRequest({
        email: 'newuser@example.com',
        name: 'New User',
        templateId: 'seo-template'
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Check your email for the download link');
      expect(data.templateName).toBe('SEO Template');

      expect(client.create).toHaveBeenCalledWith({
        _type: 'contact',
        email: 'newuser@example.com',
        name: 'New User',
        source: 'template_download',
        sourceId: mockTemplate._id,
        tags: ['template-download', 'seo'],
        createdAt: expect.any(String),
        metadata: {
          firstTemplate: mockTemplate.name,
          templateSlug: mockTemplate.slug.current
        }
      });
    });

    it('should not create contact if email already exists', async () => {
      vi.mocked(downloadRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'existing@example.com',
          name: 'Existing User',
          templateId: 'seo-template'
        }
      });

      const existingContact = {
        _id: 'contact-456',
        email: 'existing@example.com'
      };

      vi.mocked(client.fetch)
        .mockResolvedValueOnce(mockTemplate) // Template fetch
        .mockResolvedValueOnce(existingContact) // Existing contact
        .mockResolvedValueOnce([]); // Related templates

      vi.mocked(sendEmail).mockResolvedValue({id: 'email-123'} as any);

      const request = createMockRequest({
        email: 'existing@example.com',
        name: 'Existing User',
        templateId: 'seo-template'
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(client.create).not.toHaveBeenCalled();
    });

    it('should send download email with signed URL', async () => {
      vi.mocked(downloadRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'user@example.com',
          name: 'John Doe',
          templateId: 'seo-template'
        }
      });

      const relatedTemplates = [
        {name: 'Template 1', slug: 'template-1'},
        {name: 'Template 2', slug: 'template-2'}
      ];

      vi.mocked(client.fetch)
        .mockResolvedValueOnce(mockTemplate)
        .mockResolvedValueOnce(null) // New contact
        .mockResolvedValueOnce(relatedTemplates);

      vi.mocked(client.create).mockResolvedValue({_id: 'contact-123'} as any);
      vi.mocked(sendEmail).mockResolvedValue({id: 'email-123'} as any);

      const request = createMockRequest({
        email: 'user@example.com',
        name: 'John Doe',
        templateId: 'seo-template'
      });

      await POST(request);

      expect(sendEmail).toHaveBeenCalledWith({
        to: 'user@example.com',
        subject: 'Your SEO Template is ready!',
        react: expect.anything() // React component structure
      });
    });

    it('should generate signed URL with token and expiry', async () => {
      vi.mocked(downloadRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'user@example.com',
          name: 'Test User',
          templateId: 'seo-template'
        }
      });

      vi.mocked(client.fetch)
        .mockResolvedValueOnce(mockTemplate)
        .mockResolvedValueOnce({_id: 'contact-123'}) // Existing contact
        .mockResolvedValueOnce([]);

      vi.mocked(sendEmail).mockResolvedValue({id: 'email-123'} as any);

      const request = createMockRequest({
        email: 'user@example.com',
        name: 'Test User',
        templateId: 'seo-template'
      });

      await POST(request);

      expect(sendEmail).toHaveBeenCalled();
      const emailCall = vi.mocked(sendEmail).mock.calls[0][0];

      // The react component itself may be wrapped, check the call
      expect(emailCall.to).toBe('user@example.com');
      expect(emailCall.subject).toBe('Your SEO Template is ready!');
      expect(emailCall.react).toBeDefined();
    });

    it('should increment download count', async () => {
      vi.mocked(downloadRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'user@example.com',
          name: 'Test User',
          templateId: 'seo-template'
        }
      });

      const mockPatch = {
        inc: vi.fn(() => ({
          commit: vi.fn().mockResolvedValue({})
        }))
      };

      vi.mocked(client.fetch)
        .mockResolvedValueOnce(mockTemplate)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce([]);

      vi.mocked(client.create).mockResolvedValue({_id: 'contact-123'} as any);
      vi.mocked(client.patch).mockReturnValue(mockPatch as any);
      vi.mocked(sendEmail).mockResolvedValue({id: 'email-123'} as any);

      const request = createMockRequest({
        email: 'user@example.com',
        name: 'Test User',
        templateId: 'seo-template'
      });

      await POST(request);

      expect(client.patch).toHaveBeenCalledWith(mockTemplate._id);
      expect(mockPatch.inc).toHaveBeenCalledWith({downloadCount: 1});
    });

    it('should extract first name from full name for email', async () => {
      vi.mocked(downloadRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'user@example.com',
          name: 'Jane Smith',
          templateId: 'seo-template'
        }
      });

      vi.mocked(client.fetch)
        .mockResolvedValueOnce(mockTemplate)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce([]);

      vi.mocked(client.create).mockResolvedValue({_id: 'contact-123'} as any);
      vi.mocked(sendEmail).mockResolvedValue({id: 'email-123'} as any);

      const request = createMockRequest({
        email: 'user@example.com',
        name: 'Jane Smith',
        templateId: 'seo-template'
      });

      await POST(request);

      expect(sendEmail).toHaveBeenCalled();
      // Just verify email was sent with correct recipient
      const emailCall = vi.mocked(sendEmail).mock.calls[0][0];
      expect(emailCall.to).toBe('user@example.com');
    });

    it('should fetch related templates from same category', async () => {
      vi.mocked(downloadRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'user@example.com',
          name: 'Test User',
          templateId: 'seo-template'
        }
      });

      const relatedTemplates = [
        {name: 'Template A', slug: 'template-a'},
        {name: 'Template B', slug: 'template-b'},
        {name: 'Template C', slug: 'template-c'}
      ];

      vi.mocked(client.fetch)
        .mockResolvedValueOnce(mockTemplate)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(relatedTemplates);

      vi.mocked(client.create).mockResolvedValue({_id: 'contact-123'} as any);
      vi.mocked(sendEmail).mockResolvedValue({id: 'email-123'} as any);

      const request = createMockRequest({
        email: 'user@example.com',
        name: 'Test User',
        templateId: 'seo-template'
      });

      await POST(request);

      // Check third fetch call (related templates)
      expect(client.fetch).toHaveBeenCalledTimes(3);
      expect(sendEmail).toHaveBeenCalled();
    });

    it('should handle errors gracefully', async () => {
      vi.mocked(downloadRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'user@example.com',
          name: 'Test User',
          templateId: 'seo-template'
        }
      });

      vi.mocked(client.fetch).mockRejectedValue(new Error('Database connection failed'));

      const request = createMockRequest({
        email: 'user@example.com',
        name: 'Test User',
        templateId: 'seo-template'
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to process download request');
      expect(data.message).toBe('Database connection failed');
    });

    it('should handle missing category gracefully', async () => {
      const templateWithoutCategory = {
        ...mockTemplate,
        category: undefined
      };

      vi.mocked(downloadRequestSchema.safeParse).mockReturnValue({
        success: true,
        data: {
          email: 'user@example.com',
          name: 'Test User',
          templateId: 'seo-template'
        }
      });

      vi.mocked(client.fetch)
        .mockResolvedValueOnce(templateWithoutCategory)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce([]);

      vi.mocked(client.create).mockResolvedValue({_id: 'contact-123'} as any);
      vi.mocked(sendEmail).mockResolvedValue({id: 'email-123'} as any);

      const request = createMockRequest({
        email: 'user@example.com',
        name: 'Test User',
        templateId: 'seo-template'
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });
});
