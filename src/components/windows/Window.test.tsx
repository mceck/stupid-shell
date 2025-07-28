import '@testing-library/jest-dom/vitest';
import { fireEvent, render, cleanup } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import App from '../../App';

const NON_INFLUENT = 999;

const START_X = '50px';
const START_Y = '50px';
const START_W = '530px';
const START_H = '300px';

const WND_MIN_SIZE = '100px';
const WND_MIN_X = '0px';
const WND_MIN_Y = '26px';

const setupTest = () => {
  const app = render(<App />);
  const wnd = app.getByTestId('wnd');
  const wndBar = app.getByTestId('wnd-bar');
  const wndPanel = app.getByTestId('wnd-panel');
  expect(wnd.style.left).toBe(START_X);
  expect(wnd.style.top).toBe(START_Y);
  expect(wndPanel.style.width).toBe(START_W);
  expect(wndPanel.style.height).toBe(START_H);
  return { app, wnd, wndBar, wndPanel };
};

const dragEvent = (target: HTMLElement, x: number, y: number) => {
  fireEvent.mouseDown(target);
  fireEvent.mouseMove(target, {
    clientX: x,
    clientY: y,
  });
  fireEvent.mouseUp(target);
};

afterEach(cleanup);

test('move wnd', () => {
  const { wnd, wndBar } = setupTest();
  let x = 150,
    y = 200;
  dragEvent(wndBar, x, y);
  expect(wnd.style.left).toBe(`${x}px`);
  expect(wnd.style.top).toBe(`${y}px`);

  x = 250;
  y = 500;
  dragEvent(wndBar, x, y);
  expect(wnd.style.left).toBe(`${x}px`);
  expect(wnd.style.top).toBe(`${y}px`);
});

// test('move wnd outofbounds', () => {
//   const { wnd, wndBar } = setupTest();
//   let x = -600,
//     y = 0;
//   dragEvent(wndBar, x, y);
//   expect(wnd.style.left).toBe(`-480px`);
//   expect(wnd.style.top).toBe(`26px`);

//   x = 1000;
//   y = 700;
//   dragEvent(wndBar, x, y);
//   expect(wnd.style.left).toBe(`974px`);
//   expect(wnd.style.top).toBe(`668px`);
// });

test('resize right', () => {
  const { app, wndPanel } = setupTest();

  const resizer = app.getByTestId('resizer-right');
  let w = 700;
  dragEvent(resizer, w, NON_INFLUENT);
  expect(wndPanel.style.width).toBe(`${w}px`);
  expect(wndPanel.style.height).toBe(START_H);
  w = 400;
  dragEvent(resizer, w, NON_INFLUENT);
  expect(wndPanel.style.width).toBe(`${w}px`);
  expect(wndPanel.style.height).toBe(START_H);
});

test('resize bottom', () => {
  const { app, wndPanel } = setupTest();
  const resizer = app.getByTestId('resizer-bottom');
  let h = 200;
  dragEvent(resizer, NON_INFLUENT, h);
  expect(wndPanel.style.width).toBe(START_W);
  expect(wndPanel.style.height).toBe(`${h}px`);
  h = 400;
  dragEvent(resizer, NON_INFLUENT, h);
  expect(wndPanel.style.width).toBe(START_W);
  expect(wndPanel.style.height).toBe(`${h}px`);
});

test('resize left', () => {
  const { app, wnd, wndPanel } = setupTest();
  const resizer = app.getByTestId('resizer-left');
  let x = 100;
  dragEvent(resizer, x, NON_INFLUENT);
  expect(wndPanel.style.width).toBe(
    `${parseInt(START_W) + parseInt(START_X) - x}px`
  );
  expect(wnd.style.left).toBe(`${x}px`);
  expect(wndPanel.style.height).toBe(START_H);
  expect(wnd.style.top).toBe(START_Y);

  x = 30;
  dragEvent(resizer, x, NON_INFLUENT);
  expect(wndPanel.style.width).toBe(
    `${parseInt(START_W) + parseInt(START_X) - x}px`
  );
  expect(wnd.style.left).toBe(`${x}px`);
  expect(wndPanel.style.height).toBe(START_H);
  expect(wnd.style.top).toBe(START_Y);
});

