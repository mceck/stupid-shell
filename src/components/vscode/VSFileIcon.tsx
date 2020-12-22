import React from 'react';
import { VSIcon } from './styles';

export const VSFileIcon: React.FC<{ name: string }> = ({ name }) => {
  if (name.match(/\.ts[x]?$/))
    return <VSIcon src={process.env.PUBLIC_URL + '/tsico.png'} alt="." />;
  if (name.match(/\.js[x]?$/))
    return <VSIcon src={process.env.PUBLIC_URL + '/jsico.png'} alt="." />;
  if (!name.match(/\.[^/]+$/))
    return <VSIcon src={process.env.PUBLIC_URL + '/folderico.png'} alt="." />;

  return <VSIcon src={process.env.PUBLIC_URL + '/defaultico.png'} alt="." />;
};
