import styled from 'styled-components';

export const DockFrame = styled.div`
  position: fixed;
  display: flex;
  align-items: center;

  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  height: 60px;
  border: 1px solid rgba(180, 180, 180, 0.5);
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(4px);
  padding: 10px;
  padding-right: 0;
  z-index: 100;
`;

export const OpenMarker = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #fefefe;
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 2px rgba(255, 255, 255, 0.75);
`;

export const DockIconDiv = styled.div<{
  label: string;
  $color: string;
  $clicked?: boolean;
}>`
  width: 40px;
  height: 40px;
  border: 1px solid rgba(180, 180, 180, 0.2);
  border-radius: 10px;
  background-color: ${({ $color }) => $color};
  margin-right: 10px;
  display: flex;
  backdrop-filter: blur(16px);
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: default;

  &:hover::before {
    content: '${({ label }) => label}';
    position: absolute;
    top: -130%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(50, 50, 50, 0.75);
    color: #ffffff;
    padding: 4px 15px;
    border: 1px inset rgba(255, 255, 255, 0.2);
    box-shadow: 0 1px 3px rgba(13, 97, 170, 0.5);
    border-radius: 15px;
    inline-size: max-content;
    font-size: 0.9rem;
  }

  &:hover::after {
    content: '';
    position: absolute;
    top: -29.5px;
    left: 50%;
    border-radius: 3px;
    transform: translateX(-50%) rotate(45deg);
    background-color: rgba(50, 50, 50, 0.75);
    width: 10px;
    height: 10px;
    border: 1px inset rgba(255, 255, 255, 0.2);
    clip-path: polygon(100% 100%, 0 100%, 100% 0%);
  }

  .overlay-click {
    opacity: ${({ $clicked }) => ($clicked ? 0.2 : 0)};
    background-color: #000000;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
