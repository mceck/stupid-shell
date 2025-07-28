import '@testing-library/jest-dom/vitest';
import { fireEvent, render } from '@testing-library/react';
import App from '../../App';
import { expect, test } from 'vitest';

const setupTest = () => {
  const app = render(<App />);
  return { app };
};

test('about menu', () => {
  const { app } = setupTest();
  const logoBtn = app.getByTestId('nav-logo');
  fireEvent.click(logoBtn);
  app.getByText(/About McDev/i);
  app.getByText(/First name:/i);
  fireEvent.click(logoBtn);
  let q = app.queryByText(/About McDev/i);
  expect(q).toBeNull();
  q = app.queryByText(/First name:/i);
  expect(q).toBeNull();
});
