import styled from 'styled-components';

export const ShellFrame = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
  background-color: #1f1e1e;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;

  & * {
    font-family: SFmono;
  }
  /* transform: translate(-50%, -100%); */
`;

export const CmdInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
`;

export const ShellLines = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  cursor: text;
`;

export const ShellIco = styled.img`
  width: 11px;
  height: 11px;
  vertical-align: middle;
  margin-right: 6px;
`;

export const Cmd = styled.span`
  word-break: break-all;
  color: ${({ color }) => color};
  border-bottom: 2px solid transparent;
  width: fit-content;
  ${({ onClick, color }) =>
    onClick
      ? `
    :hover {
      cursor: pointer;
      border-bottom: 2px solid ${color || '#ffffff'};
    }
  `
      : ''}
`;

export const Flex = styled.div`
  display: flex;
`;

export const Url = styled.span`
  padding-right: 6px;
`;
