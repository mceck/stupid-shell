import '@testing-library/jest-dom/vitest';
import { fireEvent, render, cleanup } from '@testing-library/react';
import { expect, test, afterEach } from 'vitest';
import App from '../../App';

afterEach(cleanup);

test('skills', async () => {
  const app = render(<App />);
  const dock = app.getByTestId('dock');
  const vscodeBtn = dock.querySelector('[label="Skills"]');
  expect(vscodeBtn).not.toBeNull();
  if (vscodeBtn) fireEvent.click(vscodeBtn);
  const windowsShowed = app.queryAllByTestId('wnd').length;
  expect(windowsShowed).toBe(1);
  app.getByText(/Frontend/i);
  app.getByText(/Backend/i);
});

test('curriculum', async () => {
  const app = render(<App />);
  const dock = app.getByTestId('dock');
  const vscodeBtn = dock.querySelector('[label="Curriculum Vitae"]');
  expect(vscodeBtn).not.toBeNull();
  if (vscodeBtn) fireEvent.click(vscodeBtn);
  const windowsShowed = app.queryAllByTestId('wnd').length;
  expect(windowsShowed).toBe(1);
  app.getByText(/Mattia Cecchini/i);
  app.getByText(/PROFESSIONAL EXPERIENCE/i);
});

test('contactme', async () => {
  const app = render(<App />);
  const dock = app.getByTestId('dock');
  const vscodeBtn = dock.querySelector('[label="Contact me"]');
  expect(vscodeBtn).not.toBeNull();
  if (vscodeBtn) fireEvent.click(vscodeBtn);
  const windowsShowed = app.queryAllByTestId('wnd').length;
  expect(windowsShowed).toBe(1);
  app.getByText(/Contact me!/i);
  app.getByText(/Email/i);
});

test('help', async () => {
  const app = render(<App />);
  const dock = app.getByTestId('dock');
  const vscodeBtn = dock.querySelector('[label="Help"]');
  expect(vscodeBtn).not.toBeNull();
  if (vscodeBtn) fireEvent.click(vscodeBtn);
  const windowsShowed = app.queryAllByTestId('wnd').length;
  expect(windowsShowed).toBe(1);
  app.getByText(/help: print help text/i);
});

test('vscode', () => {
  const app = render(<App />);
  const dock = app.getByTestId('dock');
  const vscodeBtn = dock.querySelector('[label="Visual Studio Code"]');
  expect(vscodeBtn).not.toBeNull();
  if (vscodeBtn) fireEvent.click(vscodeBtn);
  const windowsShowed = app.queryAllByTestId('wnd').length;
  expect(windowsShowed).toBe(2);
  app.getByText(/Code -/i);
});
