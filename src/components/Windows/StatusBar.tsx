import React from 'react';
import {
  StatusBarFrame,
  ActionContainer,
  CloseIcon,
  MinimizeIcon,
  FullscreenIcon,
  Title,
} from './styles';

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
      onDoubleClick={() => onMaximize()}
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
