# Ralph Fix Plan - Anil Varma SEO Portfolio Backend

## Reference
See `../BACKEND_TASKS.md` for detailed task specifications.

---

## Phase 1: Sanity CMS Setup ✅ COMPLETE

### 1.1 Initialize Sanity ✅
- [x] Create `sanity.config.ts` with project configuration
- [x] Create `sanity/env.ts` for environment variables

### 1.2 Create Object Schemas (Reusable) ✅
- [x] Create `sanity/schemas/objects/seo.ts`
- [x] Create `sanity/schemas/objects/portableText.ts`
- [x] Create `sanity/schemas/objects/faq.ts`
- [x] Create `sanity/schemas/objects/agentField.ts`
- [x] Create `sanity/schemas/objects/entity.ts`
- [x] Create `sanity/schemas/objects/comparison.ts`

### 1.3 Create Document Schemas ✅
- [x] Create `sanity/schemas/documents/siteSettings.ts`
- [x] Create `sanity/schemas/documents/navigation.ts`
- [x] Create `sanity/schemas/documents/homepage.ts`
- [x] Create `sanity/schemas/documents/about.ts`
- [x] Create `sanity/schemas/documents/author.ts`
- [x] Create `sanity/schemas/documents/blogCategory.ts`
- [x] Create `sanity/schemas/documents/blogPost.ts`
- [x] Create `sanity/schemas/documents/comparisonPost.ts`
- [x] Create `sanity/schemas/documents/listiclePost.ts`
- [x] Create `sanity/schemas/documents/templateCategory.ts`
- [x] Create `sanity/schemas/documents/template.ts`
- [x] Create `sanity/schemas/documents/agentCategory.ts`
- [x] Create `sanity/schemas/documents/seoAgent.ts`
- [x] Create `sanity/schemas/documents/caseStudy.ts`
- [x] Create `sanity/schemas/documents/testimonial.ts`
- [x] Create `sanity/schemas/documents/glossaryTerm.ts`
- [x] Create `sanity/schemas/documents/newsletterIssue.ts`
- [x] Create `sanity/schemas/documents/speakingEvent.ts`
- [x] Create `sanity/schemas/documents/contact.ts`

### 1.4 Configure Schema Index ✅
- [x] Create `sanity/schemas/index.ts`

### 1.5 Configure Sanity Studio ✅
- [x] Create `sanity/desk/structure.ts`
- [x] Create `app/studio/[[...tool]]/page.tsx`

---

## Phase 2: Sanity Client & Queries ✅ COMPLETE

### 2.1 Client Setup ✅
- [x] Create `lib/sanity/client.ts`
- [x] Create `lib/sanity/image.ts`

### 2.2 GROQ Queries ✅
- [x] Create `lib/sanity/queries.ts`

### 2.3 Data Fetching Functions ✅
- [x] Create `lib/sanity/fetch.ts`

---

## Phase 3: API Routes

### 3.1-3.9 API Implementation
- [x] Create `app/api/revalidate/route.ts` (Sanity webhook)
- [ ] Create `app/api/agents/[agentId]/route.ts` (SEO Agent API)
- [ ] Create `lib/ai/anthropic.ts`
- [ ] Create `app/api/download/route.ts` (Email Gate)
- [ ] Create `app/api/subscribe/route.ts` (Newsletter)
- [ ] Create `app/api/contact/route.ts` (Contact Form)
- [ ] Create `app/api/search/route.ts` (Search)
- [ ] Create `app/api/og/route.tsx` (Dynamic OG Image)
- [ ] Create `lib/utils/rateLimit.ts`
- [ ] Create `lib/utils/validation.ts`

---

## Phase 4: Email Integration

- [ ] Create `lib/email/resend.ts`
- [ ] Create `lib/email/templates/welcome.tsx`
- [ ] Create `lib/email/templates/download.tsx`
- [ ] Create `lib/email/templates/contact-notification.tsx`
- [ ] Create `lib/email/templates/contact-confirmation.tsx`

---

## Phase 5: SEO & AEO Infrastructure

- [ ] Create `app/sitemap.ts`
- [ ] Create `app/robots.ts`
- [ ] Create `public/llms.txt`
- [ ] Create `lib/seo/schema.ts` (JSON-LD generators)
- [ ] Create `app/feed.xml/route.ts` (RSS Feed)

---

## Phase 6: Testing

- [ ] Create `__tests__/api/revalidate.test.ts`
- [ ] Create `__tests__/api/agents.test.ts`
- [ ] Create `__tests__/api/download.test.ts`
- [ ] Create `__tests__/api/subscribe.test.ts`
- [ ] Create `__tests__/lib/sanity.test.ts`
- [ ] Create `__tests__/lib/validation.test.ts`
- [ ] Create `__tests__/lib/rateLimit.test.ts`

---

## Phase 7: Final Setup

- [ ] Create `lib/env.ts` (Environment validation)
- [ ] Create `lib/utils/errors.ts` (Error handling)
- [ ] Create `sanity/seed.ts` (Seed content script)

---

## Completed
- [x] Project enabled for Ralph

---

## Notes
- Reference `types/index.ts` for all TypeScript types
- Reference `PROJECT_PLAN.md` for architecture details
- Test each phase before moving to the next
- Commit after each successful task completion
