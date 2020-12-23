import styled from 'styled-components';

export const ProfileImgEl = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin: 10px 0;
`;

export const AboutFrame = styled.div`
  top: 26px;
  left: 5px;
  position: fixed;
  width: 300px;
  height: 300px;
  background-color: rgba(50, 50, 50, 0.7);
  backdrop-filter: blur(30px);
  border: 1px inset rgba(255, 255, 255, 0.25);
  border-radius: 5px;
  padding: 12px;
  color: #ffffff;
  font-weight: bold;
  font-size: 0.82rem;
  display: flex;
  flex-direction: column;
  z-index: 10;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
`;

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Txt = styled.span`
  font-weight: normal;
`;

export const Line = styled.div`
  margin-bottom: 3px;
`;

export const NavbarFrame = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  background-color: rgba(50, 50, 50, 0.3);
  backdrop-filter: blur(30px);
  padding-top: 3px;
  padding-bottom: 6px;
  color: #ffffff;
  font-weight: bold;
  font-size: 0.82rem;
  display: flex;
  align-items: center;
  z-index: 100;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Right = styled.span`
  font-weight: normal;
  position: absolute;
  right: 5px;
`;

export const LogoImg = styled.img`
  width: 15px;
  height: 15px;
  margin: 0 10px;
`;

export const LogoOverlay = styled.div<{ opened: boolean }>`
  border-radius: 4px;
  margin: 0 5px;

  ${({ opened }) =>
    opened ? 'background-color: rgba(255, 255, 255, 0.4);' : ''}
`;
