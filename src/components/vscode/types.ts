export interface ITab {
  id: string;
  name: string;
  url: string;
}

export interface IVSCode {
  repo: IRepository;
  tabs: ITab[];
  editorContent: string;
  currentTab?: string;
  openTab?: (id: string) => void;
  closeTab?: (id: string) => void;
  loadFile?: (url: string) => void;
  setEditorContent?: (val: string) => void;
}
export interface IVSCodeAction {
  type:
    | 'load-repo'
    | 'set-lang'
    | 'open-tab'
    | 'close-tab'
    | 'set-editor-content'
    | 'focus-tab';
  payload?: any;
}

export interface ITreeNode {
  id: string;
  path: string;
  type: 'root' | 'blob' | 'tree' | string;
  children?: ITreeNode[];
  url?: string;
}

export interface IRepository {
  name: string;
  lang: string;
  tree: ITreeNode;
}
