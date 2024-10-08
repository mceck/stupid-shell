import { ContactForm } from './contact-form/ContactForm';
import { MCDEV, resolvePath } from './file-system';
import { shellColors } from './shell-colors';
import { CmdFn, IShell, CmdReturn } from './types';

export const CMD_EXEC: Map<
  CmdFn,
  (shell: IShell, params?: string[]) => CmdReturn
> = new Map();

CMD_EXEC.set('cd', (shell: IShell, params?: string[]) => {
  if (params && params.length > 1) throw new Error('cd: check parameters');
  let newPath = MCDEV;
  if (params && params.length === 1) {
    newPath = shell.path;
    const url = params[0].replace('~', MCDEV.url());

    try {
      newPath = resolvePath(url, shell.path);
    } catch (error: any) {
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
    path = resolvePath(params[0].replace('~', MCDEV.url()), shell.path);
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
      cmd: [
        {
          text: path.parent ? '..' : '.',
          link: path.parent
            ? `cd ${path.parent.url()} && clear && ls`
            : undefined,
        },
        ...path.children.map((f) => {
          return {
            text: f.name,
            icon: f.icon,
            link: f.children && `cd ${f.url()} && clear && ls`,
            color:
              f.textColor ||
              (f.children
                ? shellColors.green
                : f.ln
                ? shellColors.blue
                : shellColors.white),
          };
        }),
      ],
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

CMD_EXEC.set('curriculum.app', () => {
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
          text: '',
          html: `ABOUT ME<br />
          I'm an addicted to software developing and new technologies<br /><br />
          PROFESSIONAL EXPERIENCE<br />
          2022 - today - Permanent employee as fullstack deveoper working from remote in a 
consulting and software development company located in Brescia, collaborating for the development of
mainly web and mobile applications<br /><br />

          2020 - 2022 - Permanent employee as fullstack deveoper in a
consulting and software development company in Florence, collaborating with important 
private companies such as GDOs and pharmaceutical companies for the development of
mainly web and mobile applications<br /><br />

          2014-2020 - Permanent employee as a programmer at a company
management software informatics in Florence, collaborating with private companies and
public administrations for the development of desktop and web applications.<br /><br />

          2008 Internship at an IT company near Florence<br /><br />

          EDUCATION AND TRAINING<br />
          University of Pisa - Computer Engineering<br />
          University career currently suspended with 6 exams missing from graduation<br /><br />

          High school<br />
          Diploma obtained in 2009 at the Russel-Newton scientific high school in Scandicci (FI)<br /><br />
          `,
        },
        {
          text: '-----',
        },
      ],
    },
  };
});

CMD_EXEC.set('contact.me', () => {
  return {
    result: null,
    customForm: <ContactForm />,
  };
});

CMD_EXEC.set('exit', () => {
  return {
    result: {
      cmd: [{ text: "Can't close this window!", color: shellColors.red }],
    },
  };
});

CMD_EXEC.set('minimize', () => {
  return {
    result: {
      cmd: [{ text: "Can't minimize this window!", color: shellColors.red }],
    },
  };
});

CMD_EXEC.set('help', () => {
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
