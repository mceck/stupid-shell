import React from 'react';
import styled from 'styled-components';
import profile from '../../style/profile.png';

export const AboutMenu = () => {
  return (
    <AboutFrame onClick={(e) => e.stopPropagation()}>
      <Line>About McDev</Line>
      <Center>
        <ProfileImg />
      </Center>
      <Line>
        First name: <Txt>Mattia</Txt>
      </Line>
      <Line>
        Last name: <Txt>Cecchini</Txt>
      </Line>
      <Line>
        Date of birth: <Txt>19/04/1990</Txt>
      </Line>
      <Line>
        Email: <Link href="mailto:matcecco@gmail.com">matcecco@gmail.com</Link>
      </Line>
      <Line>
        Profession: <Txt>Fullstack developer</Txt>
      </Line>
    </AboutFrame>
  );
};

const ProfileImg = () => {
  return <ProfileImgEl src={profile} />;
};

const ProfileImgEl = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin: 10px 0;
`;

const AboutFrame = styled.div`
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

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Txt = styled.span`
  font-weight: normal;
`;

const Link = styled.a`
  font-weight: normal;
  color: #9acbff;
  text-decoration: none;
`;

const Line = styled.div`
  margin-bottom: 3px;
`;
