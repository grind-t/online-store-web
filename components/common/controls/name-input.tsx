import Input from 'components/common/controls/input';
import { useTranslations } from 'next-intl';
import { UseFormRegister } from 'react-hook-form';

interface NameInputProps {
  label: string;
  register: UseFormRegister<any>;
}

const NameInput = ({ label, register }: NameInputProps) => {
  const t = useTranslations('NameInput');
  return (
    <Input type="text" placeholder={t('placeholder')} {...register(label)} />
  );
};

export default NameInput;
export type { NameInputProps };
