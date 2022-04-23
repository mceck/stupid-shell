import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../../App';

const setupTest = () => {
  const app = render(<App />);
  return { app };
};

test('about menu', () => {
  const { app } = setupTest();
  const logoBtn = app.getByTestId('nav-logo');
  fireEvent.click(logoBtn);
  app.getByText(/About McDev/gi);
  app.getByText(/First name:/gi);
  fireEvent.click(logoBtn);
  let q = app.queryByText(/About McDev/gi);
  expect(q).toBeNull();
  q = app.queryByText(/First name:/gi);
  expect(q).toBeNull();
});
