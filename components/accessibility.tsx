import styled, { css } from 'styled-components'

const accessible = css`
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(50%);
  clip-path: inset(50%);
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`

const Accessible = styled.span`
  ${accessible}
`

export { Accessible as default, accessible }
