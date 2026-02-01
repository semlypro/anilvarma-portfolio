import { sanityFetch } from './client'
import {
  // Site Settings & Navigation
  getSiteSettingsQuery,
  getNavigationQuery,

  // Homepage
  getHomepageQuery,

  // About
  getAboutQuery,

  // Blog
  getAllBlogPostsQuery,
  getBlogPostBySlugQuery,
  getBlogCategoriesQuery,
  getBlogPostsByCategoryQuery,
  getBlogPostsByTagQuery,
  getRecentBlogPostsQuery,

  // Comparison Posts
  getAllComparisonPostsQuery,
  getComparisonPostBySlugQuery,

  // Listicle Posts
  getAllListiclePostsQuery,
  getListiclePostBySlugQuery,

  // Templates
  getAllTemplatesQuery,
  getTemplateBySlugQuery,
  getTemplateCategoriesQuery,
  getTemplatesByCategoryQuery,
  getFeaturedTemplatesQuery,

  // SEO Agents
  getAllAgentsQuery,
  getAgentBySlugQuery,
  getAgentByIdQuery,
  getAgentCategoriesQuery,
  getAgentsByCategoryQuery,
  getFeaturedAgentsQuery,

  // Case Studies
  getAllCaseStudiesQuery,
  getCaseStudyBySlugQuery,
  getFeaturedCaseStudiesQuery,

  // Glossary
  getAllGlossaryTermsQuery,
  getGlossaryTermBySlugQuery,
  getGlossaryTermsByLetterQuery,
  getGlossaryLettersQuery,

  // Testimonials
  getAllTestimonialsQuery,
  getFeaturedTestimonialsQuery,

  // Authors
  getAllAuthorsQuery,
  getAuthorByIdQuery,

  // Newsletter
  getNewsletterIssuesQuery,
  getNewsletterIssueBySlugQuery,
  getLatestNewsletterIssueQuery,

  // Speaking Events
  getSpeakingEventsQuery,
  getUpcomingSpeakingEventsQuery,
  getPastSpeakingEventsQuery,

  // Search
  searchQuery,

  // Sitemap
  getAllSlugsQuery,

  // Contacts
  getAllContactsQuery,
  getContactsBySourceQuery,
} from './queries'

import type {
  SiteSettings,
  Navigation,
  Homepage,
  About,
  BlogPost,
  BlogCategory,
  ComparisonPost,
  ListiclePost,
  Template,
  TemplateCategory,
  SEOAgent,
  AgentCategory,
  CaseStudy,
  GlossaryTerm,
  Testimonial,
  Author,
  NewsletterIssue,
  SpeakingEvent,
  SearchResult,
  Contact,
} from '@/types'

// ===========================================
// SITE SETTINGS & NAVIGATION
// ===========================================

export async function getSiteSettings(preview = false): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings>({
    query: getSiteSettingsQuery,
    preview,
    tags: ['siteSettings'],
  })
}

export async function getNavigation(preview = false): Promise<Navigation | null> {
  return sanityFetch<Navigation>({
    query: getNavigationQuery,
    preview,
    tags: ['navigation'],
  })
}

// ===========================================
// HOMEPAGE
// ===========================================

export async function getHomepage(preview = false): Promise<Homepage | null> {
  return sanityFetch<Homepage>({
    query: getHomepageQuery,
    preview,
    tags: ['homepage', 'blogPost', 'template', 'testimonial'],
  })
}

// ===========================================
// ABOUT
// ===========================================

export async function getAbout(preview = false): Promise<About | null> {
  return sanityFetch<About>({
    query: getAboutQuery,
    preview,
    tags: ['about'],
  })
}

// ===========================================
// BLOG
// ===========================================

export async function getAllBlogPosts(preview = false): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>({
    query: getAllBlogPostsQuery,
    preview,
    tags: ['blogPost'],
  })
}

export async function getBlogPostBySlug(
  slug: string,
  preview = false
): Promise<BlogPost | null> {
  return sanityFetch<BlogPost>({
    query: getBlogPostBySlugQuery,
    params: { slug },
    preview,
    tags: ['blogPost', `blogPost:${slug}`],
  })
}

