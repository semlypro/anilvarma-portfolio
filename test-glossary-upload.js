const https = require('https');
const PROJECT_ID = 'gd7ezu7r';
const DATASET = 'production';
const TOKEN = 'skwzguLRzpuSQXaMlvdjaAlV5uTKz19IRT5Jcu984v2KC0hVmKz3JvYuJ2R3xwYWJcmYG10C6t0pCelORrBcOI0Y0wf2p0xcuengdBVfSYbOOZm5mlwOtDglu1kUT3oLo6ivcWH2kWWLw1Wl1Y0cWgPSLobX2Swvxc9uOssjNkACdMuYDrEM';

let keyCounter = 0;
const createKey = () => 'key' + (keyCounter++);

const block = (text, style = 'normal') => ({
  _type: 'block',
  _key: createKey(),
  style,
  children: [{ _type: 'span', _key: createKey(), text, marks: [] }],
  markDefs: [],
});

function mutateSanity(mutations) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ mutations });

    const options = {
      hostname: PROJECT_ID + '.api.sanity.io',
      path: '/v2021-06-07/data/mutate/' + DATASET,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Authorization': 'Bearer ' + TOKEN,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        console.log('HTTP Status:', res.statusCode);
        console.log('Response:', data);
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error('Mutation failed: ' + data));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('Testing direct content upload to Technical SEO glossary term...\n');
  
  const testContent = [
    block('Technical SEO Explained', 'h2'),
    block('Technical SEO refers to optimizing your website for search engine crawling and indexing. This is the foundation that allows your content to be discovered and ranked by search engines.'),
    block('This is test content to verify the upload works correctly.')
  ];

  try {
    const result = await mutateSanity([
      {
        patch: {
          id: 'sTobOaTwOh2mDxyqlcsTlQ',
          set: {
            content: testContent
          }
        }
      }
    ]);

    console.log('\n✅ Upload appeared to succeed!');
    console.log('Transaction ID:', result.transactionId);
  } catch (error) {
    console.error('\n❌ Upload failed:', error.message);
  }
}

main();
