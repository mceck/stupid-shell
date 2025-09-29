export const ROUTES: {
  label: string;
  icon: string;
  bgColor?: string;
  full?: boolean;
  cmd: string;
}[] = [
  {
    label: 'Skills',
    icon: '/skills.png',
    cmd: 'clear && ls ~/skills',
    bgColor: 'rgba(140, 140, 140, 0.5)',
  },
  {
    label: 'Curriculum Vitae',
    icon: '/cv.png',
    full: true,
    cmd: 'clear && curriculum.app',
  },
  {
    label: 'Contact me',
    icon: '/contacts.png',
    full: true,
    cmd: 'clear && contact.me',
  },
  {
    label: 'Help',
    bgColor: '#ffffff',
    icon: '/help.png',
    cmd: 'clear && help',
  },
];
