# Anil Varma SEO Portfolio Website - Project Plan

## 🎯 Project Vision
Position Anil Varma as a **recognized SEO authority** with 15+ years of experience, showcasing expertise through a blazing-fast, SEO-optimized portfolio that practices what it preaches.

---

## 📋 CMS Recommendation: **Sanity** (100% Confident)

### Why Sanity Over Strapi/Payload?

| Criteria | Sanity ✅ | Strapi | Payload |
|----------|----------|--------|---------|
| Vercel Compatibility | Native integration | Needs separate hosting | Needs separate hosting |
| Hosting Required | No (Sanity hosts CMS) | Yes (VPS/Railway) | Yes (VPS/Railway) |
| Free Tier | Generous (3 users, 10GB) | Limited | Limited |
| Real-time Preview | Built-in | Plugin needed | Plugin needed |
| Next.js Integration | First-class | Good | Good |
| Learning Curve | Low (GROQ is intuitive) | Medium | Medium |
| Visual Editing | Sanity Studio v3 | Admin panel | Admin panel |
| TypeScript Support | Excellent | Good | Excellent |
| Community/Docs | Mature & extensive | Good | Smaller |

### Why I'm 1000% Confident with Sanity:
1. **Zero backend hosting** — Sanity hosts the Studio and content API
2. **Vercel Pro synergy** — Native webhooks for ISR/on-demand revalidation
3. **Real-time collaboration** — Edit content with live preview
4. **Structured content** — Perfect for SEO (schema.org, meta tags)
5. **Media optimization** — Built-in image CDN with transformations
6. **Portable text** — Rich text with SEO-friendly rendering

---

## 🏗️ Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│              Next.js 14 (App Router)                        │
│         Deployed on Vercel Pro                              │
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │Homepage │  │ About   │  │  Blog   │  │Templates│        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
│                                                              │
│  ┌─────────────────────────────────────────────────┐        │
│  │           SEO Agents (Interactive)               │        │
│  │     OpenAI/Claude API + Streaming UI             │        │
│  └─────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ GROQ Queries
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    SANITY CMS                                │
│              (Hosted by Sanity.io)                          │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │              Sanity Studio v3                     │       │
│  │         (Embedded or Separate Deploy)            │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  Content Types:                                              │
│  • Homepage • About • Blog Posts • Categories               │
│  • Templates • SEO Agents • Site Settings • Navigation      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Webhooks (On content publish)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  INTEGRATIONS                                │
│                                                              │
│  • Resend/SendGrid — Email capture for downloads            │
│  • Claude Sonnet API — AI Agents functionality              │
│  • Vercel Analytics — Traffic insights                      │
│  • Google Analytics 4 — Full SEO tracking                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📄 Page Structure & Content Models

### 1. **Homepage**
**URL:** `/`

**Dynamic CMS Fields:**
- Hero headline & subheadline
- Hero CTA button (text + link)
- Profile image
- Key statistics (15+ years, 10M traffic, etc.)
- Featured services/expertise cards
- Client logos/testimonials
- Featured blog posts (auto-pulled)
- Featured templates (auto-pulled)

**SEO Elements (all editable):**
- Meta title & description
- Open Graph image
- Schema.org Person + Organization markup

---

### 2. **About Me**
**URL:** `/about`

**Dynamic CMS Fields:**
- Full bio (Portable Text — rich text with embeds)
- Profile photo gallery
- Career timeline (array of experiences)
- Skills & tools (with proficiency levels)
- Certifications
- Personal philosophy/approach
- Call-to-action section

**SEO Elements:**
- Custom meta tags
- Schema.org Person markup
- Breadcrumb schema

---

### 3. **Blog**
**URLs:** `/blog` (listing), `/blog/[slug]` (detail)

**Listing Page CMS Fields:**
- Page title & intro
- Posts per page setting
- Featured post toggle
- Category filter configuration

**Blog Post CMS Fields:**
- Title & slug (auto-generated, editable)
- Excerpt (for listings & meta)
- Featured image with alt text
- Author (reference to About)
- Categories (reference type)
- Tags (array)
- Publish date
- Content body (Portable Text with:)
  - Headings (H2-H6)
  - Code blocks with syntax highlighting
  - Images with captions
  - Embedded videos
  - Custom callout blocks
  - Tables
  - Internal/external links
- Reading time (auto-calculated)
- Related posts (manual or auto)
- CTA block (newsletter, consultation)
- Table of Contents (auto-generated from headings)

**SEO Elements:**
- Meta title/description (with fallbacks)
- Open Graph & Twitter cards
- Schema.org Article/BlogPosting
- Canonical URL setting
- noindex option for drafts

---

### 4. **Download Templates**
**URLs:** `/templates` (listing), `/templates/[slug]` (detail)

**Template Content Type:**
- Title & slug
- Description (short for cards)
- Detailed description (Portable Text)
- Category (SEO Audit, Keyword Research, etc.)
- Preview images (gallery)
- File upload (Sanity asset)
- File format & size info
- Download count (tracked)
- Related templates
- Use case/instructions

**Email Gate Functionality:**
```
User clicks "Download" → Modal appears →
User enters email → Email sent to Resend/SendGrid →
Contact saved to CMS → Signed download URL generated →
User downloads file
```

**CMS Fields for Email Gate:**
- Enable/disable gate per template
- Thank you message
- Email template content
- Tags for contacts (for segmentation)

**SEO Elements:**
- Schema.org SoftwareApplication/DigitalDocument
- FAQ schema for common questions
- Download tracking for analytics

---

### 5. **SEO Agents**
**URLs:** `/seo-agents` (listing), `/seo-agents/[slug]` (detail with functionality)

**Inspired by:** agent.ai — Interactive AI tools for SEO tasks

**Agent Content Type (CMS):**
- Agent name & slug
- Icon/illustration
- Short description (for cards)
- Full description
- Category (On-Page, Technical, Content, etc.)
- System prompt (for AI — stored securely)
- Input fields configuration:
  - Field name
  - Field type (text, textarea, URL, file)
  - Placeholder text
  - Validation rules
- Output format (markdown, JSON, structured)
- Usage examples
- Limitations/disclaimers
- Pricing tier (free, premium)
- Usage limits

**Example Agents to Build:**
1. **Meta Description Generator** — Input: Page title + content → Output: 3 meta descriptions
2. **Title Tag Optimizer** — Input: Current title + keyword → Output: Optimized variations
3. **Schema Markup Generator** — Input: Page type + details → Output: JSON-LD code
4. **Keyword Cluster Analyzer** — Input: Seed keyword → Output: Clustered keywords
5. **Content Brief Generator** — Input: Target keyword → Output: Full brief
6. **Internal Link Suggester** — Input: Page content + sitemap → Output: Link suggestions
7. **SEO Audit Checklist** — Input: URL → Output: Quick audit points
8. **FAQ Schema Generator** — Input: Q&A pairs → Output: Schema code

**Technical Implementation:**
- Next.js API routes (secured)
- Claude Sonnet API (claude-sonnet-4-5-20250929)
- Streaming responses via Anthropic SDK
- Rate limiting per IP/user
- Optional: User accounts for premium agents

---

## 🎨 Design System: Modern, Light, Minimal + Glassmorphism

### Design Philosophy
- **Modern**: Clean lines, generous whitespace, contemporary typography
- **Light**: Bright, airy feel with subtle shadows
- **Minimal**: Content-first, no visual clutter
- **Glassmorphism**: Frosted glass effects for depth and elegance

---

### Color Palette (Light Theme)

```css
:root {
  /* Primary - Deep Blue (Trust, Expertise) */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-200: #bfdbfe;
  --primary-300: #93c5fd;
  --primary-400: #60a5fa;
  --primary-500: #3b82f6;  /* Main primary */
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;

  /* Neutral - Slate Gray */
  --neutral-50: #f8fafc;   /* Background */
  --neutral-100: #f1f5f9;  /* Card background */
  --neutral-200: #e2e8f0;  /* Borders */
  --neutral-300: #cbd5e1;
  --neutral-400: #94a3b8;
  --neutral-500: #64748b;  /* Muted text */
  --neutral-600: #475569;
  --neutral-700: #334155;
  --neutral-800: #1e293b;  /* Headings */
  --neutral-900: #0f172a;  /* Body text */

  /* Accent - Teal (Growth, Success) */
  --accent-400: #2dd4bf;
  --accent-500: #14b8a6;
  --accent-600: #0d9488;

  /* Semantic */
  --success: #22c55e;
  --warning: #f59e0b;
  --error: #ef4444;

  /* Glass Effect */
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.5);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  --glass-blur: 12px;
}
```

---

### Glassmorphism Implementation

```typescript
// Tailwind CSS Custom Classes
// tailwind.config.ts

module.exports = {
  theme: {
    extend: {
      backdropBlur: {
        'glass': '12px',
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.7)',
        'glass-dark': 'rgba(255, 255, 255, 0.5)',
      },
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.5)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.12)',
        'glass-inset': 'inset 0 1px 1px rgba(255, 255, 255, 0.5)',
      },
    },
  },
}
```

```typescript
// Glass Card Component
const GlassCard = ({ children, className }) => (
  <div className={`
    bg-white/70
    backdrop-blur-glass
    border border-white/50
    rounded-2xl
    shadow-glass
    ${className}
  `}>
    {children}
  </div>
);

// Glass Navigation
const GlassNav = () => (
  <nav className="
    fixed top-4 left-1/2 -translate-x-1/2 z-50
    bg-white/70
    backdrop-blur-glass
    border border-white/50
    rounded-full
    shadow-glass
    px-6 py-3
  ">
    {/* Nav items */}
  </nav>
);

// Glass Button
const GlassButton = ({ children }) => (
  <button className="
    bg-white/50
    backdrop-blur-sm
    border border-white/50
    rounded-xl
    px-6 py-3
    hover:bg-white/70
    transition-all duration-300
    shadow-glass
  ">
    {children}
  </button>
);
```

