import React from 'react';
import styled from 'styled-components';
import { ITreeNode, useVSCode } from './vscode-provider';
import { VSFileIcon } from './VSTabBar';

export const VSSidebar = () => {
  const vscode = useVSCode();
  return (
    <SidebarFrame>
      <SideHeader>Project</SideHeader>
      <NodeRender tree={vscode.repo.tree} />
    </SidebarFrame>
  );
};

const SidebarFrame = styled.div`
  height: 100%;
  width: 30%;
  background-color: #282828;
  overflow: auto;
  color: #ffffff;
  padding-top: 28px;
  position: relative;
  font-size: 0.9rem;
`;

const SideHeader = styled.div`
  width: 100%;
  background-color: #202020;
  color: #aeaeae;
  font-weight: bold;
  padding: 6px 20px;
  font-size: 0.8rem;
  position: absolute;
  left: 0;
  top: 0;
`;

const NodeRender: React.FC<{ tree: ITreeNode; padLeft?: number }> = ({
  tree,
  padLeft = 5,
}) => {
  const vscode = useVSCode();
  if (!tree.children) return null;
  return (
    <>
      {tree.children.map((n) => {
        if (n.type === 'tree')
          return (
            <div key={n.id}>
              <div style={{ paddingLeft: padLeft || 2 }}>
                <VSFileIcon name={n.path} />
                {n.path}
              </div>
              <NodeRender tree={n} padLeft={padLeft + 10} />
            </div>
          );
        if (n.type === 'blob')
          return n.url ? (
            <FileNode
              key={n.id}
              onClick={() =>
                vscode.currentTab !== n.id ? vscode.openTab!(n.id) : null
              }
              active={vscode.currentTab === n.id}
              padLeft={padLeft}
            >
              <VSFileIcon name={n.path} />
              {n.path}
            </FileNode>
          ) : null;
        return null;
      })}
    </>
  );
};

const FileNode = styled.div<{ active?: boolean; padLeft?: number }>`
  cursor: pointer;
  padding-bottom: 4px;
  ${({ active }) => (active ? 'background-color: #505050;' : '')}
  ${({ padLeft }) => (padLeft ? `padding-left: ${padLeft}px;` : '')}
  :hover {
    background-color: #454545;
  }
  transition: all ease 100ms;
`;
