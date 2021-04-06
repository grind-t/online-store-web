import { StyledButton, Icon, Counter } from './styled'

interface AddToCartButtonProps {
  count?: number
}

const AddToCartButton = ({ count }: AddToCartButtonProps) => {
  return (
    <StyledButton>
      <Icon />
      Добавить
      {count && <Counter>{count}</Counter>}
    </StyledButton>
  )
}

export default AddToCartButton