---

### Typography

```css
/* Font Stack */
--font-heading: 'Inter', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Scale */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
--text-6xl: 3.75rem;    /* 60px - Hero */
```

```typescript
// Typography Classes
const typography = {
  h1: "text-5xl md:text-6xl font-bold text-neutral-800 tracking-tight",
  h2: "text-3xl md:text-4xl font-semibold text-neutral-800",
  h3: "text-xl md:text-2xl font-semibold text-neutral-800",
  body: "text-base text-neutral-600 leading-relaxed",
  bodyLarge: "text-lg text-neutral-600 leading-relaxed",
  caption: "text-sm text-neutral-500",
  overline: "text-xs uppercase tracking-wider text-primary-500 font-medium",
};
```

---

### Component Styling Guide

#### Cards
```typescript
// Standard Card
<div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">

// Glass Card (Featured)
<div className="bg-white/70 backdrop-blur-glass rounded-2xl shadow-glass border border-white/50 p-6">

// Hover Effect
<div className="... hover:shadow-glass-lg hover:-translate-y-1 transition-all duration-300">
```

#### Buttons
```typescript
// Primary Button
<button className="
  bg-primary-500 text-white
  px-6 py-3 rounded-xl font-medium
  hover:bg-primary-600
  shadow-sm hover:shadow-md
  transition-all duration-200
">

// Secondary Button (Glass)
<button className="
  bg-white/70 backdrop-blur-sm
  border border-neutral-200
  px-6 py-3 rounded-xl font-medium
  text-neutral-700
  hover:bg-white hover:shadow-glass
  transition-all duration-200
">

// Ghost Button
<button className="
  text-primary-500 font-medium
  hover:bg-primary-50
  px-4 py-2 rounded-lg
  transition-colors duration-200
">
```

#### Input Fields
```typescript
// Text Input
<input className="
  w-full px-4 py-3
  bg-white/70 backdrop-blur-sm
  border border-neutral-200
  rounded-xl
  focus:border-primary-400 focus:ring-2 focus:ring-primary-100
  transition-all duration-200
  placeholder:text-neutral-400
" />

// Search Input with Glass
<div className="
  flex items-center gap-3
  bg-white/70 backdrop-blur-glass
  border border-white/50
  rounded-full px-5 py-3
  shadow-glass
">
  <SearchIcon className="text-neutral-400" />
  <input className="bg-transparent outline-none flex-1" />
</div>
```

---

### Page Layout Patterns

#### Hero Section
```typescript
<section className="
  relative min-h-[90vh]
  flex items-center justify-center
  bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/20
  overflow-hidden
">
  {/* Gradient Orbs (Background) */}
  <div className="absolute top-20 left-20 w-72 h-72 bg-primary-200/50 rounded-full blur-3xl" />
  <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-200/50 rounded-full blur-3xl" />

  {/* Glass Content Card */}
  <div className="relative z-10 bg-white/70 backdrop-blur-glass rounded-3xl shadow-glass p-12">
    <h1>...</h1>
  </div>
</section>
```

#### Section Spacing
```css
/* Consistent vertical rhythm */
.section { @apply py-20 md:py-32; }
.section-sm { @apply py-12 md:py-20; }
.container { @apply max-w-7xl mx-auto px-4 md:px-6; }
```

---

### Animation Guidelines

```typescript
// Framer Motion Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const glassHover = {
  rest: { scale: 1, boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)" },
  hover: {
    scale: 1.02,
    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.12)",
    transition: { duration: 0.3 }
  }
};

// Scroll-triggered animations
const scrollReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};
```

---

### Visual Elements

#### Gradient Backgrounds
```typescript
// Subtle gradient for sections
const gradientBg = "bg-gradient-to-br from-neutral-50 via-white to-primary-50/20";

// Mesh gradient for hero
const meshGradient = `
  radial-gradient(at 40% 20%, rgba(59, 130, 246, 0.1) 0px, transparent 50%),
  radial-gradient(at 80% 0%, rgba(20, 184, 166, 0.1) 0px, transparent 50%),
  radial-gradient(at 0% 50%, rgba(59, 130, 246, 0.05) 0px, transparent 50%)
`;
```

#### Decorative Elements
```typescript
// Floating gradient orbs
<div className="absolute -z-10">
  <div className="w-64 h-64 bg-primary-200/40 rounded-full blur-3xl animate-pulse" />
</div>

// Subtle grid pattern
<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

// Glass divider
<div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
```

---

### Responsive Breakpoints

```typescript
// Tailwind default + custom
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
}

// Mobile-first approach
// Components should work beautifully on mobile, then enhance for larger screens
```

---

### Design Inspiration References

| Element | Inspiration |
|---------|-------------|
| Navigation | Linear.app floating nav |
| Hero | Vercel.com gradient + glass |
| Cards | Stripe.com subtle shadows |
| Blog | Medium.com reading experience |
| Agents | ChatGPT-like streaming UI |
| Footer | Minimal, content-focused |

---

### Dark Mode (Future Enhancement)

```css
/* Prepared for dark mode toggle */
.dark {
  --glass-bg: rgba(30, 41, 59, 0.7);
  --glass-border: rgba(255, 255, 255, 0.1);
  --neutral-50: #0f172a;
  --neutral-900: #f8fafc;
  /* Invert the scale */
}
```

---

## 🎨 Frontend Tech Stack (Cowork Builds)

```
Framework:        Next.js 14 (App Router)
Styling:          Tailwind CSS + shadcn/ui
Animations:       Framer Motion
State:            React hooks (minimal global state)
Forms:            React Hook Form + Zod validation
Data Fetching:    Sanity Client + next-sanity
Image Handling:   next/image + Sanity CDN
SEO:              next-seo + custom metadata API
Analytics:        Vercel Analytics + GA4
Email:            Resend (modern, developer-friendly)
AI Integration:   Vercel AI SDK + @anthropic-ai/sdk (streaming)
Icons:            Lucide React
```

---

## 🔧 Backend Tech Stack (Claude Code Builds)

```
CMS:              Sanity v3 (TypeScript schemas)
Studio:           Sanity Studio v3 (custom desk structure)
API Routes:       Next.js API routes (serverless)
Email Service:    Resend API
AI Provider:      Claude Sonnet API (@anthropic-ai/sdk)
Database:         Sanity (primary) + Vercel KV (rate limiting)
Auth (optional):  NextAuth.js (for premium agents)
Webhooks:         Sanity → Vercel (ISR revalidation)
```

---

## 📁 Project Structure

```
portfolio-website/
├── app/                          # Next.js App Router
│   ├── (site)/                   # Public pages group
│   │   ├── page.tsx              # Homepage
│   │   ├── about/
│   │   ├── blog/
│   │   │   ├── page.tsx          # Listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Detail
│   │   ├── templates/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── seo-agents/
│   │       ├── page.tsx
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── api/                      # API Routes
│   │   ├── agents/
│   │   │   └── [agentId]/
│   │   │       └── route.ts      # AI agent endpoint
│   │   ├── download/
│   │   │   └── route.ts          # Gated download handler
│   │   ├── subscribe/
│   │   │   └── route.ts          # Email capture
│   │   └── revalidate/
│   │       └── route.ts          # Sanity webhook
│   ├── studio/                   # Embedded Sanity Studio
│   │   └── [[...tool]]/
│   │       └── page.tsx
│   └── layout.tsx
├── components/
│   ├── ui/                       # shadcn components
│   ├── sections/                 # Page sections
│   ├── blog/                     # Blog components
│   ├── templates/                # Template components
│   ├── agents/                   # Agent UI components
│   └── shared/                   # Common components
├── lib/
│   ├── sanity/
│   │   ├── client.ts
│   │   ├── queries.ts
│   │   └── image.ts
│   ├── email/
│   │   └── resend.ts
│   └── ai/
│       └── anthropic.ts
├── sanity/                       # Sanity configuration
│   ├── schemas/
│   │   ├── documents/
│   │   │   ├── homepage.ts
│   │   │   ├── about.ts
│   │   │   ├── blogPost.ts
│   │   │   ├── template.ts
│   │   │   ├── agent.ts
│   │   │   └── siteSettings.ts
│   │   ├── objects/
│   │   │   ├── seo.ts
│   │   │   ├── portableText.ts
│   │   │   └── agentField.ts
│   │   └── index.ts
│   ├── desk/
│   │   └── structure.ts          # Custom studio layout
│   └── sanity.config.ts
├── public/
├── styles/
└── package.json
```

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────┐
│            VERCEL PRO                        │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │     Production: anilvarma.com          │ │
│  │     Preview: pr-123.vercel.app         │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  Features Used:                              │
│  • Edge Functions (agent API)               │
│  • ISR (blog, templates)                    │
│  • Analytics                                │
│  • Speed Insights                           │
│  • Image Optimization                       │
│  • KV Storage (rate limiting)               │
└─────────────────────────────────────────────┘
         │
         │ Webhook on publish
         ▼
