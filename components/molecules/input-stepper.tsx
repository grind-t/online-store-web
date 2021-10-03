import StandaloneMinusIcon from 'components/atoms/icons/minus-icon';
import StandalonePlusIcon from 'components/atoms/icons/plus-icon';
import VisuallyHidden from 'components/atoms/utils/visually-hidden';
import { useTranslations } from 'next-intl';
import styled, { css } from 'styled-components';

//#region styled
const xsFontSize = 14;
const xlFontSize = 22;

const icon = css`
  width: 0.43em;
  height: 100%;
`;

const MinusIcon = styled(StandaloneMinusIcon)`
  ${icon}
`;

const PlusIcon = styled(StandalonePlusIcon)`
  ${icon}
`;

const Button = styled.button.attrs({ type: 'button' })`
  width: 1.45em;
  height: 1.45em;
  background: white;
  border: 1.5px solid #fe5f1e;
  border-radius: 50%;
  text-align: center;
`;

const Value = styled.span`
  margin: 0 0.375em;
  font-weight: bold;
  letter-spacing: 0.01em;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
//#endregion

interface InputStepperProps {
  value?: number | string;
  onDecrement?: () => void;
  onIncrement?: () => void;
  className?: string;
}

const InputStepper = ({
  value,
  onDecrement,
  onIncrement,
  className,
}: InputStepperProps) => {
  const t = useTranslations('InputStepper');

  return (
    <Container className={className}>
      <Button onClick={onDecrement}>
        <VisuallyHidden>{t('decrement')}</VisuallyHidden>
        <MinusIcon />
      </Button>
      <Value>{value}</Value>
      <Button onClick={onIncrement}>
        <VisuallyHidden>{t('increment')}</VisuallyHidden>
        <PlusIcon />
      </Button>
    </Container>
  );
};

export default InputStepper;
