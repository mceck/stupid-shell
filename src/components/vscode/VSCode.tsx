import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import styled from 'styled-components';
import { VSSidebar } from './VSSidebar';
import { VSTabBar } from './VSTabBar';
import { useVSCode, VSCodeProvider } from './vscode-provider';

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
        <LoadingBox style={{ color: '#dedede' }}>
          <img src={process.env.PUBLIC_URL + '/vscode.png'} /> Loading...
        </LoadingBox>
      }
      value={vscode.editorContent}
    />
  );
};

const VSCodeFrame = styled.div`
  background-color: #202124;
  width: 100%;
  height: 100%;
  display: flex;
`;

const Expanded = styled.div`
  width: 100%;
  height: 100%;
`;

const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  color: #dedede;

  img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
`;
