import styled from 'styled-components';

export const VSCodeFrame = styled.div`
  background-color: #202124;
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Expanded = styled.div`
  width: 100%;
  height: 100%;
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

export const FileNode = styled.div<{ active?: boolean; padLeft?: number }>`
  cursor: pointer;
  padding-bottom: 4px;
  ${({ active }) => (active ? 'background-color: #505050;' : '')}
  ${({ padLeft }) => (padLeft ? `padding-left: ${padLeft}px;` : '')}
  :hover {
    background-color: #454545;
  }
  transition: all ease 100ms;
  display: flex;
  align-items: center;
`;

export const TabFrame = styled.div`
  height: 28px;
  width: 100%;
  padding-left: 30px;
  display: flex;
  color: #aeaeae;
  background-color: #303030;
  font-size: 0.9rem;
`;

export const Scrollable = styled.div<{
  horizontal?: boolean;
  vertical?: boolean;
}>`
  overflow-x: ${({ horizontal }) => (horizontal ? 'auto' : 'hidden')};
  overflow-y: ${({ vertical }) => (vertical ? 'auto' : 'hidden')};
  ${({ horizontal }) => (horizontal ? 'width: 100%;' : '')}
  ${({ vertical }) => (vertical ? 'height: 100%;' : '')}

  ::-webkit-scrollbar {
    height: 3px;
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
  }

  :hover {
    ::-webkit-scrollbar-thumb {
      background: #404040;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #424242;
    }
  }
`;

export const Tab = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 10px;
  ${({ active }) =>
    active ? 'background-color: #202124; color: #efefef;' : ''}
`;

export const CloseBtn = styled.span`
  margin-left: 8px;
  padding: 5px;
  padding-right: 0;
  color: #aeaeae;
  :hover {
    color: #efefef;
  }
`;

export const VSIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 5px;
  vertical-align: middle;
`;

export const FolderNode = styled.div<{ padLeft?: number }>`
  display: flex;
  align-items: center;
  padding-left: ${({ padLeft }) => padLeft || 2}px;
  cursor: pointer;
  padding-bottom: 4px;
  :hover {
    background-color: #454545;
  }
  transition: all ease 100ms;
`;
