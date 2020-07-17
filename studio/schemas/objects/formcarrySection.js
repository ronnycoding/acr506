export default {
  type: 'object',
  name: 'formcarrySection',
  title: 'Form integration https://formcarry.com/',
  fields: [
    {
      name: 'label',
      type: 'string',
      title: 'Label'
    },
    {
      name: 'heading',
      type: 'portableText',
      title: 'Heading'
    },
    {
      name: 'formcarryFormId',
      type: 'string',
      title: 'Form ID'
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      title: 'label'
    },
    prepare({ title }) {
      return {
        title: `form: ${title}`,
        subtitle: 'Text section'
      }
    }
  }
}
