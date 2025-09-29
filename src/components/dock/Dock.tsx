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
    <DockFrame data-testid="dock">
      <DockIcon
        label="Visual Studio Code"
        icon={'/vscode.png'}
        bgColor="#ffffff"
        clicked={vsclick}
        onMouseEvent={(event: React.MouseEvent) => {
          setVsclick(event.type === 'mousedown');
        }}
        isOpen={window.isOpen('vscode')}
        onClick={() =>
          window.openWindow({
            id: 'vscode',
            child: <VSCode />,
            title: 'Code - mcdev-web',
            initX: 100,
            initY: 100,
            initWidth: 800,
            initHeight: 450,
          })
        }
      />
      <DockIcon
        label="GitHub"
        bgColor="#ffffff"
        icon={'/github.png'}
        onMouseEvent={(_: React.MouseEvent) => {}}
        onClick={() => open('https://github.com/mceck')}
      />
      {ROUTES.map((ic, i) => (
        <DockIcon
          key={i}
          label={ic.label}
          icon={ic.icon}
          bgColor={ic.bgColor}
          full={ic.full}
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
  bgColor?: string;
  clicked?: boolean;
  isOpen?: boolean;
  full?: boolean;
  onMouseEvent: (event: React.MouseEvent) => void;
  onClick: (event: React.MouseEvent) => void;
}> = ({ onMouseEvent, isOpen, clicked, bgColor, full, icon, ...props }) => {
  return (
    <DockIconDiv
      {...props}
      $clicked={clicked}
      $color={bgColor || 'transparent'}
      onMouseDown={onMouseEvent}
      onMouseLeave={onMouseEvent}
      onMouseUp={onMouseEvent}
    >
      <img
        src={icon}
        alt={props.label}
        style={{
          width: full ? '110%' : '80%',
          height: full ? '110%' : '80%',
          pointerEvents: 'none',
        }}
        draggable={false}
      />
      <div className="overlay-click" />
      {isOpen && <OpenMarker />}
    </DockIconDiv>
  );
};
