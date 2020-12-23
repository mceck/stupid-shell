import { ITreeNode } from './types';

export const STATIC_REPO: ITreeNode = {
  path: '/',
  id: 'root',
  type: 'tree',
  children: [
    {
      id: 'src',
      path: 'src',
      type: 'tree',
      children: [
        {
          id: 'src/db',
          path: 'db',
          type: 'tree',
          children: [
            {
              id: 'src/db/auth.yml',
              path: 'auth.yml',
              type: 'blob',
              url:
                'https://raw.githubusercontent.com/mceck/fullstack_server/master/src/db/auth.yml',
            },
          ],
        },
        {
          id: 'src/entity',
          path: 'entity',
          type: 'tree',
          children: [
            {
              id: 'src/entity/Role.ts',
              path: 'Role.ts',
              type: 'blob',
              url:
                'https://raw.githubusercontent.com/mceck/fullstack_server/master/src/entity/Role.ts',
            },
            {
              id: 'src/entity/User.ts',
              path: 'User.ts',
              type: 'blob',
              url:
                'https://raw.githubusercontent.com/mceck/fullstack_server/master/src/entity/User.ts',
            },
          ],
        },
        {
          id: 'src/interface',
          path: 'interface',
          type: 'tree',
          children: [
            {
              id: 'src/interface/Context.ts',
              path: 'Context.ts',
              type: 'blob',
              url:
                'https://raw.githubusercontent.com/mceck/fullstack_server/master/src/interface/Context.ts',
            },
          ],
        },
        {
          id: 'src/middleware',
          path: 'middleware',
          type: 'tree',
          children: [
            {
              id: 'src/middleware/authentication.ts',
              path: 'authentication.ts',
              type: 'blob',
              url:
                'https://raw.githubusercontent.com/mceck/fullstack_server/master/src/middleware/authentication.ts',
            },
            {
              id: 'src/middleware/routes.ts',
              path: 'src/middleware/routes.ts',
              type: 'blob',
              url:
                'https://raw.githubusercontent.com/mceck/fullstack_server/master/src/middleware/routes.ts',
            },
          ],
        },
        {
          id: 'src/resolver',
          path: 'resolver',
          type: 'tree',
          children: [
            {
              id: 'src/resolver/UserResolver.ts',
              path: 'UserResolver.ts',
              type: 'blob',
              url:
                'https://raw.githubusercontent.com/mceck/fullstack_server/master/src/resolver/UserResolver.ts',
            },
          ],
        },
        {
          id: 'src/dto',
          path: 'dto',
          type: 'tree',
          children: [
            {
              id: 'src/dto/LoginResponse.ts',
              path: 'LoginResponse.ts',
              type: 'blob',
              url:
                'https://raw.githubusercontent.com/mceck/fullstack_server/master/src/dto/LoginResponse.ts',
            },
          ],
        },

        {
          id: 'src/auth-tokens.ts',
          path: 'auth-tokens.ts',
          type: 'blob',
          url:
            'https://raw.githubusercontent.com/mceck/fullstack_server/master/src/auth-tokens.ts',
        },

        {
          id: 'src/init-db-data.ts',
          path: 'init-db-data.ts',
          type: 'blob',
          url:
            'https://raw.githubusercontent.com/mceck/fullstack_server/master/src/init-db-data.ts',
        },

        {
          id: 'src/index.ts',
          path: 'index.ts',
          type: 'blob',
          url:
            'https://raw.githubusercontent.com/mceck/fullstack_server/master/src/index.ts',
        },
      ],
    },
    {
      id: 'ormconfig.json',
      path: 'ormconfig.json',
      type: 'blob',
      url:
        'https://raw.githubusercontent.com/mceck/fullstack_server/master/ormconfig.json',
    },
    {
      id: 'package.json',
      path: 'package.json',
      type: 'blob',
      url:
        'https://raw.githubusercontent.com/mceck/fullstack_server/master/package.json',
    },
    {
      id: 'tsconfig.json',
      path: 'tsconfig.json',
      type: 'blob',
      url:
        'https://raw.githubusercontent.com/mceck/fullstack_server/master/tsconfig.json',
    },
    {
      id: 'README.md',
      path: 'README.md',
      type: 'blob',
      url:
        'https://raw.githubusercontent.com/mceck/fullstack_server/master/README.md',
    },
  ],
};
