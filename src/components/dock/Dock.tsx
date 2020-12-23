import React, { useState } from 'react';
import { useWindow } from '../windows/window-provider';
import { useShell } from '../shell/provider';
import { VSCode } from '../vscode/VSCode';
import { ROUTES } from './routes';
import { DockFrame, DockIconDiv, OpenMarker } from './styles';

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
