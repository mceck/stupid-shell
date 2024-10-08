import styled from 'styled-components';
import { IResizerProps } from './types';

export const WindowFrame = styled.div`
  position: fixed;
  border-radius: 10px;
  border: solid 1px #616161;
  box-shadow: inset 0px 0px 6px rgba(90, 90, 90, 0.5);
  overflow: hidden;
  min-width: 100px;
  min-height: 100px;
`;

export const RelPanel = styled.div`
  position: relative;
  padding-top: 26px;
`;

export const ResizeFlat = styled.div<Partial<IResizerProps>>`
  position: absolute;
  cursor: ${({ $top, $bottom }) =>
    $top || $bottom ? 'ns-resize' : 'ew-resize'};
  width: ${({ $top, $bottom }) => ($top || $bottom ? '100%' : '4px')};
  height: ${({ $left, $right }) => ($left || $right ? '100%' : '4px')};

  ${({ $left, $top }) => ($left || $top ? 'top: 0; left: 0;' : '')}
  ${({ $right }) => ($right ? 'top: 0; right: 0;' : '')}
${({ $bottom }) => ($bottom ? 'bottom: 0; left: 0;' : '')}
`;

export const ResizeAngle = styled.div<Partial<IResizerProps>>`
  position: absolute;
  cursor: ${({ $nw, $se }) => ($nw || $se ? 'nwse-resize' : 'nesw-resize')};
  width: 5px;
  height: 5px;

  ${({ $nw, $ne, $se }) =>
    $nw
      ? 'top: 0; left: 0;'
      : $ne
      ? 'top: 0; right: 0;'
      : $se
      ? 'bottom: 0; right: 0;'
      : 'bottom: 0; left: 0;'}
`;

export const ActionContainer = styled.div`
  display: flex;

  :hover div::after,
  :hover div::before {
    display: block;
  }
`;

export const StatusBarFrame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 26px;
  background-color: #363738;
  border-bottom: solid 1px #000;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  text-overflow: ellipsis;
  padding: 0 3px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Icon = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: solid 0.2px #313131;
  margin: 0 3px;
  position: relative;

  ::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    display: none;
    background-color: rgba(0, 0, 0, 0.45);
  }
`;

export const CloseIcon = styled(Icon)`
  background-color: #ff595a;

  ::after {
    clip-path: polygon(
      18% 44%,
      44% 44%,
      44% 18%,
      56% 18%,
      56% 44%,
      82% 44%,
      82% 56%,
      56% 56%,
      56% 82%,
      44% 82%,
      44% 56%,
      18% 56%
    );
    transform: rotate(45deg);
  }
`;

export const MinimizeIcon = styled(Icon)`
  background-color: #fdaf24;
  ::after {
    clip-path: polygon(20% 46%, 80% 46%, 80% 62%, 20% 62%);
  }
`;

export const FullscreenIcon = styled(Icon)`
  background-color: #2ac031;
  ::after {
    clip-path: polygon(20% 20%, 60% 20%, 20% 60%);
  }
  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    display: none;
    background-color: rgba(0, 0, 0, 0.45);
    clip-path: polygon(80% 80%, 40% 80%, 80% 40%);
  }
`;

export const Title = styled.p`
  color: #cdcdcd;
  font-family: SFRegular !important;
  font-size: 0.75rem;
  font-weight: bold;
  padding-left: 10px;
`;
