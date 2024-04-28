import React from 'react';
import { Dock } from './components/dock/Dock';
import { Navbar } from './components/navbar/Navbar';
import { ShellProvider } from './components/shell/provider';
import { Shell } from './components/shell/Shell';
import { WindowProvider } from './components/windows/window-provider';

function App() {
  return (
    <WindowProvider>
      <ShellProvider>
        <Navbar />
        <Shell />
        <Dock />
      </ShellProvider>
    </WindowProvider>
  );
}

export default App;
