import { lineItemChanged, selectLineItem } from 'app/redux/cart-slice';
import { useAppSelector } from 'app/redux/hooks';
import AddToCartButton from 'components/atoms/buttons/add-to-cart-button';
import CustomInput from 'components/atoms/utils/custom-input';
import { Product, getVariant, selectInitialOptions } from 'lib/product';
import Image from 'next/image';
import { ChangeEvent, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState(() =>
    selectInitialOptions(product.options)
  );
  const [variantId, variant] = useMemo(
    () => getVariant(product.variants, selectedOptions),
    [product.variants, selectedOptions]
  );
  const lineItemId = `${productId}_${variantId}`;
  const lineItem = useAppSelector(selectLineItem(lineItemId));
  const quantity = lineItem ? lineItem.quantity : 0;
  const image = variant.image || product.image;
  const price = variant.price || product.price;

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
    dispatch(lineItemChanged(lineItemId, lineItem));
  };

  return (
    <>
      <ImageContainer>
        <Image
          src={image.url}
          alt={image.alt}
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
        <Price>от {price.value} ₽</Price>
        <AddToCartButton count={quantity} onClick={handleAddToCart} />
      </PurchaseContainer>
    </>
  );
};

export default ProductCard;
