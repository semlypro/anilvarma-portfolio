// ===========================================
// SHARED TYPESCRIPT TYPES
// Used by both Frontend (Cowork) and Backend (Ralph + Claude Code)
// ===========================================

import { PortableTextBlock } from '@portabletext/types';

// ===========================================
// BASE TYPES
// ===========================================

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface SanityReference {
  _type: 'reference';
  _ref: string;
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
  canonicalUrl?: string;
  focusKeyword?: string;
}

export interface FAQ {
  _key: string;
  question: string;
  answer: string;
}

// ===========================================
// SITE SETTINGS
// ===========================================

export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';
  siteName: string;
  siteDescription: string;
  logo: SanityImage;
  favicon: SanityImage;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    youtube?: string;
  };
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  defaultSeo: SEO;
}

// ===========================================
// NAVIGATION
// ===========================================

export interface NavItem {
  _key: string;
  label: string;
  href: string;
  isExternal?: boolean;
  children?: NavItem[];
}

export interface Navigation {
  _id: string;
  _type: 'navigation';
  mainNav: NavItem[];
  footerNav: {
    columns: {
      _key: string;
      title: string;
      items: NavItem[];
    }[];
  };
}

// ===========================================
// HOMEPAGE
// ===========================================

export interface Stat {
  _key: string;
  label: string;
  value: string;
  suffix?: string;
  icon?: string;
}

export interface Service {
  _key: string;
  title: string;
  description: string;
  icon: string;
  href?: string;
}

export interface Homepage {
  _id: string;
  _type: 'homepage';
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    image: SanityImage;
  };
  stats: Stat[];
  services: Service[];
  featuredBlogPosts?: BlogPost[];
  featuredTemplates?: Template[];
  testimonials?: Testimonial[];
  clientLogos?: SanityImage[];
  seo: SEO;
}

// ===========================================
// ABOUT
// ===========================================

export interface Experience {
  _key: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  logo?: SanityImage;
}

export interface Skill {
  _key: string;
  name: string;
  category: 'seo' | 'analytics' | 'tools' | 'marketing' | 'development';
  proficiency: number; // 0-100
}

export interface Certification {
  _key: string;
  name: string;
  issuer: string;
  date: string;
  logo?: SanityImage;
  credentialUrl?: string;
}

export interface About {
  _id: string;
  _type: 'about';
  headline: string;
  subheadline: string;
  profileImage: SanityImage;
  bio: PortableTextBlock[];
  experiences: Experience[];
  skills: Skill[];
  certifications: Certification[];
  philosophy?: PortableTextBlock[];
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  seo: SEO;
}

// ===========================================
// BLOG
// ===========================================

export interface BlogCategory {
  _id: string;
  _type: 'blogCategory';
  title: string;
  slug: SanitySlug;
  description?: string;
  color?: string;
}

