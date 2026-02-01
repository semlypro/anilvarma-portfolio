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
  console.log('Fetching exact titles from Sanity...\n');

  const comparisons = await querySanity('*[_type == "comparisonPost"]{title, _id, content}');
  const listicles = await querySanity('*[_type == "listiclePost"]{title, _id, content}');
  const templates = await querySanity('*[_type == "template"]{title, _id, content}');
  const glossary = await querySanity('*[_type == "glossaryTerm"]{term, _id, content}');

  console.log('=== COMPARISON POSTS ===');
  comparisons.forEach(c => {
    const hasContent = c.content && c.content.length > 0;
    console.log((hasContent ? '✅' : '❌') + ' "' + c.title + '"');
  });

  console.log('\n=== LISTICLE POSTS ===');
  listicles.forEach(l => {
    const hasContent = l.content && l.content.length > 0;
    console.log((hasContent ? '✅' : '❌') + ' "' + l.title + '"');
  });

  console.log('\n=== TEMPLATES ===');
  templates.forEach(t => {
    const hasContent = t.content && t.content.length > 0;
    console.log((hasContent ? '✅' : '❌') + ' "' + t.title + '"');
  });

  console.log('\n=== GLOSSARY TERMS ===');
  glossary.forEach(g => {
    const hasContent = g.content && g.content.length > 0;
    console.log((hasContent ? '✅' : '❌') + ' "' + g.term + '"');
  });
}

main();
