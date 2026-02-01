import {BlogPost, Template, SEOAgent, CaseStudy, GlossaryTerm} from '@/types';

/**
 * JSON-LD Schema Generators
 *
 * Generate structured data for different content types
 * Follows schema.org specifications
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anilvarma.com';

/**
 * Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}#person`,
    'name': 'Anil Varma',
    'url': baseUrl,
    'image': `${baseUrl}/images/anil-varma.jpg`,
    'sameAs': [
      'https://linkedin.com/in/anilvarma',
      'https://twitter.com/anilvarma',
      'https://github.com/anilvarma'
    ],
    'jobTitle': 'SEO Consultant',
    'description':
      'International SEO and Technical SEO expert helping businesses scale globally through search optimization.',
    'knowsAbout': [
      'Search Engine Optimization',
      'International SEO',
      'Technical SEO',
      'Content Strategy',
      'Digital Marketing'
    ]
  };
}

/**
 * Website Schema
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    'url': baseUrl,
    'name': 'Anil Varma - SEO Expert',
    'description':
      'International SEO & Technical SEO consulting, free templates, AI-powered SEO agents, and in-depth guides.',
    'publisher': {
      '@id': `${baseUrl}#person`
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${baseUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Blog Post Schema
 */
export function generateBlogPostSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${baseUrl}/blog/${post.slug.current}`,
    'headline': post.title,
    'description': post.excerpt,
    'image': post.featuredImage ?
      `${baseUrl}/images/blog/${post.slug.current}.jpg` :
      undefined,
    'datePublished': post.publishedAt,
    'dateModified': post.updatedAt || post.publishedAt,
    'author': {
      '@type': 'Person',
      '@id': `${baseUrl}#person`,
      'name': post.author?.name || 'Anil Varma'
    },
    'publisher': {
      '@id': `${baseUrl}#person`
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug.current}`
    },
    'keywords': post.tags?.join(', ')
  };
}

/**
 * Article Schema (for comparison/listicle posts)
 */
export function generateArticleSchema(
  post: { title: string; slug: { current: string }; publishedAt: string; excerpt?: string },
  type: 'Article' | 'TechArticle' = 'Article'
) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${baseUrl}/blog/${post.slug.current}`,
    'headline': post.title,
    'description': post.excerpt,
    'datePublished': post.publishedAt,
    'author': {
      '@type': 'Person',
      '@id': `${baseUrl}#person`,
      'name': 'Anil Varma'
    },
    'publisher': {
      '@id': `${baseUrl}#person`
    }
  };
}

/**
 * SoftwareApplication Schema (for SEO Agents)
 */
export function generateSoftwareApplicationSchema(agent: SEOAgent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${baseUrl}/agents/${agent.slug.current}`,
    'name': agent.name,
    'description': agent.fullDescription ?
      (agent.fullDescription[0] as any)?.children?.[0]?.text :
      agent.shortDescription || agent.name,
    'applicationCategory': 'WebApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'operatingSystem': 'Web Browser',
    'author': {
      '@type': 'Person',
      '@id': `${baseUrl}#person`,
      'name': 'Anil Varma'
    }
  };
}

/**
 * HowTo Schema (for Templates)
 */
export function generateHowToSchema(template: Template) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${baseUrl}/templates/${template.slug.current}`,
    'name': template.title,
    'description': template.shortDescription,
    'image': template.previewImages?.[0] ?
      `${baseUrl}/images/templates/${template.slug.current}.jpg` :
      undefined,
    'tool': {
      '@type': 'HowToTool',
      'name': template.title
    },
    'totalTime': 'PT30M', // Estimated 30 minutes
    'supply': {
      '@type': 'HowToSupply',
      'name': template.title
    }
  };
}

/**
 * Case Study Schema (Article + AboutPage)
 */
export function generateCaseStudySchema(caseStudy: CaseStudy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseUrl}/case-studies/${caseStudy.slug.current}`,
    'headline': caseStudy.title,
    'description': `${caseStudy.clientName} - ${caseStudy.industry}`,
    'datePublished': caseStudy.publishedAt,
    'author': {
      '@type': 'Person',
      '@id': `${baseUrl}#person`,
      'name': 'Anil Varma'
    },
    'publisher': {
      '@id': `${baseUrl}#person`
    },
    'about': {
      '@type': 'Thing',
      'name': caseStudy.clientName
    }
  };
}

/**
 * DefinedTerm Schema (for Glossary)
 */
export function generateDefinedTermSchema(term: GlossaryTerm) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${baseUrl}/glossary/${term.slug.current}`,
    'name': term.term,
    'description': term.definition,
    'inDefinedTermSet': `${baseUrl}/glossary`
  };
}

/**
 * FAQ Schema
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

/**
 * Breadcrumb Schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
}

/**
 * Render JSON-LD script tag
 */
export function renderJSONLD(schema: object) {
  return {
    __html: JSON.stringify(schema)
  };
}
