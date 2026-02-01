import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isAnonymized',
      title: 'Is Anonymized',
      type: 'boolean',
      description: 'Hide client name and logo for confidential projects',
      initialValue: false,
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'strategy',
      title: 'Strategy',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'E.g., "Organic Traffic"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'beforeValue',
              title: 'Before Value',
              type: 'string',
              description: 'E.g., "10,000/month"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'afterValue',
              title: 'After Value',
              type: 'string',
              description: 'E.g., "50,000/month"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'changePercent',
              title: 'Change Percent',
              type: 'string',
              description: 'E.g., "+400%"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'isPositive',
              title: 'Is Positive Change',
              type: 'boolean',
              initialValue: true,
            },
          ],
          preview: {
            select: {
              label: 'label',
              change: 'changePercent',
            },
            prepare({ label, change }) {
              return {
                title: label,
                subtitle: change,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      description: 'E.g., "6 months" or "Jan 2023 - Jun 2023"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'author',
          title: 'Author Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'role',
          title: 'Role',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'image',
          title: 'Author Image',
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'keyLearnings',
      title: 'Key Learnings',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points of insights gained',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
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
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedCaseStudies',
      title: 'Related Case Studies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
      validation: (Rule) => Rule.max(3),
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
      client: 'clientName',
      media: 'featuredImage',
      isAnonymized: 'isAnonymized',
    },
    prepare({ title, client, media, isAnonymized }) {
      return {
        title,
        subtitle: isAnonymized ? 'Confidential Client' : client,
        media,
      }
    },
  },
})
