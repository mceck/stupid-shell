import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useShell } from './provider';

export const StatusBar = () => {
  const shell = useShell();
  const [dragging, setDragging] = useState(false);
  const onMouseUp = useCallback(() => setDragging(false), [setDragging]);
  const onMouseMove = useCallback(
    (e) => {
      if (dragging) {
        shell.moveFrame!({
          x: e.movementX,
          y: e.movementY,
        });
      }
    },
    [shell, dragging]
  );

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseUp]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [onMouseMove]);

  return (
    <StatusBarFrame
      onMouseDown={(e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        setDragging(true);
      }}
    >
      <ActionContainer>
        <CloseIcon onClick={() => shell.pushCmd!('close')} />
        <MinimizeIcon onClick={() => shell.pushCmd!('minimize')} />
        <FullscreenIcon onClick={() => shell.pushCmd!('maximize')} />
      </ActionContainer>
      <Title>Terminale - mcdev@web.mcdev.host</Title>
    </StatusBarFrame>
  );
};

const ActionContainer = styled.div`
  display: flex;

  :hover div::after,
  :hover div::before {
    display: block;
  }
`;

const StatusBarFrame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 26px;
  background-color: #363738;
  border-bottom: solid 1px #000;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  text-overflow: ellipsis;
  padding: 0 3px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Icon = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: solid 0.2px #313131;
  margin: 0 3px;
  position: relative;

  ::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    display: none;
    background-color: rgba(0, 0, 0, 0.45);
  }
`;

const CloseIcon = styled(Icon)`
  background-color: #ff595a;

  ::after {
    clip-path: polygon(
      18% 44%,
      44% 44%,
      44% 18%,
      56% 18%,
      56% 44%,
      82% 44%,
      82% 56%,
      56% 56%,
      56% 82%,
      44% 82%,
      44% 56%,
      18% 56%
    );
    transform: rotate(45deg);
  }
`;

const MinimizeIcon = styled(Icon)`
  background-color: #fdaf24;
  ::after {
    clip-path: polygon(20% 46%, 80% 46%, 80% 62%, 20% 62%);
  }
`;

const FullscreenIcon = styled(Icon)`
  background-color: #2ac031;
  ::after {
    clip-path: polygon(20% 20%, 60% 20%, 20% 60%);
  }
  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    display: none;
    background-color: rgba(0, 0, 0, 0.45);
    clip-path: polygon(80% 80%, 40% 80%, 80% 40%);
  }
`;

const Title = styled.p`
  color: #cdcdcd;
  font-family: SFRegular !important;
  font-weight: bold;
  padding-left: 10px;
`;
