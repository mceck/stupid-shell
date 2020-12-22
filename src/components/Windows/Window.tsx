import React, { useEffect, useReducer } from 'react';
import { resizeReducer } from './reducer';
import { StatusBar } from './StatusBar';
import { WindowFrame, RelPanel, Resizer, ResizeAngle } from './styles';
import { IWindow, ResizeAction } from './types';

export const Window: React.FC<any> = ({
  children,
  title,
  onClose,
  onMinimize,
  onMaximize,
  initX,
  initY,
  initWidth,
  initHeight,
  index,
  ...props
}) => {
  const [wdw, dispatch] = useReducer<React.Reducer<IWindow, ResizeAction>>(
    resizeReducer,
    {
      x: initX || 50,
      y: initY || 50,
      width: initWidth || 530,
      height: initHeight || 300,
      resizing: null,
      moving: false,
    }
  );

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
      switch (wdw.resizing) {
        case 'top':
          dispatch({
            type: 'res-move',
            payload: { y: e.movementY, height: -e.movementY },
          });
          break;
        case 'bottom':
          dispatch({ type: 'resize', payload: { height: e.movementY } });
          break;
        case 'left':
          dispatch({
            type: 'res-move',
            payload: { x: e.movementX, width: -e.movementX },
          });
          break;
        case 'right':
          dispatch({ type: 'resize', payload: { width: e.movementX } });
          break;
        case 'nw':
          dispatch({
            type: 'res-move',
            payload: {
              x: e.movementX,
              width: -e.movementX,
              y: e.movementY,
              height: -e.movementY,
            },
          });
          break;
        case 'ne':
          dispatch({
            type: 'res-move',
            payload: {
              width: e.movementX,
              y: e.movementY,
              height: -e.movementY,
            },
          });
          break;
        case 'se':
          dispatch({
            type: 'resize',
            payload: { width: e.movementX, height: e.movementY },
          });
          break;
        case 'sw':
          dispatch({
            type: 'res-move',
            payload: {
              x: e.movementX,
              width: -e.movementX,
              height: e.movementY,
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
  }, [dispatch, wdw.resizing]);

  useEffect(() => {
    if (!wdw.moving) return;
    const fn = (e: any) => {
      dispatch({
        type: 'move',
        payload: {
          x: e.movementX,
          y: e.movementY,
        },
      });
    };
    window.addEventListener('mousemove', fn);
    return () => {
      window.removeEventListener('mousemove', fn);
    };
  }, [dispatch, wdw.moving]);

  return (
    <WindowFrame {...props} style={{ left: wdw.x, top: wdw.y, zIndex: index }}>
      <RelPanel style={{ width: wdw.width, height: wdw.height }}>
        <StatusBar
          title={title}
          startDrag={() => dispatch({ type: 'start-move' })}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
        />
        {children}
        <Resizer
          left
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: 'left' });
          }}
        />
        <Resizer
          right
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: 'right' });
          }}
        />
        {/* <Resizer
          top
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: true });
          }}
        /> */}
        <Resizer
          bottom
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: 'bottom' });
          }}
        />
        {/* <ResizeAngle
          nw
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: 'nw' });
          }}
        />
        <ResizeAngle
          ne
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: 'ne' });
          }}
        /> */}
        <ResizeAngle
          se
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: 'se' });
          }}
        />
        <ResizeAngle
          sw
          onMouseDown={(e) => {
            e.stopPropagation();
            dispatch({ type: 'start-resize', payload: 'sw' });
          }}
        />
      </RelPanel>
    </WindowFrame>
  );
};
