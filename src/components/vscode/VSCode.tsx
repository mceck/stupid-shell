import React from 'react';
import Editor from '@monaco-editor/react';

export const VSCode = () => {
  return (
    <div style={{ backgroundColor: '#202124', width: '100%', height: '100%' }}>
      <Editor
        language="typescript"
        theme="dark"
        options={{ fontSize: 14, fontFamily: 'SFMono' }}
      />
    </div>
  );
};
