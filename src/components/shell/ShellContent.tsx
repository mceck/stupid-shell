import React, { useState } from 'react';
import { resolvePath } from './file-system';
import { useShell } from './provider';
import { ShellLines, Url, Cmd, ShellIco, Flex, CmdInput } from './styles';

export const ShellContent = () => {
  const shell = useShell();
  const [cmd, setCmd] = useState('');

  // handle shell keyboard event
  const submitCmd = (e: React.KeyboardEvent) => {
    let history;
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (!cmd) break;
        shell.pushCmd!(cmd);
        setCmd('');
        if (shell.scrollBottom) shell.scrollBottom();

        break;
      case 'Tab':
        e.preventDefault();
        if (!cmd) return;
        const cmds = cmd.split(' ');
        let completed = cmds[cmds.length - 1];
        const lastSep = completed.lastIndexOf('/');
        let from = shell.path;
        if (completed && lastSep >= 0) {
          const relPath = completed.slice(0, lastSep);
          try {
            from = resolvePath(relPath || '/', shell.path);
          } catch {
            console.log('path not exist');
            return;
          }
        }
        let search = completed.toLowerCase();
        if (lastSep >= 0) search = search.slice(lastSep + 1);
        const childs = from.children?.filter((f) =>
          f.name.toLowerCase().startsWith(search)
        );
        if (childs && childs.length === 1) {
          if (lastSep < 0) completed = '';
          else completed = completed.slice(0, lastSep) + '/';
          completed += childs[0].name;
        } else if (childs) {
          // TODO show autocomplete option?
          console.log(childs.map((f) => f.name));
        }
        setCmd([...cmds.slice(0, -1), completed].join(' '));
        break;
      case 'ArrowUp':
        e.preventDefault();
        history = shell.lines.filter((l) => l.path);
        if (history.length > 0) {
          let at = shell.historyMarker;
          if (at === undefined) at = history.length;
          if (--at >= 0) {
            setCmd(history[at].cmd[0].text);
            shell.setHistoryMarker!(at);
          }
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        history = shell.lines.filter((l) => l.path);
        if (history.length > 0) {
          let at = shell.historyMarker;
          if (at === undefined || at >= history.length - 1) {
            setCmd('');
            shell.setHistoryMarker!();
          } else {
            at++;
            setCmd(history[at].cmd[0].text);
            shell.setHistoryMarker!(at);
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <ShellLines ref={shell.scroller} onClick={shell.focusCmdInput}>
      {shell.lines.map((l, i) => (
        <div key={`line${i}`}>
          {l.path && (
            <Url>
              {l.path.url()}
              {l.sep}
            </Url>
          )}
          {l.cmd.map((c, idx) => (
            <Cmd
              key={`cmd${idx}`}
              color={c.color}
              style={l.path && idx === 0 ? {} : { display: 'block' }}
              onClick={c.link ? () => shell.pushCmd!(c.link!) : undefined}
            >
              {c.icon && <ShellIco src={c.icon} />}
              {c.html && (
                <div dangerouslySetInnerHTML={{ __html: c.html }}></div>
              )}
              {c.text}
            </Cmd>
          ))}
        </div>
      ))}
      <Flex>
        <Url>
          {shell.path.url()}
          {shell.sep}
        </Url>
        <CmdInput
          ref={shell.cmdInput}
          name="cmd"
          onChange={(e) => setCmd(e.currentTarget.value)}
          value={cmd}
          onKeyDown={submitCmd}
          autoComplete="off"
        />
      </Flex>
    </ShellLines>
  );
};
