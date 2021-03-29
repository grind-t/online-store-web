import Image from 'next/image'
import RadioButton from 'components/controls/buttons/radio-button'
import styled from 'styled-components'

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

const Format = styled.button`
  padding: 0.5rem 1.43rem;
  border: none;
  background: white;
  box-shadow: 0 0.14rem 0.28rem rgba(0, 0, 0, 0.04);
  border-radius: 0.35rem;
  font-weight: bold;
  line-height: 1.35rem;
  letter-spacing: 0.015em;
`

const Subscriptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  margin-top: 0.5rem;
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
  </div>
)

export default ProductTile
