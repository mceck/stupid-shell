import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'moment/locale/it';
import { monaco } from '@monaco-editor/react';
import { setMonaco } from './components/vscode/monaco-ref';

monaco.init().then((m) => {
  setMonaco(m);
  m.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
  });
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
