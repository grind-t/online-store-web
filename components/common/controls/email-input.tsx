import Input from 'components/common/controls/input';
import { useTranslations } from 'next-intl';
import { UseFormRegister } from 'react-hook-form';

interface EmailInputProps {
  label: string;
  register: UseFormRegister<any>;
}

const EmailInput = ({ label, register }: EmailInputProps) => {
  const t = useTranslations('EmailInput');
  return (
    <Input
      type="email"
      placeholder={t('emailPlaceholder')}
      {...register(label, { required: t('emailRequired') })}
    />
  );
};

export default EmailInput;
export type { EmailInputProps };
