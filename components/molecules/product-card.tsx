import { lineItemState } from 'app/recoil/cart';
import AddToCartButton from 'components/atoms/buttons/add-to-cart-button';
import CustomInput from 'components/atoms/utils/custom-input';
import { dinero } from 'dinero.js';
import { defaultCurrency, formatPrice } from 'lib/money';
import { Product, getVariant, selectInitialProductOptions } from 'lib/product';
import Image from 'next/image';
import { ChangeEvent, useMemo, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { em } from 'styles/mixins';

//#region styled
// https://github.com/vercel/next.js/discussions/18312
const ImageContainer = styled.div`
  margin-bottom: 5px;
  line-height: 0;
  box-shadow: 0 5px 35px rgba(0, 0, 0, 0.25);
`;

const Option = styled(CustomInput).attrs({ type: 'radio' })`
  flex: 1;
  max-width: 50%;
  min-width: max-content;
  margin: 3px;
  padding: 3px 11px;
  border-radius: 5px;
  ${(props) =>
    props.checked &&
    'background: white; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);'}
  text-align: center;
`;

const OptionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const OptionsContainer = styled.div`
  padding: 3px;
  background: #f3f3f3;
  border-radius: 10px;
  font-size: ${em(15)};
`;

const Price = styled.strong`
  font-size: ${em(21)};
  letter-spacing: 0.015em;
`;

const PurchaseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
`;
//#endregion

interface ProductCardProps {
  productId: string;
  product: Product;
}

const ProductCard = ({ productId, product }: ProductCardProps) => {
  const [selectedOptions, setSelectedOptions] = useState(() =>
    selectInitialProductOptions(product.options)
  );
  const [variantId, variant] = useMemo(
    () => getVariant(product.variants, selectedOptions),
    [product.variants, selectedOptions]
  );
  const lineItemId = `${productId}_${variantId}`;
  const [lineItem, setLineItem] = useRecoilState(lineItemState(lineItemId));
  const quantity = lineItem ? lineItem.quantity : 0;
  const isAvailable = !!variant?.quantity;
  const image = (isAvailable && variant.image) || product.image;
  const priceString = isAvailable
    ? formatPrice(dinero({ amount: variant.price, currency: defaultCurrency }))
    : 'Нет в наличии';

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = () => {
    const lineItem = {
      productId,
      variantId,
      quantity: quantity + 1,
    };
    setLineItem(lineItem);
  };

  return (
    <>
      <ImageContainer>
        <Image
          src={image}
          alt={product.name}
          width="360"
          height="313"
          quality={100}
        />
      </ImageContainer>
      {product.options && (
        <OptionsContainer>
          {product.options.map(({ name, values }) => (
            <OptionGroup key={name}>
              {values.map((value) => (
                <Option
                  key={value}
                  name={name}
                  value={value}
                  checked={selectedOptions[name] === value}
                  onChange={handleOptionChange}
                >
                  {value}
                </Option>
              ))}
            </OptionGroup>
          ))}
        </OptionsContainer>
      )}
      <PurchaseContainer>
        <Price>{priceString}</Price>
        <AddToCartButton
          count={quantity}
          disabled={!isAvailable}
          onClick={handleAddToCart}
        />
      </PurchaseContainer>
    </>
  );
};

export default ProductCard;
