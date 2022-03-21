import { useMediaQuery } from '@react-hookz/web';
import InputStepper from 'components/common/controls/input-stepper';
import CrossIcon from 'components/common/icons/cross-icon';
import VisuallyHidden from 'components/common/utils/visually-hidden';
import { dinero, multiply } from 'dinero.js';
import { HeadingLevel } from 'lib/accessibility';
import { LineItem } from 'lib/cart';
import { defaultCurrency, formatPrice } from 'lib/money';
import { ProductVariant } from 'lib/products';
import { getImageUrl } from 'lib/supabase';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Popup from 'reactjs-popup';
import styled, { keyframes } from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1
  }
`;

const Tooltip = styled(Popup).attrs({
  on: ['hover', 'focus'],
  closeOnDocumentClick: true,
})`
  &-content {
    max-width: 70vw;
    max-width: min(70vw, 46rem);
    padding: 0.25rem 0.5rem;
    color: white;
    font-size: 0.875rem;
    background: black;
    border-radius: 0.5rem;
    animation: ${fadeIn} 250ms ease-in;
  }

  &-arrow {
    color: black;
  }
`;

const ImageContainer = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  margin: 0.25rem 0.25rem 0 0;
  border-radius: 0.25rem;
  box-shadow: 0 1rem 1.25rem rgba(0, 0, 0, 0.05);
  line-height: 0;
  overflow: hidden;

  @media ${up(breakpoints.xs)} {
    width: 3rem;
    height: 3rem;
    margin: 0 0.5rem 0 0;
  }

  @media ${up(breakpoints.sm)} {
    width: 3.5rem;
    height: 3.5rem;
  }

  @media ${up(breakpoints.md)} {
    width: 5rem;
    height: 5rem;
    border-radius: 0.625rem;
  }
`;

const Heading = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  letter-spacing: 0.01em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  @media ${up(breakpoints.xs)} {
    font-size: 1.125rem;
  }

  @media ${up(breakpoints.sm)} {
    font-size: 1.25rem;
    font-weight: bold;
  }

  @media ${up(breakpoints.md)} {
    font-size: 1.375rem;
  }
`;

const Description = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #8d8d8d;
  font-size: 0.875rem;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.xs)} {
    font-size: 1rem;
  }

  @media ${up(breakpoints.sm)} {
    font-size: 1.125rem;
    font-weight: bold;
  }
`;

const InfoContainer = styled.div`
  max-width: 9.5rem;

  @media ${up(breakpoints.xs)} {
    max-width: 11.5rem;
  }

  @media ${up(breakpoints.sm)} {
    max-width: 14rem;
  }
`;

const QuantityInput = styled(InputStepper)`
  font-size: 0.875rem;

  @media ${up(breakpoints.xs)} {
    font-size: 1rem;
  }

  @media ${up(breakpoints.sm)} {
    font-size: 1.25rem;
  }

  @media ${up(breakpoints.md)} {
    font-size: 1.375rem;
  }
`;

const Price = styled.strong`
  display: block;
  font-size: 1rem;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.xs)} {
    font-size: 1.125rem;
  }

  @media ${up(breakpoints.sm)} {
    font-size: 1.25rem;
  }

  @media ${up(breakpoints.md)} {
    font-size: 1.375rem;
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
  font-size: 0.875rem;

  @media ${up(breakpoints.md)} {
    font-size: 1.375rem;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 0 auto;

  & > * + * {
    margin-top: 0.5rem;
  }

  @media ${up(breakpoints.md)} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 43.5%;
    margin: 0 2rem 0 auto;

    & > * + * {
      margin-top: 0;
    }
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 0.75rem;
  border-bottom: 1px solid #f4f4f4;

  @media ${up(breakpoints.md)} {
    align-items: center;
    padding: 2rem 0;
  }
`;
//#endregion

export interface CartItemProps {
  container?: 'li' | 'div';
  headingLevel?: HeadingLevel;
  item: LineItem;
  className?: string;
  onAdd?: (variant: ProductVariant, quantity?: number) => void;
  onRemove?: (variantId: number, quantity?: number) => void;
}

const CartItem = ({
  container,
  headingLevel,
  item,
  className,
  onAdd,
  onRemove,
}: CartItemProps) => {
  const t = useTranslations('CartItem');
  const upMD = useMediaQuery(up(breakpoints.md));

  const variant = item.variant;
  const product = variant.product;
  const selectedOptions = Object.values(item.variant.characteristics)
    .join(', ')
    .toLowerCase();
  const heading = `${product.name}, ${selectedOptions}`;
  const price = multiply(
    dinero({ amount: variant.price, currency: defaultCurrency }),
    item.quantity
  );

  return (
    <Container as={container} className={className}>
      <ImageContainer>
        <Image
          src={getImageUrl(product.image, 320, 320)}
          alt={product.name}
          width="80"
          height="80"
        />
      </ImageContainer>
      <InfoContainer>
        <Tooltip
          trigger={<Heading as={headingLevel}>{heading}</Heading>}
          position="top left"
        >
          {heading}
        </Tooltip>
        <Tooltip
          trigger={<Description>{product.description}</Description>}
          position="bottom left"
        >
          {product.description}
        </Tooltip>
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

export default CartItem;
