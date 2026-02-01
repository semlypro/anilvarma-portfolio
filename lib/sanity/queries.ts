import {groq} from 'next-sanity';

// ===========================================
// SITE SETTINGS & NAVIGATION
// ===========================================

export const getSiteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  _id,
  siteName,
  siteDescription,
  logo,
  favicon,
  socialLinks,
  contactEmail,
  contactPhone,
  address,
  defaultSeo
}`;

export const getNavigationQuery = groq`*[_type == "navigation"][0]{
  _id,
  mainNav,
  footerNav
}`;

// ===========================================
// HOMEPAGE
// ===========================================

export const getHomepageQuery = groq`*[_type == "homepage"][0]{
  _id,
  hero,
  stats,
  services,
  featuredBlogPosts[]->{
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    readingTime,
    author->{
      name,
      role,
      image
    },
    categories[]->{
      title,
      slug,
      color
    }
  },
  featuredTemplates[]->{
    _id,
    title,
    slug,
    shortDescription,
    previewImages,
    category->{
      title,
      slug,
      icon
    },
    fileFormat,
    downloadCount
  },
  testimonials[]->{
    _id,
    name,
    role,
    company,
    image,
    quote,
    resultAchieved
  },
  clientLogos,
  seo
}`;

// ===========================================
// ABOUT
// ===========================================

export const getAboutQuery = groq`*[_type == "about"][0]{
  _id,
  headline,
  subheadline,
  profileImage,
  bio,
  experiences,
  skills,
  certifications,
  philosophy,
  cta,
  seo
}`;

// ===========================================
// BLOG
// ===========================================

export const getAllBlogPostsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  updatedAt,
  readingTime,
  author->{
    name,
    role,
    image
  },
  categories[]->{
    title,
    slug,
    color
  },
  tags
}`;

export const getBlogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  author->{
    _id,
    name,
    role,
    image,
    bio,
    socialLinks
  },
  categories[]->{
    _id,
    title,
    slug,
    description,
    color
  },
  tags,
  publishedAt,
  updatedAt,
  content,
  readingTime,
  relatedPosts[]->{
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    readingTime,
    author->{
      name,
      image
    }
  },
  faqs,
  seo,
  answerBox,
  keyTakeaways,
  tldr
}`;

export const getBlogCategoriesQuery = groq`*[_type == "blogCategory"] | order(title asc){
  _id,
  title,
  slug,
  description,
  color
}`;

export const getBlogPostsByCategoryQuery = groq`*[_type == "blogPost" && $categoryId in categories[]._ref] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  readingTime,
  author->{
    name,
    image
  },
  categories[]->{
    title,
    slug,
    color
  }
}`;

export const getBlogPostsByTagQuery = groq`*[_type == "blogPost" && $tag in tags] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  readingTime,
  author->{
    name,
    image
  },
  categories[]->{
    title,
    slug,
    color
  },
  tags
}`;

export const getRecentBlogPostsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc)[0...5]{
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  readingTime
}`;

// ===========================================
// COMPARISON POSTS
// ===========================================

export const getAllComparisonPostsQuery = groq`*[_type == "comparisonPost"] | order(publishedAt desc){
  _id,
  title,
  slug,
  itemA,
  itemB,
  verdict,
  publishedAt,
  updatedAt
}`;

export const getComparisonPostBySlugQuery = groq`*[_type == "comparisonPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  itemA,
  itemB,
  comparisonTable,
  verdict,
  introduction,
  detailedComparison,
  conclusion,
  faqs,
  seo,
  publishedAt,
  updatedAt
}`;

// ===========================================
// LISTICLE POSTS
// ===========================================

export const getAllListiclePostsQuery = groq`*[_type == "listiclePost"] | order(publishedAt desc){
  _id,
  title,
  slug,
  listCount,
  listType,
  quickList,
  publishedAt,
  updatedAt
}`;

export const getListiclePostBySlugQuery = groq`*[_type == "listiclePost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  listCount,
  listType,
  listItems,
  introduction,
  conclusion,
  quickList,
  faqs,
  seo,
  publishedAt,
  updatedAt
}`;

