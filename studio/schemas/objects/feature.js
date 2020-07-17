export default {
  type: 'object',
  name: 'feature',
  title: 'Feature',
  fields: [
    {
      name: 'featureLogo',
      type: 'image',
      title: 'Logo',
      options: {
        hotspot: true
      }
    },
    {
      title: 'Title',
      name: 'featureTitle',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'featureDescription',
      type: 'portableText'
    }
  ]
}