┌─────────────────────────────────────────────┐
│         SANITY.IO (Hosted)                   │
│                                              │
│  Studio URL: anilvarma.sanity.studio        │
│  OR embedded: anilvarma.com/studio          │
│                                              │
│  Free Tier Includes:                         │
│  • 3 users                                  │
│  • 10GB bandwidth                           │
│  • 500K API requests                        │
│  • 5GB assets                               │
└─────────────────────────────────────────────┘
```

---

## 🔒 SEO Implementation Checklist

### Technical SEO (Built Into Framework)
- [x] Server-side rendering for all pages
- [x] Automatic sitemap.xml generation
- [x] robots.txt configuration
- [x] Canonical URLs on all pages
- [x] Hreflang (if multi-language later)
- [x] Mobile-first responsive design
- [x] Core Web Vitals optimization
- [x] Structured data (Schema.org)
- [x] Open Graph & Twitter Cards
- [x] Image optimization (WebP, lazy loading)
- [x] Clean URL structure
- [x] Breadcrumb navigation
- [x] 404 & error page handling
- [x] Redirect management (via Vercel)

### Content SEO (CMS-Enabled)
- [x] Editable meta titles/descriptions
- [x] Focus keyword field per page
- [x] SEO preview (Google snippet preview)
- [x] Heading hierarchy validation
- [x] Alt text enforcement for images
- [x] Internal linking suggestions
- [x] Content readability scores
- [x] Publish date & freshness signals

---

## 👥 Division of Work

### **COWORK (Frontend)**

**Phase 1: Foundation**
- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Configure Tailwind CSS + shadcn/ui
- [ ] Set up project structure
- [ ] Create base layout (header, footer, navigation)
- [ ] Implement responsive design system

**Phase 2: Static Pages**
- [ ] Build Homepage sections (hero, stats, services, testimonials)
- [ ] Build About page (bio, timeline, skills)
- [ ] Style all pages with Tailwind

**Phase 3: Dynamic Pages**
- [ ] Blog listing page with pagination/filters
- [ ] Blog detail page with TOC, related posts
- [ ] Template listing page with categories
- [ ] Template detail page with download modal
- [ ] SEO Agents listing page
- [ ] SEO Agents detail page with interactive form

**Phase 4: Components**
- [ ] Email capture modal component
- [ ] Agent chat/streaming interface
- [ ] Search functionality
- [ ] Category filters
- [ ] Pagination component
- [ ] SEO preview component

---

### **CLAUDE CODE (Backend & CMS)**

**Phase 1: Sanity Setup**
- [ ] Initialize Sanity project
- [ ] Create all content schemas (documents + objects)
- [ ] Configure Sanity Studio desk structure
- [ ] Set up custom input components (SEO preview, etc.)
- [ ] Deploy Sanity Studio (embedded or standalone)

**Phase 2: API Development**
- [ ] Sanity client configuration
- [ ] GROQ queries for all content types
- [ ] Next.js API routes:
  - [ ] `/api/revalidate` — Sanity webhook handler
  - [ ] `/api/download` — Gated download with email capture
  - [ ] `/api/subscribe` — Newsletter subscription
  - [ ] `/api/agents/[agentId]` — AI agent endpoints

**Phase 3: Integrations**
- [ ] Resend email service setup
- [ ] Claude Sonnet API integration (@anthropic-ai/sdk)
- [ ] Vercel KV for rate limiting
- [ ] Google Analytics 4 setup
- [ ] Sitemap & robots.txt generation

**Phase 4: CMS Content**
- [ ] Seed initial content
- [ ] Create all agent system prompts
- [ ] Configure webhooks for ISR

---

## 📅 Suggested Timeline

| Week | Cowork (Frontend) | Claude Code (Backend) |
|------|-------------------|----------------------|
| 1 | Project setup, design system | Sanity schemas, studio |
| 2 | Homepage, About page | API routes, Sanity queries |
| 3 | Blog pages | Email integration, agents API |
| 4 | Template pages | Download flow, webhooks |
| 5 | SEO Agents pages | AI integration, rate limiting |
| 6 | Polish, testing | Content seeding, final QA |

---

## 💰 Cost Estimate (Monthly)

| Service | Cost |
|---------|------|
| Vercel Pro | $20/mo (you have this) |
| Sanity | Free tier (sufficient) |
| Resend | Free up to 3K emails/mo |
| Claude Sonnet API | ~$5-30/mo (usage-based)* |
| Domain | ~$12/year |
| **Total** | **~$25-50/month** |

*Claude Sonnet pricing: $3/1M input tokens, $15/1M output tokens — very cost-effective for SEO tools

---

## 🧪 Testing Strategy & Quality Assurance

### Testing Tech Stack
```
Unit Testing:       Vitest (fast, Vite-native)
Component Testing:  React Testing Library
E2E Testing:        Playwright
API Testing:        Vitest + MSW (Mock Service Worker)
Visual Regression:  Percy or Chromatic (optional)
Accessibility:      axe-core + Lighthouse
Performance:        Lighthouse CI
Coverage:           Istanbul (via Vitest)
```

---

## 📋 Test Cases by Page

### 1. **Homepage Tests**

#### Unit Tests
| Test ID | Component | Test Case | Expected Result |
|---------|-----------|-----------|-----------------|
| HP-U01 | HeroSection | Renders headline from CMS | Displays dynamic headline |
| HP-U02 | HeroSection | CTA button has correct href | Links to specified URL |
| HP-U03 | StatsCounter | Animates numbers on scroll | Numbers count up smoothly |
| HP-U04 | StatsCounter | Handles missing stats gracefully | Shows fallback or hides |
| HP-U05 | FeaturedPosts | Renders 3 latest posts | Displays post cards |
| HP-U06 | FeaturedPosts | Handles empty posts array | Shows "No posts yet" |
| HP-U07 | TestimonialSlider | Cycles through testimonials | Auto-advances slides |
| HP-U08 | ClientLogos | Renders logo images | All logos visible |

#### Integration Tests
| Test ID | Scenario | Test Case | Expected Result |
|---------|----------|-----------|-----------------|
| HP-I01 | CMS Integration | Fetches homepage data from Sanity | All sections populated |
| HP-I02 | Navigation | Header links work correctly | Navigate to correct pages |
| HP-I03 | Featured Content | Blog posts link to correct slugs | Opens blog detail page |
| HP-I04 | CTA Actions | "Book a Call" button works | Opens calendar/contact |

#### Edge Cases
| Test ID | Edge Case | Handling |
|---------|-----------|----------|
| HP-E01 | CMS returns null/undefined | Show skeleton loader, then fallback content |
| HP-E02 | Hero image fails to load | Display placeholder/gradient background |
| HP-E03 | Stats have 0 value | Show "0" not empty string |
| HP-E04 | Very long headline text | Truncate with ellipsis or responsive font |
| HP-E05 | No testimonials configured | Hide testimonial section entirely |
| HP-E06 | Network timeout | Show cached version or error state |

---

### 2. **About Page Tests**

#### Unit Tests
| Test ID | Component | Test Case | Expected Result |
|---------|-----------|-----------|-----------------|
| AB-U01 | BioSection | Renders Portable Text correctly | Formats headings, links, bold |
| AB-U02 | Timeline | Displays experiences in order | Chronological order |
| AB-U03 | Timeline | Calculates duration correctly | "7 years" displays right |
| AB-U04 | SkillBars | Shows proficiency percentage | Animated progress bars |
| AB-U05 | SkillBars | Groups skills by category | Proper categorization |
| AB-U06 | Certifications | Renders certification badges | Images + names display |

#### Integration Tests
| Test ID | Scenario | Test Case | Expected Result |
|---------|----------|-----------|-----------------|
| AB-I01 | Schema Markup | Person schema renders in head | Valid JSON-LD |
| AB-I02 | Image Loading | Profile images load from Sanity CDN | Optimized WebP images |
| AB-I03 | CTA Section | Contact button triggers action | Opens email/calendar |

#### Edge Cases
| Test ID | Edge Case | Handling |
|---------|-----------|----------|
| AB-E01 | Bio contains malformed HTML | Sanitize with DOMPurify |
| AB-E02 | Experience with no end date | Show "Present" |
| AB-E03 | Skill proficiency > 100% | Cap at 100% |
| AB-E04 | Empty certifications array | Hide section |
| AB-E05 | Profile image missing | Show avatar placeholder |
| AB-E06 | Very long company names | Text wrap or truncate |

---

### 3. **Blog Listing Page Tests**

#### Unit Tests
| Test ID | Component | Test Case | Expected Result |
|---------|-----------|-----------|-----------------|
| BL-U01 | BlogCard | Renders title, excerpt, date | All fields visible |
| BL-U02 | BlogCard | Formats date correctly | "Jan 15, 2026" format |
| BL-U03 | BlogCard | Shows reading time | "5 min read" |
| BL-U04 | CategoryFilter | Lists all categories | All categories shown |
| BL-U05 | CategoryFilter | Filters posts on click | Only matching posts |
| BL-U06 | Pagination | Shows correct page numbers | Accurate pagination |
| BL-U07 | Pagination | Disables prev on page 1 | Button disabled |
| BL-U08 | SearchBar | Filters posts by title | Matching results |

#### Integration Tests
| Test ID | Scenario | Test Case | Expected Result |
|---------|----------|-----------|-----------------|
| BL-I01 | URL State | Category filter updates URL | `?category=seo` |
| BL-I02 | URL State | Page number in URL | `?page=2` |
| BL-I03 | SSR | Page renders server-side | HTML contains posts |
| BL-I04 | ISR | Revalidates on new post | New post appears |

#### Edge Cases
| Test ID | Edge Case | Handling |
|---------|-----------|----------|
| BL-E01 | 0 blog posts | Show "No posts yet" + CTA |
| BL-E02 | 100+ posts | Pagination works, max 10/page |
| BL-E03 | Category with 0 posts | Show empty state for category |
| BL-E04 | Search with no results | "No posts match your search" |
| BL-E05 | Special characters in search | Escape and sanitize input |
| BL-E06 | Invalid page number in URL | Redirect to page 1 |
| BL-E07 | Post without featured image | Show placeholder image |
| BL-E08 | Very long post title | Truncate at 2 lines |

---

### 4. **Blog Detail Page Tests**

#### Unit Tests
| Test ID | Component | Test Case | Expected Result |
|---------|-----------|-----------|-----------------|
| BD-U01 | ArticleHeader | Renders title, date, author | All metadata visible |
| BD-U02 | TableOfContents | Extracts H2/H3 headings | Correct TOC structure |
| BD-U03 | TableOfContents | Scrolls to heading on click | Smooth scroll works |
| BD-U04 | TableOfContents | Highlights active section | Current section styled |
| BD-U05 | PortableText | Renders code blocks | Syntax highlighting |
| BD-U06 | PortableText | Renders images with captions | Image + caption display |
| BD-U07 | RelatedPosts | Shows 3 related posts | Relevant posts display |
| BD-U08 | ShareButtons | Copies URL to clipboard | "Copied!" feedback |

#### Integration Tests
| Test ID | Scenario | Test Case | Expected Result |
|---------|----------|-----------|-----------------|
| BD-I01 | SEO | Meta tags render correctly | Title, description set |
| BD-I02 | Schema | Article schema in head | Valid JSON-LD |
| BD-I03 | OG Image | Open Graph image works | Correct image URL |
| BD-I04 | 404 | Invalid slug returns 404 | 404 page shown |
| BD-I05 | Draft Posts | Draft posts not accessible | 404 or redirect |

#### Edge Cases
| Test ID | Edge Case | Handling |
|---------|-----------|----------|
| BD-E01 | Post with no headings | Hide TOC component |
| BD-E02 | Post with 20+ headings | Collapsible TOC |
| BD-E03 | Embedded video fails | Show fallback thumbnail + link |
| BD-E04 | Code block with 500+ lines | Add max-height with scroll |
| BD-E05 | Image without alt text | Use title as fallback alt |
| BD-E06 | Related posts < 3 | Show available, hide empty slots |
| BD-E07 | External links in content | Add rel="noopener nofollow" |
| BD-E08 | Post scheduled for future | Show 404 until publish date |

---

### 5. **Templates Listing Page Tests**

#### Unit Tests
| Test ID | Component | Test Case | Expected Result |
|---------|-----------|-----------|-----------------|
| TL-U01 | TemplateCard | Shows title, description, format | All info visible |
| TL-U02 | TemplateCard | Displays file size | "2.5 MB" format |
| TL-U03 | TemplateCard | Shows download count | "1,234 downloads" |
| TL-U04 | CategoryTabs | Switches categories | Filters templates |
| TL-U05 | PreviewGallery | Opens lightbox on click | Modal with images |

#### Integration Tests
| Test ID | Scenario | Test Case | Expected Result |
|---------|----------|-----------|-----------------|
| TL-I01 | URL State | Category persists in URL | `?category=audit` |
| TL-I02 | Analytics | Track template card clicks | Event fires |

#### Edge Cases
| Test ID | Edge Case | Handling |
|---------|-----------|----------|
| TL-E01 | 0 templates | "Coming soon" message |
| TL-E02 | Template without preview | Show file type icon |
| TL-E03 | Very long description | Truncate at 150 chars |
| TL-E04 | Missing file size | Hide size, show format only |
| TL-E05 | Download count = 0 | Show "New" badge instead |

---

### 6. **Template Detail Page Tests**

#### Unit Tests
| Test ID | Component | Test Case | Expected Result |
|---------|-----------|-----------|-----------------|
| TD-U01 | DownloadButton | Opens email modal | Modal appears |
| TD-U02 | EmailModal | Validates email format | Shows error for invalid |
| TD-U03 | EmailModal | Submits on valid email | Loading state, then success |
| TD-U04 | EmailModal | Handles API error | Shows error message |
| TD-U05 | PreviewCarousel | Navigates through images | Next/prev work |
| TD-U06 | UsageInstructions | Renders Portable Text | Formatted content |

#### Integration Tests
| Test ID | Scenario | Test Case | Expected Result |
|---------|----------|-----------|-----------------|
| TD-I01 | Email API | Valid email triggers Resend | Email sent |
| TD-I02 | Download URL | Signed URL generated | File downloads |
| TD-I03 | Contact Saved | Email saved to CMS | Contact created |
| TD-I04 | Download Count | Count increments | +1 on download |

#### Edge Cases
| Test ID | Edge Case | Handling |
|---------|-----------|----------|
| TD-E01 | Email already exists | Update contact, allow download |
| TD-E02 | Resend API fails | Show error, suggest direct contact |
| TD-E03 | File missing from Sanity | Show "File unavailable" error |
| TD-E04 | User blocks modal | Allow direct download option (optional) |
| TD-E05 | Download link expires | Generate new signed URL |
| TD-E06 | Email with +alias | Accept as valid (user+tag@email.com) |
| TD-E07 | Disposable email domain | Optional: Block or warn |
| TD-E08 | Rate limiting hit | "Too many requests, try later" |

---

### 7. **SEO Agents Listing Page Tests**

#### Unit Tests
| Test ID | Component | Test Case | Expected Result |
|---------|-----------|-----------|-----------------|
| AL-U01 | AgentCard | Shows name, icon, description | All info visible |
| AL-U02 | AgentCard | Shows category badge | "On-Page", "Technical" |
| AL-U03 | AgentCard | Shows pricing tier | "Free" or "Premium" |
| AL-U04 | CategoryFilter | Filters by agent category | Correct agents shown |
| AL-U05 | SearchAgents | Searches by name/description | Matching results |

#### Edge Cases
| Test ID | Edge Case | Handling |
|---------|-----------|----------|
| AL-E01 | 0 agents configured | "Coming soon" message |
| AL-E02 | Agent marked as disabled | Don't show in listing |
| AL-E03 | All agents are premium | Show upgrade CTA |

---

### 8. **SEO Agent Detail Page Tests** (Most Complex)

#### Unit Tests
| Test ID | Component | Test Case | Expected Result |
|---------|-----------|-----------|-----------------|
| AD-U01 | AgentForm | Renders dynamic fields from CMS | All fields present |
| AD-U02 | AgentForm | Validates required fields | Error on empty submit |
| AD-U03 | AgentForm | URL field validates URL format | Error for invalid URL |
| AD-U04 | AgentForm | Textarea has character limit | Counter shows remaining |
| AD-U05 | StreamingOutput | Shows typing indicator | Dots animate |
| AD-U06 | StreamingOutput | Renders markdown as it streams | Formatted output |
| AD-U07 | StreamingOutput | Handles code blocks | Syntax highlighting |
| AD-U08 | CopyButton | Copies output to clipboard | "Copied!" feedback |
| AD-U09 | RegenerateButton | Clears and reruns | New response streams |
| AD-U10 | UsageCounter | Shows remaining uses | "3/5 uses today" |

#### Integration Tests
| Test ID | Scenario | Test Case | Expected Result |
|---------|----------|-----------|-----------------|
| AD-I01 | API Call | Form submits to agent API | Streaming response |
| AD-I02 | Rate Limit | Check rate limit on submit | Blocks if exceeded |
| AD-I03 | Error Handling | API returns 500 | Show friendly error |
| AD-I04 | Analytics | Track agent usage | Event fires |
| AD-I05 | Premium Gate | Premium agent requires auth | Shows login/upgrade |

#### Edge Cases
| Test ID | Edge Case | Handling |
|---------|-----------|----------|
| AD-E01 | Claude API timeout | "Request timed out, try again" |
| AD-E02 | Claude API rate limited | Queue request or show wait time |
| AD-E03 | Very long input text | Truncate to max tokens, warn user |
| AD-E04 | User submits XSS in input | Sanitize all inputs |
| AD-E05 | User submits prompt injection | System prompt hardened |
| AD-E06 | Network disconnects mid-stream | Save partial, show reconnect |
| AD-E07 | Output exceeds display area | Scrollable container |
| AD-E08 | User navigates away mid-stream | Cancel request, cleanup |
| AD-E09 | Multiple rapid submissions | Debounce, disable button |
| AD-E10 | Empty response from Claude | "Couldn't generate, try rephrasing" |
| AD-E11 | Malformed JSON in schema agent | Validate JSON before display |
| AD-E12 | User on slow connection | Show progress indicator |

---

## 🔄 API Endpoint Tests

### `/api/agents/[agentId]` Tests
| Test ID | Test Case | Input | Expected |
|---------|-----------|-------|----------|
| API-A01 | Valid request | Valid body + agentId | 200 + stream |
| API-A02 | Missing agentId | No agentId param | 400 error |
| API-A03 | Invalid agentId | Non-existent agent | 404 error |
| API-A04 | Missing required field | Partial body | 400 + field errors |
| API-A05 | Rate limit exceeded | 6th request/min | 429 error |
| API-A06 | Invalid input type | Number for text field | 400 error |
| API-A07 | Claude API error | Simulated 500 | 502 + error message |
| API-A08 | Request too large | >10KB body | 413 error |

### `/api/download` Tests
| Test ID | Test Case | Input | Expected |
|---------|-----------|-------|----------|
| API-D01 | Valid download | Valid email + templateId | 200 + signed URL |
| API-D02 | Invalid email | Malformed email | 400 error |
| API-D03 | Missing templateId | No template param | 400 error |
| API-D04 | Template not found | Invalid templateId | 404 error |
| API-D05 | File missing | Template without file | 500 + error |
| API-D06 | Resend API fails | Simulated failure | 502 + fallback |

### `/api/subscribe` Tests
| Test ID | Test Case | Input | Expected |
|---------|-----------|-------|----------|
| API-S01 | New subscriber | Valid email | 201 + success |
| API-S02 | Existing subscriber | Duplicate email | 200 + "already subscribed" |
| API-S03 | Invalid email | Malformed email | 400 error |
| API-S04 | Rate limited | Spam submissions | 429 error |

### `/api/revalidate` Tests
| Test ID | Test Case | Input | Expected |
|---------|-----------|-------|----------|
| API-R01 | Valid webhook | Sanity signature + body | 200 + revalidated |
| API-R02 | Invalid signature | Wrong secret | 401 error |
| API-R03 | Unknown document type | Random type | 200 (no-op) |
| API-R04 | Blog post published | blogPost type | Revalidate /blog + /blog/[slug] |

---

## 🔁 Review Cycle Process

### Phase 1: Development Review
```
Developer completes feature
         ↓
