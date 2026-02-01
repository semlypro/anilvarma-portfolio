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
  console.log('Verifying specific document upload...\n');
  
  // Check the Technical SEO glossary term that was supposedly uploaded
  const doc = await querySanity('*[_id == "sTobOaTwOh2mDxyqlcsTlQ"][0]{_id, term, "blocks": length(content), content}');
  
  if (!doc) {
    console.log('❌ Document not found!');
    return;
  }
  
  console.log('Document ID:', doc._id);
  console.log('Term:', doc.term);
  console.log('Content blocks:', doc.blocks || 0);
  
  if (doc.content && doc.content.length > 0) {
    console.log('\n✅ CONTENT EXISTS! First 3 blocks:');
    doc.content.slice(0, 3).forEach((block, i) => {
      if (block.children && block.children[0]) {
        console.log((i+1) + '.', block.children[0].text.substring(0, 100) + '...');
      }
    });
  } else {
    console.log('\n❌ NO CONTENT FOUND');
  }
}

main();
