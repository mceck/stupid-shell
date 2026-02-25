import styled from 'styled-components';

export const VSCodeFrame = styled.div`
  background-color: #202124;
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Expanded = styled.div`
  height: 100%;
  flex: 1;
  min-width: 250px;
`;

export const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  color: #dedede;

  img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
`;

export const SidebarFrame = styled.div`
  height: 100%;
  min-width: 230px;
  background-color: #282828;
  overflow: auto;
  color: #dedede;
  padding-top: 28px;
  position: relative;
  font-size: 0.9rem;
`;

export const SideHeader = styled.div`
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

export const FileNode = styled.div<{ $active?: boolean; $padLeft?: number }>`
  cursor: pointer;
  padding-bottom: 4px;
  ${({ $active }) => ($active ? 'background-color: #505050;' : '')}
  ${({ $padLeft }) => ($padLeft ? `padding-left: ${$padLeft}px;` : '')}
  &:hover {
    background-color: #454545;
  }
  transition: all ease 100ms;
  display: flex;
  align-items: center;
`;

export const TabFrame = styled.div`
  height: 28px;
  width: max-content;
  min-width: 100%;
  padding-left: 30px;
  display: flex;
  color: #aeaeae;
  background-color: #303030;
  font-size: 0.9rem;
`;

export const Scrollable = styled.div<{
  $horizontal?: boolean;
  $vertical?: boolean;
}>`
  overflow-x: ${({ $horizontal }) => ($horizontal ? 'auto' : 'hidden')};
  overflow-y: ${({ $vertical }) => ($vertical ? 'auto' : 'hidden')};
  ${({ $horizontal }) => ($horizontal ? 'width: 100%;' : '')}
  ${({ $vertical }) => ($vertical ? 'height: 100%;' : '')}

  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &:hover {
    scrollbar-color: #181818 transparent;
  }

  ::-webkit-scrollbar {
    height: 2px !important;
    width: 10px !important;
  }
  ::-webkit-scrollbar-track {
    background: transparent !important;
  }
  ::-webkit-scrollbar-thumb {
    background: transparent !important;
    border-radius: 4px !important;
    border: none !important;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: transparent !important;
  }
  ::-webkit-scrollbar-thumb:active {
    background: transparent !important;
  }
  ::-webkit-scrollbar-corner {
    background: transparent !important;
  }
  ::-webkit-scrollbar-button {
    display: none !important;
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      background: #181818 !important;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #424242 !important;
    }
    ::-webkit-scrollbar-thumb:active {
      background: #4a4a4a !important;
    }
  }
`;

export const Tab = styled.div<{ $active?: boolean }>`
  display: flex;
  flex: none;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px;
  ${({ $active }) =>
    $active ? 'background-color: #202124; color: #efefef;' : ''}
`;

export const CloseBtn = styled.span`
  margin-left: 8px;
  padding: 5px;
  padding-right: 0;
  color: #aeaeae;
  &:hover {
    color: #efefef;
  }
`;

export const VSIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 5px;
  vertical-align: middle;
`;

export const FolderNode = styled.div<{ $padLeft?: number }>`
  display: flex;
  align-items: center;
  padding-left: ${({ $padLeft }) => $padLeft || 2}px;
  cursor: pointer;
  padding-bottom: 4px;
  &:hover {
    background-color: #454545;
  }
  transition: all ease 100ms;
`;
