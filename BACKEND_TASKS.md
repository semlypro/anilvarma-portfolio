# Backend Development Tasks (Ralph Autonomous)

## 🚨 URGENT PRIORITY TASK: Comprehensive Content Creation

**Status**: IN PROGRESS
**Priority**: CRITICAL
**Reference**: See `CONTENT_CREATION_TASKS.md` for complete specifications

### Mission
Create production ready 3000+ word SEO optimized content for ALL 20 content pieces (5 blog posts, 5 comparison posts, 5 listicle posts, 5 templates, 5 glossary terms).

### Requirements
- **NO hyphens, en-dashes, or em-dashes**
- Include tables, bullets, numbered lists
- Add table of contents for long articles
- Include expert quotes
- Add comparison sections
- Human quality writing
- SEO and AI/LLM optimized

### Action Items
1. Read `CONTENT_CREATION_TASKS.md` thoroughly
2. Create comprehensive content generation script
3. Generate all 20 pieces with 3000+ words each
4. Verify formatting and quality
5. Deploy to production

**DO THIS FIRST before any other tasks below!**

---

## Project Context
You are building the backend for Anil Varma's SEO portfolio website.
- **Tech Stack**: Next.js 14 (App Router), Sanity CMS v3, TypeScript, Resend, Claude Sonnet API
- **Reference**: See `PROJECT_PLAN.md` for full architecture and `types/index.ts` for TypeScript types
- **Important**: All types are already defined in `types/index.ts` - use them for consistency

---

## Phase 1: Sanity CMS Setup

### 1.1 Initialize Sanity
- [ ] Create `sanity.config.ts` in project root with:
  - Project ID from environment variable
  - Dataset: production
  - Plugins: visionTool, structureTool
  - Schema configuration

- [ ] Create `sanity/env.ts` for environment variables:
  - NEXT_PUBLIC_SANITY_PROJECT_ID
  - NEXT_PUBLIC_SANITY_DATASET
  - SANITY_API_TOKEN

### 1.2 Create Object Schemas (Reusable)

- [ ] Create `sanity/schemas/objects/seo.ts`:
  - metaTitle (string, max 60 chars)
  - metaDescription (text, max 160 chars)
  - ogImage (image)
  - noIndex (boolean)
  - canonicalUrl (url)
  - focusKeyword (string)

- [ ] Create `sanity/schemas/objects/portableText.ts`:
  - Standard text formatting (bold, italic, underline)
  - Headings (h2, h3, h4)
  - Links (internal and external)
  - Images with captions
  - Code blocks with language selection
  - Callout blocks (info, warning, tip)
  - Tables
  - Embedded videos (YouTube, Vimeo)

- [ ] Create `sanity/schemas/objects/faq.ts`:
  - question (string, required)
  - answer (text, required)

- [ ] Create `sanity/schemas/objects/agentField.ts`:
  - name (string)
  - label (string)
  - type (string: text, textarea, url, number, select)
  - placeholder (string)
  - required (boolean)
  - options (array of strings for select)
  - validation (object with minLength, maxLength, pattern)

- [ ] Create `sanity/schemas/objects/entity.ts`:
  - name (string)
  - type (string: Person, Organization, Tool, Concept, Place)
  - sameAs (array of URLs)
  - description (text)

- [ ] Create `sanity/schemas/objects/comparison.ts`:
  - feature (string)
  - itemAValue (string)
  - itemBValue (string)
  - winner (string: A, B, Tie)

### 1.3 Create Document Schemas

- [ ] Create `sanity/schemas/documents/siteSettings.ts`:
  - Fields: siteName, siteDescription, logo, favicon, socialLinks, contactEmail, contactPhone, address, defaultSeo
  - Singleton document pattern

- [ ] Create `sanity/schemas/documents/navigation.ts`:
  - mainNav (array of nav items)
  - footerNav (columns with items)

