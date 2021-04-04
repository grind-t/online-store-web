import Link from 'next/link'
import VisuallyHidden from 'components/atoms/accessibility'
import { StyledLink, TotalPrice, Icon, ItemsCount } from './styled'

const CartLink = () => (
  <Link href="/cart">
    <StyledLink>
      <VisuallyHidden>Корзина</VisuallyHidden>
      <VisuallyHidden>Сумма</VisuallyHidden>
      <TotalPrice>520 ₽</TotalPrice>
      <Icon />
      <VisuallyHidden>Количество товаров</VisuallyHidden>
      <ItemsCount>3</ItemsCount>
    </StyledLink>
  </Link>
)

export default CartLink
