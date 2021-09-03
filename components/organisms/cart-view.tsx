import { useMediaQuery } from '@react-hookz/web';
import StandaloneGoBackButton from 'components/atoms/buttons/go-back-button';
import StandaloneCartIcon from 'components/atoms/icons/cart-icon';
import StandaloneTrashIcon from 'components/atoms/icons/trash-icon';
import StandalonePaymentLink from 'components/atoms/links/payment-link';
import CartItem from 'components/molecules/cart-item';
import { HeadingLevel } from 'lib/utils';
import styled from 'styled-components';
import { up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const CartIcon = styled(StandaloneCartIcon)`
  width: 29px;
  height: 100%;
  margin-right: 10px;
  stroke: black;
  stroke-width: 2.5px;
`;

const Heading = styled.h2`
  font-size: 2em;
  font-weight: normal;
  letter-spacing: 0.01em;
`;

const TrashIcon = styled(StandaloneTrashIcon)`
  width: 20px;
  height: 100%;
  margin: 0 10px -2px 0;
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
    padding-bottom: 25px;
    border-bottom: 1px solid #f4f4f4;
  }
`;

const TotalItems = styled.strong`
  grid-area: quantity;
  justify-self: start;
  font-size: 18px;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.sm)} {
    font-size: 20px;
  }

  @media ${up(breakpoints.md)} {
    margin: 40px 0;
    font-size: 22px;
  }
`;

const TotalPrice = styled.span`
  grid-area: price;
  justify-self: center;
  font-size: 22px;
  letter-spacing: 0.01em;

  @media ${up(breakpoints.md)} {
    margin: 40px 0;
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

const PaymentLink = styled(StandalonePaymentLink)`
  grid-area: pay;
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
    'pay';
  min-height: inherit;
  margin: 0 auto;
  padding: 7px;

  @media ${up(breakpoints.md)} {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'bar bar'
      'items items'
      'quantity price'
      'back pay';
    min-height: initial;
    max-width: 848px;
    padding: 14px;
  }
`;

//#endregion

interface CartViewProps {
  container?: 'main' | 'section';
  headingLevel?: HeadingLevel;
  className?: string;
}

const CartView = ({ container, headingLevel, className }: CartViewProps) => {
  const upMD = useMediaQuery(up(breakpoints.md));
  return (
    <Container as={container} className={className}>
      <TopBar>
        <CartIcon />
        <Heading as={headingLevel}>Корзина</Heading>
        <ClearCartButton>
          <TrashIcon />
          Очистить корзину
        </ClearCartButton>
      </TopBar>
      <ItemList>
        <CartItem container="li" />
        <CartItem container="li" />
      </ItemList>
      <TotalItems>Всего товаров 2 шт.</TotalItems>
      <TotalPrice>
        Сумма заказа: <TotalPriceValue>1110 Р</TotalPriceValue>
      </TotalPrice>
      {upMD && <GoBackButton />}
      <PaymentLink />
    </Container>
  );
};

export default CartView;