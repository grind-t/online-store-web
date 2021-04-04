import Image from 'next/image'
import VisuallyHidden from 'components/atoms/accessibility'
import AddToCart from 'components/atoms/controls/buttons/add-to-cart'
import {
  ImageContainer,
  PurchaseOptions,
  OptionGroup,
  Option,
  Purchase,
  Price,
} from './styled'

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
