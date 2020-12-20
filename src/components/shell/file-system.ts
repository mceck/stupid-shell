import { CmdFn } from './cmd-functions';
import { shellColors } from './shell-colors';

export interface IFile {
  name: string;
  children?: File[];
  parent?: File;
  icon?: string;
  ln?: CmdFn;
  textColor?: string;
}

export class File implements IFile {
  name: string;
  children?: File[];
  parent?: File;
  icon?: string;
  ln?: CmdFn;
  textColor?: string;

  constructor(file: IFile) {
    this.name = file.name;
    this.children = file.children;
    this.parent = file.parent;
    this.icon = file.icon;
    this.ln = file.ln;
    this.textColor = file.textColor;
  }

  url() {
    let str = this.name || '/';
    let par = this.parent;
    while (par) {
      str = `${par.name}/${str}`;
      par = par.parent;
    }
    return str;
  }
}

export const ROOT = new File({ name: '' });

export const HOME = new File({ name: 'home', parent: ROOT });
ROOT.children = [HOME];

export const MCDEV = new File({ name: 'mcdev', parent: HOME });
HOME.children = [MCDEV];

const SKILLS = new File({ name: 'skills', parent: MCDEV, children: [] });
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
MCDEV.children = [CURRICULUM, SKILLS, CONTACT];

const SKILL_LIST = [
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
    name: 'Node',
    icon: process.env.PUBLIC_URL + '/node.png',
    textColor: shellColors.green,
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
    name: 'GraphQL',
    icon: process.env.PUBLIC_URL + '/graphql.png',
    textColor: '#ff82ff',
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
];
SKILLS.children = SKILL_LIST;

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
