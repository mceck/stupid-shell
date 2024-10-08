import React, { useState } from 'react';
import {
  SidebarFrame,
  SideHeader,
  FileNode,
  Scrollable,
  FolderNode,
} from './styles';
import { ITreeNode } from './types';
import { useVSCode } from './vscode-provider';
import { VSFileIcon } from './VSFileIcon';

export const VSSidebar = () => {
  const vscode = useVSCode();
  return (
    <SidebarFrame>
      <Scrollable $horizontal $vertical>
        <SideHeader>Project</SideHeader>
        <NodeRender tree={vscode.repo.tree} />
      </Scrollable>
    </SidebarFrame>
  );
};

const NodeRender: React.FC<{ tree: ITreeNode; padLeft?: number }> = ({
  tree,
  padLeft = 5,
}) => {
  if (!tree.children) return null;
  return (
    <>
      {tree.children.map((n) => (
        <Node key={n.id} n={n} padLeft={padLeft} />
      ))}
    </>
  );
};

const Node: React.FC<{ n: ITreeNode; padLeft: number }> = ({ n, padLeft }) => {
  const vscode = useVSCode();
  const [open, setOpen] = useState<boolean>(false);
  if (n.type === 'tree')
    return (
      <div style={{ height: !open ? '21px' : undefined, overflow: 'hidden' }}>
        <FolderNode $padLeft={padLeft} onClick={() => setOpen(!open)}>
          <VSFileIcon name={n.path} open={open} />
          {n.path}
        </FolderNode>
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
        $active={vscode.currentTab === n.id}
        $padLeft={padLeft}
      >
        <VSFileIcon name={n.path} />
        {n.path}
      </FileNode>
    ) : null;
  return <></>;
};
