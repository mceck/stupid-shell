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
  const ref = useRef<HTMLDivElement>(null);
  return (
    <StatusBarFrame
      ref={ref}
      data-testid="wnd-bar"
      onMouseDown={(e) => {
        if (e.button !== 0) return;
        const offX =
          e.clientX - (ref.current?.getBoundingClientRect()?.left || 0);
        const offY =
          e.clientY - (ref.current?.getBoundingClientRect()?.top || 0);
        e.preventDefault();
        startDrag(true, { offX, offY });
      }}
      onDoubleClick={() => onMaximize()}
    >
      <ActionContainer>
        <CloseIcon id="close" onClick={onClose} />
        <MinimizeIcon id="minimize" onClick={onMinimize} />
        <FullscreenIcon id="resize" onClick={onMaximize} />
      </ActionContainer>
      <Title>{title}</Title>
    </StatusBarFrame>
  );
};
