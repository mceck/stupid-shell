import { CMD_EXEC, CmdReturn } from './cmd-functions';
import { IShell } from './provider';
import { shellColors } from './shell-colors';

export interface ShellAction {
  type: 'push-cmd' | 'move-frame' | 'clear' | 'set-history-marker';
  payload?: any;
}

export const shellReducer = (state: IShell, action: ShellAction) => {
  const newState = { ...state };
  switch (action.type) {
    case 'move-frame':
      newState.x += action.payload.x;
      newState.y += action.payload.y;
      break;
    case 'push-cmd':
      const cmd = action.payload;
      newState.historyMarker = undefined;
      if (cmd.trim() === 'clear') {
        newState.lines = [];
        break;
      }
      newState.lines = [
        ...newState.lines,
        {
          cmd: [{ text: cmd }],
          path: state.path,
          sep: state.sep,
        },
      ];
      const { result, path, sep } = executeCmd(state, cmd);

      if (result) newState.lines = [...newState.lines, result];
      if (path) newState.path = path;
      if (sep) newState.sep = sep;
      break;
    case 'clear':
      newState.historyMarker = undefined;
      newState.lines = [];
      break;
    case 'set-history-marker':
      newState.historyMarker = action.payload;
      break;
    default:
      break;
  }
  return newState;
};

const executeCmd = (shell: IShell, line: string): CmdReturn => {
  const cmds = line.trim().replaceAll(/ [ ]+/g, ' ').split(' ');
  let cmd: any = cmds[0];
  let params = cmds.slice(1);
  if (cmd.startsWith('./')) {
    params = [cmd.slice(2), ...params];
    cmd = './';
  }
  try {
    if (!CMD_EXEC.has(cmd))
      throw new Error(`sh-mcdev: command not found: ${cmd}`);
    return CMD_EXEC.get(cmd)!(shell, params);
  } catch (error) {
    return {
      result: {
        cmd: [{ text: error.message, color: shellColors.red }],
        sep: '$',
      },
      path: shell.path,
      sep: shell.sep,
    };
  }
};