// ===========================================
// TEMPLATES
// ===========================================

export const getAllTemplatesQuery = groq`*[_type == "template"] | order(downloadCount desc){
  _id,
  title,
  slug,
  shortDescription,
  previewImages,
  category->{
    _id,
    title,
    slug,
    icon
  },
  fileFormat,
  fileSize,
  downloadCount,
  useCases,
  emailGateEnabled,
  createdAt,
  updatedAt
}`;

export const getTemplateBySlugQuery = groq`*[_type == "template" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  shortDescription,
  fullDescription,
  category->{
    _id,
    title,
    slug,
    description,
    icon
  },
  previewImages,
  file,
  fileFormat,
  fileSize,
  downloadCount,
  useCases,
  instructions,
  relatedTemplates[]->{
    _id,
    title,
    slug,
    shortDescription,
    previewImages,
    category->{
      title,
      slug,
      icon
    },
    fileFormat,
    downloadCount
  },
  faqs,
  seo,
  emailGateEnabled,
  thankYouMessage,
  createdAt,
  updatedAt
}`;

export const getTemplateCategoriesQuery = groq`*[_type == "templateCategory"] | order(title asc){
  _id,
  title,
  slug,
  description,
  icon
}`;

export const getTemplatesByCategoryQuery = groq`*[_type == "template" && category._ref == $categoryId] | order(downloadCount desc){
  _id,
  title,
  slug,
  shortDescription,
  previewImages,
  category->{
    title,
    slug,
    icon
  },
  fileFormat,
  downloadCount,
  createdAt
}`;

export const getFeaturedTemplatesQuery = groq`*[_type == "template"] | order(downloadCount desc)[0...6]{
  _id,
  title,
  slug,
  shortDescription,
  previewImages,
  category->{
    title,
    slug,
    icon
  },
  fileFormat,
  downloadCount
}`;

// ===========================================
// SEO AGENTS
// ===========================================

export const getAllAgentsQuery = groq`*[_type == "seoAgent" && isEnabled == true] | order(name asc){
  _id,
  name,
  slug,
  icon,
  shortDescription,
  category->{
    _id,
    title,
    slug,
    icon
  },
  pricingTier,
  usageLimit,
  createdAt
}`;

export const getAgentBySlugQuery = groq`*[_type == "seoAgent" && slug.current == $slug && isEnabled == true][0]{
  _id,
  name,
  slug,
  icon,
  shortDescription,
  fullDescription,
  category->{
    _id,
    title,
    slug,
    description,
    icon
  },
  systemPrompt,
  inputFields,
  outputFormat,
  usageExamples,
  limitations,
  pricingTier,
  usageLimit,
  faqs,
  seo,
  isEnabled,
  createdAt
}`;

export const getAgentByIdQuery = groq`*[_type == "seoAgent" && _id == $agentId][0]{
  _id,
  name,
  slug,
  icon,
  shortDescription,
  systemPrompt,
  inputFields,
  outputFormat,
  pricingTier,
  usageLimit,
  isEnabled
}`;

export const getAgentCategoriesQuery = groq`*[_type == "agentCategory"] | order(title asc){
  _id,
  title,
  slug,
  description,
  icon
}`;

export const getAgentsByCategoryQuery = groq`*[_type == "seoAgent" && category._ref == $categoryId && isEnabled == true] | order(name asc){
  _id,
  name,
  slug,
  icon,
  shortDescription,
  category->{
    title,
    slug,
    icon
  },
  pricingTier,
  createdAt
}`;

export const getFeaturedAgentsQuery = groq`*[_type == "seoAgent" && isEnabled == true] | order(_createdAt desc)[0...6]{
  _id,
  name,
  slug,
  icon,
  shortDescription,
  category->{
    title,
    slug,
    icon
  },
  pricingTier
}`;

// ===========================================
// CASE STUDIES
// ===========================================

export const getAllCaseStudiesQuery = groq`*[_type == "caseStudy"] | order(publishedAt desc){
  _id,
  title,
  slug,
  clientName,
  clientLogo,
  industry,
  isAnonymized,
  metrics,
  timeline,
  featuredImage,
  publishedAt,
  updatedAt
}`;

