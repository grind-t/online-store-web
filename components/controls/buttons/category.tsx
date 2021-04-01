import Button from 'components/controls/buttons/button'
import { font18 } from 'components/typography'
import styled from 'styled-components'

const CategoryButton = styled(Button)`
  min-width: 5.93rem;
  padding: 0.8rem 1.07rem 0.8rem 1.43rem;
  margin-right: 0.5rem;
  border-radius: 7.14rem 4.29rem 4.29rem 2.14rem;
  background-color: #282828;
  color: white;
  ${font18}
`

export default CategoryButton
