const https = require('https');
const fs = require('fs');

const PROJECT_ID = 'gd7ezu7r';
const DATASET = 'production';
const TOKEN = process.env.SANITY_API_TOKEN || 'skwzguLRzpuSQXaMlvdjaAlV5uTKz19IRT5Jcu984v2KC0hVmKz3JvYuJ2R3xwYWJcmYG10C6t0pCelORrBcOI0Y0wf2p0xcuengdBVfSYbOOZm5mlwOtDglu1kUT3oLo6ivcWH2kWWLw1Wl1Y0cWgPSLobX2Swvxc9uOssjNkACdMuYDrEM';

// Helper functions for portable text
const block = (text, style = 'normal') => ({
  _type: 'block',
  _key: `block${Math.random().toString(36).substr(2, 9)}`,
  style,
  children: [{ _type: 'span', _key: `span${Math.random().toString(36).substr(2, 9)}`, text, marks: [] }],
  markDefs: [],
});

const bulletList = (items) => items.map(item => ({
  _type: 'block',
  _key: `block${Math.random().toString(36).substr(2, 9)}`,
  style: 'normal',
  listItem: 'bullet',
  level: 1,
  children: [{ _type: 'span', _key: `span${Math.random().toString(36).substr(2, 9)}`, text: item, marks: [] }],
  markDefs: [],
}));

const numberList = (items) => items.map(item => ({
  _type: 'block',
  _key: `block${Math.random().toString(36).substr(2, 9)}`,
  style: 'normal',
  listItem: 'number',
  level: 1,
  children: [{ _type: 'span', _key: `span${Math.random().toString(36).substr(2, 9)}`, text: item, marks: [] }],
  markDefs: [],
}));

const quote = (text) => ({
  _type: 'block',
  _key: `block${Math.random().toString(36).substr(2, 9)}`,
  style: 'blockquote',
  children: [{ _type: 'span', _key: `span${Math.random().toString(36).substr(2, 9)}`, text, marks: [] }],
  markDefs: [],
});

function sanityRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: `${PROJECT_ID}.api.sanity.io`,
      path: `/v2021-06-07/data/mutate/${DATASET}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function updateDocument(id, content) {
  const mutations = {
    mutations: [
      {
        patch: {
          id: id,
          set: { content: content }
        }
      }
    ]
  };

  return sanityRequest('POST', '', mutations);
}

// COMPREHENSIVE BLOG POST CONTENT

const blogContent = {
  'Google Analytics 4: Essential Reports for SEO': [
    block('Introduction to Google Analytics 4 for SEO Professionals', 'h2'),
    block('Google Analytics 4 represents a fundamental shift in how we track and measure website performance. For SEO professionals, understanding GA4 is no longer optional. It is essential for making data driven decisions that improve organic search performance.'),
    block('This comprehensive guide walks you through the most important GA4 reports for SEO. You will learn which metrics matter most, how to interpret the data, and how to use these insights to boost your search rankings.'),

    block('Why Google Analytics 4 Matters for SEO', 'h2'),
    block('Google Analytics 4 uses an event based data model that provides deeper insights into user behavior. Unlike Universal Analytics, GA4 tracks every interaction as an event. This gives you granular data about how visitors engage with your content.'),
    block('For SEO professionals, this means better understanding of:'),
    ...bulletList([
      'Which organic keywords drive the most engaged traffic',
      'How users navigate through your site after landing from search',
      'Which pages keep visitors engaged longest',
      'Where users drop off in your conversion funnel',
      'How mobile versus desktop users interact differently'
    ]),

    block('Setting Up GA4 for SEO Success', 'h2'),
    block('Before diving into reports, you need proper setup. Many SEO professionals make critical mistakes during GA4 implementation that corrupt their data. Follow these steps to ensure accurate tracking.'),

    block('Essential Configuration Steps', 'h3'),
    ...numberList([
      'Create a new GA4 property in your Google Analytics account',
      'Install the GA4 tracking code on every page of your website',
      'Configure search console integration to see query data',
      'Set up custom events for important user interactions',
      'Enable enhanced measurement for automatic event tracking',
      'Configure conversion events for business goals',
      'Set up audience triggers for remarketing',
      'Create custom dimensions for advanced segmentation'
    ]),

    block('After configuration, verify your data collection using the Realtime report. Visit your site and check that events appear within 30 seconds. This confirms proper installation.'),

    block('The 10 Essential GA4 Reports for SEO', 'h2'),
    block('GA4 offers dozens of reports, but SEO professionals should focus on these ten. Master these reports and you will have everything needed to optimize your organic search strategy.'),

    block('1. Acquisition Overview Report', 'h3'),
    block('The Acquisition Overview shows where your traffic comes from. For SEO, focus on the Organic Search segment. This report reveals total organic sessions, engagement rate, conversion rate, and revenue generated.'),
    quote('The Acquisition Overview is your starting point for understanding organic search performance. Check this report weekly to spot trends early.'),

    block('2. Landing Pages Report', 'h3'),
    block('This report shows which pages receive the most organic traffic. Sort by sessions to identify your top performing content. Look for pages with high traffic but low engagement. These pages need optimization.'),

    block('3. User Acquisition Report', 'h3'),
    block('This report goes deeper by showing first user source. For SEO, this reveals which organic search efforts bring new visitors versus returning ones.'),

    block('4. Engagement Overview Report', 'h3'),
    block('Engagement metrics reveal content quality better than traffic numbers alone. Google now uses engagement signals as ranking factors.'),
    quote('Google confirmed that engagement metrics influence rankings. Improving these numbers can directly boost your search visibility.'),

    block('Advanced GA4 Techniques for SEO', 'h2'),
    block('Once you master basic reports, these advanced techniques provide deeper insights.'),

    block('Integrating Search Console Data', 'h3'),
    block('Linking Google Search Console to GA4 combines query data with behavior data. This integration lets you understand which keywords drive engaged traffic and which have conversion potential.'),
    quote('The Search Console integration is the most powerful SEO feature in GA4. Use it to connect keyword data with user behavior data.'),

    block('Common GA4 Mistakes That Corrupt SEO Data', 'h2'),
    block('Many SEO professionals make errors that compromise data accuracy. Avoid not filtering internal traffic, ignoring data thresholds, not setting up conversions, and overlooking attribution settings.'),

    block('Using GA4 Data to Improve SEO Performance', 'h2'),
    block('Data collection means nothing without action. Use GA4 insights to optimize high traffic low engagement pages, identify content gaps, improve internal linking, and measure SEO campaign impact.'),
    quote('Pages that rank well but engage poorly are your biggest opportunity. Small improvements here drive outsized results.'),

    block('Conclusion: Making GA4 Work for Your SEO Strategy', 'h2'),
    block('Google Analytics 4 provides powerful tools for SEO professionals who invest time learning the platform. Start with essential reports, progress to advanced techniques, and most importantly, use the data to take action. Review data weekly and conduct monthly deep dives. With consistent analysis and optimization, GA4 becomes your competitive advantage in organic search.'),
    quote('The SEO professionals who master GA4 will dominate search results in 2026 and beyond. Start building your skills today.')
  ],

  'How to Build a Content Strategy That Ranks': [
    block('Why Most Content Strategies Fail to Rank', 'h2'),
    block('Creating content is easy. Creating content that ranks in Google is extremely difficult. Most content strategies fail because they focus on production volume rather than strategic value. This guide teaches you how to build a content strategy that actually ranks through understanding search intent, comprehensive research, and strategic execution.'),

    block('The Foundation: Understanding Search Intent', 'h2'),
    block('Search intent is the reason behind a query. Google has become sophisticated at understanding intent. Your content must match intent precisely or it will never rank.'),
    ...numberList([
      'Informational: User wants to learn something',
      'Navigational: User wants to find a specific website',
      'Commercial: User is researching before buying',
      'Transactional: User is ready to purchase or take action'
    ]),
    quote('Matching search intent is more important than keyword density, backlinks, or any other ranking factor. Get intent wrong and nothing else matters.'),

    block('Step 1: Comprehensive Keyword Research', 'h2'),
    block('Effective content strategy starts with thorough keyword research. You need to find keywords worth targeting before creating content. Use keyword tools, analyze competition, and organize keywords into topic clusters.'),

    block('Step 2: Create Topic Clusters', 'h2'),
    block('Topic clusters organize content around pillar pages and supporting cluster content. This structure helps search engines understand your expertise and builds topical authority.'),
    quote('Topic clusters work because they mirror how Google understands content relationships through semantic analysis and entity recognition.'),

    block('Step 3: Create Content That Deserves to Rank', 'h2'),
    block('Quality content satisfies user intent better than competing pages. Provide unique value that makes your content the obvious best result through clear structure, comprehensive coverage, original insights, and practical examples.'),

    block('Step 4: Optimize On Page Elements', 'h2'),
    block('On page optimization helps search engines understand your content. Focus on title tags, meta descriptions, URL slugs, headings, and internal links.'),

    block('Step 5: Build Strategic Internal Links', 'h2'),
    block('Internal linking distributes authority, helps crawling, and guides users. Link from high authority pages, use descriptive anchors, and update old content with new links.'),

    block('Step 6: Promote Your Content', 'h2'),
    block('Publishing is just the beginning. Promotion determines whether content gets signals needed to rank through social sharing, email, outreach, and community engagement.'),
    quote('Content without promotion is like a tree falling in an empty forest. It might be great, but nobody knows it exists.'),

    block('Step 7: Measure and Iterate', 'h2'),
    block('Content strategy requires constant measurement and iteration. Track organic traffic, keyword rankings, engagement rate, conversion rate, backlinks, and time on page.'),

    block('Conclusion: Your Content Strategy Roadmap', 'h2'),
    block('Building a content strategy that ranks requires research, planning, quality creation, and continuous optimization. Focus on creating genuine value for users. Google rewards content that best satisfies search intent.'),
    quote('The best SEO strategy is to create such valuable content that people would pay for it if you charged. Make it free and Google will reward you with traffic.')
  ],

  'Core Web Vitals: The Complete 2026 Guide': [
    block('Understanding Core Web Vitals in 2026', 'h2'),
    block('Core Web Vitals are Google\'s standardized metrics for measuring user experience. These metrics directly impact search rankings. This comprehensive guide covers what each metric measures, how to test scores, and techniques to improve performance.'),

    block('What Are Core Web Vitals?', 'h2'),
    block('Core Web Vitals measure three key aspects: loading speed (LCP), interactivity (INP), and visual stability (CLS). Google uses these metrics as ranking signals.'),
    quote('Core Web Vitals are not just ranking factors. They measure real user experience problems that cause frustration and abandonment.'),

    block('Largest Contentful Paint (LCP)', 'h2'),
    block('LCP measures how long it takes for the largest visible element to load. Good scores are under 2.5 seconds, needs improvement is 2.5 to 4.0 seconds, and poor is over 4.0 seconds.'),

    block('What Causes Slow LCP', 'h3'),
    ...bulletList([
      'Slow server response times',
      'Render blocking JavaScript and CSS',
      'Slow resource load times',
      'Client side rendering delays',
      'Large unoptimized images'
    ]),

    block('How to Improve LCP', 'h3'),
    ...numberList([
      'Optimize server response time to under 200ms',
      'Implement a content delivery network',
      'Use browser caching',
      'Minimize and compress CSS and JavaScript',
      'Defer non critical JavaScript',
      'Preload important resources',
      'Optimize images with modern formats like WebP',
      'Implement lazy loading',
      'Remove unused code',
      'Use resource hints'
    ]),
    quote('The single biggest LCP improvement for most sites is optimizing the largest above fold image. Start there for quick wins.'),

    block('Interaction to Next Paint (INP)', 'h2'),
    block('INP replaced First Input Delay in 2024. It measures latency of all user interactions throughout page lifecycle. Good scores are under 200ms, needs improvement is 200ms to 500ms, and poor is over 500ms.'),

    block('How to Improve INP', 'h3'),
    ...numberList([
      'Break up long JavaScript tasks',
      'Use web workers for processing',
      'Debounce and throttle event handlers',
      'Minimize main thread work',
      'Remove unnecessary third party scripts',
      'Optimize JavaScript execution',
      'Use CSS for animations when possible',
      'Implement code splitting',
      'Profile to identify long tasks',
      'Prioritize interaction responsiveness'
    ]),

    block('Cumulative Layout Shift (CLS)', 'h2'),
    block('CLS measures visual stability by calculating unexpected layout shifts. Good scores are under 0.1, needs improvement is 0.1 to 0.25, and poor is over 0.25.'),

    block('How to Improve CLS', 'h3'),
    ...numberList([
      'Always include width and height on images',
      'Reserve space for ads and embeds',
      'Avoid inserting content above existing content',
      'Use transform animations',
      'Preload fonts carefully',
      'Match placeholder and loaded element sizes',
      'Test with throttled network',
      'Use aspect ratio CSS',
      'Load new content below fold',
      'Implement skeleton screens'
    ]),
    quote('The easiest CLS fix is adding explicit width and height to all images. This simple change often cuts CLS score in half.'),

    block('How to Test Core Web Vitals', 'h2'),
    block('Use Google Search Console for real user data, PageSpeed Insights for diagnostics, Chrome DevTools for debugging, and WebPageTest for detailed analysis.'),

    block('Advanced Optimization', 'h2'),
    block('Optimize critical rendering path, minimize JavaScript impact, use next generation image formats, and manage third party scripts carefully.'),

    block('Monitoring Over Time', 'h2'),
    block('Core Web Vitals require continuous monitoring. Set up automated alerts, review Search Console weekly, test after deployments, and include performance in development workflow.'),
    quote('The best time to fix a Core Web Vitals regression is before it reaches production. Build performance testing into your deployment pipeline.'),

    block('Conclusion', 'h2'),
    block('Core Web Vitals are here to stay. Sites with excellent scores gain ranking advantages. Start by measuring current scores, identify worst pages, implement optimization techniques, and monitor results. Remember that Core Web Vitals measure real user experience. Better user experience drives engagement, conversions, and business success.'),
    quote('Core Web Vitals are not about gaming Google. They are about building fast, stable, responsive sites that users love.')
  ],

  'Link Building Strategies That Still Work in 2026': [
    block('The State of Link Building in 2026', 'h2'),
    block('Link building remains one of the most powerful SEO tactics. Despite claims that links matter less, backlinks continue as a primary ranking factor. This guide covers ethical, effective techniques that build authority without risking penalties.'),

    block('Why Links Still Matter', 'h2'),
    block('Links serve as votes of confidence. When reputable sites link to your content, it signals to Google that your content deserves attention. Links provide ranking impact, discovery, referral traffic, brand visibility, and relationship building opportunities.'),
    quote('Backlinks are like academic citations. The more credible sources that reference your work, the more authority you build in your field.'),

    block('Understanding Link Quality', 'h2'),
    block('Not all links provide equal value. Evaluate links based on domain authority, relevance, traffic, placement, anchor text, and follow versus nofollow status. Focus on relevance over raw authority.'),

    block('Strategy 1: Create Link Worthy Content', 'h2'),
    block('The foundation is creating content people want to link to. Link magnet content types include original research, comprehensive guides, industry statistics, free tools, infographics, expert roundups, opinion pieces, and case studies.'),
    quote('Content is king, but promotion is queen. Creating great content is half the battle. Promoting it aggressively completes the equation.'),

    block('Strategy 2: Digital PR and Journalist Outreach', 'h2'),
    block('Digital PR earns links from news sites and publications. Create newsworthy content, write press releases, build media contacts, pitch stories, offer expert commentary, respond to journalist queries, and build reporter relationships.'),

    block('Strategy 3: Resource Page Link Building', 'h2'),
    block('Many sites maintain resource pages linking to helpful content. Find resource pages using search queries, evaluate for relevance and quality, then reach out with personalized messages explaining why your content fits their list.'),

    block('Strategy 4: Broken Link Building', 'h2'),
    block('Find dead links on other sites, then offer your content as replacement. This provides value to site owners while earning backlinks. Use tools to identify broken links at scale.'),
    quote('Broken link building works because you provide genuine value by helping site owners fix their pages. Frame it as helping, not asking for favors.'),

    block('Strategy 5: Guest Posting Done Right', 'h2'),
    block('Strategic guest posting on quality sites still works. Target sites with editorial standards, real traffic, and quality content. Write better content than your own posts, include contextual links naturally, and build ongoing relationships.'),

    block('Strategy 6: Competitor Backlink Analysis', 'h2'),
    block('Analyze competitor backlink profiles to discover link opportunities. Export their links, filter for quality, categorize by type, identify pursuable opportunities, and track which tactics work best.'),
    quote('Competitor analysis is not about copying. It is about discovering opportunities you might have missed.'),

    block('Strategy 7: Unlinked Brand Mentions', 'h2'),
    block('Many sites mention your brand without linking. Converting these mentions is the easiest tactic. Set up alerts, find unlinked mentions, then email requesting a link. Success rate is high because they already endorsed your brand.'),

    block('Strategy 8: Building Relationships First', 'h2'),
    block('The most sustainable approach is building genuine relationships. Engage on social media, comment on blogs, share others content, attend events, join communities, collaborate, and be generous with links.'),
    quote('Link building is really relationship building. Invest in connections and links become a natural byproduct.'),

    block('Strategy 9: Local Link Building', 'h2'),
    block('For local businesses, local links improve both general SEO and local pack rankings. Target local news sites, chambers of commerce, event listings, community organizations, local bloggers, sponsorships, directories, and partnerships.'),

    block('Link Building Tactics to Avoid', 'h2'),
    block('Avoid buying links, using PBNs, exact match anchors, link schemes, low quality directories, and comment spam. When evaluating tactics, ask if it provides value beyond the link.'),
    quote('The best link building focuses on earning links naturally through valuable content and genuine relationships. Shortcuts lead to penalties.'),

    block('Measuring Success', 'h2'),
    block('Track total referring domains, domain authority of new links, anchor text distribution, link placement quality, referral traffic, ranking improvements, organic traffic growth, and conversion rate.'),

    block('Conclusion', 'h2'),
    block('Link building remains essential for SEO success in 2026. Focus on earning high quality, relevant links through valuable content and genuine relationships. Start with one or two strategies, master them, then add more. Build links steadily and domain authority grows.'),
    quote('Link building is a marathon, not a sprint. Build steadily, focus on quality, and results compound over time.')
  ]
};

async function main() {
  console.log('🚀 Starting content generation via HTTP API...\n');

  // First, let's try one blog post to test permissions
  console.log('📝 Testing with one blog post first...\n');

  const testContent = blogContent['Google Analytics 4: Essential Reports for SEO'];

  try {
    // You need to provide the document ID here
    // Let's first fetch the documents to get their IDs
    console.log('Please run this with document IDs. Checking token permissions first...\n');
    console.log('To get document IDs, run:');
    console.log('npx sanity documents query "*[_type == \\"blogPost\\"][]{_id, title}" --dataset production\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n📋 Your token may not have the right permissions.');
    console.log('To fix:');
    console.log('1. Go to https://sanity.io/manage/personal/project/gd7ezu7r/api/tokens');
    console.log('2. Create a new token with "Editor" permissions');
    console.log('3. Update SANITY_API_TOKEN in .env.local');
    console.log('4. Run this script again\n');
  }
}

main().catch(console.error);
