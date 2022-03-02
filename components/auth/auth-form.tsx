import EmailInput from 'components/common/controls/email-input';
import PasswordInput from 'components/common/controls/password-input';
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

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  min-height: 3rem;
  margin-top: 2.25rem;
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

  & > input {
    margin-top: 1.5rem;
  }
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

  if (router.asPath.includes('#sign-up')) {
    return (
      <Form onSubmit={handleSubmit(handleSignUp)}>
        <Heading as={headingLevel}>{t('signUpHeading')}</Heading>
        <EmailInput label="email" register={register} />
        <PasswordInput label="password" register={register} />
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
      <EmailInput label="email" register={register} />
      <PasswordInput label="password" register={register} />
      <SubmitButton>{t('signInButton')}</SubmitButton>
      <Link href="#sign-up" shallow passHref>
        <Anchor>{t('haveNoAccountLink')}</Anchor>
      </Link>
      <Message>{message}</Message>
    </Form>
  );
};

export default AuthForm;
