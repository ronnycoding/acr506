export default {
  type: 'object',
  name: 'featureSection',
  title: 'Features Section',
  fields: [
    {
      name: 'feas',
      type: 'array',
      title: 'Feature',
      of: [
        {
          title: 'Feature',
          type: 'feature'
        }
      ]
    }
  ],
  preview: {
    select: {
      titles: 'feas'
    },
    prepare({ titles }) {
      return {
        title: `Features: ${titles.map(({ featureTitle }) => featureTitle).join(', ')}`
      }
    }
  }
}
