import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import styled from 'styled-components';

//#region styled
const Button = styled.button.attrs({ type: 'button' })`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  min-height: 55px;
  background: white;
  border: 1px solid #d3d3d3;
  border-radius: 30px;
  color: #cacaca;
  font-size: 1rem;
  text-align: center;
  cursor: pointer;
`;
//#endregion

interface GoBackButtonProps {
  className?: string;
}

const GoBackButton = ({ className }: GoBackButtonProps) => {
  const router = useRouter();
  const t = useTranslations('GoBackButton');

  return (
    <Button className={className} onClick={() => router.back()}>
      {t('text')}
    </Button>
  );
};

export default GoBackButton;