export async function getBlogCategories(preview = false): Promise<BlogCategory[]> {
  return sanityFetch<BlogCategory[]>({
    query: getBlogCategoriesQuery,
    preview,
    tags: ['blogCategory'],
  })
}

export async function getBlogPostsByCategory(
  categoryId: string,
  preview = false
): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>({
    query: getBlogPostsByCategoryQuery,
    params: { categoryId },
    preview,
    tags: ['blogPost', `blogCategory:${categoryId}`],
  })
}

export async function getBlogPostsByTag(
  tag: string,
  preview = false
): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>({
    query: getBlogPostsByTagQuery,
    params: { tag },
    preview,
    tags: ['blogPost'],
  })
}

export async function getRecentBlogPosts(preview = false): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>({
    query: getRecentBlogPostsQuery,
    preview,
    tags: ['blogPost'],
  })
}

// ===========================================
// COMPARISON POSTS
// ===========================================

export async function getAllComparisonPosts(preview = false): Promise<ComparisonPost[]> {
  return sanityFetch<ComparisonPost[]>({
    query: getAllComparisonPostsQuery,
    preview,
    tags: ['comparisonPost'],
  })
}

export async function getComparisonPostBySlug(
  slug: string,
  preview = false
): Promise<ComparisonPost | null> {
  return sanityFetch<ComparisonPost>({
    query: getComparisonPostBySlugQuery,
    params: { slug },
    preview,
    tags: ['comparisonPost', `comparisonPost:${slug}`],
  })
}

// ===========================================
// LISTICLE POSTS
// ===========================================

export async function getAllListiclePosts(preview = false): Promise<ListiclePost[]> {
  return sanityFetch<ListiclePost[]>({
    query: getAllListiclePostsQuery,
    preview,
    tags: ['listiclePost'],
  })
}

export async function getListiclePostBySlug(
  slug: string,
  preview = false
): Promise<ListiclePost | null> {
  return sanityFetch<ListiclePost>({
    query: getListiclePostBySlugQuery,
    params: { slug },
    preview,
    tags: ['listiclePost', `listiclePost:${slug}`],
  })
}

// ===========================================
// TEMPLATES
// ===========================================

export async function getAllTemplates(preview = false): Promise<Template[]> {
  return sanityFetch<Template[]>({
    query: getAllTemplatesQuery,
    preview,
    tags: ['template'],
  })
}

export async function getTemplateBySlug(
  slug: string,
  preview = false
): Promise<Template | null> {
  return sanityFetch<Template>({
    query: getTemplateBySlugQuery,
    params: { slug },
    preview,
    tags: ['template', `template:${slug}`],
  })
}

export async function getTemplateCategories(preview = false): Promise<TemplateCategory[]> {
  return sanityFetch<TemplateCategory[]>({
    query: getTemplateCategoriesQuery,
    preview,
    tags: ['templateCategory'],
  })
}

export async function getTemplatesByCategory(
  categoryId: string,
  preview = false
): Promise<Template[]> {
  return sanityFetch<Template[]>({
    query: getTemplatesByCategoryQuery,
    params: { categoryId },
    preview,
    tags: ['template', `templateCategory:${categoryId}`],
  })
}

export async function getFeaturedTemplates(preview = false): Promise<Template[]> {
  return sanityFetch<Template[]>({
    query: getFeaturedTemplatesQuery,
    preview,
    tags: ['template'],
  })
}

// ===========================================
// SEO AGENTS
// ===========================================

export async function getAllAgents(preview = false): Promise<SEOAgent[]> {
  return sanityFetch<SEOAgent[]>({
    query: getAllAgentsQuery,
    preview,
    tags: ['seoAgent'],
  })
}

export async function getAgentBySlug(
  slug: string,
  preview = false
): Promise<SEOAgent | null> {
  return sanityFetch<SEOAgent>({
    query: getAgentBySlugQuery,
    params: { slug },
    preview,
    tags: ['seoAgent', `seoAgent:${slug}`],
  })
}

