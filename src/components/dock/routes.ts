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
    cmd: 'clear && ls ~/skills',
  },
  {
    label: 'Contacts',
    icon: process.env.PUBLIC_URL + '/contacts.png',
    cmd: 'clear && contact.me',
  },
  {
    label: 'Help',
    icon: process.env.PUBLIC_URL + '/help.png',
    cmd: 'clear && help',
  },
];
