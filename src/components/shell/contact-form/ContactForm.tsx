import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { contactApi } from '../../../api/contact';
import { useShell } from '../provider';
import {
  ShellButton,
  FormGroup,
  ShellLabel,
  ShellInput,
  FormErr,
  ShellTextarea,
} from './styles';

const EMAIL_REGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[_])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[_])+)\])/;

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [loading, setLoading] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false);
  const [submitError, setError] = useState<string>('');

  const shell = useShell();

  const onSubmit = async (data: Record<string, any>) => {
    setLoading(true);
    try {
      await contactApi.contactMe(data);
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
          id="email"
          $error={!!errors['email']}
          {...register('email', { required: true, pattern: EMAIL_REGEX })}
        />
        <FormErr>{errors['email']?.type as string}</FormErr>
      </FormGroup>
      <FormGroup>
        <ShellLabel htmlFor="message">Message: </ShellLabel>
        <ShellTextarea
          id="message"
          $error={!!errors['message']}
          maxLength={500}
          {...register('message', { required: true })}
        />
        <FormErr>{errors['message']?.type as string}</FormErr>
      </FormGroup>
      <ShellButton type="submit" disabled={isSubmitting}>
        SEND MESSAGE
      </ShellButton>
      <FormErr>{submitError}</FormErr>
      {loading && <div>Loading 🚀</div>}
    </form>
  );
};
