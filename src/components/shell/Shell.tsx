import React from 'react';
import styled from 'styled-components';
import { useShell } from './provider';
import { StatusBar } from './StatusBar';
import { ShellContent } from './ShellContent';

export const Shell = () => {
  const shell = useShell();
  return (
    <ShellFrame style={{ left: shell.x, top: shell.y }}>
      <StatusBar />
      <ShellContent />
    </ShellFrame>
  );
};

const ShellFrame = styled.div`
  position: fixed;
  width: 530px;
  height: 300px;
  min-width: 530px;
  min-height: 300px;
  border-radius: 10px;
  border: solid 1px #616161;
  box-shadow: inset 0px 0px 6px rgba(90, 90, 90, 0.5);
  background-color: #1f1e1e;
  position: relative;
  color: white;
  overflow: hidden;
  padding: 5px;
  padding-top: 30px;
  font-size: 0.75rem;
  font-weight: 700;

  & * {
    font-family: SFmono;
  }
  /* transform: translate(-50%, -100%); */
`;
