import React, {
  ReactNode,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from 'react';
import { MCDEV } from './file-system';
import { shellReducer } from './reducer';
import { IShell, ShellAction } from './types';

export const initialShellState: IShell = {
  lines: [
    {
      cmd: [
        {
          text: '----- Welcome to McDev SH! -----',
        },
        {
          text: 'Type help to print usage',
        },
      ],
    },
  ],
  path: MCDEV,
  sep: '$',
};

const Context: React.Context<IShell> = React.createContext(initialShellState);

export const useShell = () => useContext(Context);

export const ShellConsumer = Context.Consumer;

export const ShellProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer<IShell, [ShellAction]>(
    shellReducer,
    initialShellState
  );

  const scroller = useRef<any>(null);
  const cmdInput = useRef<any>(null);

  const moveFrame = useCallback(
    (mov: { x: number; y: number }) => {
      dispatch({ type: 'move-frame', payload: mov });
    },
    [dispatch]
  );

  const scrollBottom = useCallback(() => {
    if (scroller.current)
      setTimeout(
        () =>
          scroller.current &&
          scroller.current.scrollTo?.(0, scroller.current.scrollHeight),
        1
      );
  }, [scroller]);

  const focusCmdInput = useCallback(() => {
    if (cmdInput.current) cmdInput.current.focus();
  }, [cmdInput]);

  const pushCmd = useCallback(
    (cmdLine: string, customForm?: React.ReactNode) => {
      const cmds = cmdLine.split(' && ');
      cmds.forEach((cmd) =>
        dispatch({ type: 'push-cmd', payload: { cmd, customForm } })
      );
      scrollBottom();
    },
    [dispatch, scrollBottom]
  );

  const clear = useCallback(() => {
    dispatch({ type: 'clear' });
  }, [dispatch]);

  const setHistoryMarker = useCallback(
    (marker?: number) => {
      dispatch({ type: 'set-history-marker', payload: marker });
    },
    [dispatch]
  );

  const shell: IShell = {
    ...state,
    moveFrame,
    pushCmd,
    scrollBottom,
    focusCmdInput,
    clear,
    setHistoryMarker,
    scroller,
    cmdInput,
  };
  return <Context.Provider value={shell}>{children}</Context.Provider>;
};
