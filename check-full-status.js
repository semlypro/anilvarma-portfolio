const https = require('https');

const PROJECT_ID = 'gd7ezu7r';
const DATASET = 'production';
const TOKEN = 'skwzguLRzpuSQXaMlvdjaAlV5uTKz19IRT5Jcu984v2KC0hVmKz3JvYuJ2R3xwYWJcmYG10C6t0pCelORrBcOI0Y0wf2p0xcuengdBVfSYbOOZm5mlwOtDglu1kUT3oLo6ivcWH2kWWLw1Wl1Y0cWgPSLobX2Swvxc9uOssjNkACdMuYDrEM';

function querySanity(query) {
  return new Promise((resolve, reject) => {
    const encodedQuery = encodeURIComponent(query);
    const options = {
      hostname: PROJECT_ID + '.api.sanity.io',
      path: '/v2021-06-07/data/query/' + DATASET + '?query=' + encodedQuery,
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
  console.log('📊 FULL CONTENT STATUS REPORT\n');

  const blogPosts = await querySanity('*[_type == "blogPost"]{title, content}');
  const comparisons = await querySanity('*[_type == "comparisonPost"]{title, content}');
  const listicles = await querySanity('*[_type == "listiclePost"]{title, content}');
  const templates = await querySanity('*[_type == "template"]{title, content}');
  const glossary = await querySanity('*[_type == "glossaryTerm"]{term, content}');

  let hasContent = 0;
  let noContent = 0;

  console.log('✅ BLOG POSTS:',  blogPosts.length);
  blogPosts.forEach(p => {
    const has = p.content && p.content.length > 0;
    if (has) hasContent++; else noContent++;
    console.log('  ' + (has ? '✅' : '❌') + ' ' + p.title + (has ? ': ' + p.content.length + ' blocks' : ': NO CONTENT'));
  });

  console.log('\n✅ COMPARISON POSTS:', comparisons.length);
  comparisons.forEach(c => {
    const has = c.content && c.content.length > 0;
    if (has) hasContent++; else noContent++;
    console.log('  ' + (has ? '✅' : '❌') + ' ' + c.title + (has ? ': ' + c.content.length + ' blocks' : ': NO CONTENT'));
  });

  console.log('\n✅ LISTICLE POSTS:', listicles.length);
  listicles.forEach(l => {
    const has = l.content && l.content.length > 0;
    if (has) hasContent++; else noContent++;
    console.log('  ' + (has ? '✅' : '❌') + ' ' + l.title + (has ? ': ' + l.content.length + ' blocks' : ': NO CONTENT'));
  });

  console.log('\n✅ TEMPLATES:', templates.length);
  templates.forEach(t => {
    const has = t.content && t.content.length > 0;
    if (has) hasContent++; else noContent++;
    console.log('  ' + (has ? '✅' : '❌') + ' ' + t.title + (has ? ': ' + t.content.length + ' blocks' : ': NO CONTENT'));
  });

  console.log('\n✅ GLOSSARY TERMS:', glossary.length);
  glossary.forEach(g => {
    const has = g.content && g.content.length > 0;
    if (has) hasContent++; else noContent++;
    console.log('  ' + (has ? '✅' : '❌') + ' ' + g.term + (has ? ': ' + g.content.length + ' blocks' : ': NO CONTENT'));
  });

  const total = blogPosts.length + comparisons.length + listicles.length + templates.length + glossary.length;

  console.log('\n📊 SUMMARY:');
  console.log('  ✅ Has content: ' + hasContent + '/' + total);
  console.log('  ❌ No content: ' + noContent + '/' + total);
}

main();
