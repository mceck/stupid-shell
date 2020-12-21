import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { StatusBar } from './StatusBar';

export const Window: React.FC<{
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  initX?: number;
  initY?: number;
  initWidth?: number;
  initHeight?: number;
}> = ({
  children,
  title,
  onClose,
  onMinimize,
  onMaximize,
  initX,
  initY,
  initWidth,
  initHeight,
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
    <WindowFrame style={{ left: wdw.x, top: wdw.y }}>
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

const WindowFrame = styled.div`
  position: fixed;
  border-radius: 10px;
  border: solid 1px #616161;
  box-shadow: inset 0px 0px 6px rgba(90, 90, 90, 0.5);
  overflow: hidden;
`;

const RelPanel = styled.div`
  position: relative;
  padding-top: 26px;
`;

const Resizer = styled.div<{
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}>`
  position: absolute;
  cursor: ${({ top, bottom }) => (top || bottom ? 'ns-resize' : 'ew-resize')};
  width: ${({ top, bottom }) => (top || bottom ? '100%' : '4px')};
  height: ${({ left, right }) => (left || right ? '100%' : '4px')};

  ${({ left, top }) => (left || top ? 'top: 0; left: 0;' : '')}
  ${({ right }) => (right ? 'top: 0; right: 0;' : '')}
  ${({ bottom }) => (bottom ? 'bottom: 0; left: 0;' : '')}
`;

const ResizeAngle = styled.div<{
  nw?: boolean;
  ne?: boolean;
  se?: boolean;
  sw?: boolean;
}>`
  position: absolute;
  cursor: ${({ nw, se }) => (nw || se ? 'nwse-resize' : 'nesw-resize')};
  width: 5px;
  height: 5px;

  ${({ nw, ne, se }) =>
    nw
      ? 'top: 0; left: 0;'
      : ne
      ? 'top: 0; right: 0;'
      : se
      ? 'bottom: 0; right: 0;'
      : 'bottom: 0; left: 0;'}
`;

const resizeReducer = (state: IWindow, action: ResizeAction) => {
  const newState = { ...state };
  switch (action.type) {
    case 'height':
      newState.height = action.payload;
      break;
    case 'width':
      newState.width = action.payload;
      break;
    case 'resize':
      if (action.payload.height) newState.height += action.payload.height;
      if (action.payload.width) newState.width += action.payload.width;
      break;
    case 'res-move':
      if (action.payload.height) newState.height += action.payload.height;
      if (action.payload.width) newState.width += action.payload.width;
      if (action.payload.x) newState.x += action.payload.x;
      if (action.payload.y) newState.y += action.payload.y;
      break;
    case 'move':
      newState.x += action.payload.x;
      newState.y += action.payload.y;
      break;
    case 'start-resize':
      newState.resizing = action.payload;
      break;
    case 'start-move':
      newState.moving = true;
      break;
    case 'mouseup':
      newState.moving = false;
      newState.resizing = null;
      break;
    default:
      break;
  }
  return newState;
};

interface ResizeAction {
  type:
    | 'width'
    | 'height'
    | 'resize'
    | 'start-resize'
    | 'start-move'
    | 'move'
    | 'res-move'
    | 'mouseup';
  payload?: any;
}

interface IWindow {
  x: number;
  y: number;
  width: number;
  height: number;
  resizing:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'ne'
    | 'nw'
    | 'sw'
    | 'se'
    | null;
  moving: boolean;
}
