import { useMediaQuery } from '@react-hookz/web';
import CartIcon from 'components/common/icons/cart-icon';
import VisuallyHidden from 'components/common/utils/visually-hidden';
import { formatPrice, zeroDinero } from 'lib/money';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { totalCartItemsState, totalCartPriceQuery } from 'state/cart';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const Anchor = styled.a<{ detailedStyle?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  min-height: 52px;
  background: #fe5f1e;
  border-radius: 50%;
  color: white;
  font-weight: bold;

  @media ${up(breakpoints.md)} {
    min-width: 152px;
    min-height: 52px;
    border-radius: 30px;
  }
`;

const Icon = styled(CartIcon)<{ detailedStyle?: boolean }>`
  stroke: white;

  @media ${up(breakpoints.md)} {
    width: 26px;
    height: 26px;
    padding: 0 0 2px 10px;
    margin: 0 8px 0 13px;
    border-left: 1px solid rgba(255, 255, 255, 0.25);
    stroke-width: 3.5;
  }
`;
//#endregion

const CompactContent = () => <Icon />;

const DetailedContent = () => {
  const totalItems = useRecoilValue(totalCartItemsState);
  const loadableTotalPrice = useRecoilValueLoadable(totalCartPriceQuery);
  const t = useTranslations('CartLink');

  const totalPrice =
    loadableTotalPrice.state === 'hasValue'
      ? loadableTotalPrice.contents
      : zeroDinero;
  const totalPriceString = formatPrice(totalPrice);

  return (
    <>
      <VisuallyHidden>{t('sum')}</VisuallyHidden> {totalPriceString}
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
