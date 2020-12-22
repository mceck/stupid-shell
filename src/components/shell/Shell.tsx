import React from 'react';
import { useShell } from './provider';
import { ShellContent } from './ShellContent';
import { Window } from '../Windows/Window';
import { ShellFrame } from './styles';

export const Shell = () => {
  const shell = useShell();
  return (
    <Window
      id="shell"
      title="Terminale - mcdev@web.mcdev.host"
      onClose={() => shell.pushCmd!('exit')}
      onMinimize={() => shell.pushCmd!('minimize')}
      // onMaximize={() => shell.pushCmd!('maximize')}
      index={5}
    >
      <ShellFrame>{shell.customForm || <ShellContent />}</ShellFrame>
    </Window>
  );
};