export async function getAgentById(
  agentId: string,
  preview = false
): Promise<SEOAgent | null> {
  return sanityFetch<SEOAgent>({
    query: getAgentByIdQuery,
    params: { agentId },
    preview,
    tags: ['seoAgent', `seoAgent:${agentId}`],
  })
}

export async function getAgentCategories(preview = false): Promise<AgentCategory[]> {
  return sanityFetch<AgentCategory[]>({
    query: getAgentCategoriesQuery,
    preview,
    tags: ['agentCategory'],
  })
}

export async function getAgentsByCategory(
  categoryId: string,
  preview = false
): Promise<SEOAgent[]> {
  return sanityFetch<SEOAgent[]>({
    query: getAgentsByCategoryQuery,
    params: { categoryId },
    preview,
    tags: ['seoAgent', `agentCategory:${categoryId}`],
  })
}

export async function getFeaturedAgents(preview = false): Promise<SEOAgent[]> {
  return sanityFetch<SEOAgent[]>({
    query: getFeaturedAgentsQuery,
    preview,
    tags: ['seoAgent'],
  })
}

// ===========================================
// CASE STUDIES
// ===========================================

export async function getAllCaseStudies(preview = false): Promise<CaseStudy[]> {
  return sanityFetch<CaseStudy[]>({
    query: getAllCaseStudiesQuery,
    preview,
    tags: ['caseStudy'],
  })
}

export async function getCaseStudyBySlug(
  slug: string,
  preview = false
): Promise<CaseStudy | null> {
  return sanityFetch<CaseStudy>({
    query: getCaseStudyBySlugQuery,
    params: { slug },
    preview,
    tags: ['caseStudy', `caseStudy:${slug}`],
  })
}

export async function getFeaturedCaseStudies(preview = false): Promise<CaseStudy[]> {
  return sanityFetch<CaseStudy[]>({
    query: getFeaturedCaseStudiesQuery,
    preview,
    tags: ['caseStudy'],
  })
}

// ===========================================
// GLOSSARY
// ===========================================

export async function getAllGlossaryTerms(preview = false): Promise<GlossaryTerm[]> {
  return sanityFetch<GlossaryTerm[]>({
    query: getAllGlossaryTermsQuery,
    preview,
    tags: ['glossaryTerm'],
  })
}

export async function getGlossaryTermBySlug(
  slug: string,
  preview = false
): Promise<GlossaryTerm | null> {
  return sanityFetch<GlossaryTerm>({
    query: getGlossaryTermBySlugQuery,
    params: { slug },
    preview,
    tags: ['glossaryTerm', `glossaryTerm:${slug}`],
  })
}

export async function getGlossaryTermsByLetter(
  letter: string,
  preview = false
): Promise<GlossaryTerm[]> {
  return sanityFetch<GlossaryTerm[]>({
    query: getGlossaryTermsByLetterQuery,
    params: { letter },
    preview,
    tags: ['glossaryTerm'],
  })
}

export async function getGlossaryLetters(preview = false): Promise<{ letter: string }[]> {
  return sanityFetch<{ letter: string }[]>({
    query: getGlossaryLettersQuery,
    preview,
    tags: ['glossaryTerm'],
  })
}

// ===========================================
// TESTIMONIALS
// ===========================================

export async function getAllTestimonials(preview = false): Promise<Testimonial[]> {
  return sanityFetch<Testimonial[]>({
    query: getAllTestimonialsQuery,
    preview,
    tags: ['testimonial'],
  })
}

export async function getFeaturedTestimonials(preview = false): Promise<Testimonial[]> {
  return sanityFetch<Testimonial[]>({
    query: getFeaturedTestimonialsQuery,
    preview,
    tags: ['testimonial'],
  })
}

// ===========================================
// AUTHORS
// ===========================================

export async function getAllAuthors(preview = false): Promise<Author[]> {
  return sanityFetch<Author[]>({
    query: getAllAuthorsQuery,
    preview,
    tags: ['author'],
  })
}

export async function getAuthorById(
  authorId: string,
  preview = false
): Promise<Author | null> {
  return sanityFetch<Author>({
    query: getAuthorByIdQuery,
    params: { authorId },
    preview,
    tags: ['author', `author:${authorId}`],
  })
}

