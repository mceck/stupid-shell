import { IResizerProps } from './types';
import { ResizeFlat, ResizeAngle } from './styles';

export const Resizer: React.FC<IResizerProps> = (props: IResizerProps) => {
  if (props.top || props.bottom || props.left || props.right)
    return <ResizeFlat {...props} />;
  return <ResizeAngle {...props} />;
};
