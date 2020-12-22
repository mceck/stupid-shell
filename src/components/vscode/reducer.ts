import { STATIC_REPO } from './static-repository';
import { IVSCode, IVSCodeAction, ITreeNode } from './types';

export const vsReducer = (state: IVSCode, action: IVSCodeAction) => {
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

// export const loadRepo = async (
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

// export const fetchTree = async (url: string): Promise<ITreeNode[]> => {
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

// export const fetchBlob = async (url: string): Promise<string> => {
//   let result = await fetch(url);
//   const file = await result.json();
//   console.log(file);

//   return atob(file.content);
// };

export const fetchRaw = async (url: string): Promise<string> => {
  let result = await fetch(url);
  const file = await result.text();
  return file;
};

export const findFileById = (node: ITreeNode, id: string): ITreeNode | null => {
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
