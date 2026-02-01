import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
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
      name: 'bio',
      title: 'Bio',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experiences',
      title: 'Work Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'company',
              title: 'Company',
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
              name: 'startDate',
              title: 'Start Date',
              type: 'string',
              description: 'E.g., "Jan 2020" or "2020"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'endDate',
              title: 'End Date',
              type: 'string',
              description: 'Leave empty for current position',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'achievements',
              title: 'Key Achievements',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'logo',
              title: 'Company Logo',
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
          preview: {
            select: {
              title: 'company',
              subtitle: 'role',
              media: 'logo',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Skill Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'SEO', value: 'seo' },
                  { title: 'Analytics', value: 'analytics' },
                  { title: 'Tools', value: 'tools' },
                  { title: 'Marketing', value: 'marketing' },
                  { title: 'Development', value: 'development' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'proficiency',
              title: 'Proficiency (%)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0).max(100),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'category',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Certification Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'issuer',
              title: 'Issuer',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'date',
              title: 'Date Obtained',
              type: 'string',
              description: 'E.g., "Jan 2023"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'logo',
              title: 'Logo',
              type: 'image',
              fields: [
                {
                  name: 'alt',
                  title: 'Alternative Text',
                  type: 'string',
                },
              ],
            },
            {
              name: 'credentialUrl',
              title: 'Credential URL',
              type: 'url',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'issuer',
              media: 'logo',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'philosophy',
      title: 'Philosophy/Approach',
      type: 'portableText',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'buttonLink',
          title: 'Button Link',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
        subtitle: 'About Page Content',
      }
    },
  },
})
