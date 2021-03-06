import { useMediaQuery } from '@react-hookz/web';
import Item from 'components/cart/cart-item';
import StandaloneCheckoutLink from 'components/cart/checkout-link';
import EmptyCartView from 'components/cart/empty-cart-view';
import StandaloneGoBackButton from 'components/cart/go-back-button';
import StandaloneCartIcon from 'components/common/icons/cart-icon';
import StandaloneTrashIcon from 'components/common/icons/trash-icon';
import { HeadingLevel, nextHeadingLevel } from 'lib/accessibility';
import { useCartQuery, useCartMutation } from 'lib/hooks/cart';
import { formatPrice, zeroDinero } from 'lib/money';
import { getItemCount, getTotalPrice } from 'lib/orders';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const CartIcon = styled(StandaloneCartIcon)`
  width: 1.75rem;
  height: 100%;
  margin-right: 0.625rem;
  stroke: black;
  stroke-width: 2.5px;
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: normal;
  letter-spacing: 0.01em;
`;

const TrashIcon = styled(StandaloneTrashIcon)`
  width: 1.25rem;
  height: 100%;
  margin: 0 0.625rem -0.125rem 0;
`;

const ClearCartButton = styled.button.attrs({ type: 'button' })`
  margin-left: auto;
  color: #b6b6b6;
  background: none;
  border: none;
`;

const TopBar = styled.div`
  display: none;

  @media ${up(breakpoints.md)} {
    grid-area: bar;
    display: flex;
    align-items: center;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #f4f4f4;
  }
`;

const TotalItems = styled.strong`
  grid-area: quantity;
  justify-self: start;
  font-size: 1.125rem;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.xs)} {
    font-size: 1.25rem;
  }

  @media ${up(breakpoints.md)} {
    margin: 2.5rem 0;
    font-size: 1.375rem;
  }
`;

const TotalPrice = styled.span`
  grid-area: price;
  justify-self: center;
  font-size: 1.375rem;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.md)} {
    margin: 2.5rem 0;
    justify-self: end;
  }
`;

const TotalPriceValue = styled.strong`
  font: inherit;
  color: #eb5a1e;
`;

const ItemList = styled.ul`
  grid-area: items;
  list-style: none;
`;

const GoBackButton = styled(StandaloneGoBackButton)`
  grid-area: back;
  justify-self: start;
`;

const CheckoutLink = styled(StandaloneCheckoutLink)`
  grid-area: checkout;
  justify-self: center;

  @media ${up(breakpoints.md)} {
    justify-self: end;
  }
`;

const Container = styled.section`
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  grid-template-areas:
    'quantity'
    'items'
    'price'
    'checkout';
  min-height: inherit;
  width: 100%;
  margin: 0 auto;

  @media ${up(breakpoints.md)} {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'bar bar'
      'items items'
      'quantity price'
      'back checkout';
    min-height: initial;
    max-width: 53rem;
    padding: 0.875rem;
  }
`;

//#endregion

interface CartViewProps {
  container?: 'main' | 'section';
  headingLevel?: HeadingLevel;
  className?: string;
}

const CartView = ({ container, headingLevel, className }: CartViewProps) => {
  const cart = useCartQuery();
  const { add, remove, clear } = useCartMutation();
  const totalItems = useMemo(
    () => (cart ? getItemCount(cart.items) : 0),
    [cart]
  );
  const totalPrice = useMemo(
    () => (cart ? getTotalPrice(cart.items) : zeroDinero),
    [cart]
  );
  const upMD = useMediaQuery(up(breakpoints.md));
  const t = useTranslations('CartView');

  if (!cart) return null;
  if (!cart.items.length)
    return (
      <EmptyCartView
        container={container}
        headingLevel={headingLevel}
        className={className}
      />
    );

  return (
    <Container as={container} className={className}>
      <TopBar>
        <CartIcon />
        <Heading as={headingLevel}>{t('heading')}</Heading>
        <ClearCartButton onClick={clear}>
          <TrashIcon />
          {t('clearCart')}
        </ClearCartButton>
      </TopBar>
      <ItemList>
        {Object.entries(cart.items).map(([id, item]) => (
          <Item
            key={id}
            container="li"
            headingLevel={headingLevel && nextHeadingLevel(headingLevel)}
            item={item}
            onAdd={add}
            onRemove={remove}
          />
        ))}
      </ItemList>
      <TotalItems>{t('totalItems', { num: totalItems })}</TotalItems>
      <TotalPrice>
        {t('totalPrice') + ': '}
        <TotalPriceValue>{formatPrice(totalPrice)}</TotalPriceValue>
      </TotalPrice>
      {upMD && <GoBackButton />}
      <CheckoutLink />
    </Container>
  );
};

export default CartView;
