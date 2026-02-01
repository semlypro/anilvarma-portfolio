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
  console.log('Checking for draft glossary terms...\n');
  
  const glossaryTerms = await querySanity('*[_type == "glossaryTerm" && _id match "drafts.*"]{_id, term, "blocks": length(content)}');
  
  console.log('Found', glossaryTerms.length, 'draft glossary terms:\n');
  glossaryTerms.forEach(g => {
    console.log('  ' + g._id);
    console.log('    Term:', g.term);
    console.log('    Blocks:', g.blocks || 0);
    console.log('');
  });
}

main();
