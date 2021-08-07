import Image from 'next/image';
import CustomInput from 'components/atoms/custom-input';
import styled from 'styled-components';
import { em } from 'styles/mixins';
import AddToCartButton from 'components/atoms/buttons/add-to-cart-button';

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
  img: string;
  options: string[][];
  price: number;
}

const ProductCard = ({ img, options, price }: ProductCardProps) => {
  return (
    <>
      <ImageContainer>
        <Image src={img} alt="TODO" width="320" height="278" quality={100} />
      </ImageContainer>
      <OptionsContainer>
        {options.map((group) => (
          <OptionGroup key={group.join()}>
            {group.map((v, i) => (
              <Option key={v} checked={i === 0} readOnly>
                {v}
              </Option>
            ))}
          </OptionGroup>
        ))}
      </OptionsContainer>
      <PurchaseContainer>
        <Price>от {price} ₽</Price>
        <AddToCartButton />
      </PurchaseContainer>
    </>
  );
};

export default ProductCard;
