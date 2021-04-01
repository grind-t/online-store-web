import { font16 } from 'components/typography'
import Button from 'components/controls/buttons/button'
import styled from 'styled-components'

const NavigateButton = styled(Button)`
  max-width: 15rem;
  padding: 1.1rem 1.8rem;
  ${font16}
  text-align: center;
`

export default NavigateButton
