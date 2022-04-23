import React, { useRef } from 'react';
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
  startDrag: (v?: boolean, offset?: { offX: number; offY: number }) => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}> = ({ title, startDrag, onClose, onMinimize, onMaximize }) => {
  const ref = useRef<any>();
  return (
    <StatusBarFrame
      ref={ref}
      onMouseDown={(e) => {
        if (e.button !== 0) return;
        const offX = e.clientX - ref.current.getBoundingClientRect().left;
        const offY = e.clientY - ref.current.getBoundingClientRect().top;
        e.preventDefault();
        startDrag(true, { offX, offY });
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
