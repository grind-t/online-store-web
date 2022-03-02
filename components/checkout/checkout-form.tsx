import ContactInput from 'components/common/controls/contact-input';
import EmailInput from 'components/common/controls/email-input';
import NameInput from 'components/common/controls/name-input';
import { placeOrder, Recipient } from 'lib/orders';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const SubmitButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  min-height: 3.5rem;
  margin-top: 2.25rem;
  background: #fe5f1e;
  border: none;
  border-radius: 2rem;
  color: white;
  font-size: 1rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 20rem;
  padding: 1rem;

  & > input + input {
    margin-top: 1.5rem;
  }
`;

const CheckoutForm = () => {
  const { register, handleSubmit } = useForm<Recipient>({
    shouldUseNativeValidation: true,
  });
  const router = useRouter();
  const t = useTranslations('CheckoutForm');

  const handleValidOrder = (data: Recipient) => {
    placeOrder(data)
      .then(() => router.replace('/orders'))
      .catch(console.error);
  };

  return (
    <Form onSubmit={handleSubmit(handleValidOrder)}>
      <NameInput label="name" register={register} />
      <EmailInput label="email" register={register} />
      <ContactInput label="contact" register={register} />
      <SubmitButton>{t('submit')}</SubmitButton>
    </Form>
  );
};

export default CheckoutForm;
