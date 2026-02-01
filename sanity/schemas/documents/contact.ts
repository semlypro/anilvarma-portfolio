import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) =>
        Rule.required().email().error('Please enter a valid email address'),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Template Download', value: 'template_download' },
          { title: 'Newsletter', value: 'newsletter' },
          { title: 'Contact Form', value: 'contact_form' },
          { title: 'Agent Usage', value: 'agent_usage' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceId',
      title: 'Source ID',
      type: 'string',
      description: 'Reference to template, agent, etc.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      description: 'Additional data stored as key-value pairs',
      fields: [
        {
          name: 'userAgent',
          title: 'User Agent',
          type: 'string',
        },
        {
          name: 'referrer',
          title: 'Referrer',
          type: 'string',
        },
        {
          name: 'utmSource',
          title: 'UTM Source',
          type: 'string',
        },
        {
          name: 'utmMedium',
          title: 'UTM Medium',
          type: 'string',
        },
        {
          name: 'utmCampaign',
          title: 'UTM Campaign',
          type: 'string',
        },
      ],
    }),
  ],
  preview: {
    select: {
      email: 'email',
      name: 'name',
      source: 'source',
      createdAt: 'createdAt',
    },
    prepare({ email, name, source, createdAt }) {
      return {
        title: name || email,
        subtitle: `${source} - ${new Date(createdAt).toLocaleDateString()}`,
      }
    },
  },
})
