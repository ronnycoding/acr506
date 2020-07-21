export default {
  type: 'object',
  name: 'socialNetwork',
  title: 'Social Network',
  fields: [
    {
      name: 'network',
      type: 'string',
      options: {
        list: [
          { value: 'linkedIn', title: 'LinkedIn' },
          { value: 'facebook', title: 'Facebook' },
          { value: 'instagram', title: 'Instagram' },
          { value: 'twitter', title: 'Twitter' },
          { value: 'email', title: 'Email' },
          { value: 'phone', title: 'Phone Number' }
        ]
      }
    },
    {
      title: 'Social Network url/email/phone number',
      name: 'networkLink',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'network'
    },
    prepare({ title }) {
      return {
        title
      }
    }
  }
}
