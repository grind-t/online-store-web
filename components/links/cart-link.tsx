import Link from 'next/link'
import PrimaryButton from 'components/controls/buttons/primary-button'
import CartIcon from 'components/icons/cart-icon'
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

const CartButton = styled(PrimaryButton)`
  padding: 1.07rem 1.79rem 1.07rem 1.79rem;
  margin: 0 5.14rem 1.07rem auto;
`

const CartLink = () => (
  <Link href="/cart">
    <CartButton as="a">
      <span className="sr-only">Корзина</span>
      <span className="sr-only">Сумма</span>
      <TotalPrice>520 ₽</TotalPrice>
      <Icon />
      <span className="sr-only">Количество товаров</span>
      <ItemsCount>3</ItemsCount>
    </CartButton>
  </Link>
)

export default CartLink
