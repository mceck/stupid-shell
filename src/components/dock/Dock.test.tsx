import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../../App';

const setupTest = () => {
  const app = render(<App />);
  return { app };
};

test('vscode', () => {
  const { app } = setupTest();
  const dock = app.getByTestId('dock');
  const vscodeBtn = dock.querySelector('[label="Visual Studio Code"]');
  expect(vscodeBtn).not.toBeNull();
  if (vscodeBtn) fireEvent.click(vscodeBtn);
  const windowsShowed = app.queryAllByTestId('wnd').length;
  expect(windowsShowed).toBe(2);
  app.getByText(/Code -/gi);
});

test('skills', () => {
  const { app } = setupTest();
  const dock = app.getByTestId('dock');
  const vscodeBtn = dock.querySelector('[label="Skills"]');
  expect(vscodeBtn).not.toBeNull();
  if (vscodeBtn) fireEvent.click(vscodeBtn);
  const windowsShowed = app.queryAllByTestId('wnd').length;
  expect(windowsShowed).toBe(1);
  app.getByText(/Frontend/gi);
  app.getByText(/Backend/gi);
});

test('curriculum', () => {
  const { app } = setupTest();
  const dock = app.getByTestId('dock');
  const vscodeBtn = dock.querySelector('[label="Curriculum Vitae"]');
  expect(vscodeBtn).not.toBeNull();
  if (vscodeBtn) fireEvent.click(vscodeBtn);
  const windowsShowed = app.queryAllByTestId('wnd').length;
  expect(windowsShowed).toBe(1);
  app.getByText(/Mattia Cecchini/gi);
  app.getByText(/PROFESSIONAL EXPERIENCE/gi);
});

test('contactme', () => {
  const { app } = setupTest();
  const dock = app.getByTestId('dock');
  const vscodeBtn = dock.querySelector('[label="Contact me"]');
  expect(vscodeBtn).not.toBeNull();
  if (vscodeBtn) fireEvent.click(vscodeBtn);
  const windowsShowed = app.queryAllByTestId('wnd').length;
  expect(windowsShowed).toBe(1);
  app.getByText(/Contact me!/gi);
  app.getByText(/Email/gi);
});

test('help', () => {
  const { app } = setupTest();
  const dock = app.getByTestId('dock');
  const vscodeBtn = dock.querySelector('[label="Help"]');
  expect(vscodeBtn).not.toBeNull();
  if (vscodeBtn) fireEvent.click(vscodeBtn);
  const windowsShowed = app.queryAllByTestId('wnd').length;
  expect(windowsShowed).toBe(1);
  app.getByText(/help: print help text/gi);
});
