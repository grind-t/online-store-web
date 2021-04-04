import { font16 } from 'components/atoms/typography'
import CartIcon from 'components/atoms/icons/cart'
import styled from 'styled-components'

const StyledLink = styled.a`
  align-self: flex-end;
  margin: 0 5.14rem 1.07rem auto;
  padding: 1.06rem 1.8rem;
  border-radius: 2.14rem;
  background: #fe5f1e;
  color: white;
  ${font16}
`

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

export { StyledLink, TotalPrice, Icon, ItemsCount }
