import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'comparisonPost',
  title: 'Comparison Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'E.g., "Ahrefs vs SEMrush"',
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
      name: 'itemA',
      title: 'Item A',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'logo',
          title: 'Logo',
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            },
          ],
        },
        {
          name: 'website',
          title: 'Website URL',
          type: 'url',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'pricing',
          title: 'Pricing',
          type: 'string',
        },
        {
          name: 'rating',
          title: 'Rating (out of 5)',
          type: 'number',
          validation: (Rule) => Rule.required().min(0).max(5),
        },
        {
          name: 'pros',
          title: 'Pros',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'cons',
          title: 'Cons',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'itemB',
      title: 'Item B',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'logo',
          title: 'Logo',
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            },
          ],
        },
        {
          name: 'website',
          title: 'Website URL',
          type: 'url',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'pricing',
          title: 'Pricing',
          type: 'string',
        },
        {
          name: 'rating',
          title: 'Rating (out of 5)',
          type: 'number',
          validation: (Rule) => Rule.required().min(0).max(5),
        },
        {
          name: 'pros',
          title: 'Pros',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'cons',
          title: 'Cons',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'comparisonTable',
      title: 'Comparison Table',
      type: 'array',
      of: [{ type: 'comparison' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'verdict',
      title: 'Verdict',
      type: 'object',
      fields: [
        {
          name: 'winner',
          title: 'Overall Winner',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'summary',
          title: 'Summary',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'itemABestFor',
          title: 'Item A Best For',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'itemBBestFor',
          title: 'Item B Best For',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detailedComparison',
      title: 'Detailed Comparison',
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
      itemA: 'itemA.name',
      itemB: 'itemB.name',
      publishedAt: 'publishedAt',
    },
    prepare({ title, itemA, itemB, publishedAt }) {
      return {
        title,
        subtitle: `${itemA} vs ${itemB} - ${new Date(publishedAt).toLocaleDateString()}`,
      }
    },
  },
})