- [ ] Create `sanity/schemas/documents/homepage.ts`:
  - hero (object: headline, subheadline, ctaText, ctaLink, secondaryCtaText, secondaryCtaLink, image)
  - stats (array of stat objects)
  - services (array of service objects)
  - featuredBlogPosts (references)
  - featuredTemplates (references)
  - testimonials (references)
  - clientLogos (array of images)
  - seo (seo object)

- [ ] Create `sanity/schemas/documents/about.ts`:
  - headline, subheadline
  - profileImage (image)
  - bio (portableText)
  - experiences (array of experience objects)
  - skills (array: name, category, proficiency)
  - certifications (array: name, issuer, date, logo, credentialUrl)
  - philosophy (portableText)
  - cta (object: title, description, buttonText, buttonLink)
  - seo (seo object)

- [ ] Create `sanity/schemas/documents/author.ts`:
  - name, role, image, bio, socialLinks

- [ ] Create `sanity/schemas/documents/blogCategory.ts`:
  - title, slug, description, color

- [ ] Create `sanity/schemas/documents/blogPost.ts`:
  - title, slug, excerpt
  - featuredImage (with alt text)
  - author (reference)
  - categories (references)
  - tags (array of strings)
  - publishedAt, updatedAt
  - content (portableText)
  - readingTime (number, auto-calculated)
  - relatedPosts (references)
  - faqs (array of faq objects)
  - seo (seo object)
  - AEO fields: answerBox (question, answer), keyTakeaways (array), tldr (text)

- [ ] Create `sanity/schemas/documents/comparisonPost.ts`:
  - title, slug
  - itemA, itemB (comparison item objects)
  - comparisonTable (array of comparison rows)
  - verdict (winner, summary, bestFor)
  - introduction, detailedComparison, conclusion (portableText)
  - faqs, seo
  - publishedAt, updatedAt

- [ ] Create `sanity/schemas/documents/listiclePost.ts`:
  - title, slug, listCount
  - listType (numbered, unordered, countdown)
  - listItems (array: title, summary, content, image, externalLink, isAffiliate, rating, pricing)
  - introduction, conclusion (portableText)
  - quickList (array of strings for featured snippets)
  - faqs, seo
  - publishedAt, updatedAt

- [ ] Create `sanity/schemas/documents/templateCategory.ts`:
  - title, slug, description, icon

- [ ] Create `sanity/schemas/documents/template.ts`:
  - title, slug, shortDescription
  - fullDescription (portableText)
  - category (reference)
  - previewImages (array)
  - file (file upload)
  - fileFormat, fileSize
  - downloadCount (number)
  - useCases (array)
  - instructions (portableText)
  - relatedTemplates (references)
  - faqs, seo
  - emailGateEnabled (boolean)
  - thankYouMessage (text)
  - createdAt, updatedAt

- [ ] Create `sanity/schemas/documents/agentCategory.ts`:
  - title, slug, description, icon

- [ ] Create `sanity/schemas/documents/seoAgent.ts`:
  - name, slug, icon
  - shortDescription
  - fullDescription (portableText)
  - category (reference)
  - systemPrompt (text, hidden in studio for security)
  - inputFields (array of agentField)
  - outputFormat (markdown, json, structured)
  - usageExamples (array: input, output)
  - limitations (array)
  - pricingTier (free, premium)
  - usageLimit (number)
  - faqs, seo
  - isEnabled (boolean)
  - createdAt

- [ ] Create `sanity/schemas/documents/caseStudy.ts`:
  - title, slug
  - clientName, clientLogo
  - industry, isAnonymized
  - challenge, strategy, results (portableText)
  - metrics (array: label, beforeValue, afterValue, changePercent, isPositive)
  - timeline
  - testimonial (quote, author, role, image)
  - keyLearnings (array)
  - featuredImage, gallery
  - relatedCaseStudies (references)
  - faqs, seo
  - publishedAt, updatedAt

- [ ] Create `sanity/schemas/documents/testimonial.ts`:
  - name, role, company
  - image, quote, videoUrl
  - linkedinUrl, resultAchieved
  - isFeatured (boolean)

