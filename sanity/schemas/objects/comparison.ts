import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'comparison',
  title: 'Comparison Row',
  type: 'object',
  fields: [
    defineField({
      name: 'feature',
      title: 'Feature',
      type: 'string',
      description: 'Feature being compared',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'itemAValue',
      title: 'Item A Value',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'itemBValue',
      title: 'Item B Value',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'winner',
      title: 'Winner',
      type: 'string',
      options: {
        list: [
          { title: 'Item A', value: 'A' },
          { title: 'Item B', value: 'B' },
          { title: 'Tie', value: 'Tie' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      feature: 'feature',
      itemAValue: 'itemAValue',
      itemBValue: 'itemBValue',
      winner: 'winner',
    },
    prepare({ feature, itemAValue, itemBValue, winner }) {
      return {
        title: feature,
        subtitle: `${itemAValue} vs ${itemBValue} (Winner: ${winner})`,
      }
    },
  },
})
