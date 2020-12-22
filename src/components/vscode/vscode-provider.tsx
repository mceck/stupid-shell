import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import { STATIC_REPO } from './static-repository';

interface ITab {
  id: string;
  name: string;
  url: string;
}

interface IVSCode {
  repo: IRepository;
  tabs: ITab[];
  editorContent: string;
  currentTab?: string;
  openTab?: (id: string) => void;
  closeTab?: (id: string) => void;
  loadFile?: (url: string) => void;
  setEditorContent?: (val: string) => void;
}
interface IVSCodeAction {
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

interface IRepository {
  name: string;
  lang: string;
  tree: ITreeNode;
}

const initialVSCodeState: IVSCode = {
  repo: {
    lang: 'typescript',
    name: '',
    tree: {
      id: 'root',
      path: '/',
      type: 'root',
    },
  },
  tabs: [],
  editorContent: '',
};

const Context: React.Context<IVSCode> = React.createContext(initialVSCodeState);

export const useVSCode = () => useContext(Context);

export const VSCodeConsumer = Context.Consumer;

export const VSCodeProvider: React.FC<{ githubUrl: string }> = ({
  children,
  githubUrl,
}) => {
  const [state, dispatch] = useReducer<React.Reducer<IVSCode, IVSCodeAction>>(
    vsReducer,
    initialVSCodeState
  );

  const loadFile = useCallback(
    async (url: string) => {
      dispatch({ type: 'set-editor-content', payload: 'Loading...' });
      let newVal = '';
      try {
        newVal = await fetchRaw(url);
      } catch (error) {
        newVal = 'Error loading file';
      }
      dispatch({ type: 'set-editor-content', payload: newVal });
    },
    [dispatch]
  );

  const openTab = useCallback(
    async (id: string) => {
      const exist = state.tabs.find((t) => t.id === id);
      if (exist) {
        dispatch({ type: 'focus-tab', payload: id });
        if (exist.url) await loadFile(exist.url);
        return;
      }
      const file: ITreeNode | null = findFileById(state.repo.tree, id);
      if (!file) throw new Error('file not found');
      const tab: ITab = {
        id,
        name: file.path,
        url: file.url!,
      };
      if (tab.url) await loadFile(tab.url);
      dispatch({ type: 'open-tab', payload: tab });
    },
    [dispatch, loadFile, state.repo.tree, state.tabs]
  );

  const closeTab = useCallback(
    (id: string) => {
      const exist = state.tabs.find((t) => t.id === id);
      if (!exist) throw new Error('file not found');
      dispatch({ type: 'close-tab', payload: id });
      let load = state.tabs[state.tabs.length - 1];
      if (load && load.id === id) load = state.tabs[state.tabs.length - 2];

      if (load) {
        loadFile(load.url);
        dispatch({ type: 'focus-tab', payload: load.id });
      }
    },
    [dispatch, loadFile, state.tabs]
  );

  const setEditorContent = useCallback(
    (val: string) => {
      dispatch({ type: 'set-editor-content', payload: val });
    },
    [dispatch]
  );

  useEffect(() => {
    // load github repo
    dispatch({ type: 'load-repo', payload: githubUrl });
  }, [githubUrl, dispatch]);

  const vscode: IVSCode = {
    ...state,
    loadFile,
    openTab,
    closeTab,
    setEditorContent,
  };

  return <Context.Provider value={vscode}>{children}</Context.Provider>;
};

const vsReducer = (state: IVSCode, action: IVSCodeAction) => {
  const newState = { ...state };
  switch (action.type) {
    case 'load-repo':
      newState.repo = {
        lang: 'typescript',
        name: 'test',
        tree: STATIC_REPO,
      };
      // TODO - NEED TO REGISTER GITHUB APP FOR RATE LIMIT
      // loadRepo(action.payload).then(({ lang, tree }) => {
      //   newState.tree = tree;
      //   newState.lang = lang;
      //   console.log(tree);
      // });
      break;
    case 'set-lang':
      newState.repo.lang = action.payload;
      break;
    case 'open-tab':
      newState.tabs = [...newState.tabs, action.payload];
      newState.currentTab = action.payload.id;
      break;
    case 'close-tab':
      newState.tabs = newState.tabs.filter((t) => t.id !== action.payload);
      newState.currentTab = undefined;
      newState.editorContent = 'Open a file...';
      break;
    case 'set-editor-content':
      newState.editorContent = action.payload;
      break;
    case 'focus-tab':
      newState.currentTab = action.payload;
      break;
    default:
      break;
  }
  return newState;
};

// const loadRepo = async (
//   url: string
// ): Promise<{ lang: string; tree: ITreeNode }> => {
//   let result = await fetch(url);
//   const root = await result.json();
//   result = await fetch(`${url}/branches/master`);
//   const master = await result.json();
//   console.log(master);

//   const lang = root.language.toLowerCase();
//   const tree: ITreeNode = {
//     id: 'root',
//     path: '/',
//     type: 'tree',
//     children: await fetchTree(master.commit.commit.tree.url),
//   };

//   return { lang, tree };
// };

// const fetchTree = async (url: string): Promise<ITreeNode[]> => {
//   let result = await fetch(url);
//   const root = await result.json();
//   const tree: ITreeNode[] = [];
//   for (let i = 0; i < root.tree.length; i++) {
//     const { id, path, type, url } = root.tree[i];
//     tree.push({
//       id,
//       path,
//       type,
//       children: type === 'tree' ? await fetchTree(url) : undefined,
//       value: type === 'blob' ? await fetchBlob(url) : undefined,
//     });
//   }
//   return tree;
// };

// const fetchBlob = async (url: string): Promise<string> => {
//   let result = await fetch(url);
//   const file = await result.json();
//   console.log(file);

//   return atob(file.content);
// };

const fetchRaw = async (url: string): Promise<string> => {
  let result = await fetch(url);
  const file = await result.text();
  return file;
};

const findFileById = (node: ITreeNode, id: string): ITreeNode | null => {
  if (node.id === id) return node;
  if (node.children)
    for (let i = 0; i < node.children.length; i++) {
      const n = node.children[i];
      if (n.id === id) return n;
      if (n.type === 'tree') {
        const found = findFileById(n, id);
        if (found) return found;
      }
    }
  return null;
};
