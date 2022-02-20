import { useMediaQuery } from '@react-hookz/web';
import InputStepper from 'components/common/controls/input-stepper';
import CrossIcon from 'components/common/icons/cross-icon';
import VisuallyHidden from 'components/common/utils/visually-hidden';
import { dinero, multiply } from 'dinero.js';
import { HeadingLevel } from 'lib/accessibility';
import { LineItem, LineItemProductVariant } from 'lib/cart';
import { defaultCurrency, formatPrice } from 'lib/money';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled

const ImageContainer = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  margin: 0.3125rem 0.25rem 0 0;
  border-radius: 0.25rem;
  box-shadow: 0 1rem 1.25rem rgba(0, 0, 0, 0.05);
  line-height: 0;
  overflow: hidden;

  @media ${up(breakpoints.xs)} {
    width: 3.625rem;
    height: 3.625rem;
    margin: 0 0.375rem 0 0;
  }

  @media ${up(breakpoints.md)} {
    width: 5rem;
    height: 5rem;
    margin: 0 0.5rem 0 0;
    border-radius: 0.625rem;
  }
`;

const Heading = styled.h2`
  font-size: 1.125rem;
  font-weight: inherit;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.xs)} {
    font-size: 1.25rem;
  }

  @media ${up(breakpoints.md)} {
    font-size: 1.375rem;
  }
`;

const Description = styled.p`
  color: #8d8d8d;
  font-size: 0.875rem;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.xs)} {
    font-size: 1rem;
  }

  @media ${up(breakpoints.md)} {
    font-size: 1.125rem;
  }
`;

const InfoContainer = styled.div`
  max-width: 9.5rem;

  @media ${up(breakpoints.xs)} {
    max-width: 11.5rem;
    margin-top: 0.4375rem;
  }

  @media ${up(breakpoints.md)} {
    max-width: 14rem;
    margin-top: 0.875rem;
    font-weight: bold;
  }
`;

const QuantityInput = styled(InputStepper)`
  font-size: 0.875rem;

  @media ${up(breakpoints.xs)} {
    font-size: 1.125rem;
  }

  @media ${up(breakpoints.md)} {
    font-size: 1.375rem;
  }
`;

const Price = styled.strong`
  display: block;
  margin-top: 0.5rem;
  font-size: 1.125rem;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.xs)} {
    font-size: 1.25rem;
  }

  @media ${up(breakpoints.md)} {
    margin-top: 0;
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

  @media ${up(breakpoints.xs)} {
    font-size: 1.125rem;
  }

  @media ${up(breakpoints.md)} {
    font-size: 1.375rem;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.625rem;
  margin-left: auto;

  @media ${up(breakpoints.md)} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 43.5%;
    margin-top: 1.5rem;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 0.625rem;
  border-bottom: 1px solid #f4f4f4;

  @media ${up(breakpoints.md)} {
    min-height: 8.75rem;
    padding-top: 1.875rem;
  }
`;
//#endregion

interface ItemProps {
  container?: 'li' | 'div';
  headingLevel?: HeadingLevel;
  item: LineItem;
  className?: string;
  onAdd?: (variant: LineItemProductVariant, quantity?: number) => void;
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