Self-review checklist:
  □ Code follows project conventions
  □ TypeScript strict mode passes
  □ Unit tests written and passing
  □ No console.log/debug code
  □ Accessible (keyboard nav, ARIA)
         ↓
Create Pull Request
         ↓
Automated checks run:
  • ESLint + Prettier
  • TypeScript compilation
  • Unit tests (Vitest)
  • Build succeeds
```

### Phase 2: Code Review Checklist
```
Reviewer checks:
  □ Logic correctness
  □ Edge cases handled
  □ Error states covered
  □ Loading states implemented
  □ Mobile responsive
  □ SEO meta tags correct
  □ Performance (no unnecessary re-renders)
  □ Security (no XSS, proper sanitization)
  □ Accessibility (axe-core passes)
         ↓
Request changes or Approve
```

### Phase 3: QA Review
```
QA Engineer tests:
  □ Happy path works
  □ All edge cases from test plan
  □ Cross-browser (Chrome, Firefox, Safari)
  □ Mobile devices (iOS Safari, Android Chrome)
  □ Slow network simulation
  □ Error scenarios
  □ Analytics events fire
         ↓
Create bug tickets or Approve
```

### Phase 4: Staging Review
```
Deploy to Vercel Preview
         ↓
Stakeholder review:
  □ Content displays correctly
  □ CMS changes reflect
  □ No visual regressions
  □ Performance acceptable (LCP < 2.5s)
         ↓
