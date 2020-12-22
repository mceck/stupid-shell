import React, { useState } from 'react';
import styled from 'styled-components';
import { useWindow } from '../../style/components/window-provider';
import { useShell } from '../shell/provider';
import { VSCode } from '../vscode/VSCode';
import { ROUTES } from './routes';

export const Dock = () => {
  const shell = useShell();
  const window = useWindow();
  const [clicked, setClicked] = useState<boolean[]>(() =>
    ROUTES.map((_) => false)
  );

  const [vsclick, setVsclick] = useState<boolean>(false);

  return (
    <DockFrame>
      <DockIcon
        label="Visual Studio Code"
        icon={process.env.PUBLIC_URL + '/vscode.png'}
        clicked={vsclick}
        onMouseEvent={(event: React.MouseEvent) => {
          setVsclick(event.type === 'mousedown');
        }}
        isOpen={window.isOpen('vscode')}
        onClick={() =>
          window.openWindow({
            id: 'vscode',
            child: (
              <VSCode githubUrl="https://api.github.com/repos/facebook/react" />
            ),
            title: 'Code - https://api.github.com/repos/facebook/react',
            initX: 100,
            initY: 100,
            initWidth: 800,
            initHeight: 450,
          })
        }
      />
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
  z-index: 100;
`;

const DockIcon: React.FC<{
  label: string;
  icon: string;
  clicked?: boolean;
  isOpen?: boolean;
  onMouseEvent: (event: React.MouseEvent) => void;
  onClick: (event: React.MouseEvent) => void;
}> = ({ onMouseEvent, isOpen, ...props }) => {
  return (
    <DockIconDiv
      {...props}
      onMouseDown={onMouseEvent}
      onMouseLeave={onMouseEvent}
      onMouseUp={onMouseEvent}
    >
      <div className="overlay-click" />
      {isOpen && <OpenMarker />}
    </DockIconDiv>
  );
};

const OpenMarker = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: #fefefe;
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 2px rgba(255, 255, 255, 0.75);
`;

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
