import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'listiclePost',
  title: 'Listicle Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'E.g., "10 Best SEO Tools for 2024"',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'listCount',
      title: 'List Count',
      type: 'number',
      description: 'Number of items in the list',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'listType',
      title: 'List Type',
      type: 'string',
      options: {
        list: [
          { title: 'Numbered', value: 'numbered' },
          { title: 'Unordered', value: 'unordered' },
          { title: 'Countdown', value: 'countdown' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'listItems',
      title: 'List Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'summary',
              title: 'Summary',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Content',
              type: 'portableText',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alternative Text',
                  type: 'string',
                },
              ],
            },
            {
              name: 'externalLink',
              title: 'External Link',
              type: 'url',
            },
            {
              name: 'isAffiliate',
              title: 'Is Affiliate Link?',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'rating',
              title: 'Rating (out of 5)',
              type: 'number',
              validation: (Rule) => Rule.min(0).max(5),
            },
            {
              name: 'pricing',
              title: 'Pricing',
              type: 'string',
              description: 'E.g., "$99/month" or "Free"',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'summary',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'conclusion',
      title: 'Conclusion',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quickList',
      title: 'Quick List',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'One-line summaries for featured snippets (e.g., "1. Ahrefs - Best for backlink analysis")',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{ type: 'faq' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      listCount: 'listCount',
      listType: 'listType',
      publishedAt: 'publishedAt',
    },
    prepare({ title, listCount, listType, publishedAt }) {
      return {
        title,
        subtitle: `${listCount} items (${listType}) - ${new Date(publishedAt).toLocaleDateString()}`,
      }
    },
  },
})