- [ ] Create `sanity/schemas/documents/glossaryTerm.ts`:
  - term, slug
  - definition (text, max 200 chars)
  - fullExplanation (portableText)
  - relatedTerms (references)
  - relatedPosts (references)
  - examples (array)
  - letter (string for A-Z filter)
  - seo
  - createdAt, updatedAt

- [ ] Create `sanity/schemas/documents/newsletterIssue.ts`:
  - title, slug, previewText
  - content (portableText)
  - publishedAt, isPublished

- [ ] Create `sanity/schemas/documents/speakingEvent.ts`:
  - title, eventName
  - eventType (conference, podcast, webinar, workshop, interview)
  - date, description
  - videoUrl, slidesUrl
  - eventLogo, eventUrl
  - isUpcoming

- [ ] Create `sanity/schemas/documents/contact.ts`:
  - email, name
  - source (template_download, newsletter, contact_form, agent_usage)
  - sourceId, tags
  - createdAt, metadata

### 1.4 Configure Schema Index

- [ ] Create `sanity/schemas/index.ts`:
  - Export all schemas in array
  - Include all document and object types

### 1.5 Configure Sanity Studio

- [ ] Create `sanity/desk/structure.ts`:
  - Organize documents by category:
    - Site Settings (singleton)
    - Content (Blog, Case Studies, Glossary)
    - Resources (Templates, Agents)
    - People (Authors, Testimonials)
    - Contacts
  - Custom document list previews

- [ ] Create `app/studio/[[...tool]]/page.tsx`:
  - Embedded Sanity Studio route
  - NextStudio component

---

## Phase 2: Sanity Client & Queries

### 2.1 Client Setup

- [ ] Create `lib/sanity/client.ts`:
  - Sanity client configuration
  - Preview client for drafts
  - CDN client for production

- [ ] Create `lib/sanity/image.ts`:
  - urlForImage helper function
  - Image dimension helpers

### 2.2 GROQ Queries

- [ ] Create `lib/sanity/queries.ts` with all queries:

```typescript
// Site Settings & Navigation
export const getSiteSettingsQuery = groq`*[_type == "siteSettings"][0]`
export const getNavigationQuery = groq`*[_type == "navigation"][0]`

// Homepage
export const getHomepageQuery = groq`*[_type == "homepage"][0]{
  ...,
  featuredBlogPosts[]->,
  featuredTemplates[]->,
  testimonials[]->
}`

// About
export const getAboutQuery = groq`*[_type == "about"][0]`

// Blog
export const getAllBlogPostsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc)`
export const getBlogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0]{
  ...,
  author->,
  categories[]->,
  relatedPosts[]->
}`
export const getBlogCategoriesQuery = groq`*[_type == "blogCategory"]`

// Comparison Posts
export const getAllComparisonPostsQuery = groq`*[_type == "comparisonPost"] | order(publishedAt desc)`
export const getComparisonPostBySlugQuery = groq`*[_type == "comparisonPost" && slug.current == $slug][0]`

// Listicle Posts
export const getAllListiclePostsQuery = groq`*[_type == "listiclePost"] | order(publishedAt desc)`
export const getListiclePostBySlugQuery = groq`*[_type == "listiclePost" && slug.current == $slug][0]`

// Templates
export const getAllTemplatesQuery = groq`*[_type == "template"]{..., category->}`
export const getTemplateBySlugQuery = groq`*[_type == "template" && slug.current == $slug][0]{
  ...,
  category->,
  relatedTemplates[]->
}`
export const getTemplateCategoriesQuery = groq`*[_type == "templateCategory"]`

// SEO Agents
export const getAllAgentsQuery = groq`*[_type == "seoAgent" && isEnabled == true]{..., category->}`
export const getAgentBySlugQuery = groq`*[_type == "seoAgent" && slug.current == $slug][0]{..., category->}`
export const getAgentCategoriesQuery = groq`*[_type == "agentCategory"]`

// Case Studies
export const getAllCaseStudiesQuery = groq`*[_type == "caseStudy"] | order(publishedAt desc)`
export const getCaseStudyBySlugQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
  ...,
  relatedCaseStudies[]->
}`

