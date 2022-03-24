import VisuallyHidden from 'components/common/utils/visually-hidden';
import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

//#region styled
const Label = styled.label`
  display: inline-block;
`;
//#endregion

const CustomInput = ({
  children,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Label className={className}>
      {children}
      <VisuallyHidden as="input" {...rest} />
    </Label>
  );
};

export default CustomInput;
