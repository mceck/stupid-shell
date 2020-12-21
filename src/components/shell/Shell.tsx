import React from 'react';
import styled from 'styled-components';
import { useShell } from './provider';
import { ShellContent } from './ShellContent';
import { Window } from '../../style/components/Window';

export const Shell = () => {
  const shell = useShell();
  return (
    <Window
      title="Terminale - mcdev@web.mcdev.host"
      onClose={() => shell.pushCmd!('clear')}
      onMinimize={() => shell.pushCmd!('minimize')}
      onMaximize={() => shell.pushCmd!('maximize')}
    >
      <ShellFrame>{shell.customForm || <ShellContent />}</ShellFrame>
    </Window>
  );
};

const ShellFrame = styled.div`
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
