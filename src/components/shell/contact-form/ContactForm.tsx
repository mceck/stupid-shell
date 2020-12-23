import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useShell } from '../provider';
import {
  ShellButton,
  FormGroup,
  ShellLabel,
  ShellInput,
  FormErr,
  ShellTextarea,
} from './styles';

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[_])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[_])+)\])/;

export const ContactForm = () => {
  const {
    register,
    errors,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [loading, setLoading] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false);
  const [submitError, setError] = useState<string>('');

  const shell = useShell();

  const onSubmit = async (data: Record<string, any>) => {
    setLoading(true);
    try {
      const result = await fetch('https://mcdev-bot.herokuapp.com/contact-me', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (result.status !== 200) throw new Error('errore invio messaggio');
      setLoading(false);
      setFinish(true);
    } catch (err) {
      setError('Wooops! Sorry... Retry later');
      setTimeout(() => setError(''), 6000);
      setLoading(false);
    }
  };
  if (finish)
    return (
      <div>
        <p>🤟 Thank you! 🤟</p>
        <ShellButton onClick={() => shell.pushCmd!('clear')}>
          GO BACK
        </ShellButton>
      </div>
    );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Contact me! ❤️</p>
      <FormGroup>
        <ShellLabel htmlFor="email">Email: </ShellLabel>
        <ShellInput
          name="email"
          error={errors['email']}
          ref={register({ required: true, pattern: EMAIL_REGEX })}
        />
        <FormErr>{errors['email']?.type}</FormErr>
      </FormGroup>
      <FormGroup>
        <ShellLabel htmlFor="message">Message: </ShellLabel>
        <ShellTextarea
          name="message"
          error={errors['message']}
          ref={register({ required: true })}
        />
        <FormErr>{errors['message']?.type}</FormErr>
      </FormGroup>
      <ShellButton type="submit" disabled={isSubmitting}>
        SEND MESSAGE
      </ShellButton>
      <FormErr>{submitError}</FormErr>
      {loading && <div>Loading 🚀</div>}
    </form>
  );
};
