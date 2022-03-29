import AddToCartButton from 'components/cart/add-to-cart-button';
import CustomInput from 'components/common/utils/custom-input';
import ProductInfo from 'components/products/product-info';
import { dinero } from 'dinero.js';
import { HeadingLevel } from 'lib/accessibility';
import { useCartItemQuery, useCartMutation } from 'lib/hooks/cart';
import { defaultCurrency, formatPrice } from 'lib/money';
import { ProductFull, getProductOptions, findVariant } from 'lib/products';
import { getImageUrl } from 'lib/supabase';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ChangeEvent, useMemo, useState } from 'react';
import styled from 'styled-components';

//#region styled
// https://github.com/vercel/next.js/discussions/18312
const ImageContainer = styled.button`
  display: block;
  margin-bottom: 0.3125rem;
  background: none;
  border: none;
  line-height: 0;
  box-shadow: 0 5px 35px rgba(0, 0, 0, 0.25);
`;

const Option = styled(CustomInput).attrs({ type: 'radio' })`
  flex: 1;
  max-width: 50%;
  min-width: max-content;
  padding: 0.25rem 0.625rem;
  border-radius: 0.375rem;
  ${(props) =>
    props.checked &&
    'background: white; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);'}
  text-align: center;
`;

const OptionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > ${Option} + ${Option} {
    margin-left: 0.375rem;
  }
`;

const OptionsContainer = styled.div`
  padding: 0.375rem;
  background: #f3f3f3;
  border-radius: 0.625rem;

  & > ${OptionGroup} + ${OptionGroup} {
    margin-top: 0.375rem;
  }
`;

const Price = styled.strong`
  font-size: 1.25rem;
  letter-spacing: 0.015em;
`;

const PurchaseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.875rem;
`;
//#endregion

interface ProductCardProps {
  product: ProductFull;
  headingLevel?: HeadingLevel;
}

const ProductCard = ({ product, headingLevel }: ProductCardProps) => {
  const allOptions = useMemo(
    () => Object.entries(getProductOptions(product)),
    [product]
  );
  const [selectedOptions, setSelectedOptions] = useState(() =>
    allOptions.reduce((selected, [option, values]) => {
      selected[option] = values[0];
      return selected;
    }, {} as Record<string, string>)
  );
  const variant = useMemo(
    () => findVariant(product.variants, selectedOptions) || product.variants[0],
    [product, selectedOptions]
  );
  const cartItem = useCartItemQuery(variant.id);
  const { add } = useCartMutation();
  const [isInfoVisible, showInfo] = useState(false);
  const t = useTranslations('ProductCard');

  const stock = variant.stock;
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const priceString = stock
    ? formatPrice(dinero({ amount: variant.price, currency: defaultCurrency }))
    : t('outOfStock');

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = () => {
    add({ ...variant, product: product });
  };

  return (
    <>
      <ImageContainer onClick={() => showInfo(true)}>
        <Image
          src={getImageUrl(product.image, 360, 313)}
          alt={product.name}
          width="360"
          height="313"
        />
      </ImageContainer>
      <ProductInfo
        name={product.name}
        description={product.description}
        isVisible={isInfoVisible}
        headingLevel={headingLevel}
        onClose={() => showInfo(false)}
      />
      {allOptions.length && (
        <OptionsContainer>
          {allOptions.map(([option, values]) => (
            <OptionGroup key={option}>
              {values.map((value) => (
                <Option
                  key={value}
                  name={option}
                  value={value}
                  checked={selectedOptions[option] === value}
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
          count={cartQuantity}
          disabled={!stock}
          onClick={handleAddToCart}
        />
      </PurchaseContainer>
    </>
  );
};

export default ProductCard;
