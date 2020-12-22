import { ITreeNode } from './types';

export const STATIC_REPO: ITreeNode = {
  path: '/',
  id: 'root',
  type: 'tree',
  children: [
    {
      id: '1',
      path: 'test.tsx',
      type: 'blob',
      url:
        'https://raw.githubusercontent.com/arielweinberger/nestjs-course-task-management/master/src/main.ts',
    },
    {
      id: '2',
      path: 'test2.js',
      type: 'blob',
      url:
        'https://raw.githubusercontent.com/storybookjs/storybook/next/lib/cli/src/add.test.ts',
    },
    {
      id: '3',
      path: 'sub',
      type: 'tree',
      children: [
        {
          id: '4',
          path: 'subtest.txt',
          type: 'blob',
          url:
            'https://raw.githubusercontent.com/storybookjs/storybook/next/lib/cli/src/typings.d.ts',
        },
        {
          id: '5',
          path: 'sub2',
          type: 'tree',
          children: [
            {
              id: '6',
              path: 'subtest2.jsx',
              type: 'blob',
              url:
                'https://raw.githubusercontent.com/storybookjs/storybook/next/lib/client-api/src/hooks.ts',
            },
          ],
        },
      ],
    },
    {
      id: '7',
      path: 'sub02',
      type: 'tree',
      children: [
        {
          id: '8',
          path: 'subtest02.ts',
          type: 'blob',
          url:
            'https://raw.githubusercontent.com/storybookjs/storybook/next/lib/client-api/src/index.ts',
        },
      ],
    },
  ],
};
