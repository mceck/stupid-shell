import '@testing-library/jest-dom/vitest';
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, afterEach } from 'vitest';
import App from '../../App';

const setupTest = () => {
  const shell = render(<App />);
  shell.getByText('Terminal - mcdev@web.mcdev.host');
  shell.getByText(/\/home\/mcdev/i);
  shell.getByTestId('cmd');
  return { shell };
};

const typeCmd = async (cmd: string, shell: RenderResult) => {
  const cmdInput = shell.getByTestId('cmd');
  await userEvent.type(cmdInput, cmd);
  expect(cmdInput.closest('input')?.value).toBe(cmd);
  fireEvent(
    cmdInput,
    new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
  );
  const inpt = shell.queryByTestId('cmd');
  if (inpt) expect(inpt.closest('input')?.value).toBe('');
};

afterEach(cleanup);

test('ls home', async () => {
  const { shell } = setupTest();
  await typeCmd('ls ~', shell);
  shell.getByText('skills');
  shell.getByText('contact');
  shell.getByText('curriculum');
});

test('cd', async () => {
  const { shell } = setupTest();
  await typeCmd('cd', shell);
  shell.getByText('cd');
});

test('cd skills dir', async () => {
  const { shell } = setupTest();
  await typeCmd('cd skills', shell);
  shell.getByText(/\/home\/mcdev\/skills/i);
  await typeCmd('ls', shell);
  shell.getByText('Frontend');
});

test('cd wrong dir', async () => {
  const { shell } = setupTest();
  await typeCmd('cd not_existing_dir', shell);
  shell.getByText(/cd: no such file or directory:/i);
});

test('help', async () => {
  const { shell } = setupTest();
  await typeCmd('help', shell);
  shell.getByText(/help: print help text/i);
});

test('echo', async () => {
  const { shell } = setupTest();
  await typeCmd('echo ciao ciao', shell);
  shell.getByText('ciao ciao');
});

test('clear', async () => {
  const { shell } = setupTest();
  await typeCmd('cd skills', shell);
  shell.getByText('cd skills');
  await typeCmd('clear', shell);
  const q = shell.queryByText('cd skills');
  expect(q).toBeNull();
  shell.getByText(/\/home\/mcdev\/skills/i);
});

test('curriculum.app cmd', async () => {
  const { shell } = setupTest();
  await typeCmd('curriculum.app', shell);
  shell.getByText(/Mattia Cecchini/i);
  shell.getByText(/PROFESSIONAL EXPERIENCE/i);
});

test('contact.me cmd', async () => {
  const { shell } = setupTest();
  await typeCmd('contact.me', shell);
  shell.getByText(/Contact me!/i);
  shell.getByText(/Email:/i);
});

test('exit', async () => {
  const { shell } = setupTest();
  await typeCmd('exit', shell);
  shell.getByText(/Can't close this window!/i);
});
