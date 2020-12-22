import { IWindow, ResizeAction } from './types';

export const resizeReducer = (state: IWindow, action: ResizeAction) => {
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

  if (newState.width < 100) newState.width = 100;
  if (newState.height < 100) newState.height = 100;

  return newState;
};
