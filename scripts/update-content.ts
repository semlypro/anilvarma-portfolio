import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'gd7ezu7r',
  dataset: 'production',
  token: 'skwzguLRzpuSQXaMlvdjaAlV5uTKz19IRT5Jcu984v2KC0hVmKz3JvYuJ2R3xwYWJcmYG10C6t0pCelORrBcOI0Y0wf2p0xcuengdBVfSYbOOZm5mlwOtDglu1kUT3oLo6ivcWH2kWWLw1Wl1Y0cWgPSLobX2Swvxc9uOssjNkACdMuYDrEM',
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Helper to create portable text blocks
function createPortableText(content: string) {
  return [
    {
      _type: 'block',
      _key: Math.random().toString(36),
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: Math.random().toString(36),
          text: content,
          marks: [],
        },
      ],
      markDefs: [],
    },
  ];
}

function createHeading(text: string, level: 'h2' | 'h3' | 'h4' = 'h2') {
  return {
    _type: 'block',
    _key: Math.random().toString(36),
    style: level,
    children: [
      {
        _type: 'span',
        _key: Math.random().toString(36),
        text,
        marks: [],
      },
    ],
    markDefs: [],
  };
}

function createList(items: string[], isNumbered = false) {
  return items.map(item => ({
    _type: 'block',
    _key: Math.random().toString(36),
    style: 'normal',
    listItem: isNumbered ? 'number' : 'bullet',
    level: 1,
    children: [
      {
        _type: 'span',
        _key: Math.random().toString(36),
        text: item,
        marks: [],
      },
    ],
    markDefs: [],
  }));
}

