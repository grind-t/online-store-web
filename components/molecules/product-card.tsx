import Image from 'next/image';
import CustomInput from 'components/atoms/custom-input';
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
  margin: 0 3px;
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
  margin: 0 -3px;
`;

const OptionsContainer = styled.div`
  padding: 6px;
  background: #f3f3f3;
  border-radius: 10px;
  font-size: ${em(15)};

  & > ${OptionGroup} + ${OptionGroup} {
    margin-top: 7px;
  }
`;
//#endregion

interface ProductCardProps {
  options: string[][];
}

const ProductCard = ({ options }: ProductCardProps) => {
  return (
    <>
      <ImageContainer>
        <Image
          src="/images/product-placeholder.png"
          alt="подписка"
          width="291"
          height="253"
        />
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
    </>
  );
};

export default ProductCard;
