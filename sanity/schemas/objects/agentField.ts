import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'agentField',
  title: 'Agent Input Field',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Field Name',
      type: 'string',
      description: 'Unique identifier for this field (e.g., "targetKeyword")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Display label shown to users (e.g., "Target Keyword")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Field Type',
      type: 'string',
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Textarea', value: 'textarea' },
          { title: 'URL', value: 'url' },
          { title: 'Number', value: 'number' },
          { title: 'Select', value: 'select' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      description: 'Example text shown in empty field',
    }),
    defineField({
      name: 'required',
      title: 'Required',
      type: 'boolean',
      description: 'Is this field required?',
      initialValue: false,
    }),
    defineField({
      name: 'options',
      title: 'Select Options',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Options for select field type',
      hidden: ({ parent }) => parent?.type !== 'select',
    }),
    defineField({
      name: 'validation',
      title: 'Validation Rules',
      type: 'object',
      fields: [
        {
          name: 'minLength',
          title: 'Minimum Length',
          type: 'number',
        },
        {
          name: 'maxLength',
          title: 'Maximum Length',
          type: 'number',
        },
        {
          name: 'pattern',
          title: 'Pattern (Regex)',
          type: 'string',
          description: 'Regular expression for validation',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'type',
      required: 'required',
    },
    prepare({ title, subtitle, required }) {
      return {
        title: title,
        subtitle: `${subtitle}${required ? ' (required)' : ''}`,
      }
    },
  },
})
