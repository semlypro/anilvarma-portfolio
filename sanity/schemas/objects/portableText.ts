import { defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'portableText',
  title: 'Portable Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'External Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                name: 'blank',
                type: 'boolean',
                title: 'Open in new tab',
                initialValue: true,
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal Link',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  { type: 'blogPost' },
                  { type: 'comparisonPost' },
                  { type: 'listiclePost' },
                  { type: 'template' },
                  { type: 'seoAgent' },
                  { type: 'caseStudy' },
                  { type: 'glossaryTerm' },
                ],
              },
            ],
          },
        ],
      },
    }),
    // Image
    defineArrayMember({
      type: 'image',
      name: 'inlineImage',
      title: 'Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    // Code Block
    defineArrayMember({
      type: 'code',
      name: 'codeBlock',
      title: 'Code Block',
      options: {
        language: 'javascript',
        languageAlternatives: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'Python', value: 'python' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JSON', value: 'json' },
          { title: 'Bash', value: 'bash' },
          { title: 'SQL', value: 'sql' },
        ],
        withFilename: true,
      },
    }),
    // Callout Block
    defineArrayMember({
      type: 'object',
      name: 'callout',
      title: 'Callout',
      fields: [
        {
          name: 'type',
          type: 'string',
          title: 'Type',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Warning', value: 'warning' },
              { title: 'Tip', value: 'tip' },
              { title: 'Success', value: 'success' },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'content',
          type: 'text',
          title: 'Content',
          rows: 3,
          validation: (Rule) => Rule.required(),
        },
      ],
      preview: {
        select: {
          type: 'type',
          content: 'content',
        },
        prepare({ type, content }) {
          return {
            title: type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Callout',
            subtitle: content,
          }
        },
      },
    }),
    // Table
    defineArrayMember({
      type: 'object',
      name: 'table',
      title: 'Table',
      fields: [
        {
          name: 'rows',
          type: 'array',
          title: 'Rows',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'cells',
                  type: 'array',
                  title: 'Cells',
                  of: [{ type: 'string' }],
                },
              ],
            },
          ],
        },
      ],
    }),
    // Embedded Video
    defineArrayMember({
      type: 'object',
      name: 'video',
      title: 'Embedded Video',
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'Video URL',
          description: 'YouTube or Vimeo URL',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }).custom((url) => {
              if (!url) return true
              const isYouTube = url.includes('youtube.com') || url.includes('youtu.be')
              const isVimeo = url.includes('vimeo.com')
              return isYouTube || isVimeo ? true : 'Must be a YouTube or Vimeo URL'
            }),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
      preview: {
        select: {
          url: 'url',
          caption: 'caption',
        },
        prepare({ url, caption }) {
          return {
            title: caption || 'Embedded Video',
            subtitle: url,
          }
        },
      },
    }),
  ],
})
