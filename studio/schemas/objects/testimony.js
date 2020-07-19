export default {
  type: 'object',
  name: 'testimony',
  title: '',
  fields: [
    {
      name: 'testimonyName',
      type: 'string',
      title: 'Testimony Name'
    },
    {
      name: 'testimonyQuote',
      type: 'simplePortableText',
      title: 'Quote'
    },
    {
      name: 'testimonyImage',
      type: 'image',
      title: 'Witness Image',
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      title: 'testimonyName',
      media: 'testimonyImage'
    },
    prepare({ title, media }) {
      return {
        title,
        media
      }
    }
  }
}
