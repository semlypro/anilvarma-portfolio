import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'template',
  title: 'Template',
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
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'templateCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'previewImages',
      title: 'Preview Images',
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
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'file',
      title: 'Template File',
      type: 'file',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fileFormat',
      title: 'File Format',
      type: 'string',
      description: 'E.g., "Google Sheets", "Excel", "PDF", "Notion"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fileSize',
      title: 'File Size',
      type: 'string',
      description: 'E.g., "2.5 MB"',
    }),
    defineField({
      name: 'downloadCount',
      title: 'Download Count',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What can this template be used for?',
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'portableText',
      description: 'How to use this template',
    }),
    defineField({
      name: 'relatedTemplates',
      title: 'Related Templates',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'template' }] }],
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
    // Email Gate Settings
    defineField({
      name: 'emailGateEnabled',
      title: 'Require Email to Download',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'thankYouMessage',
      title: 'Thank You Message',
      type: 'text',
      rows: 3,
      description: 'Custom message shown after download',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
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
      category: 'category.title',
      media: 'previewImages.0',
      downloads: 'downloadCount',
    },
    prepare({ title, category, media, downloads }) {
      return {
        title,
        subtitle: `${category} - ${downloads} downloads`,
        media,
      }
    },
  },
})
