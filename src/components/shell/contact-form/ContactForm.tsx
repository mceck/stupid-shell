import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useShell } from '../provider';
import { shellColors } from '../shell-colors';

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
      await new Promise<void>((res, err) => {
        setTimeout(() => (Math.random() > 0.5 ? res() : err()), 1000);
      });
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

const FormErr = styled.span`
  color: #ff4141;
  display: inline-block;
`;

const ShellLabel = styled.label`
  display: block;
  margin-top: 20px;
  color: #dedede;
`;

const FormGroup = styled.div`
  :hover {
    input,
    textarea {
      border-color: #ffffff;
    }
    label {
      color: #ffffff;
    }
  }

  input,
  textarea {
    :focus,
    :active {
      border-color: #ffffff;
    }
  }
`;

const ShellInput = styled.input<{ error: boolean }>`
  width: 260px;
  margin-right: 10px;
  border: none;
  background: none;
  outline: none;
  color: #eaeaea;
  font-size: 0.75rem;
  font-weight: 700;
  border-bottom: 2px solid
    ${({ error }) => (error ? shellColors.red : '#dedede')};
`;

const ShellTextarea = styled.textarea<{ error: boolean }>`
  width: 260px;
  margin-right: 10px;
  border: none;
  background: none;
  outline: none;
  color: #eaeaea;
  font-size: 0.75rem;
  font-weight: 700;
  border-bottom: 2px solid
    ${({ error }) => (error ? shellColors.red : '#dedede')};
`;

const ShellButton = styled.button`
  padding: 2px 15px;
  margin: 20px 10px 20px 0;
  border: none;
  outline: none;
  background-color: #eaeaea;
  color: #1f1e1e;
  cursor: pointer;
  :not(:disabled):hover {
    background-color: #ffffff;
  }
`;

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[_])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[_])+)\])/;
