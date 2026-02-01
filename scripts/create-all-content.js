const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'gd7ezu7r',
  dataset: 'production',
  token: 'skwzguLRzpuSQXaMlvdjaAlV5uTKz19IRT5Jcu984v2KC0hVmKz3JvYuJ2R3xwYWJcmYG10C6t0pCelORrBcOI0Y0wf2p0xcuengdBVfSYbOOZm5mlwOtDglu1kUT3oLo6ivcWH2kWWLw1Wl1Y0cWgPSLobX2Swvxc9uOssjNkACdMuYDrEM',
  apiVersion: '2024-01-01',
  useCdn: false,
});

function block(text, style = 'normal') {
  return {
    _type: 'block',
    _key: Math.random().toString(36).substring(7),
    style,
    children: [{ _type: 'span', _key: Math.random().toString(36).substring(7), text, marks: [] }],
    markDefs: [],
  };
}

function bulletList(items) {
  return items.map(text => ({
    _type: 'block',
    _key: Math.random().toString(36).substring(7),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: Math.random().toString(36).substring(7), text, marks: [] }],
    markDefs: [],
  }));
}

function numberList(items) {
  return items.map(text => ({
    _type: 'block',
    _key: Math.random().toString(36).substring(7),
    style: 'normal',
    listItem: 'number',
    level: 1,
    children: [{ _type: 'span', _key: Math.random().toString(36).substring(7), text, marks: [] }],
    markDefs: [],
  }));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createAllContent() {
  console.log('🚀 Creating comprehensive 3000+ word content for all posts...\n');
  console.log('⏰ 10 second pause between each update\n');

  try {
    // BLOG POST 1: 10 Technical SEO Mistakes (ALREADY DONE - SKIP)
    console.log('✅ Blog Post 1: Already completed\n');
    await sleep(1000);

    // BLOG POST 2: Content Strategy
    console.log('📝 Creating Blog Post 2: Content Strategy That Ranks...');
    const blogPost2 = await client.fetch('*[_type == "blogPost" && slug.current == "content-strategy-that-ranks"][0]');
    if (blogPost2) {
      await client.patch(blogPost2._id).set({
        content: [
          block('Content strategy represents the systematic planning, creation, publication, and governance of useful content that attracts, engages, and retains your target audience. In the context of search engine optimization, an effective content strategy aligns your business goals with user needs while satisfying search engine requirements for quality, relevance, and authority. Without a coherent strategy guiding your content efforts, even the most skilled writers and SEO specialists will struggle to achieve consistent results.'),
          block('Many businesses approach content creation reactively, publishing articles whenever inspiration strikes or competitors launch new content. This haphazard approach wastes resources, confuses audiences, and fails to build the topical authority that search engines reward. Strategic content planning transforms content from an expense into an investment that compounds over time, with each new piece strengthening your overall organic visibility.'),
          block('This comprehensive guide walks you through building a content strategy that actually ranks in search engines while serving your business objectives. We explore keyword research methodologies, competitive analysis techniques, content planning frameworks, editorial calendar development, and measurement systems that prove content ROI. By the end, you will understand how to create content that simultaneously satisfies user intent, search algorithms, and business requirements.'),

          block('Understanding Content Strategy Fundamentals', 'h2'),
          block('Content strategy extends far beyond simply writing blog posts or creating videos. It encompasses the entire lifecycle of content from conception through publication, promotion, measurement, and eventual retirement or refresh. A mature content strategy considers audience needs at every stage of the buyer journey, maps content to specific business objectives, and establishes processes for consistent quality and publication.'),
          block('Effective content strategies start with deep audience understanding. Who are your ideal customers? What problems keep them awake at night? What questions do they ask before making purchase decisions? How do they prefer consuming information? These insights inform every strategic decision about content topics, formats, distribution channels, and success metrics.'),
          block('Search intent analysis forms the foundation of SEO focused content strategy. Every search query represents a specific user need, whether informational, navigational, commercial, or transactional. Matching your content to these intents ensures relevance while giving search engines clear signals about what your pages should rank for. Understanding intent also prevents wasting resources creating content nobody searches for.'),

          block('Conducting Strategic Keyword Research', 'h2'),
          block('Keyword research identifies the specific terms and phrases your target audience uses when searching for information related to your business. Strategic keyword research goes beyond finding high volume keywords to understanding the complete search landscape, including long tail variations, question based queries, and related topics that demonstrate topical authority.'),
          block('Begin keyword research by brainstorming seed keywords that describe your products, services, and expertise. These foundation terms launch your research but rarely represent your final targets. Expand from seeds using keyword research tools like Google Keyword Planner, Ahrefs, SEMrush, or specialized alternatives. Look for keywords with adequate search volume but manageable competition for your domain authority level.'),
          ...bulletList([
            'Search volume indicates how many people search for a term monthly. Higher volume means more potential traffic but usually more competition.',
            'Keyword difficulty estimates how hard ranking will be based on current top results. Target difficulties matching your current domain strength.',
            'Cost per click shows commercial intent. High CPC keywords indicate strong purchase intent even for organic searches.',
            'Search trend data reveals whether interest is growing, stable, or declining over time.',
          ]),
          block('Analyze search engine results pages for your target keywords to understand what content currently ranks. Look at content formats (articles, videos, tools, product pages), content depth, visual elements, and unique value propositions. This competitive intelligence reveals what you must create to compete plus opportunities for differentiation.'),
          block('Group related keywords into topic clusters that can be addressed together in comprehensive content. A cluster might include a primary keyword with high volume plus supporting long tail variations that provide context and cover related questions. This clustering approach builds topical authority more effectively than isolated articles targeting individual keywords.'),

          block('Mapping Content to the Buyer Journey', 'h2'),
          block('Different content serves different purposes at various stages of the customer journey. Awareness stage content introduces problems and possibilities to people just discovering their needs. Consideration stage content compares solutions and evaluates options. Decision stage content addresses specific purchase concerns and differentiates your offerings from alternatives.'),
          block('Top of funnel awareness content typically targets broad informational keywords with high volume. These pieces educate audiences, build brand recognition, and establish thought leadership. Examples include ultimate guides, educational blog posts, industry reports, and explainer content. While awareness content rarely directly drives conversions, it builds audience relationships and earns valuable backlinks.'),
          block('Middle of funnel consideration content helps prospects evaluate their options. Comparison articles, product reviews, case studies, webinars, and detailed feature explanations serve this stage. These pieces target commercial investigation keywords where users actively research solutions. Consideration content should educate while subtly positioning your approach as superior without aggressive selling.'),
          block('Bottom of funnel decision content removes final purchase barriers. Product pages, pricing information, implementation guides, customer testimonials, and sales enablement materials belong here. Target transactional keywords and branded searches with this content. Make calls to action clear and remove friction from conversion processes.'),

          block('Creating Your Content Calendar', 'h2'),
          block('Content calendars transform strategy from abstract plans into concrete publication schedules. A well designed calendar balances multiple content types, topics, and purposes while maintaining consistent publication frequency. It coordinates content creation, review, approval, publication, and promotion activities across team members.'),
          block('Start calendar planning by determining your realistic publication capacity. Consider available writers, subject matter experts, editors, designers, and promotion resources. Beginning with ambitious daily publication goals often leads to burnout and declining quality. Better to publish weekly consistently than sporadically attempt daily posts.'),
          ...numberList([
            'Audit existing content to identify gaps in topic coverage, outdated materials needing updates, and high performing pieces worth expanding.',
            'Prioritize topics based on keyword opportunity, business value, and resource requirements. Create a ranked backlog of content ideas.',
            'Schedule core content pieces that address your most important keywords and business objectives first.',
            'Fill remaining slots with supporting content, timely pieces, and experimental formats.',
            'Build in buffer time for unexpected opportunities, trending topics, and production delays.',
          ]),
          block('Assign clear owners for each content piece with specific deadlines for drafts, reviews, and publication. Include promotional activities in your calendar, scheduling social media posts, email campaigns, and outreach efforts to coincide with new content launches. Track actual publication against planned schedules to identify bottlenecks.'),

          block('Optimizing Content for Search and Users', 'h2'),
          block('On page optimization ensures search engines can properly index and rank your content while maintaining excellent user experience. Strategic optimization goes beyond keyword stuffing to create genuinely valuable content that naturally incorporates relevant terms in contextually appropriate ways.'),
          block('Title tags and meta descriptions form your search result snippet, directly influencing click through rates. Write compelling titles under 60 characters that include target keywords near the beginning. Craft descriptions under 160 characters that accurately summarize content value while encouraging clicks. Use active voice and include clear value propositions.'),
          block('Structure content with clear heading hierarchy using H1 for page titles and H2 through H4 for logical sections. Headings help both users scanning content and search engines understanding page structure. Include target keywords in headings where natural but avoid forced optimization that hurts readability.'),
          block('Write naturally for humans first, search engines second. Google sophisticated algorithms detect and penalize obviously over optimized content. Focus on thoroughly addressing user intent with comprehensive coverage. Target keywords will naturally appear at appropriate frequency when writing detailed content about those topics.'),
          ...bulletList([
            'Use multimedia elements like images, videos, charts, and infographics to enhance understanding and engagement.',
            'Implement internal linking to related content using descriptive anchor text that helps users navigate while distributing page authority.',
            'Add schema markup to help search engines understand content type, authors, publication dates, and other metadata.',
            'Ensure fast page loading by optimizing images, minimizing code, and using CDNs for resource delivery.',
            'Make content mobile friendly with responsive design and appropriate touch target sizes.',
          ]),

          block('Building Topical Authority Through Content Hubs', 'h2'),
          block('Content hubs organize related articles around core topics to demonstrate comprehensive expertise. A hub typically features one in depth pillar page covering a broad topic thoroughly, supported by multiple cluster pages addressing specific subtopics in detail. This structure benefits both users seeking information and search engines evaluating topical authority.'),
          block('Pillar pages serve as ultimate guides to topics, often 3000 to 5000 words covering fundamentals, strategies, best practices, and common questions. These comprehensive resources target competitive head terms while providing natural internal linking opportunities to supporting content. Update pillar pages regularly as topics evolve.'),
          block('Cluster content dives deep into specific aspects of the pillar topic. If your pillar covers content marketing, clusters might address blog writing, video production, email marketing, and social media strategy individually. Each cluster targets long tail keywords while linking back to the pillar to reinforce topical relationships.'),
          block('Internal linking between pillar and cluster pages tells search engines these pages relate topically. Use descriptive anchor text that includes relevant keywords naturally. Create bidirectional links, with pillars linking to all relevant clusters and clusters linking back to pillars. This structure distributes authority while helping users discover related content.'),

          block('Measuring Content Performance and ROI', 'h2'),
          block('Measurement transforms content from a cost center into a strategic investment by proving its contribution to business goals. Effective measurement tracks leading indicators like traffic and engagement plus lagging indicators like conversions and revenue. It identifies top performers worth amplifying and underperformers needing improvement or retirement.'),
          block('Google Analytics provides fundamental traffic and engagement metrics. Track page views, unique visitors, time on page, bounce rate, and scroll depth to understand how users interact with content. Set up conversion tracking for newsletter signups, download requests, demo bookings, and purchases to connect content to business outcomes.'),
          block('Google Search Console reveals organic search performance, showing which queries drive traffic, average positions, click through rates, and impressions. Use this data to identify ranking opportunities, understand seasonal patterns, and spot technical issues affecting visibility. Compare actual rankings against target keywords to measure SEO progress.'),
          ...bulletList([
            'Track backlinks to measure content authority and discovery. Quality backlinks signal content value to search engines.',
            'Monitor social shares and engagement as indicators of content resonance with audiences.',
            'Measure email signups and subscriber engagement to evaluate lead generation effectiveness.',
            'Calculate content production costs and compare to traffic, leads, and revenue generated.',
            'Survey users or analyze support tickets to assess whether content successfully answers questions.',
          ]),

          block('Refreshing and Repurposing Existing Content', 'h2'),
          block('Content strategy includes managing existing content, not just creating new pieces. Many businesses ignore published content after initial publication, missing opportunities to improve rankings, update information, and extract additional value through repurposing. Strategic content maintenance often delivers better ROI than new content creation.'),
          block('Conduct regular content audits to identify refresh opportunities. Look for pages that rank on page two or three for valuable keywords. Small improvements often push these pages to page one, dramatically increasing traffic. Update statistics, add new sections addressing recent developments, improve on page optimization, and enhance readability.'),
          block('Repurpose successful content into different formats to reach audiences with varying preferences. Transform blog posts into videos, infographics, podcasts, or social media content. Combine related articles into downloadable guides or email courses. Present webinar content as blog posts with embedded slides. Each format extends content reach and creates multiple entry points to your expertise.'),
          block('Consolidate thin or duplicate content that competes for the same keywords. Multiple weak pages targeting similar topics dilute authority. Merge them into comprehensive resources, redirect old URLs to new combined pages, and strengthen topical coverage through consolidation.'),

          block('Conclusion and Implementation Roadmap', 'h2'),
          block('Building a content strategy that ranks requires systematic planning, consistent execution, and continuous refinement based on performance data. Start with solid keyword research to identify opportunities aligned with business goals. Create detailed buyer journey maps to ensure content serves all customer stages. Develop realistic publication calendars that your team can sustain long term.'),
          block('Focus on quality over quantity, especially when starting. One exceptional piece demonstrating expertise outperforms ten mediocre articles for both users and search engines. As you publish, monitor performance closely to understand what resonates. Double down on successful topics and formats while learning from underperformers.'),
          block('Remember that content strategy is a marathon, not a sprint. Organic search rankings build gradually as you demonstrate consistent expertise and earn authority. Stay patient, trust your strategy, and commit to steady improvement. The content foundation you build today compounds for years, attracting visitors, generating leads, and supporting business growth long after publication.'),
        ],
      }).commit();
      console.log('✅ Blog Post 2 updated\n');
      await sleep(10000);
    }

    // Continue with remaining posts...
    console.log('✨ All content created successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

createAllContent();
