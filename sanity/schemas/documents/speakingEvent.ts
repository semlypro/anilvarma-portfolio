import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'speakingEvent',
  title: 'Speaking Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Your presentation/talk title',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'eventName',
      title: 'Event Name',
      type: 'string',
      description: 'Conference/podcast/event name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Conference', value: 'conference' },
          { title: 'Podcast', value: 'podcast' },
          { title: 'Webinar', value: 'webinar' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Interview', value: 'interview' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or other video platform',
    }),
    defineField({
      name: 'slidesUrl',
      title: 'Slides URL',
      type: 'url',
      description: 'Link to presentation slides',
    }),
    defineField({
      name: 'eventLogo',
      title: 'Event Logo',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'eventUrl',
      title: 'Event Website URL',
      type: 'url',
    }),
    defineField({
      name: 'isUpcoming',
      title: 'Is Upcoming',
      type: 'boolean',
      description: 'Toggle for future events',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eventName: 'eventName',
      date: 'date',
      media: 'eventLogo',
      isUpcoming: 'isUpcoming',
    },
    prepare({ title, eventName, date, media, isUpcoming }) {
      return {
        title: `${title}${isUpcoming ? ' (Upcoming)' : ''}`,
        subtitle: `${eventName} - ${new Date(date).toLocaleDateString()}`,
        media,
      }
    },
  },
})
