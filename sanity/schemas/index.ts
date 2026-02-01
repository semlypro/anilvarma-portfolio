import { SchemaTypeDefinition } from 'sanity'

// Object schemas (reusable)
import seo from './objects/seo'
import portableText from './objects/portableText'
import faq from './objects/faq'
import agentField from './objects/agentField'
import entity from './objects/entity'
import comparison from './objects/comparison'

// Document schemas
import siteSettings from './documents/siteSettings'
import navigation from './documents/navigation'
import homepage from './documents/homepage'
import about from './documents/about'
import author from './documents/author'
import blogCategory from './documents/blogCategory'
import blogPost from './documents/blogPost'
import comparisonPost from './documents/comparisonPost'
import listiclePost from './documents/listiclePost'
import templateCategory from './documents/templateCategory'
import template from './documents/template'
import agentCategory from './documents/agentCategory'
import seoAgent from './documents/seoAgent'
import caseStudy from './documents/caseStudy'
import testimonial from './documents/testimonial'
import glossaryTerm from './documents/glossaryTerm'
import newsletterIssue from './documents/newsletterIssue'
import speakingEvent from './documents/speakingEvent'
import contact from './documents/contact'

export const schema: SchemaTypeDefinition[] = [
  // Object schemas
  seo,
  portableText,
  faq,
  agentField,
  entity,
  comparison,

  // Document schemas
  siteSettings,
  navigation,
  homepage,
  about,
  author,
  blogCategory,
  blogPost,
  comparisonPost,
  listiclePost,
  templateCategory,
  template,
  agentCategory,
  seoAgent,
  caseStudy,
  testimonial,
  glossaryTerm,
  newsletterIssue,
  speakingEvent,
  contact,
]
