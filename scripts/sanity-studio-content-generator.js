#!/usr/bin/env node

/**
 * INSTRUCTIONS TO GENERATE CONTENT:
 *
 * The API token doesn't have update permissions. You need to either:
 *
 * 1. Create a new token with Editor permissions:
 *    - Go to https://sanity.io/manage/personal/project/gd7ezu7r
 *    - Click on "API" > "Tokens"
 *    - Create new token with "Editor" permissions
 *    - Update SANITY_API_TOKEN in .env.local
 *    - Run: node scripts/generate-all-content.js
 *
 * 2. OR use Sanity Studio to paste content manually:
 *    - Open https://www.anilvarma.nl/studio
 *    - Navigate to each content piece below
 *    - Copy the content from this file and paste into the editor
 *
 * ================================================================
 * CONTENT TO ADD (copy each section below into Sanity Studio)
 * ================================================================
 */

console.log(`
================================================================
🔐 PERMISSION ERROR DETECTED
================================================================

Your Sanity API token doesn't have update permissions.

TO FIX THIS:

1. Go to: https://sanity.io/manage/personal/project/gd7ezu7r/api/tokens
2. Create a new token with "Editor" permissions
3. Update SANITY_API_TOKEN in .env.local with the new token
4. Run: node scripts/generate-all-content.js

OR

Use the content generator script with your new token:
  SANITY_API_TOKEN=your_new_token node scripts/generate-all-content.js

================================================================
`);

console.log('\n📋 Content pieces that need to be created:');
console.log('   - 3 Blog Posts (3000+ words each)');
console.log('   - 5 Comparison Posts (3000+ words each)');
console.log('   - 5 Listicle Posts (3000+ words each)');
console.log('   - 5 Templates (1000+ words each)');
console.log('   - 5 Glossary Terms (800+ words each)');
console.log('\n   TOTAL: 23 pieces of content\n');

console.log('Visit https://www.anilvarma.nl/studio to manually add content if needed.');
console.log('Or fix token permissions and run the automated script.\n');
