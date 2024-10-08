import React, { useEffect, useReducer, useRef } from 'react';
import { resizeReducer } from './reducer';
import { StatusBar } from './StatusBar';
import { WindowFrame, RelPanel } from './styles';
import { IWindow, ResizeAction } from './types';
import { Resizer } from './Resizer';

export const Window: React.FC<any> = ({
  children,
  title,
  onClose,
  onMinimize,
  onMaximize,
  initX = 50,
  initY = 50,
  initWidth = 530,
  initHeight = 300,
  index,
  ...props
}) => {
  const [wdw, dispatch] = useReducer<React.Reducer<IWindow, ResizeAction>>(
    resizeReducer,
    {
      x: initX,
      y: initY,
      clickOffsetX: 0,
      clickOffsetY: 0,
      width: initWidth,
      height: initHeight,
      resizing: null,
      moving: false,
    }
  );

  const winRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => {
      dispatch({ type: 'mouseup' });
    };
    window.addEventListener('mouseup', fn);
    return () => {
      window.removeEventListener('mouseup', fn);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!wdw.resizing) return;
    const fn = (e: any) => {
      const newWidth =
        e.clientX - (winRef.current?.getBoundingClientRect()?.left || 0);
      const newHeight =
        e.clientY - (winRef.current?.getBoundingClientRect()?.top || 0);

      switch (wdw.resizing) {
        case 'top':
          dispatch({
            type: 'res-move',
            payload: { y: e.clientY },
          });
          break;
        case 'bottom':
          dispatch({ type: 'resize', payload: { height: newHeight } });
          break;
        case 'left':
          dispatch({
            type: 'res-move',
            payload: { x: e.clientX },
          });
          break;
        case 'right':
          dispatch({ type: 'resize', payload: { width: newWidth } });
          break;
        case 'nw':
          dispatch({
            type: 'res-move',
            payload: {
              x: e.clientX,
              y: e.clientY,
            },
          });
          break;
        case 'ne':
          dispatch({
            type: 'res-move',
            payload: {
              width: newWidth,
              y: e.clientY,
            },
          });
          break;
        case 'se':
          dispatch({
            type: 'resize',
            payload: { width: newWidth, height: newHeight },
          });
          break;
        case 'sw':
          dispatch({
            type: 'res-move',
            payload: {
              x: e.clientX,
              // width: newWidth,
              height: newHeight,
            },
          });
          break;
        default:
          break;
      }
    };
    window.addEventListener('mousemove', fn);
    return () => {
      window.removeEventListener('mousemove', fn);
    };
  }, [dispatch, wdw.resizing, winRef]);

  useEffect(() => {
    if (!wdw.moving) return;
    const fn = (e: any) => {
      dispatch({
        type: 'move',
        payload: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    };
    window.addEventListener('mousemove', fn);
    return () => {
      window.removeEventListener('mousemove', fn);
    };
  }, [dispatch, wdw.moving]);

  return (
    <WindowFrame
      ref={winRef}
      data-testid="wnd"
      {...props}
      style={{ left: wdw.x, top: wdw.y, zIndex: index }}
    >
      <RelPanel
        data-testid="wnd-panel"
        style={{ width: wdw.width, height: wdw.height }}
      >
        <StatusBar
          title={title}
          startDrag={(v, off) => dispatch({ type: 'start-move', payload: off })}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={() => {
            let payload;
            if (wdw.width >= window.innerWidth) {
              payload = {
                x: initX,
                y: initY,
                width: initWidth,
                height: initHeight,
              };
            } else {
              payload = {
                x: 0,
                y: 0,
                width: window.innerWidth,
                height: window.innerHeight - 105,
              };
            }
            dispatch({
              type: 'set',
              payload,
            });
          }}
        />
        {children}
        <Resizer
          $left
          data-testid="resizer-left"
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: 'left' });
          }}
        />
        <Resizer
          $right
          data-testid="resizer-right"
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: 'right' });
          }}
        />
        <Resizer
          $top
          data-testid="resizer-top"
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: 'top' });
          }}
        />
        <Resizer
          $bottom
          data-testid="resizer-bottom"
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: 'bottom' });
          }}
        />
        <Resizer
          $nw
          data-testid="resizer-nw"
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: 'nw' });
          }}
        />
        <Resizer
          $ne
          data-testid="resizer-ne"
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: 'ne' });
          }}
        />
        <Resizer
          $se
          data-testid="resizer-se"
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: 'se' });
          }}
        />
        <Resizer
          $sw
          data-testid="resizer-sw"
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: 'sw' });
          }}
        />
      </RelPanel>
    </WindowFrame>
  );
};
