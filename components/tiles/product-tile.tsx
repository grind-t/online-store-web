import Image from 'next/image'
import { font14, font22 } from 'components/typography'
import Button from 'components/controls/buttons/button'
import RadioButton from 'components/controls/radios/radio-button'
import styled from 'styled-components'
import AddToCart from 'components/controls/buttons/add-to-cart'

const ImageContainer = styled.div`
  width: fit-content;
  line-height: 0;
  box-shadow: 0 0.28rem 2.07rem rgba(0, 0, 0, 0.25);
`

const PurchaseOptions = styled.div`
  background-color: #f3f3f3;
  border-radius: 0.71rem;
  margin-top: 1.21rem;
  padding: 0.5rem 0.42rem;
`

const Format = styled(Button)`
  padding: 0.5rem 1.43rem;
  background: white;
  box-shadow: 0 0.14rem 0.28rem rgba(0, 0, 0, 0.04);
  border-radius: 0.35rem;
  ${font14}
  font-weight: bold;
`

const Subscriptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  margin-top: 0.5rem;

  & > * {
    flex: 1;
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
      <Format>Электронный</Format>
      <Subscriptions>
        <RadioButton name="subscription" label="1 месяц" />
        <RadioButton name="subscription" label="3 месяца" />
        <RadioButton name="subscription" label="12 месяцев" />
      </Subscriptions>
    </PurchaseOptions>
    <Purchase>
      <Price>от 395 ₽</Price>
      <AddToCart count={2} />
    </Purchase>
  </div>
)

export default ProductTile
