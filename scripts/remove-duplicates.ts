import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'gd7ezu7r',
  dataset: 'production',
  token: 'skwzguLRzpuSQXaMlvdjaAlV5uTKz19IRT5Jcu984v2KC0hVmKz3JvYuJ2R3xwYWJcmYG10C6t0pCelORrBcOI0Y0wf2p0xcuengdBVfSYbOOZm5mlwOtDglu1kUT3oLo6ivcWH2kWWLw1Wl1Y0cWgPSLobX2Swvxc9uOssjNkACdMuYDrEM',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function removeDuplicates() {
  console.log('🧹 Removing Duplicates from Sanity...\n');

  try {
    // Remove duplicate blog posts
    console.log('Checking Blog Posts...');
    const blogPosts = await client.fetch('*[_type == "blogPost"] | order(_createdAt desc)');
    const seenBlogTitles = new Set();
    const blogToDelete = [];

    for (const post of blogPosts) {
      if (seenBlogTitles.has(post.title)) {
        blogToDelete.push(post._id);
      } else {
        seenBlogTitles.add(post.title);
      }
    }

    console.log(`Found ${blogToDelete.length} duplicate blog posts`);
    for (const id of blogToDelete) {
      await client.delete(id);
      console.log(`  ✅ Deleted blog post: ${id}`);
    }

    // Remove duplicate comparison posts
    console.log('\nChecking Comparison Posts...');
    const comparisonPosts = await client.fetch('*[_type == "comparisonPost"] | order(_createdAt desc)');
    const seenComparisonTitles = new Set();
    const comparisonToDelete = [];

    for (const post of comparisonPosts) {
      if (seenComparisonTitles.has(post.title)) {
        comparisonToDelete.push(post._id);
      } else {
        seenComparisonTitles.add(post.title);
      }
    }

    console.log(`Found ${comparisonToDelete.length} duplicate comparison posts`);
    for (const id of comparisonToDelete) {
      await client.delete(id);
      console.log(`  ✅ Deleted comparison post: ${id}`);
    }

    // Remove duplicate listicle posts
    console.log('\nChecking Listicle Posts...');
    const listiclePosts = await client.fetch('*[_type == "listiclePost"] | order(_createdAt desc)');
    const seenListicleTitles = new Set();
    const listicleToDelete = [];

    for (const post of listiclePosts) {
      if (seenListicleTitles.has(post.title)) {
        listicleToDelete.push(post._id);
      } else {
        seenListicleTitles.add(post.title);
      }
    }

    console.log(`Found ${listicleToDelete.length} duplicate listicle posts`);
    for (const id of listicleToDelete) {
      await client.delete(id);
      console.log(`  ✅ Deleted listicle post: ${id}`);
    }

    // Remove duplicate blog categories
    console.log('\nChecking Blog Categories...');
    const blogCategories = await client.fetch('*[_type == "blogCategory"] | order(_createdAt desc)');
    const seenCategoryTitles = new Set();
    const categoriesToDelete = [];

    for (const cat of blogCategories) {
      if (seenCategoryTitles.has(cat.title)) {
        categoriesToDelete.push(cat._id);
      } else {
        seenCategoryTitles.add(cat.title);
      }
    }

    console.log(`Found ${categoriesToDelete.length} duplicate categories`);
    for (const id of categoriesToDelete) {
      await client.delete(id);
      console.log(`  ✅ Deleted category: ${id}`);
    }

    console.log('\n✨ Duplicate removal complete!\n');

    // Show final counts
    const finalBlogPosts = await client.fetch('count(*[_type == "blogPost"])');
    const finalComparisonPosts = await client.fetch('count(*[_type == "comparisonPost"])');
    const finalListiclePosts = await client.fetch('count(*[_type == "listiclePost"])');
    const finalCategories = await client.fetch('count(*[_type == "blogCategory"])');

    console.log('Final Counts:');
    console.log(`  Blog Posts: ${finalBlogPosts}`);
    console.log(`  Comparison Posts: ${finalComparisonPosts}`);
    console.log(`  Listicle Posts: ${finalListiclePosts}`);
    console.log(`  Blog Categories: ${finalCategories}`);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

removeDuplicates();
