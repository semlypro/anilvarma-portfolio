const https = require('https');

const PROJECT_ID = 'gd7ezu7r';
const DATASET = 'production';
const TOKEN = 'skwzguLRzpuSQXaMlvdjaAlV5uTKz19IRT5Jcu984v2KC0hVmKz3JvYuJ2R3xwYWJcmYG10C6t0pCelORrBcOI0Y0wf2p0xcuengdBVfSYbOOZm5mlwOtDglu1kUT3oLo6ivcWH2kWWLw1Wl1Y0cWgPSLobX2Swvxc9uOssjNkACdMuYDrEM';

const testContent = [
  {
    _type: 'block',
    _key: 'test123',
    style: 'h2',
    children: [{ _type: 'span', _key: 'span1', text: 'Test Content', marks: [] }],
    markDefs: [],
  }
];

function sanityMutate(mutations) {
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
        console.log('Status:', res.statusCode);
        console.log('Response:', data);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error('HTTP ' + res.statusCode + ': ' + data));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('Testing write permissions...\n');

  try {
    const result = await sanityMutate([
      {
        patch: {
          id: 'drafts.sTobOaTwOh2mDxyqlctxjw',
          set: {
            content: testContent
          }
        }
      }
    ]);

    console.log('\n✅ SUCCESS! Token has write permissions.');
  } catch (error) {
    console.error('\n❌ FAILED:', error.message);
  }
}

main();
