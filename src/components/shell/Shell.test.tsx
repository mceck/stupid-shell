import '@testing-library/jest-dom';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

const setupTest = () => {
  const shell = render(<App />);
  shell.getByText('Terminal - mcdev@web.mcdev.host');
  shell.getByText(/\/home\/mcdev/gi);
  shell.getByTestId('cmd');
  return { shell };
};

const typeCmd = (cmd: string, shell: RenderResult) => {
  const cmdInput = shell.getByTestId('cmd');
  userEvent.type(cmdInput, cmd);
  expect(cmdInput.closest('input')?.value).toBe(cmd);
  fireEvent(
    cmdInput,
    new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
  );
  const inpt = shell.queryByTestId('cmd');
  if (inpt) expect(inpt.closest('input')?.value).toBe('');
};

test('ls home', () => {
  const { shell } = setupTest();
  typeCmd('ls ~', shell);
  shell.getByText('skills');
  shell.getByText('contact');
  shell.getByText('curriculum');
});

test('cd', () => {
  const { shell } = setupTest();
  typeCmd('cd', shell);
  shell.getByText('cd');
});

test('cd skills dir', () => {
  const { shell } = setupTest();
  typeCmd('cd skills', shell);
  shell.getByText(/\/home\/mcdev\/skills/gi);
  typeCmd('ls', shell);
  shell.getByText('Frontend');
});

test('cd wrong dir', () => {
  const { shell } = setupTest();
  typeCmd('cd not_existing_dir', shell);
  shell.getByText(/cd: no such file or directory:/gi);
});

test('help', () => {
  const { shell } = setupTest();
  typeCmd('help', shell);
  shell.getByText(/help: print help text/gi);
});

test('echo', () => {
  const { shell } = setupTest();
  typeCmd('echo ciao ciao', shell);
  shell.getByText('ciao ciao');
});

test('clear', () => {
  const { shell } = setupTest();
  typeCmd('cd skills', shell);
  shell.getByText('cd skills');
  typeCmd('clear', shell);
  const q = shell.queryByText('cd skills');
  expect(q).toBeNull();
  shell.getByText(/\/home\/mcdev\/skills/gi);
});

test('curriculum.app cmd', () => {
  const { shell } = setupTest();
  typeCmd('curriculum.app', shell);
  shell.getByText(/Mattia Cecchini/gi);
  shell.getByText(/PROFESSIONAL EXPERIENCE/gi);
});

test('contact.me cmd', () => {
  const { shell } = setupTest();
  typeCmd('contact.me', shell);
  shell.getByText(/Contact me!/gi);
  shell.getByText(/Email:/gi);
});

test('exit', () => {
  const { shell } = setupTest();
  typeCmd('exit', shell);
  shell.getByText(/Can't close this window!/gi);
});
