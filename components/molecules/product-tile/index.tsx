import { useState } from 'react'
import { useUID } from 'react-uid'
import Image from 'next/image'
import AddToCart from 'components/atoms/buttons/add-to-cart'
import {
  ImageContainer,
  PurchaseOptions,
  OptionGroup,
  Option,
  Purchase,
  Price,
} from './styled'

const ProductTile = () => {
  const formats = ['Электронный']
  const subscriptions = ['1 месяц', '3 месяца', '12 месяцев']
  const uid = useUID()
  const [selectedFormat, setSelectedFormat] = useState(formats[0])
  const [selectedSubscription, setSelectedSubscription] = useState(
    subscriptions[0]
  )

  return (
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
          {formats.map((v) => (
            <Option
              type="radio"
              key={v}
              name={`${uid}-formats`}
              value={v}
              checked={v === selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              {v}
            </Option>
          ))}
        </OptionGroup>
        <OptionGroup>
          {subscriptions.map((v) => (
            <Option
              type="radio"
              key={v}
              name={`${uid}-subscriptions`}
              value={v}
              checked={v === selectedSubscription}
              onChange={(e) => setSelectedSubscription(e.target.value)}
            >
              {v}
            </Option>
          ))}
        </OptionGroup>
      </PurchaseOptions>
      <Purchase>
        <Price>от 395 ₽</Price>
        <AddToCart count={2} />
      </Purchase>
    </div>
  )
}

export default ProductTile
