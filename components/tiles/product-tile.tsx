import Image from 'next/image'
import AddToCart from 'components/controls/buttons/add-to-cart'
import VisuallyHidden from 'components/accessibility'
import { font14, font22 } from 'components/typography'
import styled from 'styled-components'

const ImageContainer = styled.div`
  width: fit-content;
  line-height: 0;
  box-shadow: 0 0.28rem 2.07rem rgba(0, 0, 0, 0.25);
`

const PurchaseOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.52rem;
  background-color: #f3f3f3;
  border-radius: 0.71rem;
  margin-top: 1.21rem;
  padding: 0.52rem 0.42rem;
`

const OptionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
`

const Option = styled.label`
  flex: 1;
  display: block;
  max-width: 50%;

  & > input {
    + span {
      display: inline-block;
      width: 100%;
      padding: 0.5rem 0;
      border-radius: 0.35rem;
      background: none;
      color: #c4c4c4;
      ${font14}
      font-weight: bold;
      text-align: center;
    }
    :focus + span,
    :hover + span,
    :active + span,
    :checked + span {
      background: white;
      box-shadow: 0 0.14rem 0.28rem rgba(0, 0, 0, 0.04);
      color: black;
    }
  }
`

const Purchase = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.21rem;
`

const Price = styled.span`
  margin-right: 2.28rem;
  ${font22}
`

const ProductTile = () => (
  <div>
    <ImageContainer>
      <Image
        src="/example-product.png"
        alt="подписка"
        width="283"
        height="285"
      />
    </ImageContainer>
    <PurchaseOptions>
      <OptionGroup>
        <Option>
          <VisuallyHidden as="input" type="radio" name="formats" />
          <span>Электронный</span>
        </Option>
      </OptionGroup>
      <OptionGroup>
        <Option>
          <VisuallyHidden as="input" type="radio" name="subscriptions" />
          <span>1 месяц</span>
        </Option>
        <Option>
          <VisuallyHidden as="input" type="radio" name="subscriptions" />
          <span>3 месяца</span>
        </Option>
        <Option>
          <VisuallyHidden as="input" type="radio" name="subscriptions" />
          <span>12 месяцев</span>
        </Option>
      </OptionGroup>
    </PurchaseOptions>
    <Purchase>
      <Price>от 395 ₽</Price>
      <AddToCart count={2} />
    </Purchase>
  </div>
)

export default ProductTile
