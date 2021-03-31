import PrimaryButton from 'components/controls/buttons/primary-button'
import PlusIcon from 'components/icons/plus-icon'
import styled from 'styled-components'

const Icon = styled(PlusIcon).attrs({
  fill: '#eb5a1e',
})`
  width: 0.86rem;
  margin-right: 0.36rem;
`

const Count = styled.div`
  width: 1.57rem;
  height: 1.57rem;
  margin-left: 0.71rem;
  background: #eb5a1e;
  border-radius: 50%;
  font-size: 0.93rem;
  line-height: 1.57rem;
  color: white;
  font-weight: bold;
  text-align: center;
`

const StyledAddToCart = styled(PrimaryButton)`
  display: flex;
  align-items: center;
  width: 11.21rem;
  padding: 0.64rem 0 0.64rem 1.21rem;
  border: 1px solid #eb5a1e;
  background: none;
  color: #eb5a1e;
  text-align: left;
`

interface AddToCartProps {
  count?: number
}

const AddToCart = ({ count }: AddToCartProps) => {
  return (
    <StyledAddToCart>
      <Icon />
      Добавить
      {count && <Count>{count}</Count>}
    </StyledAddToCart>
  )
}

export default AddToCart
