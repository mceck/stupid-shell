import React from 'react';
import { ContactForm } from './contact-form/ContactForm';
import { File, MCDEV, resolvePath } from './file-system';
import { ILine, IShell, Separator } from './provider';
import { shellColors } from './shell-colors';

export interface CmdReturn {
  result: ILine | null;
  path?: File;
  sep?: Separator;
  customForm?: React.ReactNode;
}

export type CmdFn =
  | 'cd'
  | 'ls'
  | 'echo'
  | './'
  | 'clear'
  | 'curriculum.app'
  | 'help'
  | 'contact.me';

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
  let path = shell.path;
  if (params && params.length === 1) {
    path = resolvePath(params[0].replaceAll('~', MCDEV.url()), shell.path);
    if (!path) path = shell.path;
  }
  if (!path.children)
    return {
      result: null,
    };
  if (path.children.length === 0)
    return {
      result: {
        cmd: [{ text: 'empty dir' }],
      },
    };

  return {
    result: {
      cmd: path.children.map((f) => {
        return {
          text: f.name,
          icon: f.icon,
          color:
            f.textColor ||
            (f.children
              ? shellColors.green
              : f.ln
              ? shellColors.blue
              : shellColors.white),
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
          text: '-----',
        },
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
        {
          text: '-----',
        },
      ],
    },
  };
});

CMD_EXEC.set('contact.me', (shell: IShell, params?: string[]) => {
  return {
    result: null,
    customForm: <ContactForm />,
  };
});

CMD_EXEC.set('help', (shell: IShell, params?: string[]) => {
  return {
    result: {
      cmd: [
        {
          text: '-----',
        },
        {
          text: 'Shell commands:',
          color: shellColors.blue,
        },
        {
          text: 'cd [dir]: change directory',
        },
        {
          text: 'ls [dir]: list files in directory',
        },
        {
          text: 'clear: clear the console',
        },
        {
          text: 'echo [text]: print [text]',
        },
        {
          text: 'curriculum.app: show Curriculum Vitae',
        },
        {
          text: 'contact.me: Contact form',
        },
        {
          text: './[link]: run command link',
        },
        {
          text: 'help: print help text',
        },
        {
          text: '-----',
        },
      ],
    },
  };
});
