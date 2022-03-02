import Input from 'components/common/controls/input';
import { useTranslations } from 'next-intl';
import { UseFormRegister } from 'react-hook-form';

interface ContactInputProps {
  label: string;
  register: UseFormRegister<any>;
}

const ContactInput = ({ label, register }: ContactInputProps) => {
  const t = useTranslations('ContactInput');
  return (
    <Input type="text" placeholder={t('placeholder')} {...register(label)} />
  );
};

export default ContactInput;
export type { ContactInputProps };
