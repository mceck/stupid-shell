export interface IWnd {
  id: string;
  child: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  title: string;
  initX?: number;
  initY?: number;
  initWidth?: number;
  initHeight?: number;
}

export interface IWndActions {
  openWindow: (window: Partial<IWnd>) => void;
  isOpen: (id: string) => boolean;
  selectedId?: string;
}

export interface ResizeAction {
  type:
    | 'width'
    | 'height'
    | 'resize'
    | 'start-resize'
    | 'start-move'
    | 'move'
    | 'res-move'
    | 'set'
    | 'mouseup';
  payload?: any;
}

export interface IResizerProps {
  $nw?: boolean;
  $ne?: boolean;
  $se?: boolean;
  $sw?: boolean;
  $top?: boolean;
  $bottom?: boolean;
  $left?: boolean;
  $right?: boolean;
  onMouseDown?: (e: any) => void;
}

export interface IWindow {
  x: number;
  y: number;
  clickOffsetX: number;
  clickOffsetY: number;
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
