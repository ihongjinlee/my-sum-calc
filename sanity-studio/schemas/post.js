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
    {
      title: 'sum',
      name: 'sum',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'title',
      sum: 'sum',
      authorName: 'author.name',
      authorUserName: 'author.username',
    },
    prepare({ title, sum, authorName, authorUserName }) {
      return {
        title: `${title} : ${sum}`,
        subtitle: `by ${authorName} (${authorUserName})`,
      };
    },
  },
};
