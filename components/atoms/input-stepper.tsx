import { useUID } from 'react-uid';
import MinusIcon from 'components/atoms/icons/minus-icon';
import PlusIcon from 'components/atoms/icons/plus-icon';
import styled, { css } from 'styled-components';

//#region
const Container = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  padding: 0.657rem;
  border: 0.143rem solid #fe5f1e;
  border-radius: 50%;
  background: none;
  line-height: 0;
`;

const Output = styled.output`
  margin: 0 0.571rem;
  font-size: 1.571rem;
  font-weight: bold;
  letter-spacing: 0.01em;
`;

const icon = css`
  width: 0.686rem;
  height: 0.686rem;
  fill: #fe5f1e;
`;

const DecreaseIcon = styled(MinusIcon)`
  ${icon}
`;

const IncreaseIcon = styled(PlusIcon)`
  ${icon}
`;
//#endregion

interface InputStepperProps {
  value?: number | string;
  onDecrease?: () => void;
  onIncrease?: () => void;
}

const InputStepper = ({ value, onDecrease, onIncrease }: InputStepperProps) => {
  const decreaseId = useUID();
  const increaseId = useUID();

  return (
    <Container>
      <Button id={decreaseId} onClick={onDecrease}>
        <DecreaseIcon />
      </Button>
      <Output htmlFor={`${decreaseId} ${increaseId}`}>{value}</Output>
      <Button id={increaseId} onClick={onIncrease}>
        <IncreaseIcon />
      </Button>
    </Container>
  );
};

export default InputStepper;
