import { CMD_EXEC } from './cmd-functions';
import { shellColors } from './shell-colors';
import { IShell, ShellAction, CmdReturn } from './types';

export const shellReducer = (state: IShell, action: ShellAction) => {
  const newState = { ...state };
  switch (action.type) {
    case 'push-cmd':
      const cmd = action.payload.cmd.trim();
      newState.historyMarker = undefined;
      newState.customForm = undefined;
      if (cmd === 'clear') {
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
      const { result, path, sep, customForm } = executeCmd(state, cmd);
      if (customForm) {
        newState.customForm = customForm;
        break;
      }
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
  const cmds = line.trim().replace(/ [ ]+/g, ' ').split(' ');
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
  } catch (error: any) {
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
