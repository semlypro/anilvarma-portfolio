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

async function updateBlogPost1() {
  console.log('📝 Creating comprehensive content for Blog Post 1...\n');
  
  const posts = await client.fetch('*[_type == "blogPost" && slug.current == "10-technical-seo-mistakes"]');
  if (posts.length === 0) {
    console.log('Post not found');
    return;
  }
  
  const content = [
    block('Technical search engine optimization represents the foundation upon which successful websites build their online presence. When you think about achieving high rankings in search engines like Google, most website owners immediately focus on creating quality content and earning backlinks from authoritative sources. While these elements certainly matter, they cannot compensate for a weak technical foundation that prevents search engines from properly accessing, understanding, and ranking your website content.', 'normal'),
    
    block('The digital landscape has transformed dramatically over recent years, with search engines implementing increasingly sophisticated algorithms to evaluate website quality and user experience. Google now considers hundreds of ranking factors when determining which pages deserve top positions in search results. These factors span everything from page loading speed to mobile device compatibility, from properly implemented structured data to efficient crawling and indexation processes.', 'normal'),
    
    block('Many website owners invest significant time and resources into content creation and link building campaigns, only to see disappointing results because fundamental technical issues hold their sites back. These technical problems often remain invisible to casual observers but create serious obstacles for search engine crawlers attempting to access and index website content. The result is wasted potential, with great content failing to achieve the visibility it deserves.', 'normal'),
    
    block('In this comprehensive guide, we explore the ten most damaging technical search engine optimization mistakes that prevent websites from reaching their full potential in organic search results. More importantly, we provide detailed, actionable solutions for identifying and correcting these problems. By systematically addressing these technical issues, you can create a solid foundation that supports your content marketing efforts and helps your website compete effectively in competitive search landscapes.', 'normal'),
    
    block('Understanding Technical SEO Fundamentals', 'h2'),
    
    block('Before diving into specific mistakes, it helps to understand what technical search engine optimization encompasses and why it matters so much for website success. Technical SEO refers to all the behind the scenes work that makes websites accessible, understandable, and favorable to search engine crawlers. Unlike content SEO, which focuses on the words and media you publish, or off page SEO, which deals with external signals like backlinks, technical SEO concentrates on your website infrastructure and architecture.', 'normal'),
    
    block('Search engines use automated programs called crawlers or spiders to discover and analyze web pages across the internet. These crawlers follow links from page to page, downloading content and sending it back to search engine servers for processing and indexing. The indexing process involves analyzing page content, understanding its meaning and relevance, and storing this information in massive databases that can be quickly searched when users enter queries.', 'normal'),
    
    block('When your website has technical problems, these crawlers encounter difficulties accessing your content, understanding your page structure, or determining which pages deserve priority for indexing and ranking. Even minor technical issues can cascade into major ranking problems, especially as your website grows and competition intensifies. Investing time in technical SEO creates compound benefits over time, as each improvement makes your entire site more efficient and search engine friendly.', 'normal'),
    
    block('Mistake Number One: Ignoring Core Web Vitals Metrics', 'h2'),
    
    block('Core Web Vitals emerged as a critical ranking factor when Google introduced them as part of the page experience update. These metrics measure real user experience across three essential dimensions that directly impact how visitors interact with your website. Many website owners continue to ignore these signals, treating them as optional nice to have features rather than fundamental ranking factors that influence their search visibility.', 'normal'),
    
    block('The three Core Web Vitals metrics each address a specific aspect of user experience. Largest Contentful Paint measures loading performance by tracking how long it takes for the largest content element to become visible on the screen. This metric directly correlates with user perception of page speed, as visitors judge loading times based on when they can see meaningful content rather than when technical loading completes.', 'normal'),
    
    block('First Input Delay measures interactivity by calculating the time between when a user first interacts with your page and when the browser can actually respond to that interaction. Long delays create frustration as users click buttons or links that appear unresponsive. This metric captures the reality that pages can appear fully loaded while still being unresponsive due to JavaScript execution blocking the main thread.', 'normal'),
    
    block('Cumulative Layout Shift measures visual stability by quantifying unexpected layout changes that occur as pages load. Few things annoy users more than clicking a button only to have the layout shift at the last moment, causing them to click something entirely different. These shifts typically occur when images, advertisements, or embedded content load without proper size reservations.', 'normal'),
    
    block('To improve your Core Web Vitals scores, start by measuring current performance using Google PageSpeed Insights, Chrome User Experience Report, or Search Console Core Web Vitals report. These tools provide real user data showing exactly how your pages perform for actual visitors under real world conditions. Pay special attention to mobile performance, as mobile users typically experience slower loading times and more variable network conditions.', 'normal'),
    
    block('Image optimization offers one of the highest impact opportunities for improving Largest Contentful Paint scores. Implement modern image formats like WebP that provide superior compression compared to traditional JPEG and PNG formats. Use responsive images with srcset attributes to deliver appropriately sized images based on device capabilities. Always include explicit width and height attributes to prevent layout shifts as images load. Consider implementing a content delivery network to serve images from servers geographically close to your users.', 'normal'),
    
    block('JavaScript optimization plays a crucial role in improving First Input Delay scores. Minimize JavaScript execution time by code splitting, deferring non critical scripts, and removing unused code. Consider using web workers to move heavy computational tasks off the main thread. Implement lazy loading for JavaScript that powers functionality users might not immediately need. Monitor third party scripts carefully, as analytics tools, advertising code, and social media widgets often contribute significantly to JavaScript bloat.', 'normal'),
    
    block('Layout stability requires careful planning and implementation throughout your design and development process. Reserve space for advertisements, embedded content, and dynamically loaded elements by specifying dimensions in your CSS or HTML. Load fonts efficiently using font display swap to prevent invisible text or layout shifts. Implement skeleton screens that show content placeholders while actual content loads. Test your pages across different devices and connection speeds to identify stability issues that might not appear in ideal conditions.', 'normal'),
    
    block('Mistake Number Two: Inadequate Mobile Optimization', 'h2'),
    
    block('Mobile devices now generate over sixty percent of all web traffic globally, yet countless websites still provide substandard mobile experiences. This creates a serious problem because Google uses mobile first indexing, meaning the search engine primarily uses the mobile version of your content for indexing and ranking purposes. If your mobile experience disappoints users or fails to match your desktop functionality, your rankings suffer regardless of how polished your desktop site appears.', 'normal'),
    
    block('Common mobile optimization failures include text sized too small to read comfortably without zooming, requiring users to pinch and spread to view content. This creates immediate friction and often drives visitors away before they engage with your content. Similarly, clickable elements positioned too close together lead to frustration as users accidentally tap the wrong links or buttons with their fingers. These interface problems seem minor individually but compound to create overwhelmingly negative user experiences.', 'normal'),
    
    block('Content that extends beyond the screen width forcing horizontal scrolling represents another critical mobile optimization failure. Mobile users expect content to flow naturally within their viewport without requiring sideways scrolling. This problem typically stems from fixed width elements, oversized images, or layout assumptions based on desktop screen dimensions. The solution requires flexible responsive design that adapts gracefully to any screen size.', 'normal'),
    
    block('Flash content and other unsupported plugins create complete barriers to access on mobile devices. While Flash usage has declined dramatically, other compatibility issues persist with certain video formats, interactive elements, or embedded content that fails to load on mobile browsers. Always test your content across multiple mobile devices and browsers to ensure universal compatibility.', 'normal'),
    
    block('Page speed becomes even more critical on mobile devices where users frequently contend with slower cellular connections and less powerful processors. Mobile users also tend to be more impatient, with studies showing they abandon slow loading pages even faster than desktop users. Optimize specifically for mobile performance by minimizing resource sizes, reducing HTTP requests, and prioritizing above the fold content.', 'normal'),
    
    block('To fix mobile optimization issues comprehensively, adopt a mobile first design philosophy that starts with the mobile experience rather than treating it as an afterthought. Use responsive web design techniques that automatically adapt layouts, images, and functionality to different screen sizes. Implement flexible grid layouts that reflow naturally rather than fixed width designs that break on smaller screens.', 'normal'),
    
    block('Test rigorously using Google Mobile Friendly Test tool and Chrome DevTools device simulation features. However, tools only tell part of the story. Regularly test your website on actual mobile devices spanning different manufacturers, operating systems, and screen sizes. Pay attention to touch target sizing, ensuring buttons and links measure at least 48 pixels square with adequate spacing between them.', 'normal'),
    
    block('Consider implementing Accelerated Mobile Pages for content heavy pages where loading speed critically impacts user experience and engagement. AMP technology strips away unnecessary code and enforces performance best practices to create blazingly fast mobile experiences. While not appropriate for all content types, AMP can dramatically improve mobile performance for articles, blog posts, and similar content.', 'normal')
  ];

  await client.patch(posts[0]._id).set({ content }).commit();
  console.log('✅ Blog Post 1 updated with comprehensive content\n');
}

updateBlogPost1().catch(console.error);
