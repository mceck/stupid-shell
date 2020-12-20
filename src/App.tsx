import React from 'react';
import { Dock } from './components/dock/Dock';
import { Navbar } from './components/navbar/Navbar';
import { ShellProvider } from './components/shell/provider';
import { Shell } from './components/shell/Shell';

function App() {
  return (
    <ShellProvider>
      <Navbar />
      <Shell />
      <Dock />
    </ShellProvider>
  );
}

export default App;
