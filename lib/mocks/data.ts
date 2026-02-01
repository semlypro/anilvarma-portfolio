// ===========================================
// MOCK DATA FOR FRONTEND DEVELOPMENT
// Replace with real Sanity data when backend is ready
// ===========================================

import type {
  Homepage,
  About,
  BlogPost,
  BlogCategory,
  Template,
  TemplateCategory,
  SEOAgent,
  AgentCategory,
  CaseStudy,
  Testimonial,
  GlossaryTerm,
  SiteSettings,
  Navigation
} from '@/types';

// ===========================================
// SITE SETTINGS
// ===========================================

export const mockSiteSettings: SiteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Anil Varma',
  siteDescription: 'SEO Expert with 15+ Years of Experience | Technical SEO, Content Strategy & Organic Growth',
  logo: {
    _type: 'image',
    asset: {_ref: 'logo', _type: 'reference'},
    alt: 'Anil Varma Logo'
  },
  favicon: {
    _type: 'image',
    asset: {_ref: 'favicon', _type: 'reference'}
  },
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/anil-varma/',
    twitter: 'https://twitter.com/anilvarma'
  },
  contactEmail: 'anilvarma2302@gmail.com',
  contactPhone: '+31627910520',
  defaultSeo: {
    metaTitle: 'Anil Varma - SEO Expert',
    metaDescription: 'SEO Expert with 15+ years of experience. Specializing in technical SEO, content strategy, and organic growth.'
  }
};

// ===========================================
// NAVIGATION
// ===========================================

export const mockNavigation: Navigation = {
  _id: 'navigation',
  _type: 'navigation',
  mainNav: [
    {_key: '1', label: 'About', href: '/about'},
    {_key: '2', label: 'Blog', href: '/blog'},
    {_key: '3', label: 'Templates', href: '/templates'},
    {_key: '4', label: 'SEO Agents', href: '/seo-agents'},
    {_key: '5', label: 'Case Studies', href: '/case-studies'},
    {_key: '6', label: 'Glossary', href: '/glossary'}
  ],
  footerNav: {
    columns: [
      {
        _key: 'resources',
        title: 'Resources',
        items: [
          {_key: '1', label: 'Blog', href: '/blog'},
          {_key: '2', label: 'Templates', href: '/templates'},
          {_key: '3', label: 'SEO Agents', href: '/seo-agents'},
          {_key: '4', label: 'Glossary', href: '/glossary'}
        ]
      },
      {
        _key: 'company',
        title: 'Company',
        items: [
          {_key: '1', label: 'About', href: '/about'},
          {_key: '2', label: 'Case Studies', href: '/case-studies'},
          {_key: '3', label: 'Contact', href: '/contact'},
          {_key: '4', label: 'Book a Call', href: '/book-call', isExternal: true}
        ]
      },
      {
        _key: 'legal',
        title: 'Legal',
        items: [
          {_key: '1', label: 'Privacy Policy', href: '/privacy'},
          {_key: '2', label: 'Terms of Service', href: '/terms'}
        ]
      }
    ]
  }
};

// ===========================================
// HOMEPAGE
// ===========================================

export const mockHomepage: Homepage = {
  _id: 'homepage',
  _type: 'homepage',
  hero: {
    headline: 'SEO That Actually Drives Growth',
    subheadline: '15+ years of scaling organic traffic from zero to millions. I help businesses dominate search results with data-driven strategies.',
    ctaText: 'Book a Free Consultation',
    ctaLink: '/book-call',
    secondaryCtaText: 'View Case Studies',
    secondaryCtaLink: '/case-studies',
    image: {
      _type: 'image',
      asset: {_ref: 'hero-image', _type: 'reference'},
      alt: 'Anil Varma - SEO Expert'
    }
  },
  stats: [
    {_key: '1', label: 'Years Experience', value: '15', suffix: '+', icon: 'calendar'},
    {_key: '2', label: 'Traffic Scaled', value: '10', suffix: 'M+', icon: 'trending-up'},
    {_key: '3', label: 'Projects Delivered', value: '200', suffix: '+', icon: 'briefcase'},
    {_key: '4', label: 'Traffic Growth', value: '185', suffix: '%', icon: 'chart'}
  ],
  services: [
    {
      _key: '1',
      title: 'Technical SEO',
      description: 'Site architecture, Core Web Vitals, crawlability, and indexation optimization.',
      icon: 'code',
      href: '/services/technical-seo'
    },
    {
      _key: '2',
      title: 'Content Strategy',
      description: 'Keyword research, content planning, and SEO-optimized content creation.',
      icon: 'file-text',
      href: '/services/content-strategy'
    },
    {
      _key: '3',
      title: 'Analytics & Reporting',
      description: 'Custom dashboards, performance tracking, and actionable insights.',
      icon: 'bar-chart',
      href: '/services/analytics'
    },
    {
      _key: '4',
      title: 'Link Building',
      description: 'White-hat link acquisition strategies to boost domain authority.',
      icon: 'link',
      href: '/services/link-building'
    }
  ],
  seo: {
    metaTitle: 'Anil Varma - SEO Expert | Technical SEO & Organic Growth',
    metaDescription: 'SEO Expert with 15+ years scaling traffic from 0 to 10M+. Get data-driven SEO strategies that deliver measurable results.'
  }
};

