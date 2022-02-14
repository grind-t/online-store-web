import EmailInput from 'components/common/controls/email-input';
import { placeOrder } from 'lib/checkout';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const SubmitButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  min-height: 3.5rem;
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
`;

interface CheckoutFormData {
  email: string;
}

const CheckoutForm = () => {
  const { register, handleSubmit } = useForm<CheckoutFormData>({
    shouldUseNativeValidation: true,
  });
  const t = useTranslations('CheckoutForm');

  return (
    <Form onSubmit={handleSubmit((data) => placeOrder(data.email))}>
      <EmailInput label="email" register={register} />
      <SubmitButton>{t('submit')}</SubmitButton>
    </Form>
  );
};

export default CheckoutForm;
