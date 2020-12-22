import React from 'react';
import styled from 'styled-components';
import { useVSCode } from './vscode-provider';

export const VSTabBar = () => {
  const vscode = useVSCode();
  return (
    <TabFrame>
      {vscode.tabs.map((t) => (
        <Tab
          key={t.id}
          onClick={() =>
            vscode.currentTab !== t.id ? vscode.openTab!(t.id) : null
          }
          active={t.id === vscode.currentTab}
        >
          <VSFileIcon name={t.name} />
          {t.name}{' '}
          <CloseBtn
            onClick={(e) => {
              e.stopPropagation();
              vscode.closeTab!(t.id);
            }}
          >
            x
          </CloseBtn>
        </Tab>
      ))}
    </TabFrame>
  );
};

const TabFrame = styled.div`
  height: 28px;
  width: 100%;
  padding-left: 30px;
  display: flex;
  color: #aeaeae;
  background-color: #303030;
  font-size: 0.9rem;
`;

const Tab = styled.div<{ active?: boolean }>`
  cursor: pointer;
  padding: 5px 10px;
  ${({ active }) =>
    active ? 'background-color: #202124; color: #ffffff;' : ''}
`;

const CloseBtn = styled.span`
  margin-left: 8px;
  padding: 5px;
  padding-right: 0;
  color: #aeaeae;
  :hover {
    color: #ffffff;
  }
`;

export const VSFileIcon: React.FC<{ name: string }> = ({ name }) => {
  if (name.match(/\.ts[x]?$/))
    return <VSIcon src={process.env.PUBLIC_URL + '/tsico.png'} alt="." />;
  if (name.match(/\.js[x]?$/))
    return <VSIcon src={process.env.PUBLIC_URL + '/jsico.png'} alt="." />;
  if (!name.match(/\.[^\/]+$/))
    return <VSIcon src={process.env.PUBLIC_URL + '/folderico.png'} alt="." />;

  return <VSIcon src={process.env.PUBLIC_URL + '/defaultico.png'} alt="." />;
};

const VSIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 5px;
  vertical-align: middle;
`;
