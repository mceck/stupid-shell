export const ROUTES: {
  label: string;
  icon: string;
  cmd: string;
}[] = [
  {
    label: 'Curriculum Vitae',
    icon: '/cv.png',
    cmd: 'clear && curriculum.app',
  },
  {
    label: 'Skills',
    icon: '/skills.png',
    cmd: 'clear && ls ~/skills',
  },
  {
    label: 'Contact me',
    icon: '/contacts.png',
    cmd: 'clear && contact.me',
  },
  {
    label: 'Help',
    icon: '/help.png',
    cmd: 'clear && help',
  },
];
