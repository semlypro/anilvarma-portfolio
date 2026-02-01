import {describe, it, expect, beforeEach, vi} from 'vitest';
import {
  getSiteSettings,
  getAllBlogPosts,
  getBlogPostBySlug,
  getAgentById,
  getTemplateBySlug,
  search
} from '@/lib/sanity/fetch';

// Mock the Sanity client
vi.mock('@/lib/sanity/client', () => ({
  sanityFetch: vi.fn()
}));

import {sanityFetch} from '@/lib/sanity/client';

describe('Sanity Fetch Library', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSiteSettings', () => {
    it('should fetch site settings with correct query and tags', async () => {
      const mockSettings = {
        _id: 'site-settings',
        _type: 'siteSettings',
        title: 'Anil Varma SEO',
        description: 'SEO Expert Portfolio',
        email: 'test@example.com'
      };

      vi.mocked(sanityFetch).mockResolvedValue(mockSettings);

      const result = await getSiteSettings();

      expect(result).toEqual(mockSettings);
      expect(sanityFetch).toHaveBeenCalledWith({
        query: expect.any(String),
        preview: false,
        tags: ['siteSettings']
      });
    });

    it('should support preview mode', async () => {
      vi.mocked(sanityFetch).mockResolvedValue(null);

      await getSiteSettings(true);

      expect(sanityFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          preview: true
        })
      );
    });

    it('should return null if settings not found', async () => {
      vi.mocked(sanityFetch).mockResolvedValue(null);

      const result = await getSiteSettings();

      expect(result).toBeNull();
    });
  });

  describe('getAllBlogPosts', () => {
    it('should fetch all blog posts', async () => {
      const mockPosts = [
        {
          _id: 'post-1',
          _type: 'blogPost',
          title: 'Post 1',
          slug: {current: 'post-1'}
        },
        {
          _id: 'post-2',
          _type: 'blogPost',
          title: 'Post 2',
          slug: {current: 'post-2'}
        }
      ];

      vi.mocked(sanityFetch).mockResolvedValue(mockPosts);

      const result = await getAllBlogPosts();

      expect(result).toEqual(mockPosts);
      expect(sanityFetch).toHaveBeenCalledWith({
        query: expect.any(String),
        preview: false,
        tags: ['blogPost']
      });
    });

    it('should return empty array if no posts found', async () => {
      vi.mocked(sanityFetch).mockResolvedValue([]);

      const result = await getAllBlogPosts();

      expect(result).toEqual([]);
    });
  });

  describe('getBlogPostBySlug', () => {
    it('should fetch blog post by slug with correct params', async () => {
      const mockPost = {
        _id: 'post-123',
        _type: 'blogPost',
        title: 'Test Post',
        slug: {current: 'test-post'}
      };

      vi.mocked(sanityFetch).mockResolvedValue(mockPost);

      const result = await getBlogPostBySlug('test-post');

      expect(result).toEqual(mockPost);
      expect(sanityFetch).toHaveBeenCalledWith({
        query: expect.any(String),
        params: {slug: 'test-post'},
        preview: false,
        tags: ['blogPost', 'blogPost:test-post']
      });
    });

    it('should return null for non-existent slug', async () => {
      vi.mocked(sanityFetch).mockResolvedValue(null);

      const result = await getBlogPostBySlug('non-existent');

      expect(result).toBeNull();
    });

    it('should support preview mode with slug', async () => {
      vi.mocked(sanityFetch).mockResolvedValue(null);

      await getBlogPostBySlug('test-post', true);

      expect(sanityFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          preview: true,
          params: {slug: 'test-post'}
        })
      );
    });
  });

  describe('getAgentById', () => {
    it('should fetch agent by ID with correct params', async () => {
      const mockAgent = {
        _id: 'agent-123',
        _type: 'seoAgent',
        title: 'Test Agent',
        slug: {current: 'test-agent'}
      };

      vi.mocked(sanityFetch).mockResolvedValue(mockAgent);

      const result = await getAgentById('agent-123');

      expect(result).toEqual(mockAgent);
      expect(sanityFetch).toHaveBeenCalledWith({
        query: expect.any(String),
        params: {agentId: 'agent-123'},
        preview: false,
        tags: ['seoAgent', 'seoAgent:agent-123']
      });
    });

    it('should return null for non-existent agent ID', async () => {
      vi.mocked(sanityFetch).mockResolvedValue(null);

      const result = await getAgentById('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('getTemplateBySlug', () => {
    it('should fetch template by slug', async () => {
      const mockTemplate = {
        _id: 'template-123',
        _type: 'template',
        name: 'SEO Template',
        slug: {current: 'seo-template'}
      };

      vi.mocked(sanityFetch).mockResolvedValue(mockTemplate);

      const result = await getTemplateBySlug('seo-template');

      expect(result).toEqual(mockTemplate);
      expect(sanityFetch).toHaveBeenCalledWith({
        query: expect.any(String),
        params: {slug: 'seo-template'},
        preview: false,
        tags: ['template', 'template:seo-template']
      });
    });

    it('should return null for non-existent template', async () => {
      vi.mocked(sanityFetch).mockResolvedValue(null);

      const result = await getTemplateBySlug('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('search', () => {
    it('should perform search across all content types', async () => {
      const mockSearchResults = {
        blogPosts: [
          {
            _type: 'blogPost',
            title: 'SEO Blog',
            slug: 'seo-blog'
          }
        ],
        templates: [
          {
            _type: 'template',
            title: 'SEO Template',
            slug: 'seo-template'
          }
        ],
        agents: [],
        glossary: [],
        caseStudies: []
      };

      vi.mocked(sanityFetch).mockResolvedValue(mockSearchResults);

      const result = await search('seo');

      expect(result).toEqual(mockSearchResults);
      expect(sanityFetch).toHaveBeenCalledWith({
        query: expect.any(String),
        params: {searchTerm: 'seo'},
        preview: false,
        tags: ['blogPost', 'template', 'seoAgent', 'glossaryTerm', 'caseStudy']
      });
    });

    it('should return empty results for no matches', async () => {
      const emptyResults = {
        blogPosts: [],
        templates: [],
        agents: [],
        glossary: [],
        caseStudies: []
      };

      vi.mocked(sanityFetch).mockResolvedValue(emptyResults);

      const result = await search('nonexistent');

      expect(result).toEqual(emptyResults);
    });

    it('should handle search term with special characters', async () => {
      const mockResults = {
        blogPosts: [],
        templates: [],
        agents: [],
        glossary: [],
        caseStudies: []
      };

      vi.mocked(sanityFetch).mockResolvedValue(mockResults);

      const searchTerm = 'test & search "query"';
      await search(searchTerm);

      expect(sanityFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          params: {searchTerm}
        })
      );
    });
  });

  describe('Error handling', () => {
    it('should propagate errors from sanityFetch', async () => {
      const error = new Error('Sanity fetch failed');
      vi.mocked(sanityFetch).mockRejectedValue(error);

      await expect(getSiteSettings()).rejects.toThrow('Sanity fetch failed');
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network request failed');
      vi.mocked(sanityFetch).mockRejectedValue(networkError);

      await expect(getAllBlogPosts()).rejects.toThrow('Network request failed');
    });
  });

  describe('Caching tags', () => {
    it('should use correct tags for homepage query', async () => {
      vi.mocked(sanityFetch).mockResolvedValue(null);

      const {getHomepage} = await import('@/lib/sanity/fetch');
      await getHomepage();

      expect(sanityFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          tags: ['homepage', 'blogPost', 'template', 'testimonial']
        })
      );
    });

    it('should use multiple tags for entity-specific queries', async () => {
      vi.mocked(sanityFetch).mockResolvedValue(null);

      await getBlogPostBySlug('test-slug');

      expect(sanityFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          tags: ['blogPost', 'blogPost:test-slug']
        })
      );
    });
  });

  describe('Preview mode', () => {
    it('should default to preview=false', async () => {
      vi.mocked(sanityFetch).mockResolvedValue([]);

      await getAllBlogPosts();

      expect(sanityFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          preview: false
        })
      );
    });

    it('should pass preview=true when specified', async () => {
      vi.mocked(sanityFetch).mockResolvedValue([]);

      await getAllBlogPosts(true);

      expect(sanityFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          preview: true
        })
      );
    });
  });
});
