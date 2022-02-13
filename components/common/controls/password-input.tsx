import Input from 'components/common/controls/input';
import { useTranslations } from 'next-intl';
import { UseFormRegister } from 'react-hook-form';

interface PasswordInputProps {
  label: string;
  register: UseFormRegister<any>;
}

const PasswordInput = ({ label, register }: PasswordInputProps) => {
  const t = useTranslations('PasswordInput');
  return (
    <Input
      type="password"
      placeholder={t('passwordPlaceholder')}
      {...register(label, {
        required: t('passwordRequired'),
        minLength: { value: 6, message: t('minPasswordLength') },
      })}
    />
  );
};

export default PasswordInput;
export type { PasswordInputProps };
