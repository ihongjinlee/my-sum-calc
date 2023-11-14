export default {
  title: 'post',
  name: 'post',
  type: 'document',
  fields: [
    {
      title: 'title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'author',
      name: 'author',
      type: 'reference',
      to: [{ type: 'user' }],
    },
    {
      title: 'list',
      name: 'list',
      type: 'array',
      of: [
        {
          title: 'listitem',
          name: 'listitem',
          type: 'document',
          fields: [
            {
              title: 'memo',
              name: 'memo',
              type: 'string',
            },
            {
              title: 'value',
              name: 'value',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
};
