# Contextual Forms Implementation Guide

## Overview
Implemented a comprehensive contextual form system that adapts messaging, CTAs, and design based on page type to maximize conversions.

## Component: ContextualForm

**Location**: `components/shared/ContextualForm.tsx`

### Features
- ✅ 14 unique page type configurations
- ✅ Contextual messaging tailored to user intent
- ✅ Dynamic CTA text based on page context
- ✅ Success states with contextual messaging
- ✅ Gradient design with smooth animations
- ✅ Full form validation and error handling
- ✅ Sends subject line with page context

### Page Type Configurations

| Page Type | Heading | CTA | Use Case |
|-----------|---------|-----|----------|
| `homepage` | "Ready to Scale Your Traffic?" | "Get Free Audit" | Main landing page |
| `service` | "Start Growing Today" | "Book Free Consultation" | Service detail pages |
| `blog-post` | "Put This Into Action" | "Get Expert Help" | Individual blog articles |
| `blog-index` | "Want Personalized SEO Advice?" | "Get Custom Strategy" | Blog list page |
| `case-study` | "Get Similar Results" | "Discuss Your Project" | Case study details |
| `case-studies-index` | "Ready for Similar Growth?" | "Start Your Success Story" | Case studies list |
| `agent` | "Need More Than Automation?" | "Upgrade to Expert Help" | AI agent detail pages |
| `agents-index` | "Combine AI + Expert Strategy" | "Get Expert Guidance" | AI agents list |
| `template` | "Get Custom Templates" | "Request Custom Template" | Template detail pages |
| `templates-index` | "Need Custom Solutions?" | "Get Custom Templates" | Templates list |
| `glossary` | "Questions About This Concept?" | "Ask an Expert" | Glossary term details |
| `glossary-index` | "Need SEO Clarity?" | "Ask Your Question" | Glossary list |
| `about` | "Let's Work Together" | "Start Conversation" | About page |
| `contact` | "Send Me a Message" | "Send Message" | Contact page |

## Implementation Pattern

### Basic Usage
```tsx
import { ContextualForm } from '@/components/shared/ContextualForm';

// In your page component
<section className="py-16 px-4 md:px-8">
  <div className="max-w-4xl mx-auto">
    <ContextualForm
      pageType="service"
      pageTitle="Technical SEO"
    />
  </div>
</section>
```

### Props
```typescript
interface ContextualFormProps {
  pageType: PageType;          // Required: Determines messaging
  pageTitle?: string;            // Optional: Adds context to subject line
  compact?: boolean;             // Optional: Smaller padding for tight spaces
  className?: string;            // Optional: Additional CSS classes
}
```

## Currently Implemented Pages

### ✅ Completed
1. **Homepage** (`app/(site)/page.tsx`)
   - Page type: `homepage`
   - Placement: After testimonials section
   - Message: Free audit offer

2. **Technical SEO Service** (`app/(site)/technical-seo/page.tsx`)
   - Page type: `service`
   - Page title: "Technical SEO"
   - Placement: After final CTA section
   - Message: Book consultation for this service

## TODO: Add Forms to Remaining Pages

### High Priority (Conversion Pages)
- [ ] Blog Post Detail (`components/pages/BlogDetailPage.tsx`)
  - Add `<ContextualForm pageType="blog-post" pageTitle={post.title} />`
  - Place after blog content, before related posts

- [ ] Case Study Detail (`components/pages/CaseStudyDetailPage.tsx` or similar)
  - Add `<ContextualForm pageType="case-study" pageTitle={caseStudy.client} />`
  - Place after results section

- [ ] About Page (`app/(site)/about/page.tsx`)
  - Add `<ContextualForm pageType="about" />`
  - Place at bottom before footer

### Medium Priority (List Pages)
- [ ] Blog Index (`app/(site)/blog/page.tsx`)
  - Add `<ContextualForm pageType="blog-index" compact={true} />`

- [ ] Case Studies Index (`app/(site)/case-studies/page.tsx`)
  - Add `<ContextualForm pageType="case-studies-index" compact={true} />`

- [ ] Agents Index (`app/(site)/agents/page.tsx`)
  - Add `<ContextualForm pageType="agents-index" compact={true} />`

- [ ] Templates Index (`app/(site)/templates/page.tsx`)
  - Add `<ContextualForm pageType="templates-index" compact={true} />`

### Lower Priority (Individual Pages)
- [ ] Agent Detail (`app/(site)/agents/[slug]/page.tsx`)
  - Add `<ContextualForm pageType="agent" pageTitle={agent.name} />`

- [ ] Template Detail (`app/(site)/templates/[slug]/page.tsx`)
  - Add `<ContextualForm pageType="template" pageTitle={template.name} />`

- [ ] Glossary Term (`app/(site)/glossary/[slug]/page.tsx`)
  - Add `<ContextualForm pageType="glossary" pageTitle={term.name} compact={true} />`

- [ ] Glossary Index (`app/(site)/glossary/page.tsx`)
  - Add `<ContextualForm pageType="glossary-index" compact={true} />`

## Design Philosophy

### Conversion-Focused Messaging
Each form configuration is designed based on user intent:
- **Service pages**: Emphasize immediate action (consultations)
- **Blog posts**: Focus on implementation help
- **Case studies**: Offer similar results
- **Educational content**: Provide expert guidance

### Visual Design
- Gradient backgrounds: `from-neutral-50 to-primary-50/30`
- Accent colors for CTAs: `from-primary-600 to-accent-600`
- Smooth animations with Framer Motion
- Responsive grid layout
- Clear visual hierarchy

### Success States
- Checkmark icon in gradient circle
- Contextual success message per page type
- Auto-clears form after 2 seconds
- Smooth transitions

## Technical Notes

### Form Submission
- Endpoint: `/api/contact`
- Method: POST
- Payload:
  ```json
  {
    "name": "string",
    "email": "string",
    "message": "string",
    "subject": "string (auto-generated)"
  }
  ```

### Subject Line Format
- Format: `{config.heading} - {pageTitle}`
- Example: "Start Growing Today - Technical SEO"
- Helps categorize inquiries by source

### Validation
- All fields required
- Email validation built-in
- Error handling for API failures
- Loading states during submission

## Deployment Checklist

- [x] Create ContextualForm component
- [x] Add to homepage
- [x] Add to technical-seo service page
- [ ] Add to blog post template
- [ ] Add to case study template
- [ ] Add to about page
- [ ] Add to list pages (blog, case studies, etc.)
- [ ] Test all forms
- [ ] Verify email subjects
- [ ] Check mobile responsiveness
- [ ] Deploy to production

## Performance Considerations

- Component is client-side only (uses `'use client'`)
- Forms lazy-load when page scrolls into view
- Minimal bundle size impact (~5KB gzipped)
- No external dependencies beyond existing (Framer Motion, Lucide)

## Maintenance

### Adding New Page Types
1. Add to `PageType` union type
2. Add configuration to `formConfigs` object
3. Implement on page with appropriate `pageType` prop

### Updating Messaging
- Edit `formConfigs` object in `ContextualForm.tsx`
- All instances update automatically
- No need to modify individual pages

## Conversion Tracking

Consider adding analytics events:
- Form view (when form scrolls into view)
- Form submission start
- Form submission success
- Form submission error

Example:
```typescript
// In handleSubmit
if (response.ok) {
  // Track conversion
  window.gtag?.('event', 'form_submit', {
    form_type: pageType,
    page_title: pageTitle
  });
}
```