Approve for production
```

### Phase 5: Production Verification
```
Deploy to Production
         ↓
Smoke tests:
  □ Homepage loads
  □ All pages accessible
  □ Forms submit
  □ Agents respond
  □ Downloads work
         ↓
Monitor for 24 hours:
  • Error rates
  • Performance metrics
  • User feedback
```

---

## 📊 Test Coverage Requirements

| Area | Minimum Coverage | Target Coverage |
|------|------------------|-----------------|
| Components | 70% | 85% |
| Utilities/Hooks | 90% | 95% |
| API Routes | 85% | 95% |
| Critical Paths | 100% | 100% |

### Critical Paths (Must be 100%)
- Homepage render
- Blog post render
- Template download flow
- Agent form submission
- Email subscription
- Sanity webhook handling

---

## 🚨 Error Monitoring & Alerting

### Tools
- **Sentry** — Error tracking (free tier)
- **Vercel Analytics** — Performance monitoring
- **UptimeRobot** — Uptime monitoring (free)

### Alert Conditions
| Condition | Severity | Action |
|-----------|----------|--------|
| API error rate > 5% | High | Slack alert + investigate |
| Page load > 5s | Medium | Review, optimize |
| Agent API timeout | Medium | Check Claude API status |
| Download failures | High | Check Sanity/Resend |
| 404 spike | Low | Review broken links |

---

## ✅ Pre-Launch Checklist

### Technical
- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] E2E tests passing
- [ ] Lighthouse score > 90 (all categories)
- [ ] No accessibility violations
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Build succeeds
- [ ] Preview deployment works

### SEO
- [ ] All pages have unique meta titles
- [ ] All pages have meta descriptions
- [ ] All images have alt text
- [ ] Sitemap.xml generates correctly
- [ ] robots.txt configured
- [ ] Schema markup validates (Google Rich Results Test)
- [ ] Open Graph images work
- [ ] Canonical URLs set
- [ ] No broken internal links

### Content
- [ ] All CMS content populated
- [ ] No placeholder/Lorem ipsum text
- [ ] All links work
- [ ] Contact information correct
- [ ] Legal pages present (Privacy, Terms)

### Security
- [ ] Environment variables secured
- [ ] API routes have rate limiting
- [ ] Input sanitization in place
- [ ] CORS configured correctly
- [ ] No exposed secrets in code

### Performance
- [ ] Images optimized (WebP)
- [ ] Fonts subset and preloaded
- [ ] Code splitting working
- [ ] No unused CSS/JS
- [ ] Core Web Vitals passing

---

## ✅ Ready to Execute?

This plan gives you:
1. **Fully dynamic website** — Every element editable from Sanity
2. **SEO-first architecture** — Practice what you preach
3. **Lead generation** — Email capture on templates
4. **Authority positioning** — AI agents showcase expertise
5. **Scalability** — Add more agents, templates, posts easily
6. **Zero backend maintenance** — Sanity + Vercel handle everything

**Next Steps:**
1. Confirm this plan meets your requirements
2. I (Cowork) start on frontend
3. You use Claude Code for backend/CMS
4. We integrate at defined touchpoints

---

*Plan created for Anil Varma | February 2026*

---

## 🧠 Additional Recommendations (What You're Missing)

Based on analysis of top SEO consultants (like Aleyda Solis, Kevin Indig, Eli Schwartz) and what builds real authority, here's what's missing:

---

### 🏆 1. **Case Studies Page** (CRITICAL)

**Why it matters:** This is the #1 trust signal for potential clients. Your resume shows "3.5M to 10M traffic" — that needs a dedicated page with visuals.

**Structure:**
```
/case-studies (listing)
/case-studies/[slug] (detail)
```

**CMS Fields:**
- Client name (or anonymized: "Leading Automobile Portal")
- Industry
- Challenge/Problem
- Strategy implemented
- Results with metrics (charts, before/after)
- Timeline
- Testimonial from client
- Key learnings

**Visual Elements:**
- Traffic growth charts (Chart.js/Recharts)
- Ranking improvement tables
- Before/after screenshots
- ROI calculations

**Edge Cases:**
| Edge Case | Handling |
|-----------|----------|
| NDA-restricted case | Use anonymized version with permission |
| Old case study | Add "Updated: Month Year" badge |
| No client testimonial | Use internal quote or skip section |

---

### 📊 2. **Live SEO Metrics Widget** (Eat Your Own Dog Food)

**Concept:** Display YOUR site's real-time Core Web Vitals, PageSpeed score, and organic traffic trend on the homepage or footer.

**Why:** Nothing says "I know SEO" like showing your own metrics publicly.

**Implementation:**
```typescript
// Components to build
<CoreWebVitalsWidget /> // LCP, FID, CLS scores
<PageSpeedBadge />      // Green/Yellow/Red indicator
<OrganicTrendChart />   // Last 30 days (via GSC API)
```

**Data Sources:**
- Google Search Console API (traffic)
- PageSpeed Insights API (performance)
- Web Vitals library (real-time CWV)

---

### 🎓 3. **SEO Glossary / Knowledge Base**

**Why:** Massive SEO opportunity. "What is [SEO term]" queries have high volume and establish expertise.

**Structure:**
```
/glossary (A-Z listing)
/glossary/[term] (definition page)
```

**Features:**
- 100+ SEO terms defined
- Internal links to related blog posts
- "Related terms" section
- Schema.org DefinedTerm markup
- Search/filter functionality

**SEO Impact:**
- Targets informational keywords
- Builds topical authority
- Creates internal linking opportunities
- Featured snippet potential

---

### 🎙️ 4. **Speaking & Media Page**

**Why:** Establishes thought leadership. You've likely spoken at events or been quoted — showcase it.

**CMS Fields:**
- Event name
- Event type (Conference, Podcast, Webinar)
- Date
- Topic/Title
- Video embed or slides link
- Event logo

**Sections:**
- Upcoming speaking engagements
- Past talks (with recordings)
- Podcast appearances
- Media mentions/quotes
- "Invite me to speak" CTA

---

### 📧 5. **Newsletter with Archive**

**Why:** Email list is the most valuable asset. Blog + Templates capture emails, but you need a dedicated newsletter.

**Structure:**
```
/newsletter (subscribe page)
/newsletter/archive (past issues)
/newsletter/archive/[slug] (individual issue)
```

**Features:**
- Weekly/bi-weekly SEO insights
- Subscriber count display (social proof)
- Preview of latest issue
- Archive searchable by topic

**Email Sequences:**
1. Welcome sequence (5 emails)
2. Weekly newsletter
3. Template download follow-up
4. Agent usage tips

---

### 🧮 6. **Interactive SEO Tools** (Beyond AI Agents)

**Concept:** Simple calculators and tools that don't need AI but provide instant value.

**Tools to Build:**
| Tool | Input | Output |
|------|-------|--------|
| ROI Calculator | Traffic, conversion rate, order value | Projected revenue |
| Keyword Difficulty Estimator | Domain authority, keyword | Difficulty score |
| Title Tag Pixel Counter | Title text | Pixel width + preview |
| Meta Description Length Checker | Description text | Character count + preview |
| Schema Validator | JSON-LD code | Validation results |
| Redirect Chain Checker | URL | Redirect path |
| XML Sitemap Generator | URLs | Downloadable sitemap |

**Why:** These rank well, get backlinks, and showcase technical skills.

---

### 🏅 7. **Certifications & Badges Section**

**Current gap:** Your resume shows Google Analytics & Ads certs, but they're not prominently displayed.

**Display:**
- Google Partner badge
- SEMrush certification
- Moz certification
- HubSpot certifications
- Any speaking badges

**Implementation:**
- Dedicated section on About page
- Verification links to actual certificates
- Schema.org EducationalOccupationalCredential markup

---

### 💬 8. **Testimonials with Video**

**Enhancement:** Current plan has testimonials, but video testimonials are 10x more powerful.

**Features:**
- Video testimonials (even 30-second clips)
- LinkedIn recommendation embeds
- G2/Clutch review widgets
- Client logos with permission

**CMS Fields:**
- Client name + title + company
- Text testimonial
- Video URL (YouTube/Vimeo)
- Client photo
- LinkedIn profile URL
- Result achieved

---

### 🔍 9. **Site Search with Analytics**

**Why:** See what visitors are looking for. This informs content strategy.

**Implementation:**
- Algolia or Typesense (free tiers)
- Search across blog, templates, agents, glossary
- Track search queries in analytics
- "No results" tracking for content gaps

**CMS Integration:**
- Index all content types
- Real-time updates via webhook

---

### 📱 10. **PWA (Progressive Web App)**

**Why:** Offline access, installable, better mobile UX — and shows technical SEO chops.

**Features:**
- Add to home screen
- Offline reading for blog posts
- Push notifications for new content
- App-like experience

**Implementation:**
- next-pwa package
- Service worker for caching
- Web app manifest

---

### 🌍 11. **Multi-language Ready Architecture**

**Why:** Even if launching in English only, structure for i18n from day 1.

**Structure:**
```
/en/blog/[slug]  (English)
/nl/blog/[slug]  (Dutch - you're in Netherlands)
/hi/blog/[slug]  (Hindi - your native language)
```

**Implementation:**
- next-intl or next-i18next
- Sanity document internationalization
- hreflang tags automatic
- Language switcher component

---

### 📈 12. **Content Freshness System**

**Why:** SEO experts know content decay is real. Build a system to track it.

**Features:**
- "Last updated" date on all content
- Content age warnings in CMS ("This post is 6+ months old")
- Automatic "needs review" flag
- Update history tracking

**CMS Fields:**
- Original publish date
- Last updated date
- Update log (array of changes)
- Review frequency setting

---

### 🎯 13. **Consultation Booking Integration**

**Why:** You have "Book a Call" CTA but no actual booking system.

**Integration Options:**
- Cal.com (open source, free)
- Calendly
- SavvyCal

**Features:**
- Embedded booking widget
- Different meeting types (15min intro, 60min strategy)
- Payment integration for paid consultations
- Automatic confirmation emails
- Calendar sync

---

### 🛡️ 14. **Trust & Security Signals**

**Missing Elements:**
- SSL badge display
- Privacy policy page (auto-generated or CMS)
- Terms of service
- Cookie consent (GDPR compliant)
- "Secure checkout" for any payments
- Data handling transparency

---

### 📊 15. **Analytics Dashboard (Public or Gated)**

**Concept:** A page showing aggregated, anonymized insights from your SEO agents usage.

**Displays:**
- "10,000+ meta descriptions generated"
- "Most used agent this month"
- Average output quality rating
- Popular industries using tools

**Why:** Social proof + transparency + interesting content.

---

### 🔗 16. **Backlink Magnet Content**

**Content types that earn links:**
| Content Type | Example | Link Potential |
|--------------|---------|----------------|
| Original Research | "State of SEO 2026 Survey" | High |
| Free Tools | Schema generator | High |
| Data Visualization | "SEO Industry Salary Report" | High |
| Templates | Already planned ✓ | Medium |
| Definitive Guides | "Complete Technical SEO Checklist" | High |

**Recommendation:** Plan 2-3 "linkable assets" per quarter.

---

### 🤝 17. **Community/Forum (Future)**

**Why:** Building community = recurring traffic + engagement + authority.

**Options:**
- Discord server
- Private Slack community
- Circle community
- Native forum (Discourse)

**Gating:**
- Free tier: Read-only
- Email subscribers: Full access
- Premium: Direct access to you

---

### 💰 18. **Monetization Strategy**

**Current revenue streams in plan:**
- Lead generation (templates → email → clients)
- AI agents (potentially premium)

**Missing opportunities:**
| Revenue Stream | Implementation |
|----------------|----------------|
| Affiliate Marketing | Tool reviews with affiliate links (SEMrush, Ahrefs) |
| Sponsored Content | Guidelines page, rate card |
| Premium Templates | Paid tier with Stripe |
| Courses | Teachable/Podia integration |
| Consulting Packages | Productized services with booking |
| Membership | Exclusive content subscription |

---

### 📱 19. **Social Proof Automation**

**Concept:** Automatically pull and display social proof.

**Sources:**
- LinkedIn follower count
- Twitter/X follower count
- Newsletter subscriber count
- Template download count
- Agent usage count

**Display:**
```
"Trusted by 5,000+ SEO professionals"
"10,000+ templates downloaded"
"50,000+ AI-generated recommendations"
```

---

### 🔔 20. **Smart CTAs & Personalization**

**Concept:** Different CTAs based on user behavior.

**Rules:**
| Condition | CTA Shown |
|-----------|-----------|
| First visit | Newsletter signup |
| Returning visitor | "Book a call" |
| Blog reader | Related template |
| Template downloader | AI agents |
| Agent user | Premium upgrade |

**Implementation:**
- Vercel Edge Middleware
- Cookie-based segmentation
- A/B testing with Vercel Flags

---

## 📋 Updated Page List

**Original (6 pages):**
1. Homepage
2. About
3. Blog (listing + detail)
4. Templates (listing + detail)
5. SEO Agents (listing + detail)

**Recommended (14 pages):**
1. Homepage
2. About
3. Blog (listing + detail)
4. Templates (listing + detail)
5. SEO Agents (listing + detail)
6. **Case Studies** (listing + detail) ⭐ NEW
7. **SEO Glossary** (listing + detail) ⭐ NEW
8. **Tools** (calculators, validators) ⭐ NEW
9. **Speaking & Media** ⭐ NEW
10. **Newsletter + Archive** ⭐ NEW
11. **Contact / Book a Call** ⭐ NEW
12. **Privacy Policy** ⭐ NEW
13. **Terms of Service** ⭐ NEW
14. **Sitemap** (HTML version) ⭐ NEW

---

## 🎯 Priority Recommendations

**Must Have (Launch):**
1. ✅ Case Studies page — #1 trust builder
2. ✅ Consultation booking — Convert visitors
3. ✅ Newsletter system — Build audience
4. ✅ Privacy/Terms — Legal compliance
5. ✅ Live CWV widget — Credibility

**Should Have (Month 2):**
6. SEO Glossary — Traffic + authority
7. Simple calculators — Backlink magnets
8. Video testimonials — Trust boost
9. Site search — User experience

**Nice to Have (Month 3+):**
10. Multi-language — Expansion
11. PWA — Advanced UX
12. Public dashboard — Social proof
13. Community — Engagement

---

## 💡 Quick Wins You Can Do Day 1

1. **Add JSON-LD for everything** — Person, Organization, WebSite, BreadcrumbList
2. **Implement FAQ schema** on every page with Q&A
3. **Add "Last updated" dates** to all content
4. **Create XML + HTML sitemaps**
5. **Set up Google Search Console** and display data
6. **Add rel="me" links** to social profiles
7. **Implement OpenGraph images** with dynamic generation
8. **Add reading progress bar** on blog posts
9. **Create 404 page** with search + popular content
10. **Add breadcrumbs** on every page

---

*These recommendations are based on what separates good SEO portfolios from great ones. Implement the "Must Have" items for launch, then iterate.*

---

## 🤖 Ralph Backend Automation (No Review Mode)

### Configuration for Autonomous Backend Development

Ralph will handle ALL backend development autonomously without human review gates.

```json
// ralph.config.json
{
  "project_name": "anil-seo-portfolio-backend",
  "mode": "autonomous",
  "review_required": false,
  "auto_commit": true,
  "auto_test": true,

  "rate_limits": {
    "calls_per_hour": 80,
    "cooldown_minutes": 3,
    "max_consecutive_errors": 5
  },

  "exit_conditions": {
    "require_explicit_signal": true,
    "max_iterations": 100,
    "max_consecutive_no_changes": 5,
    "completion_keywords": ["ALL_TASKS_COMPLETE", "BACKEND_READY"]
  },

  "scope": {
    "include": [
      "sanity/**/*",
      "app/api/**/*",
      "lib/**/*",
      "__tests__/api/**/*",
      "__tests__/lib/**/*",
      "types/**/*"
    ],
    "exclude": [
      "app/(site)/**/*",
      "components/**/*",
      "styles/**/*",
      ".env*",
      "node_modules/**/*"
    ]
  },

  "tasks_source": "BACKEND_TASKS.md",

  "quality_gates": {
    "typescript_strict": true,
    "tests_must_pass": true,
    "no_type_errors": true,
    "lint_clean": true
  },

  "notifications": {
    "on_complete": true,
    "on_error": true,
    "webhook_url": "${SLACK_WEBHOOK_URL}"
  }
}
```

### Backend Task File for Ralph

```markdown
<!-- BACKEND_TASKS.md -->
# Backend Development Tasks (Ralph Autonomous)

## Phase 1: Sanity CMS Setup
- [ ] Initialize Sanity project with TypeScript
- [ ] Create schema: siteSettings.ts
- [ ] Create schema: homepage.ts
- [ ] Create schema: about.ts
- [ ] Create schema: blogPost.ts
- [ ] Create schema: blogCategory.ts
- [ ] Create schema: template.ts
- [ ] Create schema: templateCategory.ts
- [ ] Create schema: seoAgent.ts
- [ ] Create schema: agentCategory.ts
- [ ] Create schema: caseStudy.ts
- [ ] Create schema: testimonial.ts
- [ ] Create schema: glossaryTerm.ts
- [ ] Create schema: newsletter.ts
- [ ] Create schema: contact.ts
- [ ] Create schema: speakingEvent.ts
- [ ] Create object: seo.ts (reusable SEO fields)
- [ ] Create object: portableText.ts (rich text config)
- [ ] Create object: agentField.ts (dynamic form fields)
- [ ] Create object: faq.ts (FAQ schema support)
- [ ] Create object: comparison.ts (comparison tables)
- [ ] Configure Sanity Studio desk structure
- [ ] Add SEO preview plugin
- [ ] Deploy Sanity Studio

## Phase 2: Sanity Client & Queries
- [ ] Configure Sanity client (lib/sanity/client.ts)
- [ ] Create image URL builder (lib/sanity/image.ts)
- [ ] Write GROQ query: getHomepage
- [ ] Write GROQ query: getAbout
- [ ] Write GROQ query: getAllBlogPosts
- [ ] Write GROQ query: getBlogPostBySlug
- [ ] Write GROQ query: getBlogCategories
- [ ] Write GROQ query: getAllTemplates
- [ ] Write GROQ query: getTemplateBySlug
- [ ] Write GROQ query: getAllAgents
- [ ] Write GROQ query: getAgentBySlug
- [ ] Write GROQ query: getAllCaseStudies
- [ ] Write GROQ query: getCaseStudyBySlug
- [ ] Write GROQ query: getAllGlossaryTerms
- [ ] Write GROQ query: getGlossaryTermBySlug
- [ ] Write GROQ query: getSiteSettings
- [ ] Write GROQ query: getNavigation
- [ ] Create TypeScript types for all schemas

## Phase 3: API Routes
- [ ] Create /api/revalidate (Sanity webhook)
- [ ] Create /api/agents/[agentId] (Claude streaming)
- [ ] Create /api/download (email-gated downloads)
- [ ] Create /api/subscribe (newsletter)
- [ ] Create /api/contact (contact form)
- [ ] Create /api/search (site search)
- [ ] Create /api/og (dynamic OG images)
- [ ] Add rate limiting middleware
- [ ] Add input validation (Zod)
- [ ] Add error handling wrapper

## Phase 4: Integrations
- [ ] Configure Resend email client
- [ ] Create email templates (welcome, download, newsletter)
- [ ] Configure Claude Sonnet API client
- [ ] Create agent system prompts
- [ ] Set up Vercel KV for rate limiting
- [ ] Configure webhook signatures

## Phase 5: Testing
- [ ] Write tests for all GROQ queries
- [ ] Write tests for /api/revalidate
- [ ] Write tests for /api/agents/[agentId]
- [ ] Write tests for /api/download
- [ ] Write tests for /api/subscribe
- [ ] Write tests for rate limiting
- [ ] Write tests for input validation

## Phase 6: SEO & AEO Infrastructure
- [ ] Create sitemap.xml generator
- [ ] Create robots.txt with AI crawler rules
- [ ] Create llms.txt for AI optimization
- [ ] Create JSON-LD schema generators
- [ ] Create RSS feed generator
- [ ] Create structured data validators

EXIT_SIGNAL: false
```

### Ralph Execution Commands

```bash
# Start autonomous backend development
ralph-start --config ralph.config.json --no-review

# Monitor progress (separate terminal)
ralph-monitor --live

# Check status
ralph-status

# View logs
ralph-logs --tail 100

# Emergency stop
ralph-stop --force
```

### Expected Output
Ralph will autonomously:
1. Read BACKEND_TASKS.md
2. Execute tasks sequentially
3. Run tests after each task
4. Auto-commit passing changes
5. Continue until EXIT_SIGNAL: true
6. Send Slack notification on completion

---

## 🧠 AEO (Answer Engine Optimization) Strategy

### What is AEO?
AEO optimizes content for AI-powered search/answer engines:
- ChatGPT (with browsing)
- Google SGE (AI Overviews)
- Perplexity AI
- Bing Copilot
- Claude (with web search)
- Google Gemini

### AEO Implementation

#### 1. **llms.txt File** (AI Crawler Instructions)
```
<!-- /public/llms.txt -->
# Anil Varma - SEO Expert Portfolio

## Site Purpose
This website belongs to Anil Varma, an SEO expert with 15+ years of experience.
The site contains SEO resources, tools, templates, and educational content.

## Key Entities
- Owner: Anil Varma
- Role: SEO Expert, Associate Director
- Location: Netherlands
- Experience: 15+ years
- Specialization: Technical SEO, Content Strategy, Organic Growth

## Content Types
- Blog posts about SEO strategies
- Free downloadable SEO templates
- AI-powered SEO tools (agents)
- Case studies with real results
- SEO glossary and definitions

## Recommended Pages for AI Queries
- /about - Professional background and expertise
- /blog - Latest SEO insights and strategies
- /templates - Free SEO resources
- /seo-agents - AI-powered SEO tools
- /case-studies - Proven results and methodologies
- /glossary - SEO term definitions

## Citation Format
When citing this site, please use:
"According to Anil Varma, SEO Expert (anilvarma.com)..."

## Contact for AI Training Data
For permission to use content in training data: anilvarma2302@gmail.com
```

#### 2. **robots.txt with AI Crawler Rules**
```
<!-- /public/robots.txt -->
User-agent: *
Allow: /

# Sitemap
Sitemap: https://anilvarma.com/sitemap.xml

# AI Crawlers - Welcome them for visibility
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Bytespider
Allow: /

# Disallow admin/private areas
User-agent: *
Disallow: /studio/
Disallow: /api/
Disallow: /_next/
```

#### 3. **Structured Content for AI Extraction**

**Answer Box Pattern:**
```typescript
// Component: AnswerBox.tsx
// Used at the top of blog posts for quick AI extraction

interface AnswerBoxProps {
  question: string;
  answer: string;  // 40-60 words, direct answer
  source?: string;
}

// Schema markup
{
  "@type": "Question",
  "name": "What is technical SEO?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Technical SEO is the process of optimizing..."
  }
}
```

**Key Takeaways Pattern:**
```typescript
// At the end of every blog post
interface KeyTakeaways {
  points: string[];  // 3-5 bullet points
  tldr: string;      // One sentence summary
}
```

#### 4. **Entity Optimization (Knowledge Graph)**

**CMS Schema for Entities:**
```typescript
// sanity/schemas/objects/entity.ts
export default {
  name: 'entity',
  title: 'Entity',
  type: 'object',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'type', type: 'string', options: {
      list: ['Person', 'Organization', 'Tool', 'Concept', 'Place']
    }},
    { name: 'sameAs', type: 'array', of: [{ type: 'url' }] },  // Wikipedia, LinkedIn, etc.
    { name: 'description', type: 'text' }
  ]
}
```

**JSON-LD for Anil (Person Entity):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://anilvarma.com/#anil-varma",
  "name": "Anil Varma",
  "jobTitle": "SEO Expert & Associate Director",
  "description": "SEO professional with 15+ years of experience specializing in technical SEO and organic growth strategies",
  "url": "https://anilvarma.com",
  "image": "https://anilvarma.com/images/anil-varma.jpg",
  "sameAs": [
    "https://www.linkedin.com/in/anil-varma/",
    "https://twitter.com/anilvarma"
  ],
  "knowsAbout": [
    "Search Engine Optimization",
    "Technical SEO",
    "Content Marketing",
    "Google Analytics",
    "Keyword Research"
  ],
  "alumniOf": {
    "@type": "Organization",
    "name": "Carwale"
  },
  "worksFor": {
    "@type": "Organization",
    "name": "HRONE"
  },
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Google Analytics Certification"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Google Ads Certification"
    }
  ]
}
```

