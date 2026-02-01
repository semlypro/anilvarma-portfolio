import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'glossaryTerm',
  title: 'Glossary Term',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'term',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'definition',
      title: 'Definition',
      type: 'text',
      rows: 3,
      description: 'Short, quotable definition (max 200 chars)',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'fullExplanation',
      title: 'Full Explanation',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedTerms',
      title: 'Related Terms',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'glossaryTerm' }] }],
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Blog Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
    }),
    defineField({
      name: 'examples',
      title: 'Examples',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Real-world examples of this term in use',
    }),
    defineField({
      name: 'letter',
      title: 'Letter',
      type: 'string',
      description: 'First letter for A-Z filtering',
      validation: (Rule) =>
        Rule.required()
          .length(1)
          .uppercase()
          .regex(/^[A-Z]$/, {
            name: 'uppercase letter',
          }),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
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
      title: 'term',
      subtitle: 'definition',
      letter: 'letter',
    },
    prepare({ title, subtitle, letter }) {
      return {
        title: `[${letter}] ${title}`,
        subtitle: subtitle.substring(0, 60) + '...',
      }
    },
  },
})
