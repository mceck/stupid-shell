import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { VSSidebar } from './VSSidebar';
import { VSTabBar } from './VSTabBar';
import { useVSCode, VSCodeProvider } from './vscode-provider';
import { VSCodeFrame, Expanded, LoadingBox } from './styles';

export const VSCode: React.FC<{ githubUrl: string }> = ({ githubUrl }) => {
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
  console.log(vscode.editorContent);

  return (
    <ControlledEditor
      language={vscode.repo.lang}
      theme="dark"
      options={{ fontSize: 14, fontFamily: 'SFMono' }}
      loading={
        <LoadingBox>
          <img src={process.env.PUBLIC_URL + '/vscode.png'} alt="vsicon" />{' '}
          Loading...
        </LoadingBox>
      }
      value={vscode.editorContent}
    />
  );
};
