import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import apple_logo from '../../style/apple_logo.png';
import { AboutMenu } from './AboutMenu';
import { Time } from './Time';

export const Navbar = () => {
  const [showAbout, setShow] = useState(false);
  useEffect(() => {
    const dismiss = () => setShow(false);
    window.addEventListener('click', dismiss);
    return () => {
      window.removeEventListener('click', dismiss);
    };
  }, [setShow]);
  return (
    <>
      <NavbarFrame>
        <AppleLogo
          onClick={(e) => {
            e.stopPropagation();
            setShow(!showAbout);
          }}
          opened={showAbout}
        />
        <span>Terminale</span>
        <Right>
          <Time />
        </Right>
      </NavbarFrame>
      {showAbout && <AboutMenu />}
    </>
  );
};

const NavbarFrame = styled.div`
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
  z-index: 10;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Right = styled.span`
  font-weight: normal;
  position: absolute;
  right: 5px;
`;

const LogoImg = styled.img`
  width: 15px;
  height: 15px;
  margin: 0 10px;
`;

const LogoOverlay = styled.div<{ opened: boolean }>`
  border-radius: 4px;
  margin: 0 5px;

  ${({ opened }) =>
    opened ? 'background-color: rgba(255, 255, 255, 0.4);' : ''}
`;

const AppleLogo: React.FC<{
  opened: boolean;
  onClick?: (event: React.MouseEvent) => void;
}> = ({ opened, onClick }) => {
  return (
    <LogoOverlay opened={opened} onClick={onClick}>
      <LogoImg src={apple_logo} />
    </LogoOverlay>
  );
};
