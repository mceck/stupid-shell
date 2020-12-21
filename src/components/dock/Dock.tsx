import React, { useState } from 'react';
import styled from 'styled-components';
import { useShell } from '../shell/provider';
import { ROUTES } from './routes';

export const Dock = () => {
  const shell = useShell();
  const [clicked, setClicked] = useState<boolean[]>(() =>
    ROUTES.map((_) => false)
  );

  return (
    <DockFrame>
      {ROUTES.map((ic, i) => (
        <DockIcon
          key={i}
          label={ic.label}
          icon={ic.icon}
          clicked={clicked[i]}
          onMouseEvent={(event: React.MouseEvent) => {
            const click = [...clicked];
            click[i] = event.type === 'mousedown';
            setClicked(click);
          }}
          onClick={() => shell.pushCmd!(ic.cmd)}
        />
      ))}
    </DockFrame>
  );
};

const DockFrame = styled.div`
  position: fixed;
  display: flex;
  align-items: center;

  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  height: 70px;
  border: 1px solid rgba(120, 120, 120, 0.5);
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(35px);
  padding: 10px;
  padding-right: 0;
  z-index: 10;
`;

const DockIcon: React.FC<{
  label: string;
  icon: string;
  clicked?: boolean;
  onMouseEvent: (event: React.MouseEvent) => void;
  onClick: (event: React.MouseEvent) => void;
}> = ({ onMouseEvent, ...props }) => {
  return (
    <DockIconDiv
      {...props}
      onMouseDown={onMouseEvent}
      onMouseLeave={onMouseEvent}
      onMouseUp={onMouseEvent}
    >
      <div className="overlay-click" />
    </DockIconDiv>
  );
};

const DockIconDiv = styled.div<{
  label: string;
  icon: string;
  clicked?: boolean;
}>`
  width: 46px;
  height: 46px;
  border-radius: 10px;
  background: url(${({ icon }) => icon});
  background-size: cover;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: default;

  &:hover::before {
    content: '${({ label }) => label}';
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #323232;
    color: #ffffff;
    padding: 4px 15px;
    border: 1px inset rgba(255, 255, 255, 0.2);
    box-shadow: 0 1px 3px #000000;
    border-radius: 5px;
    inline-size: max-content;
    font-size: 0.9rem;
  }

  &:hover::after {
    content: '';
    position: absolute;
    top: -26px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    background-color: #323232;
    width: 10px;
    height: 10px;
    border: 1px inset rgba(200, 200, 200, 0.2);
    clip-path: polygon(100% 100%, 0 100%, 100% 0%);
  }

  .overlay-click {
    opacity: ${({ clicked }) => (clicked ? 0.2 : 0)};
    background-color: #000000;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
