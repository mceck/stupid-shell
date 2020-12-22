import React from 'react';
import { SidebarFrame, SideHeader, FileNode } from './styles';
import { ITreeNode } from './types';
import { useVSCode } from './vscode-provider';
import { VSFileIcon } from './VSFileIcon';

export const VSSidebar = () => {
  const vscode = useVSCode();
  return (
    <SidebarFrame>
      <SideHeader>Project</SideHeader>
      <NodeRender tree={vscode.repo.tree} />
    </SidebarFrame>
  );
};

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
