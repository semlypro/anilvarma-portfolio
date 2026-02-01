import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'isExternal',
              title: 'Is External Link?',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'children',
              title: 'Submenu Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'href',
                      title: 'Link',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'isExternal',
                      title: 'Is External Link?',
                      type: 'boolean',
                      initialValue: false,
                    },
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'href',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footerNav',
      title: 'Footer Navigation',
      type: 'object',
      fields: [
        {
          name: 'columns',
          title: 'Footer Columns',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Column Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'items',
                  title: 'Navigation Items',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'label',
                          title: 'Label',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        },
                        {
                          name: 'href',
                          title: 'Link',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        },
                        {
                          name: 'isExternal',
                          title: 'Is External Link?',
                          type: 'boolean',
                          initialValue: false,
                        },
                      ],
                      preview: {
                        select: {
                          title: 'label',
                          subtitle: 'href',
                        },
                      },
                    },
                  ],
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: 'title',
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().max(4),
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation',
        subtitle: 'Site Navigation Settings',
      }
    },
  },
})
