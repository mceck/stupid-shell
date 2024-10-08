import React, { useCallback } from 'react';
import { Editor, Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { VSSidebar } from './VSSidebar';
import { VSTabBar } from './VSTabBar';
import { useVSCode, VSCodeProvider } from './vscode-provider';
import { VSCodeFrame, Expanded, LoadingBox } from './styles';

export const VSCode: React.FC<{ githubUrl?: string }> = ({ githubUrl }) => {
  return (
    <VSCodeProvider githubUrl={githubUrl}>
      <VSCodeFrame>
        <VSSidebar />
        <Expanded>
          <VSTabBar />
          <VSEditor />
        </Expanded>
      </VSCodeFrame>
    </VSCodeProvider>
  );
};

const VSEditor = () => {
  const vscode = useVSCode();

  const onMount = useCallback(
    (_editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });
    },
    []
  );

  return (
    <Editor
      language={vscode.repo.lang}
      theme="vs-dark"
      options={{ fontSize: 12, fontFamily: 'SFMono' }}
      loading={
        <LoadingBox>
          <img src={'/vscode.png'} alt="vsicon" /> Loading...
        </LoadingBox>
      }
      value={vscode.editorContent}
      onMount={onMount}
    />
  );
};
