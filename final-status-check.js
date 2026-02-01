const https = require('https');
const PROJECT_ID = 'gd7ezu7r';
const DATASET = 'production';
const TOKEN = 'skwzguLRzpuSQXaMlvdjaAlV5uTKz19IRT5Jcu984v2KC0hVmKz3JvYuJ2R3xwYWJcmYG10C6t0pCelORrBcOI0Y0wf2p0xcuengdBVfSYbOOZm5mlwOtDglu1kUT3oLo6ivcWH2kWWLw1Wl1Y0cWgPSLobX2Swvxc9uOssjNkACdMuYDrEM';

function querySanity(query) {
  return new Promise((resolve, reject) => {
    const encodedQuery = encodeURIComponent(query);
    const options = {
      hostname: PROJECT_ID + '.api.sanity.io',
      path: '/v2021-06-07/data/query/' + DATASET + '?query=' + encodedQuery + '&perspective=published',
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + TOKEN },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data).result);
        } else {
          reject(new Error('Query failed: ' + data));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('📊 FINAL STATUS CHECK (including drafts)\n');

  // Query including drafts
  const blogPosts = await querySanity('*[_type == "blogPost"]{title, content, "blocks": length(content)}');
  const comparisons = await querySanity('*[_type == "comparisonPost"]{title, content, "blocks": length(content)}');
  const listicles = await querySanity('*[_type == "listiclePost"]{title, content, "blocks": length(content)}');
  const templates = await querySanity('*[_type == "template"]{title, content, "blocks": length(content)}');
  const glossary = await querySanity('*[_type == "glossaryTerm"]{term, content, "blocks": length(content)}');

  let hasContent = 0;
  let total = 0;

  console.log('✅ BLOG POSTS:', blogPosts.length);
  blogPosts.forEach(p => {
    total++;
    const has = p.content && p.content.length > 0;
    if (has) hasContent++;
    console.log('  ' + (has ? '✅' : '❌') + ' ' + p.title + ': ' + (p.blocks || 0) + ' blocks');
  });

  console.log('\n✅ COMPARISON POSTS:', comparisons.length);
  comparisons.forEach(c => {
    total++;
    const has = c.content && c.content.length > 0;
    if (has) hasContent++;
    console.log('  ' + (has ? '✅' : '❌') + ' ' + c.title + ': ' + (c.blocks || 0) + ' blocks');
  });

  console.log('\n✅ LISTICLE POSTS:', listicles.length);
  listicles.forEach(l => {
    total++;
    const has = l.content && l.content.length > 0;
    if (has) hasContent++;
    console.log('  ' + (has ? '✅' : '❌') + ' ' + l.title + ': ' + (l.blocks || 0) + ' blocks');
  });

  console.log('\n✅ TEMPLATES:', templates.length);
  templates.forEach(t => {
    total++;
    const has = t.content && t.content.length > 0;
    if (has) hasContent++;
    console.log('  ' + (has ? '✅' : '❌') + ' ' + t.title + ': ' + (t.blocks || 0) + ' blocks');
  });

  console.log('\n✅ GLOSSARY TERMS:', glossary.length);
  glossary.forEach(g => {
    total++;
    const has = g.content && g.content.length > 0;
    if (has) hasContent++;
    console.log('  ' + (has ? '✅' : '❌') + ' ' + g.term + ': ' + (g.blocks || 0) + ' blocks');
  });

  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL SUMMARY');
  console.log('='.repeat(60));
  console.log('✅ Has content: ' + hasContent + '/' + total + ' (' + Math.round(hasContent/total*100) + '%)');
  console.log('❌ Missing content: ' + (total - hasContent) + '/' + total);
  console.log('='.repeat(60));
  
  if (hasContent === total) {
    console.log('\n🎉 ALL CONTENT COMPLETE! READY TO DEPLOY! 🎉\n');
  } else {
    console.log('\n⚠️  Still missing ' + (total - hasContent) + ' items\n');
  }
}

main();
