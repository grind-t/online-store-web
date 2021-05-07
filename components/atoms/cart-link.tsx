import Link from 'next/link'
import CartIcon from 'components/atoms/icons/cart-icon'
import VisuallyHidden from 'components/atoms/visually-hidden'
import styled, { css } from 'styled-components'

//#region styled
const compactAnchorStyle = css`
  display: inline-block;
  padding: 0.679rem 0.786rem 0.607rem 0.5rem;
  border-radius: 50%;
  line-height: 0;
`

const detailedAnchorStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 10.857rem;
  min-height: 3.679rem;
  border-radius: 2.143rem;
`

const Anchor = styled.a<{ detailedStyle?: boolean }>`
  ${(props) => (props.detailedStyle ? detailedAnchorStyle : compactAnchorStyle)}
  background: #fe5f1e;
  color: white;
  font-size: 1.143rem;
  font-weight: bold;
`

const compactIconStyle = css`
  width: 2.429rem;
  stroke-width: 0.8;
`

const detailedIconStyle = css`
  width: 1.929rem;
  padding: 0.357rem 0 0.5rem 0.714rem;
  margin-left: 0.929rem;
  margin-right: 0.536rem;
  border-left: 1px solid rgba(255, 255, 255, 0.25);
  stroke-width: 1.8;
`

const Icon = styled(CartIcon)<{ detailedStyle?: boolean }>`
  ${(props) => (props.detailedStyle ? detailedIconStyle : compactIconStyle)}
  stroke: white;
`
//#endregion

interface CartLinkProps {
  detailed?: boolean
}

const DetailedContent = () => (
  <>
    <VisuallyHidden>Сумма</VisuallyHidden> 520 ₽
    <Icon detailedStyle />
    <VisuallyHidden>Количество товаров</VisuallyHidden> 3
  </>
)

const CartLink = ({ detailed }: CartLinkProps) => (
  <Link href="/cart" passHref>
    <Anchor detailedStyle={detailed}>
      <VisuallyHidden>Корзина</VisuallyHidden>
      {detailed ? <DetailedContent /> : <Icon />}
    </Anchor>
  </Link>
)

export default CartLink
