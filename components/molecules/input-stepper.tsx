import StandaloneMinusIcon from 'components/atoms/icons/minus-icon';
import StandalonePlusIcon from 'components/atoms/icons/plus-icon';
import VisuallyHidden from 'components/atoms/utils/visually-hidden';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const xsFontSize = 14;
const xlFontSize = 22;

const MinusIcon = styled(StandaloneMinusIcon)`
  width: 0.43em;
  height: 0.09em;
`;

const PlusIcon = styled(StandalonePlusIcon)`
  width: 0.43em;
  height: 0.43em;
`;

const Button = styled.button.attrs({ type: 'button' })`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1.45em;
  height: 1.45em;
  background: white;
  border: 1.5px solid #fe5f1e;
  border-radius: 50%;
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
  font-size: ${xsFontSize}px;

  @media ${up(breakpoints.md)} {
    font-size: ${(xlFontSize + xsFontSize) / 2}px;
  }

  @media ${up(breakpoints.xl)} {
    font-size: ${xlFontSize}px;
  }
`;
//#endregion

interface InputStepperProps {
  value?: number | string;
  onDecrement?: () => void;
  onIncrement?: () => void;
}

const InputStepper = ({
  value,
  onDecrement,
  onIncrement,
}: InputStepperProps) => {
  return (
    <Container>
      <Button onClick={onDecrement}>
        <VisuallyHidden>Меньше</VisuallyHidden>
        <MinusIcon />
      </Button>
      <Value>{value}</Value>
      <Button onClick={onIncrement}>
        <VisuallyHidden>Больше</VisuallyHidden>
        <PlusIcon />
      </Button>
    </Container>
  );
};

export default InputStepper;