export const getCaseStudyBySlugQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  clientName,
  clientLogo,
  industry,
  isAnonymized,
  challenge,
  strategy,
  results,
  metrics,
  timeline,
  testimonial,
  keyLearnings,
  featuredImage,
  gallery,
  relatedCaseStudies[]->{
    _id,
    title,
    slug,
    clientName,
    industry,
    metrics,
    featuredImage
  },
  faqs,
  seo,
  publishedAt,
  updatedAt
}`;

export const getFeaturedCaseStudiesQuery = groq`*[_type == "caseStudy"] | order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  clientName,
  clientLogo,
  industry,
  metrics,
  featuredImage,
  publishedAt
}`;

// ===========================================
// GLOSSARY
// ===========================================

export const getAllGlossaryTermsQuery = groq`*[_type == "glossaryTerm"] | order(term asc){
  _id,
  term,
  slug,
  definition,
  letter,
  createdAt,
  updatedAt
}`;

export const getGlossaryTermBySlugQuery = groq`*[_type == "glossaryTerm" && slug.current == $slug][0]{
  _id,
  term,
  slug,
  definition,
  fullExplanation,
  relatedTerms[]->{
    _id,
    term,
    slug,
    definition
  },
  relatedPosts[]->{
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt
  },
  examples,
  seo,
  letter,
  createdAt,
  updatedAt
}`;

export const getGlossaryTermsByLetterQuery = groq`*[_type == "glossaryTerm" && letter == $letter] | order(term asc){
  _id,
  term,
  slug,
  definition,
  letter
}`;

export const getGlossaryLettersQuery = groq`*[_type == "glossaryTerm"]{
  "letter": letter
} | order(letter asc)`;

// ===========================================
// TESTIMONIALS
// ===========================================

export const getAllTestimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt desc){
  _id,
  name,
  role,
  company,
  image,
  quote,
  videoUrl,
  linkedinUrl,
  resultAchieved,
  isFeatured
}`;

export const getFeaturedTestimonialsQuery = groq`*[_type == "testimonial" && isFeatured == true] | order(_createdAt desc){
  _id,
  name,
  role,
  company,
  image,
  quote,
  videoUrl,
  resultAchieved
}`;

// ===========================================
// AUTHORS
// ===========================================

export const getAllAuthorsQuery = groq`*[_type == "author"] | order(name asc){
  _id,
  name,
  role,
  image,
  bio,
  socialLinks
}`;

export const getAuthorByIdQuery = groq`*[_type == "author" && _id == $authorId][0]{
  _id,
  name,
  role,
  image,
  bio,
  socialLinks
}`;

// ===========================================
// NEWSLETTER
// ===========================================

export const getNewsletterIssuesQuery = groq`*[_type == "newsletterIssue" && isPublished == true] | order(publishedAt desc){
  _id,
  title,
  slug,
  previewText,
  publishedAt
}`;

export const getNewsletterIssueBySlugQuery = groq`*[_type == "newsletterIssue" && slug.current == $slug && isPublished == true][0]{
  _id,
  title,
  slug,
  previewText,
  content,
  publishedAt
}`;

export const getLatestNewsletterIssueQuery = groq`*[_type == "newsletterIssue" && isPublished == true] | order(publishedAt desc)[0]{
  _id,
  title,
  slug,
  previewText,
  publishedAt
}`;

// ===========================================
// SPEAKING EVENTS
// ===========================================

export const getSpeakingEventsQuery = groq`*[_type == "speakingEvent"] | order(date desc){
  _id,
  title,
  eventName,
  eventType,
  date,
  description,
  videoUrl,
  slidesUrl,
  eventLogo,
  eventUrl,
  isUpcoming
}`;

export const getUpcomingSpeakingEventsQuery = groq`*[_type == "speakingEvent" && isUpcoming == true] | order(date asc){
  _id,
  title,
  eventName,
  eventType,
  date,
  description,
  eventLogo,
  eventUrl
}`;

