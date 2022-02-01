import { useMediaQuery } from '@react-hookz/web';
import InputStepper from 'components/common/controls/input-stepper';
import CrossIcon from 'components/common/icons/cross-icon';
import VisuallyHidden from 'components/common/utils/visually-hidden';
import { dinero, multiply } from 'dinero.js';
import { HeadingLevel } from 'lib/accessibility';
import { CartItem, CartProductVariant } from 'lib/cart';
import { defaultCurrency, formatPrice } from 'lib/money';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled

const ImageContainer = styled.div`
  width: 36px;
  height: 36px;
  margin: 5px 3px 0 0;
  border-radius: 5px;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.05);
  line-height: 0;
  overflow: hidden;

  @media ${up(breakpoints.sm)} {
    width: 58px;
    height: 58px;
    margin: 0 5px 0 0;
  }

  @media ${up(breakpoints.md)} {
    width: 80px;
    height: 80px;
    margin: 0 7px 0 0;
    border-radius: 10px;
  }
`;

const Heading = styled.h2`
  font-size: 17px;
  font-weight: inherit;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.sm)} {
    font-size: 20px;
  }

  @media ${up(breakpoints.md)} {
    font-size: 22px;
  }
`;

const Description = styled.p`
  color: #8d8d8d;
  font-size: 15px;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.sm)} {
    font-size: 16px;
  }

  @media ${up(breakpoints.md)} {
    font-size: 18px;
  }
`;

const InfoContainer = styled.div`
  max-width: 152px;

  @media ${up(breakpoints.sm)} {
    max-width: 187px;
    margin-top: 7px;
  }

  @media ${up(breakpoints.md)} {
    max-width: 222px;
    margin-top: 14px;
    font-weight: bold;
  }
`;

const QuantityInput = styled(InputStepper)`
  font-size: 14px;

  @media ${up(breakpoints.sm)} {
    font-size: 18px;
  }

  @media ${up(breakpoints.md)} {
    font-size: 22px;
  }
`;

const Price = styled.strong`
  display: block;
  margin-top: 8px;
  font-size: 17px;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.sm)} {
    font-size: 20px;
  }

  @media ${up(breakpoints.md)} {
    margin-top: 0;
    font-size: 22px;
  }
`;

const RemoveItemIcon = styled(CrossIcon)`
  width: 0.43em;
  height: 100%;
  fill: #d0d0d0;
`;

const RemoveItemButton = styled.button.attrs({ type: 'button' })`
  width: 1.45em;
  height: 1.45em;
  background: white;
  border: 1.5px solid #d7d7d7;
  border-radius: 50%;
  text-align: center;
  font-size: 14px;

  @media ${up(breakpoints.sm)} {
    font-size: 18px;
  }

  @media ${up(breakpoints.md)} {
    font-size: 22px;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: auto;

  @media ${up(breakpoints.md)} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 43.5%;
    margin-top: 23px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 11px;
  border-bottom: 1px solid #f4f4f4;

  @media ${up(breakpoints.md)} {
    min-height: 140px;
    padding-top: 31px;
  }
`;
//#endregion

interface ItemProps {
  container?: 'li' | 'div';
  headingLevel?: HeadingLevel;
  item: CartItem;
  className?: string;
  onAdd?: (variant: CartProductVariant, quantity?: number) => void;
  onRemove?: (variantId: number, quantity?: number) => void;
}

const Item = ({
  container,
  headingLevel,
  item,
  className,
  onAdd,
  onRemove,
}: ItemProps) => {
  const t = useTranslations('CartItem');
  const upMD = useMediaQuery(up(breakpoints.md));

  const variant = item.variant;
  const product = variant.product;
  const selectedOptions = Object.values(item.variant.characteristics)
    .join(', ')
    .toLowerCase();
  const image = product.image;
  const heading = `${product.name}, ${selectedOptions}`;
  const price = multiply(
    dinero({ amount: variant.price, currency: defaultCurrency }),
    item.quantity
  );

  return (
    <Container as={container} className={className}>
      <ImageContainer>
        <Image src={image} alt={product.name} width="80" height="80" />
      </ImageContainer>
      <InfoContainer>
        <Heading as={headingLevel}>{heading}</Heading>
        {/*<Description>{product.description}</Description>*/}
      </InfoContainer>
      <ControlsContainer>
        <QuantityInput
          value={item.quantity}
          onIncrement={onAdd && (() => onAdd(variant))}
          onDecrement={onRemove && (() => onRemove(variant.id))}
        />
        <Price>{formatPrice(price)}</Price>
        {upMD && (
          <RemoveItemButton
            onClick={onRemove && (() => onRemove(variant.id, item.quantity))}
          >
            <VisuallyHidden>{t('remove')}</VisuallyHidden>
            <RemoveItemIcon />
          </RemoveItemButton>
        )}
      </ControlsContainer>
    </Container>
  );
};

export default Item;
