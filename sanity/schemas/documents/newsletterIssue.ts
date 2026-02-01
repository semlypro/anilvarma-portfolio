import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'newsletterIssue',
  title: 'Newsletter Issue',
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
      name: 'previewText',
      title: 'Preview Text',
      type: 'text',
      rows: 2,
      description: 'Email preview/snippet text',
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isPublished',
      title: 'Is Published',
      type: 'boolean',
      description: 'Toggle to publish/unpublish',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      isPublished: 'isPublished',
    },
    prepare({ title, publishedAt, isPublished }) {
      return {
        title: `${title} ${isPublished ? '✓' : '✗'}`,
        subtitle: new Date(publishedAt).toLocaleDateString(),
      }
    },
  },
})