// ===========================================
// TESTIMONIALS
// ===========================================

export const mockTestimonials: Testimonial[] = [
  {
    _id: '1',
    _type: 'testimonial',
    name: 'Rahul Sharma',
    role: 'Head of Marketing',
    company: 'CarWale',
    quote: 'Anil transformed our SEO strategy and helped us grow organic traffic from 3.5M to 10M monthly users. His technical expertise and data-driven approach are unmatched.',
    resultAchieved: '185% traffic increase in 3 years',
    isFeatured: true
  },
  {
    _id: '2',
    _type: 'testimonial',
    name: 'Priya Patel',
    role: 'CEO',
    company: 'TechStartup India',
    quote: 'Working with Anil was a game-changer for our startup. He not only improved our rankings but also trained our team to maintain SEO best practices.',
    resultAchieved: '5x organic leads in 6 months',
    isFeatured: true
  },
  {
    _id: '3',
    _type: 'testimonial',
    name: 'David Chen',
    role: 'VP Product',
    company: 'HRONE',
    quote: 'Anil\'s strategic vision for SEO helped us create 600+ content pages in 3 months and achieve 32% traffic growth year-over-year.',
    resultAchieved: '32% YoY traffic growth',
    isFeatured: true
  }
];

// ===========================================
// BLOG CATEGORIES
// ===========================================

export const mockBlogCategories: BlogCategory[] = [
  {_id: '1', _type: 'blogCategory', title: 'Technical SEO', slug: {_type: 'slug', current: 'technical-seo'}, color: '#3b82f6'},
  {_id: '2', _type: 'blogCategory', title: 'On-Page SEO', slug: {_type: 'slug', current: 'on-page-seo'}, color: '#14b8a6'},
  {_id: '3', _type: 'blogCategory', title: 'Content Strategy', slug: {_type: 'slug', current: 'content-strategy'}, color: '#f59e0b'},
  {_id: '4', _type: 'blogCategory', title: 'Link Building', slug: {_type: 'slug', current: 'link-building'}, color: '#8b5cf6'},
  {_id: '5', _type: 'blogCategory', title: 'Analytics', slug: {_type: 'slug', current: 'analytics'}, color: '#ef4444'},
  {_id: '6', _type: 'blogCategory', title: 'Industry News', slug: {_type: 'slug', current: 'industry-news'}, color: '#6366f1'}
];

// ===========================================
// BLOG POSTS
// ===========================================

