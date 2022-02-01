import PlusIcon from 'components/common/icons/plus-icon';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

//#region styled
const Icon = styled(PlusIcon)`
  width: 12px;
  margin-right: 7px;
`;

const Count = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  min-height: 22px;
  margin-left: 9px;
  background: #eb5a1e;
  border-radius: 50%;
  color: white;
  font-size: 13px;
`;

const Button = styled.button.attrs({ type: 'button' })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background: white;
  border: 1px solid #eb5a1e;
  border-radius: 30px;
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