// ===========================================
// NEWSLETTER
// ===========================================

export async function getNewsletterIssues(preview = false): Promise<NewsletterIssue[]> {
  return sanityFetch<NewsletterIssue[]>({
    query: getNewsletterIssuesQuery,
    preview,
    tags: ['newsletterIssue'],
  })
}

export async function getNewsletterIssueBySlug(
  slug: string,
  preview = false
): Promise<NewsletterIssue | null> {
  return sanityFetch<NewsletterIssue>({
    query: getNewsletterIssueBySlugQuery,
    params: { slug },
    preview,
    tags: ['newsletterIssue', `newsletterIssue:${slug}`],
  })
}

export async function getLatestNewsletterIssue(
  preview = false
): Promise<NewsletterIssue | null> {
  return sanityFetch<NewsletterIssue>({
    query: getLatestNewsletterIssueQuery,
    preview,
    tags: ['newsletterIssue'],
  })
}

// ===========================================
// SPEAKING EVENTS
// ===========================================

export async function getSpeakingEvents(preview = false): Promise<SpeakingEvent[]> {
  return sanityFetch<SpeakingEvent[]>({
    query: getSpeakingEventsQuery,
    preview,
    tags: ['speakingEvent'],
  })
}

export async function getUpcomingSpeakingEvents(
  preview = false
): Promise<SpeakingEvent[]> {
  return sanityFetch<SpeakingEvent[]>({
    query: getUpcomingSpeakingEventsQuery,
    preview,
    tags: ['speakingEvent'],
  })
}

export async function getPastSpeakingEvents(preview = false): Promise<SpeakingEvent[]> {
  return sanityFetch<SpeakingEvent[]>({
    query: getPastSpeakingEventsQuery,
    preview,
    tags: ['speakingEvent'],
  })
}

// ===========================================
// SEARCH
// ===========================================

export async function search(searchTerm: string, preview = false): Promise<{
  blogPosts: SearchResult[]
  templates: SearchResult[]
  agents: SearchResult[]
  glossary: SearchResult[]
  caseStudies: SearchResult[]
}> {
  return sanityFetch<{
    blogPosts: SearchResult[]
    templates: SearchResult[]
    agents: SearchResult[]
    glossary: SearchResult[]
    caseStudies: SearchResult[]
  }>({
    query: searchQuery,
    params: { searchTerm },
    preview,
    tags: ['blogPost', 'template', 'seoAgent', 'glossaryTerm', 'caseStudy'],
  })
}

// ===========================================
// SITEMAP
// ===========================================

export async function getAllSlugs(): Promise<{
  blogPosts: { slug: string; updatedAt?: string }[]
  comparisonPosts: { slug: string; updatedAt?: string }[]
  listiclePosts: { slug: string; updatedAt?: string }[]
  templates: { slug: string; updatedAt?: string }[]
  agents: { slug: string; updatedAt?: string }[]
  caseStudies: { slug: string; updatedAt?: string }[]
  glossaryTerms: { slug: string; updatedAt?: string }[]
  categories: { slug: string }[]
  templateCategories: { slug: string }[]
  agentCategories: { slug: string }[]
}> {
  return sanityFetch({
    query: getAllSlugsQuery,
    tags: [
      'blogPost',
      'comparisonPost',
      'listiclePost',
      'template',
      'seoAgent',
      'caseStudy',
      'glossaryTerm',
      'blogCategory',
      'templateCategory',
      'agentCategory',
    ],
  })
}

// ===========================================
// CONTACTS (Admin only)
// ===========================================

export async function getAllContacts(preview = false): Promise<Contact[]> {
  return sanityFetch<Contact[]>({
    query: getAllContactsQuery,
    preview,
    tags: ['contact'],
  })
}

export async function getContactsBySource(
  source: string,
  preview = false
): Promise<Contact[]> {
  return sanityFetch<Contact[]>({
    query: getContactsBySourceQuery,
    params: { source },
    preview,
    tags: ['contact'],
  })
}
