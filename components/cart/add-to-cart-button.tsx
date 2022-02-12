import PlusIcon from 'components/common/icons/plus-icon';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

//#region styled
const Icon = styled(PlusIcon)`
  width: 0.75rem;
  margin-right: 0.4375rem;
`;

const Count = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.375rem;
  min-height: 1.375rem;
  margin-left: 0.5625rem;
  background: #eb5a1e;
  border-radius: 50%;
  color: white;
  font-size: 0.8125rem;
`;

const Button = styled.button.attrs({ type: 'button' })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #eb5a1e;
  border-radius: 1.875rem;
  color: #eb5a1e;
  font-weight: bold;
  line-height: 1;
`;
//#endregion

interface AddToCartButtonProps {
  count: number;
  disabled: boolean;
  onClick: () => void;
}

const AddToCartButton = ({
  count,
  disabled,
  onClick,
}: AddToCartButtonProps) => {
  const t = useTranslations('AddToCartButton');

  return (
    <Button disabled={disabled} onClick={onClick}>
      <Icon />
      {t('text')}
      <Count>{count}</Count>
    </Button>
  );
};

export default AddToCartButton;
