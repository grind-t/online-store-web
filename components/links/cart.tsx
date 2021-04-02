import Link from 'next/link'
import VisuallyHidden from 'components/accessibility'
import NavigateButton from 'components/controls/buttons/navigate'
import CartIcon from 'components/icons/cart'
import styled from 'styled-components'

const TotalPrice = styled.span`
  padding: 0.16rem 1rem 0.16rem 0;
  border-right: 1px solid rgba(255, 255, 255, 0.25);
`

const Icon = styled(CartIcon).attrs(() => ({
  stroke: 'white',
  strokeWidth: 1.8,
}))`
  display: inline;
  width: 1.14rem;
  height: 1.14rem;
  margin-left: 0.71rem;
  margin-bottom: -0.12rem;
`

const ItemsCount = styled.span`
  margin-left: 0.57rem;
`

const CartButton = styled(NavigateButton)`
  margin: 0 5.14rem 1.07rem auto;
  background: #fe5f1e;
  color: white;
`

const CartLink = () => (
  <Link href="/cart">
    <CartButton as="a">
      <VisuallyHidden>Корзина</VisuallyHidden>
      <VisuallyHidden>Сумма</VisuallyHidden>
      <TotalPrice>520 ₽</TotalPrice>
      <Icon />
      <VisuallyHidden>Количество товаров</VisuallyHidden>
      <ItemsCount>3</ItemsCount>
    </CartButton>
  </Link>
)

export default CartLink
