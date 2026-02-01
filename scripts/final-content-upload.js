// Run with: npx sanity exec scripts/final-content-upload.js --with-user-token

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

// Helper functions
const createKey = () => Math.random().toString(36).substr(2, 9)

const block = (text, style = 'normal') => ({
  _type: 'block',
  _key: `block${createKey()}`,
  style,
  children: [{ _type: 'span', _key: `span${createKey()}`, text, marks: [] }],
  markDefs: [],
})

const bulletList = (items) => items.map(item => ({
  _type: 'block',
  _key: `block${createKey()}`,
  style: 'normal',
  listItem: 'bullet',
  level: 1,
  children: [{ _type: 'span', _key: `span${createKey()}`, text: item, marks: [] }],
  markDefs: [],
}))

const numberList = (items) => items.map(item => ({
  _type: 'block',
  _key: `block${createKey()}`,
  style: 'normal',
  listItem: 'number',
  level: 1,
  children: [{ _type: 'span', _key: `span${createKey()}`, text: item, marks: [] }],
  markDefs: [],
}))

const quote = (text) => ({
  _type: 'block',
  _key: `block${createKey()}`,
  style: 'blockquote',
  children: [{ _type: 'span', _key: `span${createKey()}`, text, marks: [] }],
  markDefs: [],
})

// COMPREHENSIVE CONTENT GENERATORS

