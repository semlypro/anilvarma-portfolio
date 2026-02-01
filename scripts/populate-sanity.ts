import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'gd7ezu7r',
  dataset: 'production',
  token: 'skwzguLRzpuSQXaMlvdjaAlV5uTKz19IRT5Jcu984v2KC0hVmKz3JvYuJ2R3xwYWJcmYG10C6t0pCelORrBcOI0Y0wf2p0xcuengdBVfSYbOOZm5mlwOtDglu1kUT3oLo6ivcWH2kWWLw1Wl1Y0cWgPSLobX2Swvxc9uOssjNkACdMuYDrEM',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function populateSanity() {
  console.log('🚀 Starting Sanity population...\n');

  try {
    // 1. Create Author
    console.log('📝 Creating Author...');
    const author = await client.create({
      _type: 'author',
      name: 'Anil Varma',
      role: 'SEO Expert & Digital Marketing Strategist',
      bio: 'SEO expert with 15+ years of experience in technical SEO, content strategy, and organic growth.',
      email: 'anilvarma2302@gmail.com',
    });
    console.log('✅ Author created:', author._id);

    // 2. Create Blog Categories
    console.log('\n📂 Creating Blog Categories...');
    const blogCategories = [];
    const categoryData = [
      { title: 'Technical SEO', slug: 'technical-seo', color: '#3b82f6' },
      { title: 'On-Page SEO', slug: 'on-page-seo', color: '#14b8a6' },
      { title: 'Content Strategy', slug: 'content-strategy', color: '#f59e0b' },
      { title: 'Link Building', slug: 'link-building', color: '#8b5cf6' },
      { title: 'Analytics', slug: 'analytics', color: '#ef4444' },
    ];

    for (const cat of categoryData) {
      const category = await client.create({
        _type: 'blogCategory',
        title: cat.title,
        slug: { _type: 'slug', current: cat.slug },
        color: cat.color,
      });
      blogCategories.push(category);
      console.log(`✅ Blog Category: ${cat.title}`);
    }

    // 3. Create Blog Posts
    console.log('\n📰 Creating Blog Posts...');
    const blogPosts = [
      {
        title: '10 Technical SEO Mistakes That Are Killing Your Rankings',
        slug: '10-technical-seo-mistakes',
        excerpt: 'Discover the most common technical SEO issues I see when auditing websites, and learn how to fix them to improve your search rankings.',
        category: blogCategories[0]._id,
        tags: ['technical seo', 'site audit', 'rankings'],
        publishedAt: '2026-01-15T10:00:00Z',
        readingTime: 8,
      },
      {
        title: 'How to Build a Content Strategy That Ranks',
        slug: 'content-strategy-that-ranks',
        excerpt: 'A step-by-step guide to creating a content strategy that drives organic traffic and converts visitors into customers.',
        category: blogCategories[2]._id,
        tags: ['content strategy', 'keyword research', 'content marketing'],
        publishedAt: '2026-01-10T10:00:00Z',
        readingTime: 12,
      },
      {
        title: 'Core Web Vitals: The Complete 2026 Guide',
        slug: 'core-web-vitals-guide-2026',
        excerpt: 'Everything you need to know about Core Web Vitals, including how to measure, optimize, and pass the assessment.',
        category: blogCategories[0]._id,
        tags: ['core web vitals', 'page speed', 'performance'],
        publishedAt: '2026-01-05T10:00:00Z',
        readingTime: 15,
      },
      {
        title: 'Link Building Strategies That Still Work in 2026',
        slug: 'link-building-strategies-2026',
        excerpt: 'White-hat link building tactics that deliver results without risking penalties from Google.',
        category: blogCategories[3]._id,
        tags: ['link building', 'backlinks', 'off-page seo'],
        publishedAt: '2026-01-20T10:00:00Z',
        readingTime: 10,
      },
      {
        title: 'Google Analytics 4: Essential Reports for SEO',
        slug: 'ga4-essential-reports-seo',
        excerpt: 'Learn which GA4 reports matter most for SEO and how to use them to improve your organic performance.',
        category: blogCategories[4]._id,
        tags: ['google analytics', 'analytics', 'reporting'],
        publishedAt: '2026-01-25T10:00:00Z',
        readingTime: 11,
      },
    ];

    for (const post of blogPosts) {
      const blogPost = await client.create({
        _type: 'blogPost',
        title: post.title,
        slug: { _type: 'slug', current: post.slug },
        excerpt: post.excerpt,
        author: { _type: 'reference', _ref: author._id },
        categories: [{ _type: 'reference', _ref: post.category }],
        tags: post.tags,
        publishedAt: post.publishedAt,
        readingTime: post.readingTime,
        content: [],
        seo: {
          metaTitle: `${post.title} | Anil Varma`,
          metaDescription: post.excerpt,
        },
      });
      console.log(`✅ Blog Post: ${post.title}`);
    }

    // 4. Create Comparison Posts
    console.log('\n⚖️  Creating Comparison Posts...');
    const comparisonPosts = [
      {
        title: 'Ahrefs vs SEMrush: Which SEO Tool is Better in 2026?',
        slug: 'ahrefs-vs-semrush',
        excerpt: 'A comprehensive comparison of the two leading SEO tools to help you choose the right one.',
        itemA: { name: 'Ahrefs', description: 'Powerful backlink analysis tool', pricing: '$99/month', rating: 4.7 },
        itemB: { name: 'SEMrush', description: 'All-in-one marketing toolkit', pricing: '$129/month', rating: 4.6 },
      },
      {
        title: 'Yoast vs Rank Math: Best WordPress SEO Plugin',
        slug: 'yoast-vs-rank-math',
        excerpt: 'Compare the features, performance, and pricing of the two most popular WordPress SEO plugins.',
        itemA: { name: 'Yoast SEO', description: 'Trusted WordPress SEO plugin', pricing: 'Free / $99/year', rating: 4.5 },
        itemB: { name: 'Rank Math', description: 'Feature-rich SEO plugin', pricing: 'Free / $59/year', rating: 4.8 },
      },
      {
        title: 'Screaming Frog vs Sitebulb: Technical SEO Crawler Comparison',
        slug: 'screaming-frog-vs-sitebulb',
        excerpt: 'Which technical SEO crawler is best for your website audits? We compare features and pricing.',
        itemA: { name: 'Screaming Frog', description: 'Popular desktop SEO spider', pricing: 'Free / £149/year', rating: 4.6 },
        itemB: { name: 'Sitebulb', description: 'Modern cloud-based crawler', pricing: '$35/month', rating: 4.7 },
      },
      {
        title: 'Google Search Console vs Bing Webmaster Tools',
        slug: 'gsc-vs-bing-webmaster',
        excerpt: 'Compare the search console tools from Google and Bing for better search visibility.',
        itemA: { name: 'Google Search Console', description: 'Essential Google insights', pricing: 'Free', rating: 4.8 },
        itemB: { name: 'Bing Webmaster Tools', description: 'Bing search insights', pricing: 'Free', rating: 4.3 },
      },
      {
        title: 'Surfer SEO vs Clearscope: Content Optimization Tools',
        slug: 'surfer-seo-vs-clearscope',
        excerpt: 'Which content optimization platform helps you create better SEO content?',
        itemA: { name: 'Surfer SEO', description: 'AI-powered content optimizer', pricing: '$89/month', rating: 4.6 },
        itemB: { name: 'Clearscope', description: 'Content optimization platform', pricing: '$170/month', rating: 4.7 },
      },
    ];

    for (const post of comparisonPosts) {
      await client.create({
        _type: 'comparisonPost',
        title: post.title,
        slug: { _type: 'slug', current: post.slug },
        excerpt: post.excerpt,
        itemA: post.itemA,
        itemB: post.itemB,
        publishedAt: new Date().toISOString(),
        seo: {
          metaTitle: `${post.title} | Anil Varma`,
          metaDescription: post.excerpt,
        },
      });
      console.log(`✅ Comparison Post: ${post.title}`);
    }

    // 5. Create Listicle Posts
    console.log('\n📋 Creating Listicle Posts...');
    const listiclePosts = [
      {
        title: '10 Best Free SEO Tools for 2026',
        slug: '10-best-free-seo-tools',
        excerpt: 'Discover the top free SEO tools that can help you improve your rankings without breaking the bank.',
        listCount: 10,
      },
      {
        title: '7 Essential Chrome Extensions for SEO Professionals',
        slug: '7-essential-chrome-extensions-seo',
        excerpt: 'Boost your SEO workflow with these must-have Chrome extensions.',
        listCount: 7,
      },
      {
        title: '15 SEO Metrics You Should Track in 2026',
        slug: '15-seo-metrics-to-track',
        excerpt: 'The most important SEO KPIs to monitor for measuring organic search success.',
        listCount: 15,
      },
      {
        title: '5 Advanced Technical SEO Techniques for 2026',
        slug: '5-advanced-technical-seo-techniques',
        excerpt: 'Take your technical SEO to the next level with these advanced optimization strategies.',
        listCount: 5,
      },
      {
        title: '12 Content Types That Rank Well in Google',
        slug: '12-content-types-that-rank',
        excerpt: 'Learn which content formats Google loves and how to create them for maximum visibility.',
        listCount: 12,
      },
    ];

    for (const post of listiclePosts) {
      await client.create({
        _type: 'listiclePost',
        title: post.title,
        slug: { _type: 'slug', current: post.slug },
        excerpt: post.excerpt,
        listCount: post.listCount,
        listType: 'numbered',
        publishedAt: new Date().toISOString(),
        seo: {
          metaTitle: `${post.title} | Anil Varma`,
          metaDescription: post.excerpt,
        },
      });
      console.log(`✅ Listicle Post: ${post.title}`);
    }

    // 6. Create Agent Categories
    console.log('\n🤖 Creating Agent Categories...');
    const agentCategories = [];
    const agentCatData = [
      { title: 'On-Page SEO', slug: 'on-page', icon: 'file-text' },
      { title: 'Technical SEO', slug: 'technical', icon: 'code' },
      { title: 'Content', slug: 'content', icon: 'edit' },
      { title: 'Schema', slug: 'schema', icon: 'brackets' },
      { title: 'Analytics', slug: 'analytics', icon: 'bar-chart' },
    ];

    for (const cat of agentCatData) {
      const category = await client.create({
        _type: 'agentCategory',
        title: cat.title,
        slug: { _type: 'slug', current: cat.slug },
        icon: cat.icon,
      });
      agentCategories.push(category);
      console.log(`✅ Agent Category: ${cat.title}`);
    }

    // 7. Create SEO Agents
    console.log('\n🤖 Creating SEO Agents...');
    const agents = [
      {
        name: 'Meta Description Generator',
        slug: 'meta-description-generator',
        shortDescription: 'Generate compelling, SEO-optimized meta descriptions for your pages.',
        category: agentCategories[0]._id,
        systemPrompt: 'You are an SEO expert specializing in writing meta descriptions that drive clicks and rankings.',
        pricingTier: 'free',
        usageLimit: 10,
      },
      {
        name: 'Title Tag Optimizer',
        slug: 'title-tag-optimizer',
        shortDescription: 'Optimize your title tags for better CTR and rankings.',
        category: agentCategories[0]._id,
        systemPrompt: 'You are an SEO expert specializing in title tag optimization for maximum impact.',
        pricingTier: 'free',
        usageLimit: 10,
      },
      {
        name: 'Schema Markup Generator',
        slug: 'schema-markup-generator',
        shortDescription: 'Generate JSON-LD schema markup for your pages.',
        category: agentCategories[3]._id,
        systemPrompt: 'You are an expert in Schema.org markup and JSON-LD structured data.',
        pricingTier: 'free',
        usageLimit: 5,
      },
      {
        name: 'Content Brief Generator',
        slug: 'content-brief-generator',
        shortDescription: 'Generate comprehensive content briefs for your writers.',
        category: agentCategories[2]._id,
        systemPrompt: 'You are an SEO content strategist who creates detailed content briefs.',
        pricingTier: 'free',
        usageLimit: 5,
      },
      {
        name: 'Robots.txt Validator',
        slug: 'robots-txt-validator',
        shortDescription: 'Validate and optimize your robots.txt file for better crawling.',
        category: agentCategories[1]._id,
        systemPrompt: 'You are a technical SEO expert specializing in robots.txt configuration.',
        pricingTier: 'free',
        usageLimit: 10,
      },
    ];

    for (const agent of agents) {
      await client.create({
        _type: 'seoAgent',
        name: agent.name,
        slug: { _type: 'slug', current: agent.slug },
        icon: 'file-text',
        shortDescription: agent.shortDescription,
        category: { _type: 'reference', _ref: agent.category },
        systemPrompt: agent.systemPrompt,
        inputFields: [],
        outputFormat: 'markdown',
        pricingTier: agent.pricingTier,
        usageLimit: agent.usageLimit,
        isEnabled: true,
        createdAt: new Date().toISOString(),
        seo: {
          metaTitle: `${agent.name} | Free AI SEO Tool`,
          metaDescription: agent.shortDescription,
        },
      });
      console.log(`✅ SEO Agent: ${agent.name}`);
    }

    // 8. Create Template Categories
    console.log('\n📂 Creating Template Categories...');
    const templateCategories = [];
    const templateCatData = [
      { title: 'SEO Audit', slug: 'seo-audit', icon: 'clipboard-check' },
      { title: 'Keyword Research', slug: 'keyword-research', icon: 'search' },
      { title: 'Content Planning', slug: 'content-planning', icon: 'file-text' },
      { title: 'Link Building', slug: 'link-building', icon: 'link' },
      { title: 'Reporting', slug: 'reporting', icon: 'bar-chart' },
    ];

    for (const cat of templateCatData) {
      const category = await client.create({
        _type: 'templateCategory',
        title: cat.title,
        slug: { _type: 'slug', current: cat.slug },
        icon: cat.icon,
      });
      templateCategories.push(category);
      console.log(`✅ Template Category: ${cat.title}`);
    }

    // 9. Create Templates
    console.log('\n📄 Creating Templates...');
    const templates = [
      {
        title: 'Complete SEO Audit Checklist',
        slug: 'seo-audit-checklist',
        shortDescription: 'A comprehensive 100+ point checklist to audit any website for technical SEO, on-page optimization, and content quality.',
        category: templateCategories[0]._id,
        fileFormat: 'XLSX',
        fileSize: '245 KB',
        downloadCount: 0,
        emailGateEnabled: true,
      },
      {
        title: 'Keyword Research Template',
        slug: 'keyword-research-template',
        shortDescription: 'Organize your keyword research with this structured template including search volume, difficulty, and intent classification.',
        category: templateCategories[1]._id,
        fileFormat: 'XLSX',
        fileSize: '128 KB',
        downloadCount: 0,
        emailGateEnabled: true,
      },
      {
        title: 'Content Calendar Template',
        slug: 'content-calendar-template',
        shortDescription: 'Plan and track your content production with this SEO-focused content calendar.',
        category: templateCategories[2]._id,
        fileFormat: 'XLSX',
        fileSize: '156 KB',
        downloadCount: 0,
        emailGateEnabled: true,
      },
      {
        title: 'Backlink Tracker Spreadsheet',
        slug: 'backlink-tracker',
        shortDescription: 'Track and manage your backlink portfolio with this comprehensive link building template.',
        category: templateCategories[3]._id,
        fileFormat: 'XLSX',
        fileSize: '189 KB',
        downloadCount: 0,
        emailGateEnabled: true,
      },
      {
        title: 'Monthly SEO Report Template',
        slug: 'monthly-seo-report',
        shortDescription: 'Professional SEO reporting template to showcase your results to clients or stakeholders.',
        category: templateCategories[4]._id,
        fileFormat: 'XLSX',
        fileSize: '312 KB',
        downloadCount: 0,
        emailGateEnabled: true,
      },
    ];

    for (const template of templates) {
      await client.create({
        _type: 'template',
        title: template.title,
        slug: { _type: 'slug', current: template.slug },
        shortDescription: template.shortDescription,
        category: { _type: 'reference', _ref: template.category },
        fileFormat: template.fileFormat,
        fileSize: template.fileSize,
        downloadCount: template.downloadCount,
        emailGateEnabled: template.emailGateEnabled,
        createdAt: new Date().toISOString(),
        seo: {
          metaTitle: `${template.title} | Free Download`,
          metaDescription: template.shortDescription,
        },
      });
      console.log(`✅ Template: ${template.title}`);
    }

    // 10. Create Glossary Terms
    console.log('\n📖 Creating Glossary Terms...');
    const glossaryTerms = [
      {
        term: 'Technical SEO',
        slug: 'technical-seo',
        definition: 'Technical SEO is the process of optimizing your website\'s infrastructure to help search engines crawl, index, and rank your pages effectively.',
        letter: 'T',
      },
      {
        term: 'Core Web Vitals',
        slug: 'core-web-vitals',
        definition: 'Core Web Vitals are a set of metrics that measure real-world user experience for loading performance (LCP), interactivity (FID), and visual stability (CLS).',
        letter: 'C',
      },
      {
        term: 'Canonical URL',
        slug: 'canonical-url',
        definition: 'A canonical URL is the preferred version of a web page that search engines should index when multiple URLs contain similar or duplicate content.',
        letter: 'C',
      },
      {
        term: 'Backlink',
        slug: 'backlink',
        definition: 'A backlink is a link from one website to another. Search engines use backlinks as a signal of content quality and authority.',
        letter: 'B',
      },
      {
        term: 'SERP',
        slug: 'serp',
        definition: 'SERP (Search Engine Results Page) is the page displayed by search engines in response to a user\'s query, containing organic results, ads, and features.',
        letter: 'S',
      },
    ];

    for (const term of glossaryTerms) {
      await client.create({
        _type: 'glossaryTerm',
        term: term.term,
        slug: { _type: 'slug', current: term.slug },
        definition: term.definition,
        letter: term.letter,
        createdAt: new Date().toISOString(),
        seo: {
          metaTitle: `What is ${term.term}? | SEO Glossary`,
          metaDescription: term.definition,
        },
      });
      console.log(`✅ Glossary Term: ${term.term}`);
    }

    // 11. Create Testimonials
    console.log('\n💬 Creating Testimonials...');
    const testimonials = [
      {
        name: 'Rahul Sharma',
        role: 'Head of Marketing',
        company: 'CarWale',
        quote: 'Anil transformed our SEO strategy and helped us grow organic traffic from 3.5M to 10M monthly users. His technical expertise and data-driven approach are unmatched.',
        resultAchieved: '185% traffic increase in 3 years',
        isFeatured: true,
      },
      {
        name: 'Priya Patel',
        role: 'CEO',
        company: 'TechStartup India',
        quote: 'Working with Anil was a game-changer for our startup. He not only improved our rankings but also trained our team to maintain SEO best practices.',
        resultAchieved: '5x organic leads in 6 months',
        isFeatured: true,
      },
      {
        name: 'David Chen',
        role: 'VP Product',
        company: 'HRONE',
        quote: 'Anil\'s strategic vision for SEO helped us create 600+ content pages in 3 months and achieve 32% traffic growth year-over-year.',
        resultAchieved: '32% YoY traffic growth',
        isFeatured: true,
      },
    ];

    for (const testimonial of testimonials) {
      await client.create({
        _type: 'testimonial',
        name: testimonial.name,
        role: testimonial.role,
        company: testimonial.company,
        quote: testimonial.quote,
        resultAchieved: testimonial.resultAchieved,
        isFeatured: testimonial.isFeatured,
      });
      console.log(`✅ Testimonial: ${testimonial.name}`);
    }

    // 12. Create Case Studies
    console.log('\n📊 Creating Case Studies...');
    const caseStudies = [
      {
        title: 'Scaling Organic Traffic from 3.5M to 10M Users',
        slug: 'carwale-traffic-growth',
        clientName: 'CarWale & BikeWale',
        industry: 'Automobile',
        isAnonymized: false,
        timeline: '3 years',
        metrics: [
          { label: 'Monthly Users', beforeValue: '3.5M', afterValue: '10M', changePercent: '+185%', isPositive: true },
          { label: 'Organic Sessions', beforeValue: '4.2M', afterValue: '12M', changePercent: '+186%', isPositive: true },
        ],
        publishedAt: '2025-12-01T00:00:00Z',
      },
      {
        title: '32% YoY Traffic Growth for HR SaaS',
        slug: 'hrone-seo-strategy',
        clientName: 'HRONE',
        industry: 'HR Software (SaaS)',
        isAnonymized: false,
        timeline: '1 year',
        metrics: [
          { label: 'Organic Traffic', beforeValue: '50K', afterValue: '66K', changePercent: '+32%', isPositive: true },
          { label: 'Content Pages', beforeValue: '50', afterValue: '650+', changePercent: '+1200%', isPositive: true },
        ],
        publishedAt: '2025-11-15T00:00:00Z',
      },
    ];

    for (const study of caseStudies) {
      await client.create({
        _type: 'caseStudy',
        title: study.title,
        slug: { _type: 'slug', current: study.slug },
        clientName: study.clientName,
        industry: study.industry,
        isAnonymized: study.isAnonymized,
        timeline: study.timeline,
        metrics: study.metrics.map((m, i) => ({ ...m, _key: `metric-${i}` })),
        publishedAt: study.publishedAt,
        seo: {
          metaTitle: `${study.title} | Case Study`,
          metaDescription: `Learn how we helped ${study.clientName} achieve ${study.metrics[0].changePercent} growth.`,
        },
      });
      console.log(`✅ Case Study: ${study.title}`);
    }

    // 13. Create Site Settings
    console.log('\n⚙️  Creating Site Settings...');
    await client.create({
      _id: 'siteSettings',
      _type: 'siteSettings',
      siteName: 'Anil Varma',
      siteDescription: 'SEO Expert with 15+ Years of Experience | Technical SEO, Content Strategy & Organic Growth',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/anil-varma/',
        twitter: 'https://twitter.com/anilvarma',
      },
      contactEmail: 'anilvarma2302@gmail.com',
      contactPhone: '+31627910520',
      address: 'Netherlands',
      defaultSeo: {
        metaTitle: 'Anil Varma - SEO Expert',
        metaDescription: 'SEO Expert with 15+ years of experience. Specializing in technical SEO, content strategy, and organic growth.',
      },
    });
    console.log('✅ Site Settings created');

    // 14. Create Navigation
    console.log('\n🧭 Creating Navigation...');
    await client.create({
      _id: 'navigation',
      _type: 'navigation',
      mainNav: [
        { _key: '1', label: 'About', href: '/about' },
        { _key: '2', label: 'Blog', href: '/blog' },
        { _key: '3', label: 'Templates', href: '/templates' },
        { _key: '4', label: 'Agents', href: '/agents' },
        { _key: '5', label: 'Case Studies', href: '/case-studies' },
        { _key: '6', label: 'Glossary', href: '/glossary' },
      ],
      footerNav: {
        columns: [
          {
            _key: 'resources',
            title: 'Resources',
            items: [
              { _key: '1', label: 'Blog', href: '/blog' },
              { _key: '2', label: 'Templates', href: '/templates' },
              { _key: '3', label: 'SEO Agents', href: '/agents' },
              { _key: '4', label: 'Glossary', href: '/glossary' },
            ],
          },
          {
            _key: 'company',
            title: 'Company',
            items: [
              { _key: '1', label: 'About', href: '/about' },
              { _key: '2', label: 'Case Studies', href: '/case-studies' },
              { _key: '3', label: 'Contact', href: '/contact' },
            ],
          },
          {
            _key: 'legal',
            title: 'Legal',
            items: [
              { _key: '1', label: 'Privacy Policy', href: '/privacy' },
              { _key: '2', label: 'Terms of Service', href: '/terms' },
            ],
          },
        ],
      },
    });
    console.log('✅ Navigation created');

    // 15. Create Homepage
    console.log('\n🏠 Creating Homepage...');
    await client.create({
      _id: 'homepage',
      _type: 'homepage',
      hero: {
        headline: 'SEO That Actually Drives Growth',
        subheadline: '15+ years of scaling organic traffic from zero to millions. I help businesses dominate search results with data-driven strategies.',
        ctaText: 'Book a Free Consultation',
        ctaLink: '/contact',
        secondaryCtaText: 'View Case Studies',
        secondaryCtaLink: '/case-studies',
      },
      stats: [
        { _key: '1', label: 'Years Experience', value: '15', suffix: '+', icon: 'calendar' },
        { _key: '2', label: 'Traffic Scaled', value: '10', suffix: 'M+', icon: 'trending-up' },
        { _key: '3', label: 'Projects Delivered', value: '200', suffix: '+', icon: 'briefcase' },
        { _key: '4', label: 'Traffic Growth', value: '185', suffix: '%', icon: 'chart' },
      ],
      services: [
        {
          _key: '1',
          title: 'Technical SEO',
          description: 'Site architecture, Core Web Vitals, crawlability, and indexation optimization.',
          icon: 'code',
          href: '/services/technical-seo',
        },
        {
          _key: '2',
          title: 'Content Strategy',
          description: 'Keyword research, content planning, and SEO-optimized content creation.',
          icon: 'file-text',
          href: '/services/content-strategy',
        },
        {
          _key: '3',
          title: 'Analytics & Reporting',
          description: 'Custom dashboards, performance tracking, and actionable insights.',
          icon: 'bar-chart',
          href: '/services/analytics',
        },
        {
          _key: '4',
          title: 'Link Building',
          description: 'White-hat link acquisition strategies to boost domain authority.',
          icon: 'link',
          href: '/services/link-building',
        },
      ],
      seo: {
        metaTitle: 'Anil Varma - SEO Expert | Technical SEO & Organic Growth',
        metaDescription: 'SEO Expert with 15+ years scaling traffic from 0 to 10M+. Get data-driven SEO strategies that deliver measurable results.',
      },
    });
    console.log('✅ Homepage created');

    // 16. Create About Page
    console.log('\n👤 Creating About Page...');
    await client.create({
      _id: 'about',
      _type: 'about',
      headline: 'Hi, I\'m Anil Varma',
      subheadline: 'SEO Expert with 15+ years of experience helping businesses grow through organic search.',
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
            'Established scalable SEO and content marketing SOPs',
          ],
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
            'Managed SEO for 50+ client accounts',
          ],
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
            'Built and managed app install campaigns',
          ],
        },
      ],
      skills: [
        { _key: '1', name: 'Technical SEO', category: 'seo', proficiency: 95 },
        { _key: '2', name: 'Content Strategy', category: 'seo', proficiency: 90 },
        { _key: '3', name: 'Keyword Research', category: 'seo', proficiency: 95 },
        { _key: '4', name: 'Google Analytics 4', category: 'analytics', proficiency: 90 },
        { _key: '5', name: 'Google Search Console', category: 'analytics', proficiency: 95 },
      ],
      certifications: [
        { _key: '1', name: 'Google Analytics Certification', issuer: 'Google', date: '2024-01-01' },
        { _key: '2', name: 'Google Ads Certification', issuer: 'Google', date: '2024-01-01' },
      ],
      cta: {
        title: 'Ready to Grow Your Organic Traffic?',
        description: 'Book a free 30-minute consultation to discuss your SEO challenges and opportunities.',
        buttonText: 'Book a Free Consultation',
        buttonLink: '/contact',
      },
      seo: {
        metaTitle: 'About Anil Varma | SEO Expert with 15+ Years Experience',
        metaDescription: 'Learn about Anil Varma - SEO expert who has scaled traffic from 0 to 10M+ users.',
      },
    });
    console.log('✅ About page created');

    console.log('\n✨ Sanity population complete!\n');
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

populateSanity();
