import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { fetchRaw, findFileById, vsReducer } from './reducer';
import { IVSCode, IVSCodeAction, ITreeNode, ITab } from './types';

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

export const VSCodeProvider: React.FC<{
  children: ReactNode;
  githubUrl?: string;
}> = ({ children, githubUrl }) => {
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
