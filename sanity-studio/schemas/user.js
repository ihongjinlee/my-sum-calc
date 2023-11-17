export default {
  title: 'user',
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'username',
      name: 'username',
      type: 'string',
    },
    {
      title: 'name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'image',
      name: 'image',
      type: 'string',
    },
    {
      title: 'posts',
      name: 'posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'username',
    },
  },
};
