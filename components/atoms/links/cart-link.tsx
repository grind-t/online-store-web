import Link from 'next/link';
import CartIcon from 'components/atoms/icons/cart-icon';
import VisuallyHidden from 'components/atoms/visually-hidden';
import styled, { css } from 'styled-components';

//#region styled
const Anchor = styled.a<{ detailedStyle?: boolean }>`
  background: #fe5f1e;
  color: white;
  font-weight: bold;

  ${(props) =>
    props.detailedStyle
      ? css`
          display: inline-flex;
          align-items: center;
          padding: 13px 29px 13px 21px;
          border-radius: 30px;
        `
      : css`
          padding: 9px;
          border-radius: 50%;
          line-height: 0;
        `}
`;

const Icon = styled(CartIcon)<{ detailedStyle?: boolean }>`
  stroke: white;
  ${(props) =>
    props.detailedStyle &&
    css`
      width: 26px;
      height: 26px;
      padding-left: 10px;
      padding-bottom: 2px;
      margin-left: 13px;
      margin-right: 8px;
      border-left: 1px solid rgba(255, 255, 255, 0.25);
      stroke-width: 3.5;
    `}
`;
//#endregion

const CompactContent = () => <Icon />;

const DetailedContent = () => (
  <>
    <VisuallyHidden>Сумма</VisuallyHidden> 520 ₽
    <Icon detailedStyle />
    <VisuallyHidden>Количество товаров</VisuallyHidden> 3
  </>
);

interface CartLinkProps {
  detailed?: boolean;
  className?: string;
}

const CartLink = ({ detailed, className }: CartLinkProps) => (
  <Link href="/cart" passHref>
    <Anchor detailedStyle={detailed} className={className}>
      <VisuallyHidden>Корзина</VisuallyHidden>
      {detailed ? <DetailedContent /> : <CompactContent />}
    </Anchor>
  </Link>
);

export default CartLink;
