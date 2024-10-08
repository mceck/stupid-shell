import React from 'react';
import { VSIcon } from './styles';

export const VSFileIcon: React.FC<{
  name: string;
  onClick?: (event: React.MouseEvent) => void;
  open?: boolean;
}> = ({ name, open, ...props }) => {
  if (name.match(/\.ts[x]?$/))
    return <VSIcon {...props} src={'/tsico.png'} alt="." />;
  if (name.match(/\.js[x]?$/))
    return <VSIcon {...props} src={'/jsico.png'} alt="." />;
  if (!name.match(/\.[^/]+$/))
    return (
      <VSIcon
        {...props}
        src={'/folderico.png'}
        alt="."
        style={{ transform: open ? undefined : 'rotate(-90deg)' }}
      />
    );

  return <VSIcon {...props} src={'/defaultico.png'} alt="." />;
};
