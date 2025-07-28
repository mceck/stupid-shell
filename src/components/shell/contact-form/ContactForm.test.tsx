// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { contactApi } from '../../../api/contact';
import { ContactForm } from './ContactForm';
import { expect, test, afterEach, vi } from 'vitest';

const contactMock = (contactApi.contactMe = vi.fn());

const testEmail = 'mario@draghi.it';
const testMessage = 'ciao';

afterEach(cleanup);

test('contact form send', async () => {
  const component = render(<ContactForm />);
  const sendButton = component.getByText(/send message/i);
  await userEvent.click(sendButton);
  // check empty field validation
  let fails = await component.findAllByText(/required/i);
  expect(fails.length).toBe(2);
  const emailCtrl = component.getByLabelText(/email:/i);
  const messageCtrl = component.getByLabelText(/message:/i);
  await userEvent.type(emailCtrl, testEmail.slice(0, 3));
  await userEvent.type(messageCtrl, testMessage);
  await userEvent.click(sendButton);
  await component.findByText(/pattern/i);
  expect(fails[1].textContent).not.toBe(/required/i);
  // send message
  await userEvent.type(emailCtrl, testEmail.slice(3));
  contactMock.mockResolvedValueOnce('ok');
  await userEvent.click(sendButton);
  await component.findAllByText(/thank you/i);
  expect(contactMock).toHaveBeenCalledTimes(1);
  expect(contactMock).toHaveBeenCalledWith(
    expect.objectContaining({
      email: testEmail,
      message: testMessage,
    })
  );
});

test('contact form typing', async () => {
  const component = render(<ContactForm />);
  const emailCtrl = component.getByLabelText(/email:/i);
  const messageCtrl = component.getByLabelText(/message:/i);

  await userEvent.type(emailCtrl, testEmail);
  expect(emailCtrl.closest('input')?.value).toBe(testEmail);
  await userEvent.type(messageCtrl, testMessage);
  expect(messageCtrl.closest('textarea')?.value).toBe(testMessage);
});
