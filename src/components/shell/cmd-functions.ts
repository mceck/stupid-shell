import { File, MCDEV, resolvePath } from './file-system';
import { ILine, IShell, Separator } from './provider';
import { shellColors } from './shell-colors';

export interface CmdReturn {
  result: ILine | null;
  path?: File;
  sep?: Separator;
}

export type CmdFn = 'cd' | 'ls' | 'echo' | './' | 'clear' | 'curriculum.app';

export const CMD_EXEC: Map<
  CmdFn,
  (shell: IShell, params?: string[]) => CmdReturn
> = new Map();

CMD_EXEC.set('cd', (shell: IShell, params?: string[]) => {
  if (params && params.length > 1) throw new Error('cd: check parameters');
  let newPath = MCDEV;
  if (params && params.length === 1) {
    newPath = shell.path;
    const url = params[0].replaceAll('~', MCDEV.url());

    try {
      newPath = resolvePath(url, shell.path);
    } catch (error) {
      throw new Error(`cd: ${error.message}`);
    }
  }
  return {
    result: null,
    path: newPath,
  };
});

CMD_EXEC.set('ls', (shell: IShell, params?: string[]) => {
  if (!shell.path.children)
    return {
      result: null,
    };
  if (shell.path.children.length === 0)
    return {
      result: {
        cmd: [{ text: 'empty dir' }],
      },
    };
  return {
    result: {
      cmd: shell.path.children.map((f) => {
        return {
          text: f.name,
          color: f.children
            ? shellColors.green
            : f.ln
            ? shellColors.blue
            : shellColors.white,
        };
      }),
    },
  };
});

CMD_EXEC.set('echo', (shell: IShell, params?: string[]) => {
  if (!params) params = [];
  return {
    result: {
      cmd: [
        {
          text: params.join(' '),
        },
      ],
    },
  };
});

CMD_EXEC.set('./', (shell: IShell, params?: string[]) => {
  console.log(params);

  if (!params || params.length === 0)
    throw new Error('sh-mcdev: no such file or directory: ./');
  const prg = params[0];
  if (!shell.path.children)
    throw new Error('sh-mcdev: this is not a directory');
  const res = shell.path.children.filter((f) => f.name === prg);
  if (res.length !== 1)
    throw new Error('sh-mcdev: no such file or directory: ' + prg);
  if (!res[0].ln)
    throw new Error('sh-mcdev: no such file or directory: ' + res[0].name);
  return CMD_EXEC.get(res[0].ln)!(shell, params.slice(1));
});

CMD_EXEC.set('curriculum.app', (shell: IShell, params?: string[]) => {
  return {
    result: {
      cmd: [
        {
          text: 'Curriculum Vitae',
          color: shellColors.blue,
        },
        {
          text: 'Mattia Cecchini',
          color: shellColors.green,
        },
        {
          text: 'TODO - complete',
        },
      ],
    },
  };
});

CMD_EXEC.set('clear', (shell: IShell, params?: string[]) => {
  shell.clear!();
  return {
    result: null,
  };
});