export const mockBlogPosts: BlogPost[] = [
  {
    _id: '1',
    _type: 'blogPost',
    title: '10 Technical SEO Mistakes That Are Killing Your Rankings',
    slug: {_type: 'slug', current: '10-technical-seo-mistakes'},
    excerpt: 'Discover the most common technical SEO issues I see when auditing websites, and learn how to fix them to improve your search rankings.',
    featuredImage: {
      _type: 'image',
      asset: {_ref: 'blog-1', _type: 'reference'},
      alt: 'Technical SEO Mistakes'
    },
    author: {
      _id: 'author-1',
      _type: 'author',
      name: 'Anil Varma',
      role: 'SEO Expert',
      image: {_type: 'image', asset: {_ref: 'author', _type: 'reference'}}
    },
    categories: [mockBlogCategories[0]],
    tags: ['technical seo', 'site audit', 'rankings'],
    publishedAt: '2026-01-15T10:00:00Z',
    content: [],
    readingTime: 8,
    seo: {
      metaTitle: '10 Technical SEO Mistakes Killing Your Rankings | Anil Varma',
      metaDescription: 'Learn the top 10 technical SEO mistakes and how to fix them. Boost your search rankings with these actionable tips.'
    },
    answerBox: {
      question: 'What are the most common technical SEO mistakes?',
      answer: 'The most common technical SEO mistakes include slow page speed, missing XML sitemaps, poor mobile experience, broken internal links, and incorrect robots.txt configuration.'
    },
    keyTakeaways: [
      'Fix Core Web Vitals issues to improve user experience and rankings',
      'Ensure your XML sitemap is up-to-date and submitted to Google',
      'Implement proper canonical tags to avoid duplicate content'
    ]
  },
  {
    _id: '2',
    _type: 'blogPost',
    title: 'How to Build a Content Strategy That Ranks',
    slug: {_type: 'slug', current: 'content-strategy-that-ranks'},
    excerpt: 'A step-by-step guide to creating a content strategy that drives organic traffic and converts visitors into customers.',
    featuredImage: {
      _type: 'image',
      asset: {_ref: 'blog-2', _type: 'reference'},
      alt: 'Content Strategy'
    },
    author: {
      _id: 'author-1',
      _type: 'author',
      name: 'Anil Varma',
      role: 'SEO Expert',
      image: {_type: 'image', asset: {_ref: 'author', _type: 'reference'}}
    },
    categories: [mockBlogCategories[2]],
    tags: ['content strategy', 'keyword research', 'content marketing'],
    publishedAt: '2026-01-10T10:00:00Z',
    content: [],
    readingTime: 12,
    seo: {
      metaTitle: 'How to Build a Content Strategy That Ranks | Anil Varma',
      metaDescription: 'Learn how to create a content strategy that drives organic traffic. Step-by-step guide from an SEO expert.'
    }
  },
  {
    _id: '3',
    _type: 'blogPost',
    title: 'Core Web Vitals: The Complete 2026 Guide',
    slug: {_type: 'slug', current: 'core-web-vitals-guide-2026'},
    excerpt: 'Everything you need to know about Core Web Vitals, including how to measure, optimize, and pass the assessment.',
    featuredImage: {
      _type: 'image',
      asset: {_ref: 'blog-3', _type: 'reference'},
      alt: 'Core Web Vitals Guide'
    },
    author: {
      _id: 'author-1',
      _type: 'author',
      name: 'Anil Varma',
      role: 'SEO Expert',
      image: {_type: 'image', asset: {_ref: 'author', _type: 'reference'}}
    },
    categories: [mockBlogCategories[0]],
    tags: ['core web vitals', 'page speed', 'performance'],
    publishedAt: '2026-01-05T10:00:00Z',
    content: [],
    readingTime: 15,
    seo: {
      metaTitle: 'Core Web Vitals: Complete 2026 Guide | Anil Varma',
      metaDescription: 'Master Core Web Vitals with this comprehensive guide. Learn LCP, FID, CLS optimization techniques.'
    }
  }
];

// ===========================================
// TEMPLATE CATEGORIES
// ===========================================

export const mockTemplateCategories: TemplateCategory[] = [
  {_id: '1', _type: 'templateCategory', title: 'SEO Audit', slug: {_type: 'slug', current: 'seo-audit'}, icon: 'clipboard-check'},
  {_id: '2', _type: 'templateCategory', title: 'Keyword Research', slug: {_type: 'slug', current: 'keyword-research'}, icon: 'search'},
  {_id: '3', _type: 'templateCategory', title: 'Content Planning', slug: {_type: 'slug', current: 'content-planning'}, icon: 'file-text'},
  {_id: '4', _type: 'templateCategory', title: 'Link Building', slug: {_type: 'slug', current: 'link-building'}, icon: 'link'},
  {_id: '5', _type: 'templateCategory', title: 'Reporting', slug: {_type: 'slug', current: 'reporting'}, icon: 'bar-chart'}
];

// ===========================================
// TEMPLATES
// ===========================================

