import React, {
  Reducer,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from 'react';
import { File, MCDEV } from './file-system';
import { ShellAction, shellReducer } from './reducer';

export type Separator = '$' | '#';

export interface ISpan {
  text: string;
  icon?: string;
  color?: string;
}

export interface ILine {
  cmd: ISpan[];
  path?: File;
  sep?: Separator;
}

export interface IShell {
  lines: ILine[];
  path: File;
  sep: Separator;
  historyMarker?: number;
  pushCmd?: (cmd: string) => void;
  moveFrame?: (mov: { x: number; y: number }) => void;
  scrollBottom?: () => void;
  focusCmdInput?: () => void;
  clear?: () => void;
  setHistoryMarker?: (marker?: number) => void;
  scroller?: React.MutableRefObject<any>;
  cmdInput?: React.MutableRefObject<any>;
  customForm?: React.ReactNode;
}

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

export const ShellProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<IShell, ShellAction>>(
    shellReducer,
    initialShellState
  );

  const scroller = useRef<any>();
  const cmdInput = useRef<any>();

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
          scroller.current.scrollTo(0, scroller.current.scrollHeight),
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
