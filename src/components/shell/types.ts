export interface CmdReturn {
  result: ILine | null;
  path?: File;
  sep?: Separator;
  customForm?: React.ReactNode;
}

export type CmdFn =
  | 'cd'
  | 'ls'
  | 'echo'
  | './'
  | 'clear'
  | 'curriculum.app'
  | 'help'
  | 'contact.me'
  | 'exit'
  | 'minimize'
  | 'maximize';

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

export type Separator = '$' | '#';

export interface ISpan {
  text: string;
  icon?: string;
  color?: string;
  link?: string;
}

export interface ILine {
  cmd: ISpan[];
  path?: File;
  sep?: Separator;
}

export interface IShell {
  lines: ILine[];
  path: File;
  sep: Separator;
  historyMarker?: number;
  pushCmd?: (cmd: string) => void;
  moveFrame?: (mov: { x: number; y: number }) => void;
  scrollBottom?: () => void;
  focusCmdInput?: () => void;
  clear?: () => void;
  setHistoryMarker?: (marker?: number) => void;
  scroller?: React.MutableRefObject<any>;
  cmdInput?: React.MutableRefObject<any>;
  customForm?: React.ReactNode;
}

export interface ShellAction {
  type: 'push-cmd' | 'move-frame' | 'clear' | 'set-history-marker';
  payload?: any;
}