export const mockTemplates: Template[] = [
  {
    _id: '1',
    _type: 'template',
    title: 'Complete SEO Audit Checklist',
    slug: {_type: 'slug', current: 'seo-audit-checklist'},
    shortDescription: 'A comprehensive 100+ point checklist to audit any website for technical SEO, on-page optimization, and content quality.',
    fullDescription: [],
    category: mockTemplateCategories[0],
    previewImages: [{_type: 'image', asset: {_ref: 'template-1', _type: 'reference'}, alt: 'SEO Audit Checklist Preview'}],
    file: {asset: {_ref: 'file-1', url: '/templates/seo-audit-checklist.xlsx'}},
    fileFormat: 'XLSX',
    fileSize: '245 KB',
    downloadCount: 1234,
    useCases: ['Website audits', 'Client reports', 'Pre-launch checks'],
    emailGateEnabled: true,
    seo: {
      metaTitle: 'Free SEO Audit Checklist Template | Download Now',
      metaDescription: 'Download our comprehensive SEO audit checklist with 100+ checkpoints. Perfect for technical SEO audits.'
    },
    createdAt: '2025-06-01T00:00:00Z'
  },
  {
    _id: '2',
    _type: 'template',
    title: 'Keyword Research Template',
    slug: {_type: 'slug', current: 'keyword-research-template'},
    shortDescription: 'Organize your keyword research with this structured template including search volume, difficulty, and intent classification.',
    fullDescription: [],
    category: mockTemplateCategories[1],
    previewImages: [{_type: 'image', asset: {_ref: 'template-2', _type: 'reference'}, alt: 'Keyword Research Template Preview'}],
    file: {asset: {_ref: 'file-2', url: '/templates/keyword-research.xlsx'}},
    fileFormat: 'XLSX',
    fileSize: '128 KB',
    downloadCount: 2567,
    useCases: ['Keyword planning', 'Content strategy', 'Competitor analysis'],
    emailGateEnabled: true,
    seo: {
      metaTitle: 'Free Keyword Research Template | Download Now',
      metaDescription: 'Download our keyword research template to organize search volume, difficulty, and intent data.'
    },
    createdAt: '2025-05-15T00:00:00Z'
  },
  {
    _id: '3',
    _type: 'template',
    title: 'Content Calendar Template',
    slug: {_type: 'slug', current: 'content-calendar-template'},
    shortDescription: 'Plan and track your content production with this SEO-focused content calendar including keyword targets and publishing schedule.',
    fullDescription: [],
    category: mockTemplateCategories[2],
    previewImages: [{_type: 'image', asset: {_ref: 'template-3', _type: 'reference'}, alt: 'Content Calendar Template Preview'}],
    file: {asset: {_ref: 'file-3', url: '/templates/content-calendar.xlsx'}},
    fileFormat: 'XLSX',
    fileSize: '156 KB',
    downloadCount: 1890,
    useCases: ['Content planning', 'Team coordination', 'Publishing schedule'],
    emailGateEnabled: true,
    seo: {
      metaTitle: 'Free Content Calendar Template | Download Now',
      metaDescription: 'Download our SEO content calendar template to plan and track your content production.'
    },
    createdAt: '2025-05-01T00:00:00Z'
  }
];

// ===========================================
// AGENT CATEGORIES
// ===========================================

export const mockAgentCategories: AgentCategory[] = [
  {_id: '1', _type: 'agentCategory', title: 'On-Page SEO', slug: {_type: 'slug', current: 'on-page'}, icon: 'file-text'},
  {_id: '2', _type: 'agentCategory', title: 'Technical SEO', slug: {_type: 'slug', current: 'technical'}, icon: 'code'},
  {_id: '3', _type: 'agentCategory', title: 'Content', slug: {_type: 'slug', current: 'content'}, icon: 'edit'},
  {_id: '4', _type: 'agentCategory', title: 'Schema', slug: {_type: 'slug', current: 'schema'}, icon: 'brackets'}
];

// ===========================================
// SEO AGENTS
// ===========================================

