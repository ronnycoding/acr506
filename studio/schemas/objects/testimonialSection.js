export default {
  type: 'object',
  name: 'testimonialSection',
  title: 'Testimonial Section',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading'
    },
    {
      name: 'tagline',
      type: 'simplePortableText',
      title: 'Tagline'
    },
    {
      name: 'testimonies',
      type: 'array',
      title: 'Testimony',
      of: [
        {
          title: 'Testimony',
          type: 'testimony'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'heading'
    },
    prepare({ title }) {
      return {
        title
      }
    }
  }
}
