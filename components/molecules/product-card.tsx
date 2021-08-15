import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';
import { em } from 'styles/mixins';
import CustomInput from 'components/atoms/custom-input';
import AddToCartButton from 'components/atoms/buttons/add-to-cart-button';
import { ProductVariant, ProductOption } from 'lib/product';

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
  options?: ProductOption[];
  variants: Record<string, ProductVariant>;
}

const ProductCard = ({ options, variants }: ProductCardProps) => {
  const initialOptions = () => options.map((option) => option.values[0]);
  const [selectedOptions, setSelectedOptions] = useState(initialOptions);
  const variantPath = selectedOptions.join('/');
  const variant = variants[variantPath];

  const handleOptionChange = (index: number, value: string) => {
    setSelectedOptions((selected) => [
      ...selected.slice(0, index),
      value,
      ...selected.slice(index + 1),
    ]);
  };

  return (
    <>
      <ImageContainer>
        <Image
          src={variant.image.url}
          alt={variant.image.alt}
          width="360"
          height="313"
          quality={100}
        />
      </ImageContainer>
      {options && (
        <OptionsContainer>
          {options.map((option, index) => (
            <OptionGroup key={option.name}>
              {option.values.map((value) => (
                <Option
                  key={value}
                  name={option.name}
                  value={value}
                  checked={selectedOptions[index] === value}
                  onChange={() => handleOptionChange(index, value)}
                >
                  {value}
                </Option>
              ))}
            </OptionGroup>
          ))}
        </OptionsContainer>
      )}
      <PurchaseContainer>
        <Price>от {variant.price.value} ₽</Price>
        <AddToCartButton />
      </PurchaseContainer>
    </>
  );
};

export default ProductCard;
