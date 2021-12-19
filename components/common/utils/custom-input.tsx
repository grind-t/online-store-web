import VisuallyHidden from 'components/common/utils/visually-hidden';
import { InputHTMLAttributes } from 'react';
import { useUID } from 'react-uid';
import styled from 'styled-components';

const CustomInput = ({
  children,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
  const uid = useUID();
  return (
    <>
      <VisuallyHidden as="input" id={uid} {...rest} />
      <label htmlFor={uid} className={className}>
        {children}
      </label>
    </>
  );
};

const Styled = styled(CustomInput)`
  display: inline-block;
`;

export default Styled;