test('resize top', () => {
  const { app, wnd, wndPanel } = setupTest();
  const resizer = app.getByTestId('resizer-top');
  let y = 100;
  dragEvent(resizer, NON_INFLUENT, y);
  expect(wndPanel.style.height).toBe(
    `${parseInt(START_H) + parseInt(START_Y) - y}px`
  );
  expect(wnd.style.top).toBe(`${y}px`);
  expect(wndPanel.style.width).toBe(START_W);
  expect(wnd.style.left).toBe(START_X);

  y = 30;
  dragEvent(resizer, NON_INFLUENT, y);
  expect(wndPanel.style.height).toBe(
    `${parseInt(START_H) + parseInt(START_Y) - y}px`
  );
  expect(wnd.style.top).toBe(`${y}px`);
  expect(wndPanel.style.width).toBe(START_W);
  expect(wnd.style.left).toBe(START_X);
});

test('resize se', () => {
  const { app, wnd, wndPanel } = setupTest();
  const resizer = app.getByTestId('resizer-se');
  let h = 200,
    w = 700;
  dragEvent(resizer, w, h);
  expect(wndPanel.style.width).toBe(`${w}px`);
  expect(wndPanel.style.height).toBe(`${h}px`);
  expect(wnd.style.top).toBe(START_Y);
  expect(wnd.style.left).toBe(START_X);

  h = 400;
  w = 400;
  dragEvent(resizer, w, h);
  expect(wndPanel.style.width).toBe(`${w}px`);
  expect(wndPanel.style.height).toBe(`${h}px`);
  expect(wnd.style.top).toBe(START_Y);
  expect(wnd.style.left).toBe(START_X);
});

test('resize sw', () => {
  const { app, wnd, wndPanel } = setupTest();
  const resizer = app.getByTestId('resizer-sw');
  let h = 200,
    w = 100;
  dragEvent(resizer, w, h);
  expect(wndPanel.style.height).toBe(`${h}px`);
  expect(wndPanel.style.width).toBe(
    `${parseInt(START_W) + parseInt(START_X) - w}px`
  );
  expect(wnd.style.left).toBe(`${w}px`);
  expect(wnd.style.top).toBe(START_Y);

  h = 400;
  w = 30;
  dragEvent(resizer, w, h);
  expect(wndPanel.style.height).toBe(`${h}px`);
  expect(wndPanel.style.width).toBe(
    `${parseInt(START_W) + parseInt(START_X) - w}px`
  );
  expect(wnd.style.left).toBe(`${w}px`);
  expect(wnd.style.top).toBe(START_Y);
});

test('resize ne', () => {
  const { app, wnd, wndPanel } = setupTest();
  const resizer = app.getByTestId('resizer-ne');
  let h = 100,
    w = 700;
  dragEvent(resizer, w, h);
  expect(wndPanel.style.width).toBe(`${w}px`);
  expect(wndPanel.style.height).toBe(
    `${parseInt(START_H) + parseInt(START_Y) - h}px`
  );
  expect(wnd.style.top).toBe(`${h}px`);
  expect(wnd.style.left).toBe(START_X);

  h = 30;
  w = 400;
  dragEvent(resizer, w, h);
  expect(wndPanel.style.width).toBe(`${w}px`);
  expect(wndPanel.style.height).toBe(
    `${parseInt(START_H) + parseInt(START_Y) - h}px`
  );
  expect(wnd.style.top).toBe(`${h}px`);
  expect(wnd.style.left).toBe(START_X);
});

