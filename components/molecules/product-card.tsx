import { lineItemState } from 'app/recoil/cart';
import AddToCartButton from 'components/atoms/buttons/add-to-cart-button';
import CustomInput from 'components/atoms/utils/custom-input';
import ProductInfo from 'components/molecules/product-info';
import { dinero } from 'dinero.js';
import { defaultCurrency, formatPrice } from 'lib/money';
import { Product, getVariant, selectInitialProductOptions } from 'lib/product';
import { HeadingLevel } from 'lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ChangeEvent, useMemo, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { em } from 'styles/mixins';

//#region styled
// https://github.com/vercel/next.js/discussions/18312
const ImageContainer = styled.button`
  display: block;
  margin-bottom: 5px;
  background: none;
  border: none;
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
  headingLevel?: HeadingLevel;
}

const ProductCard = ({
  productId,
  product,
  headingLevel,
}: ProductCardProps) => {
  const t = useTranslations('ProductCard');
  const [isInfoVisible, showInfo] = useState(false);
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
    : t('outOfStock');

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

  useEffect(() => {
    document.body.style.overflow = isInfoVisible ? 'hidden' : '';
  }, [isInfoVisible]);

  return (
    <>
      <ImageContainer onClick={() => showInfo(true)}>
        <Image
          src={image}
          alt={product.name}
          width="360"
          height="313"
          quality={100}
        />
      </ImageContainer>
      <ProductInfo
        name={product.name}
        description={product.description}
        isVisible={isInfoVisible}
        headingLevel={headingLevel}
        onClose={() => showInfo(false)}
      />
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