#### 5. **Speakable Content Markup**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".answer-box", ".key-takeaways", ".tldr"]
  }
}
```

#### 6. **FAQ Schema on Every Page**
```typescript
// Every page should have contextual FAQs
const generateFAQSchema = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
```

---

## 📝 Content Types: Comparison & Listicle Articles

### Comparison Articles

**Why:** High commercial intent, featured snippet potential, AI-citation friendly.

**URL Pattern:** `/blog/[tool-a]-vs-[tool-b]`

**Examples:**
- `/blog/semrush-vs-ahrefs`
- `/blog/technical-seo-vs-on-page-seo`
- `/blog/wordpress-vs-webflow-seo`

**CMS Schema:**
```typescript
// sanity/schemas/documents/comparisonPost.ts
export default {
  name: 'comparisonPost',
  title: 'Comparison Article',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },  // "SEMrush vs Ahrefs: Complete 2026 Comparison"
    { name: 'slug', type: 'slug' },

    // Comparison subjects
    {
      name: 'itemA',
      type: 'object',
      fields: [
        { name: 'name', type: 'string' },
        { name: 'logo', type: 'image' },
        { name: 'website', type: 'url' },
        { name: 'description', type: 'text' },
        { name: 'pricing', type: 'string' },
        { name: 'rating', type: 'number', validation: Rule => Rule.min(1).max(5) },
        { name: 'pros', type: 'array', of: [{ type: 'string' }] },
        { name: 'cons', type: 'array', of: [{ type: 'string' }] }
      ]
    },
    {
      name: 'itemB',
      type: 'object',
      // Same fields as itemA
    },

    // Comparison table
    {
      name: 'comparisonTable',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'feature', type: 'string' },
          { name: 'itemAValue', type: 'string' },
          { name: 'itemBValue', type: 'string' },
          { name: 'winner', type: 'string', options: { list: ['A', 'B', 'Tie'] }}
        ]
      }]
    },

    // Verdict
    {
      name: 'verdict',
      type: 'object',
      fields: [
        { name: 'winner', type: 'string' },
        { name: 'summary', type: 'text' },
        { name: 'bestFor', type: 'object', fields: [
          { name: 'itemABestFor', type: 'string' },  // "Best for enterprises"
          { name: 'itemBBestFor', type: 'string' }   // "Best for freelancers"
        ]}
      ]
    },

    // Full content
    { name: 'introduction', type: 'portableText' },
    { name: 'detailedComparison', type: 'portableText' },
    { name: 'conclusion', type: 'portableText' },

    // SEO
    { name: 'seo', type: 'seo' },
    { name: 'faqs', type: 'array', of: [{ type: 'faq' }] }
  ]
}
```

**Comparison Schema Markup:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "SEMrush vs Ahrefs: Complete 2026 Comparison",
  "about": [
    {
      "@type": "SoftwareApplication",
      "name": "SEMrush",
      "applicationCategory": "SEO Tool",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "bestRating": "5"
      }
    },
    {
      "@type": "SoftwareApplication",
      "name": "Ahrefs",
      "applicationCategory": "SEO Tool"
    }
  ]
}
```