// Glossary
export const getAllGlossaryTermsQuery = groq`*[_type == "glossaryTerm"] | order(term asc)`
export const getGlossaryTermBySlugQuery = groq`*[_type == "glossaryTerm" && slug.current == $slug][0]{
  ...,
  relatedTerms[]->,
  relatedPosts[]->
}`

// Testimonials
export const getAllTestimonialsQuery = groq`*[_type == "testimonial"]`
export const getFeaturedTestimonialsQuery = groq`*[_type == "testimonial" && isFeatured == true]`

// Newsletter
export const getNewsletterIssuesQuery = groq`*[_type == "newsletterIssue" && isPublished == true] | order(publishedAt desc)`

// Speaking Events
export const getSpeakingEventsQuery = groq`*[_type == "speakingEvent"] | order(date desc)`
```

### 2.3 Data Fetching Functions

- [ ] Create `lib/sanity/fetch.ts`:
  - Wrapper functions for all queries
  - Error handling
  - Caching configuration
  - Type-safe returns

---

## Phase 3: API Routes

### 3.1 Sanity Webhook

- [ ] Create `app/api/revalidate/route.ts`:
  - Validate Sanity webhook signature
  - Parse document type from payload
  - Revalidate affected paths:
    - blogPost → /blog, /blog/[slug]
    - template → /templates, /templates/[slug]
    - seoAgent → /seo-agents, /seo-agents/[slug]
    - caseStudy → /case-studies, /case-studies/[slug]
    - glossaryTerm → /glossary, /glossary/[term]
    - homepage → /
    - about → /about
  - Return 200 on success

### 3.2 SEO Agent API

- [ ] Create `app/api/agents/[agentId]/route.ts`:
  - POST handler for agent requests
  - Validate request body (Zod schema)
  - Fetch agent config from Sanity
  - Check rate limit (Vercel KV)
  - Call Claude Sonnet API with:
    - System prompt from Sanity
    - User inputs formatted
    - Streaming enabled
  - Return streaming response
  - Handle errors gracefully

- [ ] Create `lib/ai/anthropic.ts`:
  - Anthropic client configuration
  - Streaming helper functions
  - Token counting utilities

### 3.3 Download API (Email Gate)

- [ ] Create `app/api/download/route.ts`:
  - POST handler
  - Validate email and templateId
  - Check if email exists in Sanity contacts
  - If new: create contact, send welcome email
  - Generate signed download URL (expires in 24h)
  - Increment download count in Sanity
  - Return download URL

### 3.4 Newsletter Subscribe API

- [ ] Create `app/api/subscribe/route.ts`:
  - POST handler
  - Validate email
  - Check for existing subscriber
  - Create contact in Sanity with source: 'newsletter'
  - Send welcome email via Resend
  - Return success/already subscribed

### 3.5 Contact Form API

- [ ] Create `app/api/contact/route.ts`:
  - POST handler
  - Validate name, email, message
  - Create contact in Sanity
  - Send notification email to Anil
  - Send confirmation email to user
  - Return success

### 3.6 Search API

- [ ] Create `app/api/search/route.ts`:
  - GET handler with query param
  - Search across blog posts, templates, agents, glossary
  - Return unified results with type, title, slug, excerpt
  - Limit to 20 results

### 3.7 Dynamic OG Image

- [ ] Create `app/api/og/route.tsx`:
  - GET handler with title, description params
  - Generate OG image using @vercel/og
  - Anil's branding (colors, fonts)
  - Return PNG image

### 3.8 Rate Limiting Middleware

- [ ] Create `lib/utils/rateLimit.ts`:
  - Rate limiter using Vercel KV
  - Configurable limits per endpoint
  - IP-based tracking
  - Return remaining/reset headers

### 3.9 Input Validation

- [ ] Create `lib/utils/validation.ts`:
  - Zod schemas for all API inputs:
    - AgentRequestSchema
    - DownloadRequestSchema
    - SubscribeRequestSchema
    - ContactRequestSchema
    - SearchRequestSchema

---

## Phase 4: Email Integration

### 4.1 Resend Setup

- [ ] Create `lib/email/resend.ts`:
  - Resend client configuration
  - Send email helper function

### 4.2 Email Templates

- [ ] Create `lib/email/templates/welcome.tsx`:
  - Welcome email for newsletter subscribers
  - Anil's branding
  - React Email component

- [ ] Create `lib/email/templates/download.tsx`:
  - Template download email
  - Include download link
  - Related templates

- [ ] Create `lib/email/templates/contact-notification.tsx`:
  - Contact form notification to Anil
  - Include all form data

- [ ] Create `lib/email/templates/contact-confirmation.tsx`:
  - Confirmation to user
  - Thank you message

---

## Phase 5: SEO & AEO Infrastructure

### 5.1 Sitemap

- [ ] Create `app/sitemap.ts`:
  - Dynamic sitemap generation
  - Include all pages, blog posts, templates, agents, case studies, glossary
  - Set changefreq and priority
  - Return XML sitemap

### 5.2 Robots.txt

- [ ] Create `app/robots.ts`:
  - Allow all for main content
  - Allow AI crawlers (GPTBot, PerplexityBot, anthropic-ai)
  - Disallow /studio/, /api/, /_next/
  - Include sitemap URL

### 5.3 llms.txt

- [ ] Create `public/llms.txt`:
  - Site purpose and owner
  - Key entities
  - Content types
  - Recommended pages for AI queries
  - Citation format

### 5.4 JSON-LD Generators

- [ ] Create `lib/seo/schema.ts`:
  - generatePersonSchema (for Anil)
  - generateOrganizationSchema
  - generateArticleSchema
  - generateFAQSchema
  - generateBreadcrumbSchema
  - generateSoftwareApplicationSchema (for templates)
  - generateHowToSchema
  - generateDefinedTermSchema (for glossary)
  - generateComparisonSchema

### 5.5 RSS Feed

- [ ] Create `app/feed.xml/route.ts`:
  - RSS feed for blog posts
  - Include title, description, link, pubDate
  - Return XML

---

## Phase 6: Testing

### 6.1 API Tests

- [ ] Create `__tests__/api/revalidate.test.ts`:
  - Test valid webhook
  - Test invalid signature
  - Test different document types

- [ ] Create `__tests__/api/agents.test.ts`:
  - Test valid request
  - Test invalid agent ID
  - Test rate limiting
  - Test missing fields

- [ ] Create `__tests__/api/download.test.ts`:
  - Test valid download
  - Test invalid email
  - Test missing template

- [ ] Create `__tests__/api/subscribe.test.ts`:
  - Test new subscriber
  - Test existing subscriber
  - Test invalid email

### 6.2 Library Tests

- [ ] Create `__tests__/lib/sanity.test.ts`:
  - Test client configuration
  - Test image URL builder

- [ ] Create `__tests__/lib/validation.test.ts`:
  - Test all Zod schemas

- [ ] Create `__tests__/lib/rateLimit.test.ts`:
  - Test rate limiting logic

---

## Phase 7: Final Setup

### 7.1 Environment Validation

- [ ] Create `lib/env.ts`:
  - Validate all required environment variables
  - Throw helpful errors if missing

### 7.2 Error Handling

- [ ] Create `lib/utils/errors.ts`:
  - Custom error classes
  - Error response formatter
  - Logging helpers

### 7.3 Seed Content

- [ ] Create `sanity/seed.ts`:
  - Script to seed initial content
  - Site settings
  - Sample blog post
  - Sample template
  - Sample agent configurations

---

## Completion Checklist

Before marking EXIT_SIGNAL: true, verify:
- [ ] All Sanity schemas compile without errors
- [ ] All GROQ queries are valid
- [ ] All API routes return expected responses
- [ ] All tests pass
- [ ] TypeScript strict mode passes
- [ ] No ESLint errors

---

EXIT_SIGNAL: false

<!--
Ralph will:
1. Read this file
2. Execute tasks sequentially
3. Run tests after each task
4. Auto-commit passing changes
5. Continue until EXIT_SIGNAL: true
6. Send notification on completion
-->
