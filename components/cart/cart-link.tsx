import { useMediaQuery } from '@react-hookz/web';
import CartIcon from 'components/common/icons/cart-icon';
import VisuallyHidden from 'components/common/utils/visually-hidden';
import { useCartQuery } from 'lib/hooks/cart';
import { formatPrice, zeroDinero } from 'lib/money';
import { getItemCount, getTotalPrice } from 'lib/orders';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo } from 'react';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const Anchor = styled.a<{ detailedStyle?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 3.25rem;
  min-height: 3.25rem;
  background: #fe5f1e;
  border-radius: 50%;
  color: white;
  font-weight: bold;

  @media ${up(breakpoints.md)} {
    min-width: 9.5rem;
    min-height: 3.25rem;
    border-radius: 1.875rem;
  }
`;

const Icon = styled(CartIcon)<{ detailedStyle?: boolean }>`
  stroke: white;

  @media ${up(breakpoints.md)} {
    width: 1.625rem;
    height: 1.625rem;
    padding: 0 0 0.125rem 0.625rem;
    margin: 0 0.5rem 0 0.8125rem;
    border-left: 1px solid rgba(255, 255, 255, 0.25);
    stroke-width: 3.5;
  }
`;
//#endregion

const CompactContent = () => <Icon />;

const DetailedContent = () => {
  const cart = useCartQuery();
  const totalItems = useMemo(
    () => (cart ? getItemCount(cart.items) : 0),
    [cart]
  );
  const totalPrice = useMemo(
    () => (cart ? getTotalPrice(cart.items) : zeroDinero),
    [cart]
  );
  const t = useTranslations('CartLink');

  return (
    <>
      <VisuallyHidden>{t('sum')}</VisuallyHidden> {formatPrice(totalPrice)}
      <Icon />
      <VisuallyHidden>{t('numOfItems')}</VisuallyHidden> {totalItems}
    </>
  );
};

interface CartLinkProps {
  className?: string;
}

const CartLink = ({ className }: CartLinkProps) => {
  const upMD = useMediaQuery(up(breakpoints.md));
  const t = useTranslations('CartLink');

  return (
    <Link href="/cart" passHref>
      <Anchor className={className}>
        <VisuallyHidden>{t('title')}</VisuallyHidden>
        {upMD ? <DetailedContent /> : <CompactContent />}
      </Anchor>
    </Link>
  );
};

export default CartLink;
