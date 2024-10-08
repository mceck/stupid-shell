import { AboutFrame, Line, Center, Txt, ProfileImgEl } from './styles';

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
        City: <Txt>Florence - Italy</Txt>
      </Line>
      <Line>
        Profession: <Txt>Fullstack developer</Txt>
      </Line>
    </AboutFrame>
  );
};

const ProfileImg = () => {
  return <ProfileImgEl src={'/profile.jpg'} />;
};