export const getPastSpeakingEventsQuery = groq`*[_type == "speakingEvent" && isUpcoming == false] | order(date desc){
  _id,
  title,
  eventName,
  eventType,
  date,
  description,
  videoUrl,
  slidesUrl,
  eventLogo
}`;

// ===========================================
// SEARCH
// ===========================================

export const searchQuery = groq`{
  "blogPosts": *[_type == "blogPost" && (
    title match $searchTerm + "*" ||
    excerpt match $searchTerm + "*" ||
    pt::text(content) match $searchTerm + "*"
  )][0...5]{
    _id,
    _type,
    title,
    slug,
    excerpt,
    "url": "/blog/" + slug.current
  },
  "templates": *[_type == "template" && (
    title match $searchTerm + "*" ||
    shortDescription match $searchTerm + "*"
  )][0...5]{
    _id,
    _type,
    title,
    slug,
    "excerpt": shortDescription,
    "url": "/templates/" + slug.current
  },
  "agents": *[_type == "seoAgent" && isEnabled == true && (
    name match $searchTerm + "*" ||
    shortDescription match $searchTerm + "*"
  )][0...5]{
    _id,
    _type,
    "title": name,
    slug,
    "excerpt": shortDescription,
    "url": "/seo-agents/" + slug.current
  },
  "glossary": *[_type == "glossaryTerm" && (
    term match $searchTerm + "*" ||
    definition match $searchTerm + "*"
  )][0...5]{
    _id,
    _type,
    "title": term,
    slug,
    "excerpt": definition,
    "url": "/glossary/" + slug.current
  },
  "caseStudies": *[_type == "caseStudy" && (
    title match $searchTerm + "*" ||
    clientName match $searchTerm + "*"
  )][0...5]{
    _id,
    _type,
    title,
    slug,
    "excerpt": clientName + " - " + industry,
    "url": "/case-studies/" + slug.current
  }
}`;

// ===========================================
// SITEMAP (for generating sitemap.xml)
// ===========================================

export const getAllSlugsQuery = groq`{
  "blogPosts": *[_type == "blogPost" && defined(slug.current)]{
    "slug": slug.current,
    "updatedAt": coalesce(updatedAt, publishedAt)
  },
  "comparisonPosts": *[_type == "comparisonPost" && defined(slug.current)]{
    "slug": slug.current,
    "updatedAt": coalesce(updatedAt, publishedAt)
  },
  "listiclePosts": *[_type == "listiclePost" && defined(slug.current)]{
    "slug": slug.current,
    "updatedAt": coalesce(updatedAt, publishedAt)
  },
  "templates": *[_type == "template" && defined(slug.current)]{
    "slug": slug.current,
    "updatedAt": coalesce(updatedAt, createdAt)
  },
  "agents": *[_type == "seoAgent" && isEnabled == true && defined(slug.current)]{
    "slug": slug.current,
    "updatedAt": createdAt
  },
  "caseStudies": *[_type == "caseStudy" && defined(slug.current)]{
    "slug": slug.current,
    "updatedAt": coalesce(updatedAt, publishedAt)
  },
  "glossaryTerms": *[_type == "glossaryTerm" && defined(slug.current)]{
    "slug": slug.current,
    "updatedAt": coalesce(updatedAt, createdAt)
  },
  "categories": *[_type == "blogCategory" && defined(slug.current)]{
    "slug": slug.current
  },
  "templateCategories": *[_type == "templateCategory" && defined(slug.current)]{
    "slug": slug.current
  },
  "agentCategories": *[_type == "agentCategory" && defined(slug.current)]{
    "slug": slug.current
  }
}`;

// ===========================================
// CONTACTS (Admin only)
// ===========================================

export const getAllContactsQuery = groq`*[_type == "contact"] | order(createdAt desc){
  _id,
  email,
  name,
  source,
  sourceId,
  tags,
  createdAt,
  metadata
}`;

export const getContactsBySourceQuery = groq`*[_type == "contact" && source == $source] | order(createdAt desc){
  _id,
  email,
  name,
  source,
  sourceId,
  tags,
  createdAt
}`;