export const mockSEOAgents: SEOAgent[] = [
  {
    _id: '1',
    _type: 'seoAgent',
    name: 'Meta Description Generator',
    slug: {_type: 'slug', current: 'meta-description-generator'},
    icon: 'file-text',
    shortDescription: 'Generate compelling, SEO-optimized meta descriptions for your pages.',
    fullDescription: [],
    category: mockAgentCategories[0],
    systemPrompt: 'You are an SEO expert specializing in writing meta descriptions...',
    inputFields: [
      {_key: '1', name: 'pageTitle', label: 'Page Title', type: 'text', placeholder: 'Enter your page title', required: true},
      {_key: '2', name: 'pageContent', label: 'Page Content or Summary', type: 'textarea', placeholder: 'Paste your page content or summary', required: true},
      {_key: '3', name: 'targetKeyword', label: 'Target Keyword', type: 'text', placeholder: 'Primary keyword to include', required: false}
    ],
    outputFormat: 'markdown',
    usageExamples: [],
    pricingTier: 'free',
    usageLimit: 10,
    seo: {
      metaTitle: 'Free Meta Description Generator | AI-Powered SEO Tool',
      metaDescription: 'Generate SEO-optimized meta descriptions instantly. Free AI tool by Anil Varma.'
    },
    isEnabled: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    _id: '2',
    _type: 'seoAgent',
    name: 'Title Tag Optimizer',
    slug: {_type: 'slug', current: 'title-tag-optimizer'},
    icon: 'type',
    shortDescription: 'Optimize your title tags for better CTR and rankings.',
    fullDescription: [],
    category: mockAgentCategories[0],
    systemPrompt: 'You are an SEO expert specializing in title tag optimization...',
    inputFields: [
      {_key: '1', name: 'currentTitle', label: 'Current Title', type: 'text', placeholder: 'Your current page title', required: true},
      {_key: '2', name: 'targetKeyword', label: 'Target Keyword', type: 'text', placeholder: 'Primary keyword', required: true}
    ],
    outputFormat: 'markdown',
    usageExamples: [],
    pricingTier: 'free',
    usageLimit: 10,
    seo: {
      metaTitle: 'Free Title Tag Optimizer | AI-Powered SEO Tool',
      metaDescription: 'Optimize your title tags for better CTR and rankings. Free AI tool.'
    },
    isEnabled: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    _id: '3',
    _type: 'seoAgent',
    name: 'Schema Markup Generator',
    slug: {_type: 'slug', current: 'schema-markup-generator'},
    icon: 'code',
    shortDescription: 'Generate JSON-LD schema markup for your pages.',
    fullDescription: [],
    category: mockAgentCategories[3],
    systemPrompt: 'You are an expert in Schema.org markup and JSON-LD...',
    inputFields: [
      {_key: '1', name: 'schemaType', label: 'Schema Type', type: 'select', required: true, options: ['Article', 'FAQ', 'HowTo', 'Product', 'LocalBusiness', 'Person', 'Organization']},
      {_key: '2', name: 'content', label: 'Page Content', type: 'textarea', placeholder: 'Describe your page content', required: true}
    ],
    outputFormat: 'json',
    usageExamples: [],
    pricingTier: 'free',
    usageLimit: 5,
    seo: {
      metaTitle: 'Free Schema Markup Generator | JSON-LD Tool',
      metaDescription: 'Generate valid JSON-LD schema markup for your pages. Free tool.'
    },
    isEnabled: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    _id: '4',
    _type: 'seoAgent',
    name: 'Content Brief Generator',
    slug: {_type: 'slug', current: 'content-brief-generator'},
    icon: 'file-plus',
    shortDescription: 'Generate comprehensive content briefs for your writers.',
    fullDescription: [],
    category: mockAgentCategories[2],
    systemPrompt: 'You are an SEO content strategist...',
    inputFields: [
      {_key: '1', name: 'targetKeyword', label: 'Target Keyword', type: 'text', placeholder: 'Primary keyword to target', required: true},
      {_key: '2', name: 'contentType', label: 'Content Type', type: 'select', required: true, options: ['Blog Post', 'Landing Page', 'Product Page', 'Guide', 'How-to']}
    ],
    outputFormat: 'markdown',
    usageExamples: [],
    pricingTier: 'free',
    usageLimit: 5,
    seo: {
      metaTitle: 'Free Content Brief Generator | AI SEO Tool',
      metaDescription: 'Generate comprehensive content briefs instantly. Free AI tool.'
    },
    isEnabled: true,
    createdAt: '2025-01-01T00:00:00Z'
  }
];

// ===========================================
// CASE STUDIES
// ===========================================