export interface Author {
  _id: string;
  _type: 'author';
  name: string;
  role: string;
  image: SanityImage;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface BlogPost {
  _id: string;
  _type: 'blogPost';
  title: string;
  slug: SanitySlug;
  excerpt: string;
  featuredImage: SanityImage;
  author: Author;
  categories: BlogCategory[];
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  content: PortableTextBlock[];
  readingTime: number;
  relatedPosts?: BlogPost[];
  faqs?: FAQ[];
  seo: SEO;
  // AEO Fields
  answerBox?: {
    question: string;
    answer: string;
  };
  keyTakeaways?: string[];
  tldr?: string;
}

// ===========================================
// COMPARISON POST (Special Blog Type)
// ===========================================

export interface ComparisonItem {
  name: string;
  logo?: SanityImage;
  website?: string;
  description: string;
  pricing?: string;
  rating: number;
  pros: string[];
  cons: string[];
}

export interface ComparisonRow {
  _key: string;
  feature: string;
  itemAValue: string;
  itemBValue: string;
  winner: 'A' | 'B' | 'Tie';
}

export interface ComparisonPost {
  _id: string;
  _type: 'comparisonPost';
  title: string;
  slug: SanitySlug;
  itemA: ComparisonItem;
  itemB: ComparisonItem;
  comparisonTable: ComparisonRow[];
  verdict: {
    winner: string;
    summary: string;
    itemABestFor: string;
    itemBBestFor: string;
  };
  introduction: PortableTextBlock[];
  detailedComparison: PortableTextBlock[];
  conclusion: PortableTextBlock[];
  faqs?: FAQ[];
  seo: SEO;
  publishedAt: string;
  updatedAt?: string;
}

// ===========================================
// LISTICLE POST (Special Blog Type)
// ===========================================

export interface ListicleItem {
  _key: string;
  title: string;
  summary: string;
  content: PortableTextBlock[];
  image?: SanityImage;
  externalLink?: string;
  isAffiliate?: boolean;
  rating?: number;
  pricing?: string;
}

export interface ListiclePost {
  _id: string;
  _type: 'listiclePost';
  title: string;
  slug: SanitySlug;
  listCount: number;
  listType: 'numbered' | 'unordered' | 'countdown';
  listItems: ListicleItem[];
  introduction: PortableTextBlock[];
  conclusion: PortableTextBlock[];
  quickList: string[]; // One-line summaries for featured snippets
  faqs?: FAQ[];
  seo: SEO;
  publishedAt: string;
  updatedAt?: string;
}

// ===========================================
// TEMPLATES
// ===========================================

export interface TemplateCategory {
  _id: string;
  _type: 'templateCategory';
  title: string;
  slug: SanitySlug;
  description?: string;
  icon?: string;
}

export interface Template {
  _id: string;
  _type: 'template';
  title: string;
  slug: SanitySlug;
  shortDescription: string;
  fullDescription: PortableTextBlock[];
  category: TemplateCategory;
  previewImages: SanityImage[];
  file: {
    asset: {
      _ref: string;
      url: string;
    };
  };
  fileFormat: string;
  fileSize: string;
  downloadCount: number;
  useCases: string[];
  instructions?: PortableTextBlock[];
  relatedTemplates?: Template[];
  faqs?: FAQ[];
  seo: SEO;
  // Email gate settings
  emailGateEnabled: boolean;
  thankYouMessage?: string;
  createdAt: string;
  updatedAt?: string;
}

// ===========================================
// SEO AGENTS
// ===========================================

export interface AgentField {
  _key: string;
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'number' | 'select';
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select type
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface AgentCategory {
  _id: string;
  _type: 'agentCategory';
  title: string;
  slug: SanitySlug;
  description?: string;
  icon?: string;
}

export interface SEOAgent {
  _id: string;
  _type: 'seoAgent';
  name: string;
  slug: SanitySlug;
  icon: string;
  shortDescription: string;
  fullDescription: PortableTextBlock[];
  category: AgentCategory;
  systemPrompt: string; // For Claude API
  inputFields: AgentField[];
  outputFormat: 'markdown' | 'json' | 'structured';
  usageExamples: {
    _key: string;
    input: string;
    output: string;
  }[];
  limitations?: string[];
  pricingTier: 'free' | 'premium';
  usageLimit: number; // Per day
  faqs?: FAQ[];
  seo: SEO;
  isEnabled: boolean;
  createdAt: string;
}

// ===========================================
// CASE STUDIES
// ===========================================

export interface CaseStudyMetric {
  _key: string;
  label: string;
  beforeValue: string;
  afterValue: string;
  changePercent: string;
  isPositive: boolean;
}

export interface CaseStudy {
  _id: string;
  _type: 'caseStudy';
  title: string;
  slug: SanitySlug;
  clientName: string;
  clientLogo?: SanityImage;
  industry: string;
  isAnonymized: boolean;
  challenge: PortableTextBlock[];
  strategy: PortableTextBlock[];
  results: PortableTextBlock[];
  metrics: CaseStudyMetric[];
  timeline: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    image?: SanityImage;
  };
  keyLearnings: string[];
  featuredImage: SanityImage;
  gallery?: SanityImage[];
  relatedCaseStudies?: CaseStudy[];
  faqs?: FAQ[];
  seo: SEO;
  publishedAt: string;
  updatedAt?: string;
}

// ===========================================
// TESTIMONIALS
// ===========================================

export interface Testimonial {
  _id: string;
  _type: 'testimonial';
  name: string;
  role: string;
  company: string;
  image?: SanityImage;
  quote: string;
  videoUrl?: string;
  linkedinUrl?: string;
  resultAchieved?: string;
  isFeatured: boolean;
}

// ===========================================
// GLOSSARY
// ===========================================

export interface GlossaryTerm {
  _id: string;
  _type: 'glossaryTerm';
  term: string;
  slug: SanitySlug;
  definition: string; // Short, quotable definition (max 200 chars)
  fullExplanation: PortableTextBlock[];
  relatedTerms?: GlossaryTerm[];
  relatedPosts?: BlogPost[];
  examples?: string[];
  seo: SEO;
  letter: string; // A-Z for filtering
  createdAt: string;
  updatedAt?: string;
}

// ===========================================
// NEWSLETTER
// ===========================================

export interface NewsletterIssue {
  _id: string;
  _type: 'newsletterIssue';
  title: string;
  slug: SanitySlug;
  previewText: string;
  content: PortableTextBlock[];
  publishedAt: string;
  isPublished: boolean;
}

// ===========================================
// SPEAKING & MEDIA
// ===========================================

export interface SpeakingEvent {
  _id: string;
  _type: 'speakingEvent';
  title: string;
  eventName: string;
  eventType: 'conference' | 'podcast' | 'webinar' | 'workshop' | 'interview';
  date: string;
  description?: string;
  videoUrl?: string;
  slidesUrl?: string;
  eventLogo?: SanityImage;
  eventUrl?: string;
  isUpcoming: boolean;
}

// ===========================================
// CONTACT / LEADS
// ===========================================

export interface Contact {
  _id: string;
  _type: 'contact';
  email: string;
  name?: string;
  source: 'template_download' | 'newsletter' | 'contact_form' | 'agent_usage';
  sourceId?: string; // Template ID, etc.
  tags: string[];
  createdAt: string;
  metadata?: Record<string, unknown>;
}

// ===========================================
// API TYPES
// ===========================================

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export interface AgentRequest {
  agentId: string;
  inputs: Record<string, string>;
}

export interface AgentResponse {
  output: string;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
}

export interface DownloadRequest {
  templateId: string;
  email: string;
  name?: string;
}

export interface DownloadResponse {
  downloadUrl: string;
  expiresAt: string;
}

export interface SubscribeRequest {
  email: string;
  source?: string;
  tags?: string[];
}

// ===========================================
// UTILITY TYPES
// ===========================================

export type ContentType =
  | 'blogPost'
  | 'comparisonPost'
  | 'listiclePost'
  | 'template'
  | 'seoAgent'
  | 'caseStudy'
  | 'glossaryTerm';

export interface SearchResult {
  _id: string;
  _type: ContentType;
  title: string;
  slug: string;
  excerpt: string;
  url: string;
}