test('resize nw', () => {
  const { app, wnd, wndPanel } = setupTest();
  const resizer = app.getByTestId('resizer-nw');
  let h = 100,
    w = 100;
  dragEvent(resizer, w, h);
  expect(wndPanel.style.height).toBe(
    `${parseInt(START_H) + parseInt(START_Y) - h}px`
  );
  expect(wnd.style.top).toBe(`${h}px`);
  expect(wndPanel.style.width).toBe(
    `${parseInt(START_W) + parseInt(START_X) - w}px`
  );
  expect(wnd.style.left).toBe(`${w}px`);

  h = 30;
  w = 30;
  dragEvent(resizer, w, h);
  expect(wndPanel.style.height).toBe(
    `${parseInt(START_H) + parseInt(START_Y) - h}px`
  );
  expect(wnd.style.top).toBe(`${h}px`);
  expect(wndPanel.style.width).toBe(
    `${parseInt(START_W) + parseInt(START_X) - w}px`
  );
  expect(wnd.style.left).toBe(`${w}px`);
});

test('resize se lower bounds', () => {
  const { app, wndPanel } = setupTest();
  const resizer = app.getByTestId('resizer-se');
  let h = 10,
    w = 10;
  dragEvent(resizer, w, h);
  expect(wndPanel.style.width).toBe(WND_MIN_SIZE);
  expect(wndPanel.style.height).toBe(WND_MIN_SIZE);
});

test('fullsize window', () => {
  const { wnd, wndPanel, wndBar } = setupTest();
  const resizeBtn = wndBar.querySelector('#resize');
  expect(resizeBtn).not.toBeNull();
  if (resizeBtn) fireEvent.click(resizeBtn);
  expect(wnd.style.top).toBe(WND_MIN_Y);
  expect(wnd.style.left).toBe(WND_MIN_X);
  expect(wndPanel.style.width).toBe(`${global.innerWidth}px`);
  expect(parseInt(wndPanel.style.height)).toBeGreaterThan(
    global.innerHeight - 150
  );
});

test('open vscode window', () => {
  const { app } = setupTest();
  let windowsShowed = app.queryAllByTestId('wnd').length;
  expect(windowsShowed).toBe(1);
  const vscodeBtn = app
    .getByTestId('dock')
    .querySelector('[label="Visual Studio Code"]');
  expect(vscodeBtn).not.toBeNull();
  if (vscodeBtn) fireEvent.click(vscodeBtn);
  windowsShowed = app.queryAllByTestId('wnd').length;
  expect(windowsShowed).toBe(2);
});

test('close window', () => {
  const { app } = setupTest();
  let windowsShowed = app.queryAllByTestId('wnd');
  expect(windowsShowed.length).toBe(1);
  const vscodeBtn = app
    .getByTestId('dock')
    .querySelector('[label="Visual Studio Code"]');
  expect(vscodeBtn).not.toBeNull();
  if (vscodeBtn) fireEvent.click(vscodeBtn);
  windowsShowed = app.queryAllByTestId('wnd');
  expect(windowsShowed.length).toBe(2);

  windowsShowed.forEach((w) => {
    const closeBtn = w.querySelector('#close');
    if (closeBtn) fireEvent.click(closeBtn);
  });
  windowsShowed = app.queryAllByTestId('wnd');
  expect(windowsShowed.length).toBe(1);
});

test('minimize window', () => {
  const { app } = setupTest();
  let windowsShowed = app.queryAllByTestId('wnd');
  expect(windowsShowed.length).toBe(1);
  const vscodeBtn = app
    .getByTestId('dock')
    .querySelector('[label="Visual Studio Code"]');
  expect(vscodeBtn).not.toBeNull();
  if (vscodeBtn) fireEvent.click(vscodeBtn);
  windowsShowed = app.queryAllByTestId('wnd');
  expect(windowsShowed.length).toBe(2);

  windowsShowed.forEach((w) => {
    const closeBtn = w.querySelector('#minimize');
    if (closeBtn) fireEvent.click(closeBtn);
  });
  windowsShowed = app.queryAllByTestId('wnd');
  expect(windowsShowed.length).toBe(2);
  expect(windowsShowed.some((w) => w.classList.contains('minimizing'))).toBe(
    true
  );
});
