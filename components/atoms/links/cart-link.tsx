import { useMediaQuery } from '@react-hookz/web';
import { totalCartItemsState } from 'app/recoil/cart';
import { totalCartPriceState } from 'app/recoil/money';
import CartIcon from 'components/atoms/icons/cart-icon';
import VisuallyHidden from 'components/atoms/utils/visually-hidden';
import { formatPrice } from 'lib/money';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
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
  const totalPrice = useRecoilValue(totalCartPriceState);
  return (
    <>
      <VisuallyHidden>Сумма</VisuallyHidden> {formatPrice(totalPrice)}
      <Icon />
      <VisuallyHidden>Количество товаров</VisuallyHidden> {totalItems}
    </>
  );
};

interface CartLinkProps {
  className?: string;
}

const CartLink = ({ className }: CartLinkProps) => {
  const upMD = useMediaQuery(up(breakpoints.md));

  return (
    <Link href="/cart" passHref>
      <Anchor className={className}>
        <VisuallyHidden>Корзина</VisuallyHidden>
        {upMD ? <DetailedContent /> : <CompactContent />}
      </Anchor>
    </Link>
  );
};

export default CartLink;
