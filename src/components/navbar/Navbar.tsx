import React, { useEffect, useState } from 'react';
import apple_logo from '../../style/apple_logo.png';
import { AboutMenu } from './AboutMenu';
import { NavbarFrame, Right, LogoOverlay, LogoImg } from './styles';
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
