import { HeadingLevel } from 'lib/accessibility';
import { signIn, signUp } from 'lib/auth';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

//#region styled
const Heading = styled.h1`
  font-size: 2rem;
  font-weight: normal;
  letter-spacing: 0.01em;
  text-align: center;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  min-height: 3rem;
  padding: 0 1rem;
  margin: 1.5rem 0;
  border: 1px solid black;
  border-radius: 0.5rem;
  font-size: 1.5rem;

  :focus {
    outline: none;
  }

  :invalid {
    border: 1px solid red;
  }

  ::placeholder {
    color: #cacaca;
    text-align: center;
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  min-height: 3rem;
  padding: 0 1rem;
  background: #fe5f1e;
  border: none;
  border-radius: 2rem;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
`;

const Anchor = styled.a`
  display: block;
  margin: 1rem auto 0;
  width: fit-content;
  border-bottom: 1px dotted #fe5f1e;
  font-size: 0.875rem;
  letter-spacing: 0.01em;
  text-align: center;
  color: #fe5f1e;
`;

const Message = styled.strong`
  display: block;
  margin-top: 1.25rem;
  text-align: center;
`;

const Form = styled.form`
  max-width: 20rem;
  padding: 1rem;
`;
//#endregion

interface AuthFormData {
  email: string;
  password: string;
}

interface AuthFormProps {
  headingLevel?: HeadingLevel;
}

const AuthForm = ({ headingLevel }: AuthFormProps) => {
  const [message, setMessage] = useState('');
  const { register, handleSubmit } = useForm<AuthFormData>({
    shouldUseNativeValidation: true,
  });
  const router = useRouter();
  const t = useTranslations('AuthForm');

  const handleSignIn: SubmitHandler<AuthFormData> = async (data) => {
    signIn(data.email, data.password)
      .then(() => router.push('/'))
      .catch((error: Error) =>
        setMessage(t('signInError', { message: error.message }))
      );
  };

  const handleSignUp: SubmitHandler<AuthFormData> = async (data) => {
    signUp(data.email, data.password)
      .then(() => setMessage(t('checkEmail')))
      .catch((error: Error) =>
        setMessage(t('signUpError', { message: error.message }))
      );
  };

  const EmailInput = () => (
    <Input
      type="email"
      placeholder={t('emailPlaceholder')}
      {...register('email', { required: t('emailRequired') })}
    />
  );

  const PasswordInput = () => (
    <Input
      type="password"
      placeholder={t('passwordPlaceholder')}
      {...register('password', {
        required: t('passwordRequired'),
        minLength: { value: 6, message: t('minPasswordLength') },
      })}
    />
  );

  if (router.asPath.includes('#sign-up')) {
    return (
      <Form onSubmit={handleSubmit(handleSignUp)}>
        <Heading as={headingLevel}>{t('signUpHeading')}</Heading>
        <EmailInput />
        <PasswordInput />
        <SubmitButton>{t('signUpButton')}</SubmitButton>
        <Link href="#sign-in" shallow passHref>
          <Anchor>{t('goBackLink')}</Anchor>
        </Link>
        <Message>{message}</Message>
      </Form>
    );
  }

  return (
    <Form onSubmit={handleSubmit(handleSignIn)}>
      <Heading as={headingLevel}>{t('signInHeading')}</Heading>
      <EmailInput />
      <PasswordInput />
      <SubmitButton>{t('signInButton')}</SubmitButton>
      <Link href="#sign-up" shallow passHref>
        <Anchor>{t('haveNoAccountLink')}</Anchor>
      </Link>
      <Message>{message}</Message>
    </Form>
  );
};

export default AuthForm;
