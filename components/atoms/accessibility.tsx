import styled, { css } from 'styled-components'

const visuallyHidden = css`
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

const VisuallyHidden = styled.span`
  ${visuallyHidden}
`

export { VisuallyHidden as default, visuallyHidden }