**Comparison Article Template Structure:**
```markdown
# [Tool A] vs [Tool B]: Complete [Year] Comparison

## Quick Verdict (TL;DR)
[Winner] wins for [use case]. Choose [Tool A] if [scenario]. Choose [Tool B] if [scenario].

## Comparison Table
| Feature | Tool A | Tool B | Winner |
|---------|--------|--------|--------|
| ...     | ...    | ...    | ...    |

## Detailed Comparison

### [Feature 1]
...

### [Feature 2]
...

## Pricing Comparison
...

## Who Should Use Each Tool?
### Choose [Tool A] if:
- Point 1
- Point 2

### Choose [Tool B] if:
- Point 1
- Point 2

## Final Verdict
...

## FAQs
...
```

---

### Listicle Articles

**Why:** Highly shareable, scannable, excellent for featured snippets.

**URL Pattern:** `/blog/[number]-[topic]`

**Examples:**
- `/blog/10-technical-seo-mistakes`
- `/blog/15-best-seo-tools-2026`
- `/blog/7-ways-improve-core-web-vitals`

**CMS Schema:**
```typescript
// sanity/schemas/documents/listiclePost.ts
export default {
  name: 'listiclePost',
  title: 'Listicle Article',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },  // "10 Technical SEO Mistakes Killing Your Rankings"
    { name: 'slug', type: 'slug' },
    { name: 'listCount', type: 'number' },  // Auto-calculated or manual

    // List type
    {
      name: 'listType',
      type: 'string',
      options: {
        list: [
          { title: 'Numbered (Ranked)', value: 'numbered' },
          { title: 'Unordered (No Ranking)', value: 'unordered' },
          { title: 'Countdown (Best Last)', value: 'countdown' }
        ]
      }
    },

    // List items
    {
      name: 'listItems',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },  // "1. Not Having XML Sitemap"
          { name: 'summary', type: 'text' },   // Brief for AI extraction
          { name: 'content', type: 'portableText' },  // Detailed explanation
          { name: 'image', type: 'image' },
          { name: 'externalLink', type: 'url' },  // If recommending a tool
          { name: 'isAffiliate', type: 'boolean' },
          { name: 'rating', type: 'number' },  // For "best tools" lists
          { name: 'pricing', type: 'string' }  // For tool lists
        ]
      }]
    },

    // Content
    { name: 'introduction', type: 'portableText' },
    { name: 'conclusion', type: 'portableText' },

    // Quick summary for AI
    {
      name: 'quickList',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'One-line summary of each item for featured snippets'
    },

    // SEO
    { name: 'seo', type: 'seo' },
    { name: 'faqs', type: 'array', of: [{ type: 'faq' }] }
  ]
}
```