const contentStrategyContent = [
  block('Why Most Content Strategies Fail to Rank', 'h2'),
  block('Creating content is easy. Creating content that ranks in Google is extremely difficult. Most content strategies fail because they focus on production volume rather than strategic value. Publishing 50 mediocre blog posts delivers worse results than publishing 10 exceptional pieces.'),
  block('This guide teaches you how to build a content strategy that actually ranks. You will learn to identify opportunities, create content that satisfies search intent, and build authority that compounds over time.'),

  block('The Foundation: Understanding Search Intent', 'h2'),
  block('Search intent is the reason behind a query. Google has become incredibly sophisticated at understanding intent. Your content must match intent precisely or it will never rank, regardless of technical optimization.'),

  block('Four Types of Search Intent', 'h3'),
  ...numberList([
    'Informational: User wants to learn something',
    'Navigational: User wants to find a specific website',
    'Commercial: User is researching before buying',
    'Transactional: User is ready to purchase or take action'
  ]),

  block('Analyze search results to determine intent. The top 10 results show what Google believes users want. If all results are guides, the intent is informational. If results are product pages, intent is transactional.'),

  quote('Matching search intent is more important than keyword density, backlinks, or any other ranking factor. Get intent wrong and nothing else matters.'),

  block('Step 1: Comprehensive Keyword Research', 'h2'),
  block('Effective content strategy starts with thorough keyword research. You need to find keywords worth targeting before creating any content.'),

  block('Keyword Research Process', 'h3'),
  ...numberList([
    'List your core topics and services',
    'Use keyword tools to find related queries',
    'Analyze search volume and competition',
    'Evaluate ranking difficulty',
    'Assess business value of each keyword',
    'Organize keywords into topic clusters',
    'Prioritize based on opportunity and resources'
  ]),

  block('Focus on keyword difficulty versus your domain authority. Targeting ultra competitive keywords with a new site wastes resources. Start with lower competition keywords to build authority first.'),

  block('The keyword golden ratio helps identify quick win opportunities. Find keywords with:'),
  ...bulletList([
    'Search volume between 250 and 1000 monthly searches',
    'Fewer than 50 pages with the keyword in the title',
    'Commercial or informational intent matching your business',
    'Low domain authority in current top 10 results'
  ]),

  block('Step 2: Create Topic Clusters', 'h2'),
  block('Topic clusters organize content around pillar pages and supporting cluster content. This structure helps search engines understand your expertise and builds topical authority.'),

  quote('Topic clusters work because they mirror how Google understands content relationships through semantic analysis and entity recognition.'),

  block('Plan 1 pillar page with 8 to 12 cluster articles per major topic. This depth of coverage signals expertise to Google and creates a content hub that attracts backlinks.'),

  block('Step 3: Analyze the Competition', 'h2'),
  block('Never create content without analyzing what already ranks. Competitive analysis reveals what Google rewards for your target keywords.'),

  block('SERP Analysis Checklist', 'h3'),
  ...bulletList([
    'Content format: guides, listicles, how tos, or comparisons',
    'Content depth: word count and comprehensiveness',
    'Media usage: images, videos, or infographics',
    'Content structure: headings, lists, and formatting',
    'External links: types and quantity of sources cited',
    'Content freshness: publication and update dates',
    'Domain authority: strength of ranking sites',
    'User engagement: comments, shares, or featured snippets'
  ]),

  block('Your content must either match the pattern Google rewards or bring something significantly better. Simply matching what ranks is rarely enough. You need content that deserves to rank higher.'),

  block('Step 4: Create Content That Deserves to Rank', 'h2'),
  block('Quality content satisfies user intent better than competing pages. This requires more than surface level information. You must provide unique value that makes your content the obvious best result.'),

  block('Elements of Ranking Content', 'h3'),
  ...numberList([
    'Clear structure with descriptive headings',
    'Comprehensive coverage of the topic',
    'Original insights from experience',
    'Supporting data and statistics',
    'Practical examples and case studies',
    'Visual elements that enhance understanding',
    'Scannable formatting for easy reading',
    'Clear calls to action for next steps'
  ]),

  block('Aim for 2x the value of the current top result. If the best article covers 5 strategies, cover 10. If the top guide uses text only, add original images and videos. Find the gaps and fill them.'),

  quote('Creating 10x content is overrated. Creating 2x content consistently is underrated and more achievable for most teams.'),

  block('Step 5: Optimize On Page Elements', 'h2'),
  block('On page optimization helps search engines understand your content. Critical elements include title tags with target keywords under 60 characters, meta descriptions with compelling summaries, short keyword rich URL slugs, clear H1 headings, descriptive subheadings, image alt text, and contextual internal links.'),

  block('Avoid keyword stuffing. Use your target keyword naturally in title, H1, first paragraph, and a few subheadings. Focus on readability over keyword density.'),

  block('Step 6: Build Strategic Internal Links', 'h2'),
  block('Internal linking is the most underutilized SEO tactic. Proper internal links distribute authority, help search engines crawl your site, and guide users to related content.'),

  block('Internal Linking Strategy', 'h3'),
  ...bulletList([
    'Link from high authority pages to pages you want to rank',
    'Use descriptive anchor text that includes target keywords',
    'Add 3 to 5 internal links per article',
    'Link to pillar pages from all cluster content',
    'Update old articles to link to new content',
    'Create content hubs with bidirectional linking',
    'Fix broken internal links immediately'
  ]),

  block('Your pillar pages should have the most internal links pointing to them. This concentrates authority on your most important content.'),

  block('Step 7: Promote Your Content', 'h2'),
  block('Publishing content is just the beginning. Promotion determines whether your content gets the signals needed to rank.'),

  block('Content Promotion Tactics', 'h3'),
  ...numberList([
    'Share on social media channels',
    'Email your subscriber list',
    'Reach out to sites you mentioned for backlinks',
    'Submit to relevant communities and forums',
    'Repurpose into other formats like videos or infographics',
    'Run targeted ads to drive initial traffic',
    'Engage with comments and discussions',
    'Pitch to journalists for media coverage'
  ]),

  block('The first 48 hours after publishing are critical. Strong initial engagement signals quality to search engines. Coordinate promotion to maximize early traffic and shares.'),

  quote('Content without promotion is like a tree falling in an empty forest. It might be great, but nobody knows it exists.'),

  block('Step 8: Measure and Iterate', 'h2'),
  block('Content strategy requires constant measurement and iteration. Track performance to identify what works and double down on successful patterns. Review organic traffic, keyword rankings, engagement rate, conversion rate, backlinks, and time on page monthly.'),

  block('Step 9: Update and Refresh Content', 'h2'),
  block('Content decay is real. Rankings decline over time as content becomes outdated. Regular updates keep content fresh and maintain rankings. Review content every 6 to 12 months, update statistics, add new sections, improve existing sections, fix broken links, refresh images, and promote updated content.'),

  block('Prioritize updating high traffic pages that have declined. These updates often deliver quick wins as Google recrawls and reevaluates the improved content.'),

  block('Step 10: Scale Content Production', 'h2'),
  block('Once you have a proven content process, scale production to cover more keywords and topics. Scaling requires systematizing your workflow through content briefs, calendars, writer assignments, quality standards, editorial review, promotion scheduling, and performance tracking.'),

  quote('Quality beats quantity, but quality at scale beats everything. Build systems that maintain quality as you increase production.'),

  block('Common Content Strategy Mistakes to Avoid', 'h2'),
  block('Learn from common mistakes: never target keywords nobody searches, always match search intent, create comprehensive content with unique value, fix technical SEO issues before investing heavily in content, and commit to at least 6 months before evaluating results.'),

  block('Conclusion: Your Content Strategy Roadmap', 'h2'),
  block('Building a content strategy that ranks requires research, planning, quality creation, and continuous optimization. Conduct comprehensive keyword research, organize into topic clusters, analyze competition, create comprehensive content, optimize on page elements, build strategic internal links, promote aggressively, measure and iterate, update regularly, and scale systematically.'),

  block('This process works because it aligns with how Google evaluates content. Focus on creating genuine value for users. Google rewards content that best satisfies search intent. Build your strategy around that principle and rankings will follow.'),

  quote('The best SEO strategy is to create such valuable content that people would pay for it if you charged. Make it free and Google will reward you with traffic.')
]

// Main execution
async function updateAllContent() {
  console.log('🚀 Starting content upload with CLI client...\n')

  try {
    // Fetch documents that need content
    const posts = await client.fetch(`*[_type == "blogPost" && title == "How to Build a Content Strategy That Ranks"][0]{_id, title}`)

    if (!posts) {
      console.log('❌ Post not found')
      return
    }

    console.log(`📝 Updating: ${posts.title}`)

    await client
      .patch(posts._id)
      .set({ content: contentStrategyContent })
      .commit()

    console.log(`✅ Successfully updated: ${posts.title}`)
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('\nTroubleshooting:')
    console.log('1. Make sure you are logged in: npx sanity login')
    console.log('2. Run with: npx sanity exec scripts/final-content-upload.js --with-user-token')
  }
}

updateAllContent()
