import React from 'react';
import styled from 'styled-components';

export const StatusBar: React.FC<{
  title: string;
  startDrag: (v?: boolean) => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}> = ({ title, startDrag, onClose, onMinimize, onMaximize }) => {
  return (
    <StatusBarFrame
      onMouseDown={(e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        startDrag(true);
      }}
    >
      <ActionContainer>
        <CloseIcon onClick={onClose} />
        <MinimizeIcon onClick={onMinimize} />
        <FullscreenIcon onClick={onMaximize} />
      </ActionContainer>
      <Title>{title}</Title>
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
  font-size: 0.75rem;
  font-weight: bold;
  padding-left: 10px;
`;
