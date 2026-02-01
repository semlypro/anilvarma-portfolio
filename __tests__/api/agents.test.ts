import {describe, it, expect, beforeEach, vi} from 'vitest';
import {NextRequest} from 'next/server';
import {POST, GET} from '@/app/api/agents/[agentId]/route';
import type {SEOAgent} from '@/types';

// Mock dependencies
vi.mock('@/lib/sanity/fetch', () => ({
  getAgentById: vi.fn()
}));

vi.mock('@/lib/ai/anthropic', () => ({
  streamClaude: vi.fn(),
  isAnthropicConfigured: vi.fn()
}));

vi.mock('@/lib/utils/rateLimit', () => ({
  checkRateLimit: vi.fn(),
  getClientIp: vi.fn()
}));

vi.mock('@/lib/utils/validation', () => ({
  agentRequestSchema: {},
  safeValidateRequest: vi.fn()
}));

import {getAgentById} from '@/lib/sanity/fetch';
import {streamClaude, isAnthropicConfigured} from '@/lib/ai/anthropic';
import {checkRateLimit, getClientIp} from '@/lib/utils/rateLimit';
import {safeValidateRequest} from '@/lib/utils/validation';

describe('Agents API Route', () => {
  const mockAgent: SEOAgent = {
    _id: 'agent-123',
    _type: 'seoAgent',
    _createdAt: '2024-01-01T00:00:00.000Z',
    _updatedAt: '2024-01-01T00:00:00.000Z',
    _rev: 'rev-123',
    title: 'Test Agent',
    slug: {
      _type: 'slug',
      current: 'test-agent'
    },
    description: 'A test agent',
    category: {
      _id: 'cat-123',
      _type: 'agentCategory',
      _createdAt: '2024-01-01T00:00:00.000Z',
      _updatedAt: '2024-01-01T00:00:00.000Z',
      _rev: 'rev-cat',
      title: 'Test Category',
      slug: {_type: 'slug', current: 'test'},
      description: 'Test'
    },
    systemPrompt: 'You are a test agent',
    inputFields: [
      {
        name: 'url',
        label: 'URL',
        type: 'text',
        placeholder: 'https://example.com',
        required: true
      },
      {
        name: 'keywords',
        label: 'Keywords',
        type: 'textarea',
        placeholder: 'keyword1, keyword2',
        required: false
      }
    ],
    outputType: 'markdown',
    usageLimit: 10,
    isEnabled: true,
    isFeatured: false
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Default mocks
    vi.mocked(isAnthropicConfigured).mockReturnValue(true);
    vi.mocked(getClientIp).mockReturnValue('127.0.0.1');
    vi.mocked(checkRateLimit).mockResolvedValue({
      success: true,
      remaining: 9,
      reset: Date.now() + 86400000
    });
  });

  describe('POST /api/agents/[agentId]', () => {
    const createMockRequest = (body: any): NextRequest => {
      return new NextRequest('http://localhost:3000/api/agents/test-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    };

    const createMockContext = (agentId: string) => ({
      params: Promise.resolve({agentId})
    });

    it('should return 400 on validation failure', async () => {
      vi.mocked(safeValidateRequest).mockReturnValue({
        success: false,
        errors: [{field: 'inputs', message: 'Invalid inputs'}]
      });

      const request = createMockRequest({inputs: {}});
      const context = createMockContext('test-agent');

      const response = await POST(request, context);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Validation failed');
      expect(data.errors).toBeDefined();
    });

    it('should return 503 if Anthropic API is not configured', async () => {
      vi.mocked(isAnthropicConfigured).mockReturnValue(false);
      vi.mocked(safeValidateRequest).mockReturnValue({
        success: true,
        data: {agentId: 'test-agent', inputs: {}}
      });

      const request = createMockRequest({inputs: {}});
      const context = createMockContext('test-agent');

      const response = await POST(request, context);
      const data = await response.json();

      expect(response.status).toBe(503);
      expect(data.success).toBe(false);
      expect(data.error).toBe('AI service not configured');
    });

    it('should return 404 if agent not found', async () => {
      vi.mocked(safeValidateRequest).mockReturnValue({
        success: true,
        data: {agentId: 'test-agent', inputs: {}}
      });
      vi.mocked(getAgentById).mockResolvedValue(null);

      const request = createMockRequest({inputs: {}});
      const context = createMockContext('test-agent');

      const response = await POST(request, context);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Agent not found');
    });

    it('should return 403 if agent is disabled', async () => {
      vi.mocked(safeValidateRequest).mockReturnValue({
        success: true,
        data: {agentId: 'test-agent', inputs: {}}
      });
      vi.mocked(getAgentById).mockResolvedValue({
        ...mockAgent,
        isEnabled: false
      });

      const request = createMockRequest({inputs: {}});
      const context = createMockContext('test-agent');

      const response = await POST(request, context);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Agent is currently disabled');
    });

    it('should return 429 on rate limit exceeded', async () => {
      const resetTime = Date.now() + 3600000;
      vi.mocked(safeValidateRequest).mockReturnValue({
        success: true,
        data: {agentId: 'test-agent', inputs: {url: 'https://example.com'}}
      });
      vi.mocked(getAgentById).mockResolvedValue(mockAgent);
      vi.mocked(checkRateLimit).mockResolvedValue({
        success: false,
        remaining: 0,
        reset: resetTime
      });

      const request = createMockRequest({inputs: {url: 'https://example.com'}});
      const context = createMockContext('test-agent');

      const response = await POST(request, context);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Rate limit exceeded');
      expect(data.resetAt).toBeDefined();
      expect(response.headers.get('X-RateLimit-Limit')).toBe('10');
      expect(response.headers.get('X-RateLimit-Remaining')).toBe('0');
    });

    it('should return 400 if required fields are missing', async () => {
      vi.mocked(safeValidateRequest).mockReturnValue({
        success: true,
        data: {agentId: 'test-agent', inputs: {}} // Missing required 'url' field
      });
      vi.mocked(getAgentById).mockResolvedValue(mockAgent);

      const request = createMockRequest({inputs: {}});
      const context = createMockContext('test-agent');

      const response = await POST(request, context);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Missing required fields');
      expect(data.fields).toContain('url');
    });

    it('should stream response successfully with valid inputs', async () => {
      vi.mocked(safeValidateRequest).mockReturnValue({
        success: true,
        data: {
          agentId: 'test-agent',
          inputs: {url: 'https://example.com', keywords: 'seo, testing'}
        }
      });
      vi.mocked(getAgentById).mockResolvedValue(mockAgent);

      // Mock streaming generator
      async function* mockGenerator() {
        yield 'Test ';
        yield 'streaming ';
        yield 'response';
        yield {inputTokens: 100, outputTokens: 50};
      }

      vi.mocked(streamClaude).mockReturnValue(mockGenerator());

      const request = createMockRequest({
        inputs: {url: 'https://example.com', keywords: 'seo, testing'}
      });
      const context = createMockContext('test-agent');

      const response = await POST(request, context);

      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
      expect(response.headers.get('X-RateLimit-Limit')).toBe('10');
      expect(response.headers.get('X-RateLimit-Remaining')).toBe('9');

      // Verify streamClaude was called with correct params
      expect(streamClaude).toHaveBeenCalledWith({
        systemPrompt: mockAgent.systemPrompt,
        userMessage: expect.stringContaining('URL: https://example.com'),
        maxTokens: 4096,
        temperature: 1.0
      });

      // Read the stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = '';

      if (reader) {
        while (true) {
          const {done, value} = await reader.read();
          if (done) break;
          result += decoder.decode(value, {stream: true});
        }
      }

      expect(result).toContain('Test streaming response');
      expect(result).toContain('__USAGE__');
      expect(result).toContain('"inputTokens":100');
      expect(result).toContain('"outputTokens":50');
    });

    it('should handle streaming errors gracefully', async () => {
      vi.mocked(safeValidateRequest).mockReturnValue({
        success: true,
        data: {agentId: 'test-agent', inputs: {url: 'https://example.com'}}
      });
      vi.mocked(getAgentById).mockResolvedValue(mockAgent);

      // Mock error in streaming
      async function* mockErrorGenerator() {
        yield 'Start ';
        throw new Error('Streaming error');
      }

      vi.mocked(streamClaude).mockReturnValue(mockErrorGenerator());

      const request = createMockRequest({inputs: {url: 'https://example.com'}});
      const context = createMockContext('test-agent');

      const response = await POST(request, context);

      expect(response.status).toBe(200);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = '';

      if (reader) {
        while (true) {
          const {done, value} = await reader.read();
          if (done) break;
          result += decoder.decode(value, {stream: true});
        }
      }

      expect(result).toContain('Start ');
      expect(result).toContain('Error: Streaming error');
    });

    it('should format user message correctly with multiple inputs', async () => {
      vi.mocked(safeValidateRequest).mockReturnValue({
        success: true,
        data: {
          agentId: 'test-agent',
          inputs: {
            url: 'https://example.com',
            keywords: 'seo, testing, optimization'
          }
        }
      });
      vi.mocked(getAgentById).mockResolvedValue(mockAgent);

      async function* mockGenerator() {
        yield 'Response';
        yield {inputTokens: 10, outputTokens: 5};
      }

      vi.mocked(streamClaude).mockReturnValue(mockGenerator());

      const request = createMockRequest({
        inputs: {
          url: 'https://example.com',
          keywords: 'seo, testing, optimization'
        }
      });
      const context = createMockContext('test-agent');

      await POST(request, context);

      expect(streamClaude).toHaveBeenCalledWith(
        expect.objectContaining({
          userMessage: expect.stringMatching(/URL: https:\/\/example\.com/),
        })
      );

      const callArgs = vi.mocked(streamClaude).mock.calls[0][0];
      expect(callArgs.userMessage).toContain('URL: https://example.com');
      expect(callArgs.userMessage).toContain('Keywords: seo, testing, optimization');
    });

    it('should handle 500 error on unexpected exception', async () => {
      vi.mocked(safeValidateRequest).mockReturnValue({
        success: true,
        data: {agentId: 'test-agent', inputs: {url: 'https://example.com'}}
      });
      vi.mocked(getAgentById).mockRejectedValue(new Error('Database error'));

      const request = createMockRequest({inputs: {url: 'https://example.com'}});
      const context = createMockContext('test-agent');

      const response = await POST(request, context);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Internal server error');
      expect(data.message).toBe('Database error');
    });

    it('should use custom usage limit from agent config', async () => {
      const customAgent = {
        ...mockAgent,
        usageLimit: 50
      };

      vi.mocked(safeValidateRequest).mockReturnValue({
        success: true,
        data: {agentId: 'test-agent', inputs: {url: 'https://example.com'}}
      });
      vi.mocked(getAgentById).mockResolvedValue(customAgent);

      async function* mockGenerator() {
        yield 'Response';
        yield {inputTokens: 10, outputTokens: 5};
      }

      vi.mocked(streamClaude).mockReturnValue(mockGenerator());

      const request = createMockRequest({inputs: {url: 'https://example.com'}});
      const context = createMockContext('test-agent');

      const response = await POST(request, context);

      expect(checkRateLimit).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: 50
        })
      );

      expect(response.headers.get('X-RateLimit-Limit')).toBe('50');
    });
  });

  describe('GET /api/agents/[agentId]', () => {
    it('should return 405 Method Not Allowed', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.error).toBe('Method not allowed. Use POST.');
    });
  });
});
