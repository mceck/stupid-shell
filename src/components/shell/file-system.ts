import { shellColors } from './shell-colors';
import { File } from './types';

export const ROOT = new File({ name: '' });

export const HOME = new File({ name: 'home', parent: ROOT });
ROOT.children = [HOME];

export const MCDEV = new File({ name: 'mcdev', parent: HOME });
HOME.children = [MCDEV];

const SKILLS = new File({ name: 'skills', parent: MCDEV, children: [] });

const PRIZES = new File({ name: 'prizes', parent: MCDEV, children: [] });

const CONTACT = new File({
  name: 'contact',
  parent: MCDEV,
  ln: 'contact.me',
});
const CURRICULUM = new File({
  name: 'curriculum',
  parent: MCDEV,
  ln: 'curriculum.app',
});
MCDEV.children = [CURRICULUM, SKILLS, PRIZES, CONTACT];

const SKILL_FRONTEND = new File({
  name: 'Frontend',
  icon: process.env.PUBLIC_URL + '/frontend.png',
  parent: SKILLS,
  textColor: shellColors.blue,
});
const SKILL_BACKEND = new File({
  name: 'Backend',
  icon: process.env.PUBLIC_URL + '/backend.png',
  parent: SKILLS,
  textColor: shellColors.red,
});
const SKILL_OTHER = new File({
  name: 'Other',
  icon: process.env.PUBLIC_URL + '/other.png',
  parent: SKILLS,
});

const FRONTEND_SKILLS = [
  new File({
    name: 'HTML5',
    icon: process.env.PUBLIC_URL + '/html5.png',
    textColor: shellColors.red,
  }),
  new File({
    name: 'CSS3',
    icon: process.env.PUBLIC_URL + '/css.png',
    textColor: shellColors.blue,
  }),
  new File({
    name: 'JavaScript',
    icon: process.env.PUBLIC_URL + '/js.png',
    textColor: shellColors.yellow,
  }),
  new File({
    name: 'React',
    icon: process.env.PUBLIC_URL + '/react.png',
    textColor: shellColors.blue,
  }),
  new File({
    name: 'React Native',
    icon: process.env.PUBLIC_URL + '/react_native.png',
    textColor: shellColors.green,
  }),

  new File({
    name: 'Angular',
    icon: process.env.PUBLIC_URL + '/angular.png',
    textColor: shellColors.red,
  }),
  new File({
    name: 'Vue',
    icon: process.env.PUBLIC_URL + '/vue.png',
    textColor: shellColors.green,
  }),
  new File({
    name: 'Svelt',
    icon: process.env.PUBLIC_URL + '/svelt.png',
  }),
  new File({
    name: 'Dart',
    icon: process.env.PUBLIC_URL + '/dart.png',
    textColor: shellColors.blue,
  }),
  new File({
    name: 'Flutter',
    icon: process.env.PUBLIC_URL + '/flutter.png',
    textColor: shellColors.blue,
  }),
];

const BACKEND_SKILLS = [
  new File({
    name: 'RESTful',
    icon: process.env.PUBLIC_URL + '/rest.png',
    textColor: shellColors.white,
  }),
  new File({
    name: 'GraphQL',
    icon: process.env.PUBLIC_URL + '/graphql.png',
    textColor: '#ff82ff',
  }),
  new File({
    name: 'Serverless',
    icon: process.env.PUBLIC_URL + '/serverless.png',
    textColor: shellColors.blue,
  }),
  new File({
    name: 'Node',
    icon: process.env.PUBLIC_URL + '/node.png',
    textColor: shellColors.green,
  }),
  new File({
    name: 'Rails',
    icon: process.env.PUBLIC_URL + '/rails.png',
    textColor: shellColors.red,
  }),
  new File({
    name: 'Python',
    icon: process.env.PUBLIC_URL + '/python.png',
    textColor: shellColors.yellow,
  }),
  new File({
    name: 'Java',
    icon: process.env.PUBLIC_URL + '/java.png',
    textColor: shellColors.red,
  }),
  new File({
    name: 'Spring',
    icon: process.env.PUBLIC_URL + '/spring.png',
    textColor: shellColors.green,
  }),
  new File({
    name: 'Mongodb',
    icon: process.env.PUBLIC_URL + '/mongo.png',
    textColor: shellColors.green,
  }),
  new File({
    name: 'PostgreSQL',
    icon: process.env.PUBLIC_URL + '/postgres.png',
    textColor: shellColors.yellow,
  }),
  new File({
    name: 'SQL Server',
    icon: process.env.PUBLIC_URL + '/mssql.png',
    textColor: shellColors.white,
  }),
  new File({
    name: 'MySql',
    icon: process.env.PUBLIC_URL + '/mysql.png',
    textColor: shellColors.blue,
  }),
  new File({
    name: 'Oracle',
    icon: process.env.PUBLIC_URL + '/oracle.png',
    textColor: shellColors.red,
  }),
];

const OTHER_SKILLS = [
  new File({
    name: 'Git',
    icon: process.env.PUBLIC_URL + '/git.png',
    textColor: shellColors.red,
  }),
  new File({
    name: 'Docker',
    icon: process.env.PUBLIC_URL + '/docker.png',
    textColor: shellColors.blue,
  }),
  new File({
    name: 'AWS',
    icon: process.env.PUBLIC_URL + '/aws.png',
    textColor: shellColors.white,
  }),
  new File({
    name: 'Firebase',
    icon: process.env.PUBLIC_URL + '/firebase.png',
    textColor: shellColors.yellow,
  }),
];

SKILL_FRONTEND.children = FRONTEND_SKILLS;
SKILL_BACKEND.children = BACKEND_SKILLS;
SKILL_OTHER.children = OTHER_SKILLS;
SKILLS.children = [SKILL_FRONTEND, SKILL_BACKEND, SKILL_OTHER];

const PRIZES_LIST = [
  new File({
    name: '1st place - Plansoft coding challenge 2021',
    textColor: shellColors.yellow,
    icon: '/prize.png',
  }),
  new File({
    name: '1st place - Codemotion Sailogy frontend challenge 2021',
    textColor: shellColors.yellow,
    icon: '/prize.png',
  }),
  new File({
    name: '1st place - Codemotion Lord of code Spanish edition - Frontend 2022',
    textColor: shellColors.yellow,
    icon: '/prize.png',
  }),
];
PRIZES.children = PRIZES_LIST;

export const listDirs = (f: File): string[] => {
  if (!f.children) return [];
  return f.children?.filter((c) => c.children).map((c) => c.name);
};

export const listFiles = (f: File): string[] => {
  if (!f.children) return [];
  return f.children?.filter((c) => !c.children).map((c) => c.name);
};

export const resolvePath = (path: string, from: File = ROOT): File => {
  if (path.startsWith('/')) return resolveRelativePath(ROOT, path.slice(1));
  return resolveRelativePath(from, path);
};

const resolveRelativePath = (from: File, path: string): File => {
  const pathParts = path.split('/');
  let file = from;
  pathParts.forEach((part) => {
    if (!part || part === '.') return;
    if (part === '..') {
      if (!file.parent) throw new Error('no such file or directory: ' + path);
      file = file.parent;
    } else {
      if (!file.children) throw new Error('no such file or directory: ' + path);
      const find = file.children.find((f) => f.name === part);
      if (!find) throw new Error('no such file or directory: ' + path);
      file = find;
    }
  });
  if (!file.children) throw new Error('not a directory: ' + path);
  return file;
};
