import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seoAgent',
  title: 'SEO Agent',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name or emoji',
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
      to: [{ type: 'agentCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'systemPrompt',
      title: 'System Prompt',
      type: 'text',
      rows: 10,
      description: 'Claude API system prompt (hidden from public)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'inputFields',
      title: 'Input Fields',
      type: 'array',
      of: [{ type: 'agentField' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'outputFormat',
      title: 'Output Format',
      type: 'string',
      options: {
        list: [
          { title: 'Markdown', value: 'markdown' },
          { title: 'JSON', value: 'json' },
          { title: 'Structured', value: 'structured' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'usageExamples',
      title: 'Usage Examples',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'input',
              title: 'Example Input',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'output',
              title: 'Example Output',
              type: 'text',
              rows: 5,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              input: 'input',
            },
            prepare({ input }) {
              return {
                title: input.substring(0, 50) + '...',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'limitations',
      title: 'Limitations',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What this agent cannot do',
    }),
    defineField({
      name: 'pricingTier',
      title: 'Pricing Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Free', value: 'free' },
          { title: 'Premium', value: 'premium' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'usageLimit',
      title: 'Usage Limit (per day)',
      type: 'number',
      description: 'Maximum uses per day per user',
      validation: (Rule) => Rule.required().min(1),
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
      name: 'isEnabled',
      title: 'Is Enabled',
      type: 'boolean',
      description: 'Toggle to enable/disable this agent',
      initialValue: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category.title',
      isEnabled: 'isEnabled',
      pricingTier: 'pricingTier',
    },
    prepare({ title, category, isEnabled, pricingTier }) {
      return {
        title,
        subtitle: `${category} - ${pricingTier} ${isEnabled ? '✓' : '✗'}`,
      }
    },
  },
})
