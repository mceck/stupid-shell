export type MonacoInstance = typeof import('/Users/mattia/workspace/stupid-shell/node_modules/monaco-editor/esm/vs/editor/editor.api');
let monaco: MonacoInstance;

export const setMonaco = (m: MonacoInstance) => (monaco = m);
export const getMonaco = (): MonacoInstance => monaco;
