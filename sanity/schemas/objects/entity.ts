import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'entity',
  title: 'Entity',
  type: 'object',
  description: 'Structured data entity for AEO (Answer Engine Optimization)',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Person', value: 'Person' },
          { title: 'Organization', value: 'Organization' },
          { title: 'Tool', value: 'Tool' },
          { title: 'Concept', value: 'Concept' },
          { title: 'Place', value: 'Place' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sameAs',
      title: 'Same As (URLs)',
      type: 'array',
      of: [{ type: 'url' }],
      description: 'URLs that identify this entity (e.g., Wikipedia, LinkedIn, official website)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
    },
  },
})
