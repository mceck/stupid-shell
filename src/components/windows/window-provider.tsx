import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { IWnd, IWndActions } from './types';
import { Window } from './Window';

const initState: IWndActions = { openWindow(_) {}, isOpen: (_) => false };

const Context: React.Context<IWndActions> = React.createContext(initState);

export const useWindow = () => useContext(Context);

export const WindowConsumer = Context.Consumer;

export const WindowProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [windows, setWindows] = useState<IWnd[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  const isOpen = useCallback(
    (id: string) => {
      return windows.find((w) => w.id === id) !== undefined;
    },
    [windows]
  );

  const openWindow = useCallback(
    (window: Partial<IWnd>) => {
      if (isOpen(window.id!)) {
        setSelectedId(window.id!);
        setWindows((windows) =>
          windows.map((w) => {
            if (w.id === window.id && w.minimizingClass) {
              return { ...w, minimizingClass: 'restoring' };
            }
            return w;
          })
        );
        setTimeout(() => {
          setWindows((windows) =>
            windows.map((w) =>
              w.id === window.id ? { ...w, minimizingClass: '' } : w
            )
          );
        }, 300);
        return;
      }
      const onClose = () => {
        setWindows(windows.filter((w) => w.id !== window.id));
        setSelectedId('');
      };
      const onMinimize = () => {
        setWindows((windows) =>
          windows.map((w) =>
            w.id === window.id ? { ...w, minimizingClass: 'minimizing' } : w
          )
        );
        setTimeout(() => {
          setSelectedId('');
        }, 300);
      };

      const newWindow: IWnd = {
        id: window.id!,
        child: window.child,
        title: window.title || '',
        onClose: window.onClose || onClose,
        onMinimize: window.onMinimize || onMinimize,
        initX: window.initX,
        initY: window.initY,
        initWidth: window.initWidth,
        initHeight: window.initHeight,
      };
      setWindows([...windows, newWindow]);
      setSelectedId(window.id!);
    },
    [setWindows, windows, isOpen]
  );

  useEffect(() => {
    const fn = () => {
      setSelectedId('');
    };
    window.addEventListener('mousedown', fn);
    return () => {
      window.removeEventListener('mousedown', fn);
    };
  }, [setSelectedId]);

  return (
    <Context.Provider value={{ openWindow, isOpen, selectedId }}>
      {children}
      {windows.map((w) => (
        <Window
          key={w.id}
          id={w.id}
          title={w.title}
          onClose={w.onClose}
          onMinimize={w.onMinimize}
          initHeight={w.initHeight}
          initWidth={w.initWidth}
          initX={w.initX}
          initY={w.initY}
          index={w.id === selectedId ? 10 : 0}
          minimizingClass={w.minimizingClass}
          onMouseDown={(e: any) => {
            e.stopPropagation();
            setSelectedId(w.id);
          }}
        >
          {w.child}
        </Window>
      ))}
    </Context.Provider>
  );
};
