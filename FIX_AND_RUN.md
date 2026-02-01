# CRITICAL: Fix Token Permissions and Generate Content

## THE PROBLEM
Your Sanity API token doesn't have "Editor" permissions. It only has "Read" permissions.

## THE SOLUTION (2 MINUTES)

### Step 1: Create New Token with Editor Permissions

1. Go to: https://sanity.io/manage/personal/project/gd7ezu7r/api/tokens

2. Click "Add API Token"

3. Name it: "Content Editor Token"

4. Permissions: Select **"Editor"** (NOT Viewer, MUST be Editor)

5. Click "Add Token"

6. **COPY THE TOKEN** (you'll only see it once)

### Step 2: Update .env.local

Replace the SANITY_API_TOKEN line in `.env.local` with your new token:

```bash
SANITY_API_TOKEN=your_new_editor_token_here
```

### Step 3: Run the Content Generator

```bash
cd "/Users/anilvarma/Library/Mobile Documents/com~apple~CloudDocs/Work/Anil Varma/portfolio website"
node scripts/generate-all-content.js
```

This will:
- Generate 3 blog posts (3000+ words each)
- Generate 5 comparison posts (3000+ words each)
- Generate 5 listicle posts (3000+ words each)
- Generate 5 template descriptions (1000+ words each)
- Generate 5 glossary terms (800+ words each)
- TOTAL: 23 pieces of content

The script pauses 5 seconds between each update to avoid rate limiting.

## ALTERNATIVE: Manual Content Addition

If you prefer not to create a new token, you can manually paste content into Sanity Studio:

1. Open: https://www.anilvarma.nl/studio
2. Navigate to each content piece
3. Copy content from `CONTENT_TO_PASTE.md`
4. Paste into the Content field
5. Click "Publish"

## VERIFY IT WORKED

After running the script, check:
```bash
node scripts/check-content-status.js
```

You should see "HAS CONTENT" for all 23 pieces.

## STILL NOT WORKING?

If you get permission errors:
1. Double check the token has "Editor" permissions (not "Viewer")
2. Make sure you copied the entire token
3. Restart any running development servers
4. Try running with the token directly:
   ```bash
   SANITY_API_TOKEN=your_new_token node scripts/generate-all-content.js
   ```

---

**DO NOT SKIP THE TOKEN STEP. The current token CANNOT update content.**
