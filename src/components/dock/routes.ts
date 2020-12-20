export const ROUTES: {
  label: string;
  icon: string;
  cmd: string;
}[] = [
  {
    label: 'Curriculum Vitae',
    icon: process.env.PUBLIC_URL + '/cv.png',
    cmd: 'clear && curriculum.app',
  },
  {
    label: 'Skills',
    icon: process.env.PUBLIC_URL + '/skills.png',
    cmd: 'cd skills',
  },
  {
    label: 'Contacts',
    icon: process.env.PUBLIC_URL + '/contacts.png',
    cmd: 'cd ..',
  },
];