export const mockCaseStudies: CaseStudy[] = [
  {
    _id: '1',
    _type: 'caseStudy',
    title: 'Scaling Organic Traffic from 3.5M to 10M Users',
    slug: {_type: 'slug', current: 'carwale-traffic-growth'},
    clientName: 'CarWale & BikeWale',
    industry: 'Automobile',
    isAnonymized: false,
    challenge: [],
    strategy: [],
    results: [],
    metrics: [
      {_key: '1', label: 'Monthly Users', beforeValue: '3.5M', afterValue: '10M', changePercent: '+185%', isPositive: true},
      {_key: '2', label: 'Organic Sessions', beforeValue: '4.2M', afterValue: '12M', changePercent: '+186%', isPositive: true},
      {_key: '3', label: 'Keyword Rankings', beforeValue: '5,000', afterValue: '25,000', changePercent: '+400%', isPositive: true}
    ],
    timeline: '3 years',
    testimonial: {
      quote: 'Anil transformed our SEO strategy and helped us become the #1 automobile portal in India.',
      author: 'Rahul Sharma',
      role: 'Head of Marketing'
    },
    keyLearnings: [
      'Content velocity matters - consistent publishing drives growth',
      'Technical SEO foundation is critical before scaling content',
      'Internal linking strategy significantly impacts rankings'
    ],
    featuredImage: {
      _type: 'image',
      asset: {_ref: 'case-study-1', _type: 'reference'},
      alt: 'CarWale Case Study'
    },
    seo: {
      metaTitle: 'CarWale SEO Case Study: 185% Traffic Growth | Anil Varma',
      metaDescription: 'Learn how we scaled CarWale organic traffic from 3.5M to 10M monthly users.'
    },
    publishedAt: '2025-12-01T00:00:00Z'
  },
  {
    _id: '2',
    _type: 'caseStudy',
    title: '32% YoY Traffic Growth for HR SaaS',
    slug: {_type: 'slug', current: 'hrone-seo-strategy'},
    clientName: 'HRONE',
    industry: 'HR Software (SaaS)',
    isAnonymized: false,
    challenge: [],
    strategy: [],
    results: [],
    metrics: [
      {_key: '1', label: 'Organic Traffic', beforeValue: '50K', afterValue: '66K', changePercent: '+32%', isPositive: true},
      {_key: '2', label: 'Content Pages', beforeValue: '50', afterValue: '650+', changePercent: '+1200%', isPositive: true},
      {_key: '3', label: 'Lead Generation', beforeValue: '200/mo', afterValue: '450/mo', changePercent: '+125%', isPositive: true}
    ],
    timeline: '1 year',
    keyLearnings: [
      'Programmatic SEO can rapidly scale content production',
      'Educational content builds trust in B2B SaaS',
      'Landing page optimization drives conversions'
    ],
    featuredImage: {
      _type: 'image',
      asset: {_ref: 'case-study-2', _type: 'reference'},
      alt: 'HRONE Case Study'
    },
    seo: {
      metaTitle: 'HRONE SEO Case Study: 32% YoY Growth | Anil Varma',
      metaDescription: 'How we achieved 32% YoY traffic growth for HRONE through content strategy.'
    },
    publishedAt: '2025-11-15T00:00:00Z'
  }
];

// ===========================================
// GLOSSARY TERMS
// ===========================================

export const mockGlossaryTerms: GlossaryTerm[] = [
  {
    _id: '1',
    _type: 'glossaryTerm',
    term: 'Technical SEO',
    slug: {_type: 'slug', current: 'technical-seo'},
    definition: 'Technical SEO is the process of optimizing your website\'s infrastructure to help search engines crawl, index, and rank your pages effectively.',
    fullExplanation: [],
    letter: 'T',
    seo: {metaTitle: 'What is Technical SEO? | SEO Glossary'},
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    _id: '2',
    _type: 'glossaryTerm',
    term: 'Core Web Vitals',
    slug: {_type: 'slug', current: 'core-web-vitals'},
    definition: 'Core Web Vitals are a set of metrics that measure real-world user experience for loading performance (LCP), interactivity (FID), and visual stability (CLS).',
    fullExplanation: [],
    letter: 'C',
    seo: {metaTitle: 'What are Core Web Vitals? | SEO Glossary'},
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    _id: '3',
    _type: 'glossaryTerm',
    term: 'Canonical URL',
    slug: {_type: 'slug', current: 'canonical-url'},
    definition: 'A canonical URL is the preferred version of a web page that search engines should index when multiple URLs contain similar or duplicate content.',
    fullExplanation: [],
    letter: 'C',
    seo: {metaTitle: 'What is a Canonical URL? | SEO Glossary'},
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    _id: '4',
    _type: 'glossaryTerm',
    term: 'Backlink',
    slug: {_type: 'slug', current: 'backlink'},
    definition: 'A backlink is a link from one website to another. Search engines use backlinks as a signal of content quality and authority.',
    fullExplanation: [],
    letter: 'B',
    seo: {metaTitle: 'What is a Backlink? | SEO Glossary'},
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    _id: '5',
    _type: 'glossaryTerm',
    term: 'SERP',
    slug: {_type: 'slug', current: 'serp'},
    definition: 'SERP (Search Engine Results Page) is the page displayed by search engines in response to a user\'s query, containing organic results, ads, and features.',
    fullExplanation: [],
    letter: 'S',
    seo: {metaTitle: 'What is SERP? | SEO Glossary'},
    createdAt: '2025-01-01T00:00:00Z'
  }
];