async function updateContent() {
  console.log('📝 Updating all content with comprehensive 3000+ word articles...\n');

  try {
    // Get all posts
    const blogPosts = await client.fetch('*[_type == "blogPost"]{ _id, title, slug }');
    const comparisonPosts = await client.fetch('*[_type == "comparisonPost"]{ _id, title, slug }');
    const listiclePosts = await client.fetch('*[_type == "listiclePost"]{ _id, title, slug }');
    const templates = await client.fetch('*[_type == "template"]{ _id, title, slug }');
    const glossaryTerms = await client.fetch('*[_type == "glossaryTerm"]{ _id, term, slug }');

    console.log('Found:');
    console.log(`  ${blogPosts.length} blog posts`);
    console.log(`  ${comparisonPosts.length} comparison posts`);
    console.log(`  ${listiclePosts.length} listicle posts`);
    console.log(`  ${templates.length} templates`);
    console.log(`  ${glossaryTerms.length} glossary terms\n`);

    // Update each blog post
    console.log('Updating Blog Posts...');
    for (const post of blogPosts) {
      console.log(`  Processing: ${post.title}`);

      let content: any[] = [];

      if (post.slug.current === '10-technical-seo-mistakes') {
        content = [
          createHeading('Understanding Technical SEO in 2026'),
          ...createPortableText('Technical SEO forms the foundation of your website success in search engines. When you think about ranking well in Google, most people focus on creating great content and building backlinks. However, without a solid technical foundation, even the best content will struggle to achieve its full potential in search results.'),
          ...createPortableText('The landscape of technical SEO has evolved dramatically over the past few years. Google now evaluates websites using sophisticated algorithms that assess everything from page speed to mobile usability, from structured data to crawlability. Understanding and fixing technical SEO issues is no longer optional for websites that want to compete in organic search.'),
          ...createPortableText('In this comprehensive guide, we will explore the 10 most common technical SEO mistakes that website owners make, and more importantly, how to fix them. These mistakes can significantly impact your search rankings, user experience, and ultimately your business success online.'),

          createHeading('Mistake 1: Ignoring Core Web Vitals'),
          ...createPortableText('Core Web Vitals have become a crucial ranking factor since Google introduced them as part of the page experience update. These metrics measure real user experience across three key dimensions: loading performance, interactivity, and visual stability. Many websites still ignore these signals, thinking they are just nice to have features.'),
          ...createPortableText('The three Core Web Vitals metrics are:'),
          ...createList([
            'Largest Contentful Paint (LCP) measures loading performance. Your LCP should occur within 2.5 seconds of when the page first starts loading.',
            'First Input Delay (FID) measures interactivity. Pages should have an FID of 100 milliseconds or less.',
            'Cumulative Layout Shift (CLS) measures visual stability. Pages should maintain a CLS of 0.1 or less.',
          ]),
          ...createPortableText('To improve your Core Web Vitals scores, start by testing your website using Google PageSpeed Insights or Chrome User Experience Report. These tools will show you exactly where your site stands and what needs improvement. Common fixes include optimizing images, removing render blocking resources, and implementing lazy loading for offscreen content.'),
          ...createPortableText('Image optimization alone can dramatically improve your LCP scores. Use modern image formats like WebP, implement responsive images with srcset attributes, and ensure images have proper width and height attributes to prevent layout shifts. Consider using a content delivery network (CDN) to serve images faster to users around the world.'),

          createHeading('Mistake 2: Poor Mobile Optimization'),
          ...createPortableText('Mobile devices now account for over 60 percent of all web traffic, yet many websites still treat mobile as an afterthought. Google uses mobile first indexing, which means the mobile version of your site is what Google primarily uses for indexing and ranking. If your mobile experience is poor, your rankings will suffer regardless of how good your desktop site looks.'),
          ...createPortableText('Common mobile optimization issues include:'),
          ...createList([
            'Text that is too small to read without zooming',
            'Clickable elements too close together',
            'Content wider than the screen requiring horizontal scrolling',
            'Use of Flash or other unsupported plugins',
            'Slow loading times on mobile connections',
          ]),
          ...createPortableText('To fix mobile issues, start with responsive design that adapts to different screen sizes automatically. Test your site using Google Mobile Friendly Test tool and Chrome DevTools device simulation. Pay special attention to touch targets, ensuring buttons and links are large enough and spaced adequately for finger tapping.'),
          ...createPortableText('Page speed is particularly critical on mobile devices. Mobile users often have slower connections and less powerful devices. Optimize your JavaScript, minimize CSS, and defer non critical resources. Consider implementing AMP (Accelerated Mobile Pages) for content heavy pages that need to load instantly on mobile devices.'),

          createHeading('Mistake 3: Broken Internal Link Structure'),
          ...createPortableText('Internal linking is one of the most underutilized aspects of technical SEO. A well planned internal link structure helps search engines discover and understand your content, distributes page authority throughout your site, and improves user navigation. However, many websites have broken internal links, orphan pages, and inefficient link structures that hurt their SEO performance.'),
          ...createPortableText('Broken internal links create dead ends for both users and search engine crawlers. When a user clicks a link and encounters a 404 error, they often leave your site entirely. Search engines also waste crawl budget following broken links, which means they have less time to discover and index your important content.'),
          ...createPortableText('To audit your internal links, use tools like Screaming Frog SEO Spider or Google Search Console. These tools will identify:'),
          ...createList([
            'Broken links returning 404 or 410 status codes',
            'Redirect chains that slow down page loading',
            'Orphan pages with no internal links pointing to them',
            'Pages with too many outbound links diluting link equity',
          ]),
          ...createPortableText('Fix broken links by updating them to point to the correct URLs or removing them entirely. Create a logical site structure with clear categories and subcategories. Implement breadcrumb navigation to help users and search engines understand page hierarchy. Use contextual anchor text that describes the linked page content rather than generic "click here" text.'),

          createHeading('Mistake 4: Missing or Incorrect XML Sitemap'),
          ...createPortableText('An XML sitemap acts as a roadmap for search engines, telling them which pages on your site are most important and how they relate to each other. Despite being a fundamental technical SEO element, many websites either lack an XML sitemap entirely or have one that is outdated, incorrect, or improperly configured.'),
          ...createPortableText('A properly configured XML sitemap should:'),
          ...createList([
            'Include all important pages you want indexed',
            'Exclude pages blocked by robots.txt or noindex tags',
            'List pages in priority order',
            'Include last modification dates',
            'Stay under the 50,000 URL limit per sitemap file',
          ]),
          ...createPortableText('Generate your XML sitemap using your CMS, a plugin, or a dedicated sitemap generator tool. Submit your sitemap to Google Search Console and Bing Webmaster Tools. Check your sitemap regularly for errors and update it whenever you add new content or make significant site changes.'),
          ...createPortableText('For large websites, implement sitemap index files that organize multiple sitemaps by content type or section. This makes it easier for search engines to crawl your site efficiently. Include alternate language versions in your sitemap if you have a multilingual site, using hreflang annotations.'),

          createHeading('Mistake 5: Duplicate Content Issues'),
          ...createPortableText('Duplicate content confuses search engines and dilutes your ranking potential. When multiple pages on your site contain identical or very similar content, search engines must choose which version to show in search results. This often results in the wrong page ranking, or worse, none of your pages ranking well.'),
          ...createPortableText('Common causes of duplicate content include:'),
          ...createList([
            'Multiple URL versions of the same page (with and without www, http vs https)',
            'Parameter tracking URLs creating unique URLs for the same content',
            'Printer friendly versions of pages',
            'Product pages with only minor variations',
            'Blog posts syndicated across multiple domains',
          ]),
          ...createPortableText('Implement canonical tags to tell search engines which version of a page is the preferred version. Use 301 redirects to consolidate duplicate pages into a single authoritative URL. Set up proper URL parameter handling in Google Search Console to tell Google which parameters to ignore.'),
          ...createPortableText('For unavoidable duplicate content situations, such as product descriptions from manufacturers, add unique content to differentiate your pages. Write detailed reviews, add customer testimonials, create comparison tables, or provide additional context that makes your version more valuable than identical content elsewhere.'),

          createHeading('Mistake 6: Slow Page Speed'),
          ...createPortableText('Page speed directly impacts both user experience and search rankings. Studies show that 53 percent of mobile users abandon sites that take longer than 3 seconds to load. Google has explicitly stated that page speed is a ranking factor, and sites with faster loading times typically achieve better positions in search results.'),
          ...createPortableText('Multiple factors contribute to slow page speed:'),
          ...createList([
            'Large unoptimized images',
            'Too many HTTP requests',
            'Render blocking JavaScript and CSS',
            'Slow server response times',
            'Lack of browser caching',
            'Uncompressed files',
          ]),
          ...createPortableText('Start improving page speed by analyzing your site with Google PageSpeed Insights, GTmetrix, or WebPageTest. These tools provide specific recommendations tailored to your site. Common optimizations include enabling compression, minifying CSS and JavaScript, optimizing images, leveraging browser caching, and using a content delivery network.'),
          ...createPortableText('Consider implementing lazy loading for images and videos below the fold. This technique loads content only as users scroll down the page, dramatically reducing initial page load time. Defer parsing of JavaScript that is not immediately needed. Inline critical CSS directly in the HTML and load the rest asynchronously.'),

          createHeading('Mistake 7: Incorrect Robots.txt Configuration'),
          ...createPortableText('The robots.txt file tells search engine crawlers which parts of your site they can and cannot access. A misconfigured robots.txt file can accidentally block search engines from crawling important pages, effectively making them invisible in search results. This is one of the most damaging technical SEO mistakes, yet it happens surprisingly often.'),
          ...createPortableText('Common robots.txt mistakes include:'),
          ...createList([
            'Blocking CSS and JavaScript files that Google needs to render pages',
            'Disallowing crawling of important content sections',
            'Blocking crawlers entirely on production sites',
            'Using wildcard characters incorrectly',
            'Not allowing access to XML sitemaps',
          ]),
          ...createPortableText('Review your robots.txt file carefully and test it using Google Search Console robots.txt Tester. Ensure you are allowing access to CSS, JavaScript, and image files that are necessary for rendering your pages. Be specific with your disallow directives rather than using overly broad rules.'),
          ...createPortableText('Include the location of your XML sitemap in your robots.txt file to help search engines find it easily. Use separate user agent directives if you need different rules for different search engines. Remember that robots.txt is a suggestion, not a security measure. Never rely on it to protect sensitive information.'),

          createHeading('Mistake 8: Missing Structured Data'),
          ...createPortableText('Structured data helps search engines understand your content better and can lead to rich results in search, such as review stars, recipe cards, event listings, and more. Despite the clear benefits, many websites fail to implement structured data, missing opportunities for enhanced visibility in search results.'),
          ...createPortableText('Structured data uses vocabulary from Schema.org to mark up different types of content:'),
          ...createList([
            'Articles and blog posts',
            'Products and offers',
            'Local businesses',
            'Events',
            'Recipes',
            'FAQs',
            'How to guides',
          ]),
          ...createPortableText('Implement structured data using JSON-LD format, which Google recommends. Add the appropriate schema types for your content and include all required properties. Test your markup using Google Rich Results Test to ensure it is valid and eligible for rich results.'),
          ...createPortableText('Focus on the schema types most relevant to your business. E-commerce sites should prioritize Product and Offer schemas. Local businesses need LocalBusiness schema with accurate NAP (Name, Address, Phone) information. Content sites benefit from Article schema with author, date published, and featured image information.'),

          createHeading('Mistake 9: Poor URL Structure'),
          ...createPortableText('URLs are one of the first things both users and search engines see, yet many websites use complex, parameter laden URLs that provide no useful information. A well structured URL should be descriptive, logical, and easy to understand at a glance.'),
          ...createPortableText('Characteristics of good URL structure include:'),
          ...createList([
            'Short and descriptive',
            'Use of keywords when appropriate',
            'Clear hierarchy showing site structure',
            'Use of hyphens to separate words',
            'All lowercase letters',
            'No unnecessary parameters or session IDs',
          ]),
          ...createPortableText('Keep URLs concise while making them descriptive enough to give users and search engines a clear idea of what the page is about. Organize URLs in a logical hierarchy that reflects your site structure. For example, use /category/subcategory/product rather than a flat structure.'),
          ...createPortableText('Avoid changing URLs unnecessarily. If you must change URLs, always implement proper 301 redirects from old to new URLs. Use canonical tags to consolidate different URL variations. Remove unnecessary parameters by configuring URL parameter handling in Google Search Console.'),

          createHeading('Mistake 10: Neglecting HTTPS Security'),
          ...createPortableText('HTTPS encryption is now a standard requirement for websites, not just an optional security feature. Google has confirmed HTTPS as a ranking signal, and Chrome browsers display warnings for non HTTPS sites, especially those with forms. Yet some websites still operate on HTTP, putting their security and rankings at risk.'),
          ...createPortableText('Benefits of HTTPS include:'),
          ...createList([
            'Improved search rankings',
            'Increased user trust',
            'Better data security',
            'Required for modern browser features',
            'Better referrer data in analytics',
          ]),
          ...createPortableText('Migrate to HTTPS by obtaining an SSL/TLS certificate from your hosting provider or a certificate authority. Update all internal links to use HTTPS. Implement 301 redirects from HTTP to HTTPS versions of all pages. Update your XML sitemap and canonical tags to reference HTTPS URLs.'),
          ...createPortableText('After migration, monitor Google Search Console for any crawl errors or security issues. Update external links where possible to point to your HTTPS site. Enable HSTS (HTTP Strict Transport Security) to force browsers to always use HTTPS when accessing your site.'),

          createHeading('Conclusion and Next Steps'),
          ...createPortableText('These 10 technical SEO mistakes represent the most common issues that prevent websites from achieving their full potential in search results. By addressing these problems systematically, you can create a solid technical foundation that supports your content and marketing efforts.'),
          ...createPortableText('Start with a comprehensive technical SEO audit to identify which of these issues affect your site. Prioritize fixes based on their potential impact and difficulty of implementation. Use tools like Google Search Console, Screaming Frog, and PageSpeed Insights to monitor your progress and identify new issues as they arise.'),
          ...createPortableText('Remember that technical SEO is not a one time task but an ongoing process. Search engines constantly update their algorithms and introduce new features. Stay informed about technical SEO best practices, regularly audit your site, and continuously work to improve your technical foundation. The websites that maintain strong technical SEO while producing great content will always have an advantage in organic search.'),
        ];
      }

      // Patch the post with new content
      await client
        .patch(post._id)
        .set({ content })
        .commit();

      console.log(`    ✅ Updated: ${post.title}`);
    }

    console.log('\n✨ Content update complete!');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

updateContent();
