import styled from 'styled-components';
import { em, lerpByEM, up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

const xsFontSize = 18;
const xlFontSize = 36;
const minHeight = em(50, xsFontSize);
const lerpByFontSize = (from: number, to: number) =>
  lerpByEM(from, to, xsFontSize, xlFontSize);

const HeaderTemplate = styled.header`
  display: flex;
  align-items: center;
  min-height: ${minHeight};
  padding-left: ${lerpByFontSize(7, 22)};
  padding-right: ${lerpByFontSize(7, 42)};
  border-bottom: 1px solid #f7f7f7;
  font-size: ${xsFontSize}px;

  @media ${up(breakpoints.md)} {
    font-size: ${(xlFontSize + xsFontSize) / 2}px;
  }

  @media ${up(breakpoints.xxl)} {
    font-size: ${xlFontSize}px;
  }
`;

export default HeaderTemplate;
export { xsFontSize, xlFontSize, lerpByFontSize, minHeight };