// ===========================================
// ABOUT PAGE
// ===========================================

export const mockAbout: About = {
  _id: 'about',
  _type: 'about',
  headline: 'Hi, I\'m Anil Varma',
  subheadline: 'SEO Expert with 15+ years of experience helping businesses grow through organic search.',
  profileImage: {
    _type: 'image',
    asset: {_ref: 'profile', _type: 'reference'},
    alt: 'Anil Varma'
  },
  bio: [],
  experiences: [
    {
      _key: '1',
      company: 'HRONE',
      role: 'Associate Director - Digital Marketing (SEO & Analytics)',
      startDate: '2023-10-01',
      description: 'Leading SEO initiatives and content strategy for HR SaaS platform.',
      achievements: [
        '32% YoY organic traffic growth',
        'Created 600+ content pages in 3 months',
        'Established scalable SEO and content marketing SOPs'
      ]
    },
    {
      _key: '2',
      company: 'Semly Pro - The SEO Company',
      role: 'Cofounder and Director',
      startDate: '2016-10-01',
      endDate: '2023-09-30',
      description: 'Co-founded and led an SEO agency serving clients across industries.',
      achievements: [
        'Built and trained high-performing SEO teams',
        'Developed custom analytics dashboards',
        'Managed SEO for 50+ client accounts'
      ]
    },
    {
      _key: '3',
      company: 'CarWale and BikeWale',
      role: 'Senior Manager - Digital Marketing',
      startDate: '2013-06-01',
      endDate: '2016-03-31',
      description: 'Led SEO strategy for India\'s leading automobile portals.',
      achievements: [
        'Scaled organic traffic from 3.5M to 10M users',
        'Implemented technical SEO improvements',
        'Built and managed app install campaigns'
      ]
    }
  ],
  skills: [
    {_key: '1', name: 'Technical SEO', category: 'seo', proficiency: 95},
    {_key: '2', name: 'Content Strategy', category: 'seo', proficiency: 90},
    {_key: '3', name: 'Keyword Research', category: 'seo', proficiency: 95},
    {_key: '4', name: 'Google Analytics 4', category: 'analytics', proficiency: 90},
    {_key: '5', name: 'Google Search Console', category: 'analytics', proficiency: 95},
    {_key: '6', name: 'SEMrush', category: 'tools', proficiency: 90},
    {_key: '7', name: 'Ahrefs', category: 'tools', proficiency: 85},
    {_key: '8', name: 'Data Studio', category: 'analytics', proficiency: 85}
  ],
  certifications: [
    {_key: '1', name: 'Google Analytics Certification', issuer: 'Google', date: '2024-01-01'},
    {_key: '2', name: 'Google Ads Certification', issuer: 'Google', date: '2024-01-01'}
  ],
  cta: {
    title: 'Ready to Grow Your Organic Traffic?',
    description: 'Book a free 30-minute consultation to discuss your SEO challenges and opportunities.',
    buttonText: 'Book a Free Consultation',
    buttonLink: '/book-call'
  },
  seo: {
    metaTitle: 'About Anil Varma | SEO Expert with 15+ Years Experience',
    metaDescription: 'Learn about Anil Varma - SEO expert who has scaled traffic from 0 to 10M+ users. 15+ years of experience in technical SEO and content strategy.'
  }
};