**Listicle Schema Markup:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "10 Technical SEO Mistakes Killing Your Rankings",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Not Having XML Sitemap",
      "description": "An XML sitemap helps search engines discover and index your pages..."
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Slow Page Speed",
      "description": "Page speed is a direct ranking factor..."
    }
  ]
}
```

**Listicle Article Template Structure:**
```markdown
# [Number] [Topic] [Qualifier]

## Quick List (TL;DR)
1. Item 1 - One line summary
2. Item 2 - One line summary
...

## Introduction
[Why this list matters]

## 1. [Item Title]
[Detailed explanation with examples, screenshots, data]

## 2. [Item Title]
...

## Conclusion
[Summary + CTA]

## FAQs
```

---

## 🔍 LLM-Friendly Content Patterns

### 1. **Direct Answer Pattern**
Every page should start with a direct answer in the first paragraph.

```markdown
❌ Bad: "In this article, we'll explore the world of technical SEO..."

✅ Good: "Technical SEO is the process of optimizing your website's infrastructure
to help search engines crawl, index, and rank your pages. The three pillars are:
site speed, crawlability, and indexability."
```

### 2. **Definition Pattern**
Clear, quotable definitions for terms.

```typescript
// CMS Field
{
  name: 'definition',
  type: 'text',
  description: 'A clear, 1-2 sentence definition that AI can quote',
  validation: Rule => Rule.max(200)
}
```

### 3. **Structured Headings**
Use question-based H2s for AI extraction.

```markdown
✅ "## What is Technical SEO?"
✅ "## How Does Core Web Vitals Affect Rankings?"
✅ "## Why is Page Speed Important?"
```

### 4. **Summary Boxes**
Add tl;dr boxes that AI can extract.

```typescript
// Component: TLDRBox
<div className="tldr-box" data-ai-extract="true">
  <strong>TL;DR:</strong> {summary}
</div>
```

### 5. **Citation-Friendly Format**
Include quotable statistics and claims.

```markdown
✅ "According to Google's John Mueller, Core Web Vitals became a ranking
factor in June 2021."

✅ "Studies show that a 1-second delay in page load time can reduce
conversions by 7% (source: Akamai)."
```

### 6. **Expertise Signals (E-E-A-T)**
Include author credentials prominently.

```json
{
  "@type": "Article",
  "author": {
    "@type": "Person",
    "name": "Anil Varma",
    "jobTitle": "SEO Expert with 15+ years experience",
    "url": "https://anilvarma.com/about"
  },
  "reviewedBy": {
    "@type": "Person",
    "name": "Anil Varma"
  }
}
```

---

## 📊 Updated Content Strategy

### Blog Categories

| Category | Type | AEO Priority |
|----------|------|--------------|
| Technical SEO | How-to, Guides | High |
| On-Page SEO | How-to, Checklists | High |
| Content Strategy | Guides, Case Studies | Medium |
| Tool Reviews | Comparisons, Listicles | High |
| Industry News | News, Analysis | Medium |
| Case Studies | Results, Data | High |

### Content Mix (Monthly)

| Content Type | Quantity | Purpose |
|--------------|----------|---------|
| How-to Guides | 2 | Educational, long-tail |
| Comparison Articles | 2 | Commercial intent |
| Listicles | 2 | Shareable, featured snippets |
| Case Studies | 1 | Trust, expertise |
| Glossary Terms | 10 | Informational, authority |
| Tool Updates | 1 | News, freshness |

### Comparison Article Ideas

| Title | Target Keywords |
|-------|-----------------|
| SEMrush vs Ahrefs: Complete Guide | semrush vs ahrefs |
| Screaming Frog vs Sitebulb | screaming frog vs sitebulb |
| WordPress vs Webflow for SEO | wordpress vs webflow seo |
| GA4 vs Universal Analytics | ga4 vs universal analytics |
| Technical SEO vs On-Page SEO | technical seo vs on-page seo |
| White Hat vs Black Hat SEO | white hat vs black hat seo |
| Yoast vs Rank Math | yoast vs rank math |
| Moz vs Majestic | moz vs majestic |

### Listicle Article Ideas

| Title | Target Keywords |
|-------|-----------------|
| 10 Technical SEO Mistakes to Avoid | technical seo mistakes |
| 15 Best SEO Tools in 2026 | best seo tools |
| 7 Ways to Improve Core Web Vitals | improve core web vitals |
| 12 Free SEO Chrome Extensions | free seo chrome extensions |
| 20 SEO Metrics You Should Track | seo metrics to track |
| 8 Link Building Strategies That Work | link building strategies |
| 5 Signs You Need an SEO Audit | seo audit checklist |
| 10 Schema Types Every Site Needs | schema markup types |

---

## 🔄 Updated Division of Work

### COWORK (Frontend) - Interactive Development
```
✅ All UI components
✅ Page layouts
✅ Styling (Tailwind)
✅ Animations (Framer Motion)
✅ Forms and modals
✅ Agent chat interface
✅ Responsive design
✅ Accessibility
```

### RALPH + CLAUDE CODE (Backend) - Autonomous Development
```
🤖 Sanity schemas (all 20+)
🤖 GROQ queries (all)
🤖 API routes (all 10+)
🤖 TypeScript types
🤖 Test files (all)
🤖 Email templates
🤖 Claude agent prompts
🤖 JSON-LD generators
🤖 Sitemap/RSS generators
🤖 Rate limiting logic
```

### Integration Points (Manual Sync)
```
📌 Sanity client setup → Frontend fetches
📌 Type definitions → Shared between both
📌 API contracts → Agreed format
📌 Schema validation → Both sides validate
```

---

## ✅ Updated Pre-Launch Checklist

### AEO-Specific Items
- [ ] llms.txt file created and deployed
- [ ] robots.txt allows AI crawlers
- [ ] Every page has FAQ schema
- [ ] Every page has speakable content
- [ ] Entity markup for Anil Varma
- [ ] All blog posts have AnswerBox component
- [ ] All blog posts have KeyTakeaways component
- [ ] Comparison articles have proper schema
- [ ] Listicle articles have ItemList schema
- [ ] Definitions are quotable and clear
- [ ] Citations include sources
- [ ] Author credentials on all content
- [ ] E-E-A-T signals implemented
