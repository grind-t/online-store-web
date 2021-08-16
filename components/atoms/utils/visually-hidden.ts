import styled from 'styled-components';
import { hideVisually } from 'styles/mixins';

const VisuallyHidden = styled.span`
  ${hideVisually()}
`;

export default VisuallyHidden;
