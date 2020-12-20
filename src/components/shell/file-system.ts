import { CmdFn } from './cmd-functions';

export interface IFile {
  name: string;
  children?: File[];
  parent?: File;
  ln?: CmdFn;
}

export class File implements IFile {
  name: string;
  children?: File[];
  parent?: File;
  ln?: CmdFn;

  constructor(file: IFile) {
    this.name = file.name;
    this.children = file.children;
    this.parent = file.parent;
    this.ln = file.ln;
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
const TEST = new File({ name: 'test', parent: MCDEV });
const CURRICULUM = new File({
  name: 'curriculum',
  parent: MCDEV,
  ln: 'curriculum.app',
});
MCDEV.children = [SKILLS, TEST, CURRICULUM];

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
