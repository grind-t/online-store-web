import styled from 'styled-components';
import { useMediaQuery } from '@react-hookz/web';
import { em, lerpByEM, up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';
import StandaloneBearIcon from 'components/atoms/icons/bear-icon';
import StandaloneCartLink from 'components/atoms/links/cart-link';
import StandaloneBurgerMenuIcon from 'components/atoms/icons/burger-menu-icon';
import HoverNav from 'components/molecules/hover-nav';
import PersonIcon from 'components/atoms/icons/person-icon';
import OrdersIcon from 'components/atoms/icons/orders-icon';
import SignOutIcon from 'components/atoms/icons/sign-out-icon';
import VisuallyHidden from 'components/atoms/visually-hidden';

//#region styled
const xsFontSize = 18;
const xlFontSize = 36;
const lerpByFontSize = (from: number, to: number) =>
  lerpByEM(from, to, xsFontSize, xlFontSize);

const BearIcon = styled(StandaloneBearIcon)`
  flex: none;
  width: ${lerpByFontSize(42, 60)};
  margin-right: ${em(15, xsFontSize)};
`;

const Heading = styled.h1`
  margin-right: auto;
  font-size: 1em;
  font-weight: normal;
`;

const CartLink = styled(StandaloneCartLink)`
  flex: none;
  position: fixed;
  right: 15px;
  bottom: 12px;
  font-size: 1rem;
  z-index: 1;

  @media ${up(breakpoints.md)} {
    position: static;
    margin-right: 30px;
    margin-left: 15px;
  }
`;

const BurgerMenuIcon = styled(StandaloneBurgerMenuIcon)`
  width: ${em(22, xsFontSize)};
`;

const BurgerMenu = styled.button`
  flex: none;
  background: none;
  border: none;
  line-height: 0;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  min-height: ${em(50, xsFontSize)};
  padding-left: ${lerpByFontSize(7, 22)};
  padding-right: ${lerpByFontSize(7, 42)};
  border-bottom: 1px solid #e5e5e5;
  font-size: ${em(xsFontSize)};

  @media ${up(breakpoints.md)} {
    font-size: ${em((xlFontSize + xsFontSize) / 2)};
  }

  @media ${up(breakpoints.xl)} {
    font-size: ${em(xlFontSize)};
  }
`;
//#endregion

const StoreHeader = () => {
  const upMD = useMediaQuery(up(breakpoints.md));
  const canHover = useMediaQuery('(hover: hover)');
  const isClient = upMD !== undefined;

  return (
    <Header>
      <BearIcon />
      <Heading>Самый долгий магазин цифровых товаров</Heading>
      {isClient && <CartLink detailed={upMD} />}
      {isClient &&
        (canHover && upMD ? (
          <HoverNav
            links={[
              { href: '/me', icon: <PersonIcon />, alt: 'Личный кабинет' },
              { href: '/orders', icon: <OrdersIcon />, alt: 'Заказы' },
              { href: '/sign-out', icon: <SignOutIcon />, alt: 'Выход' },
            ]}
          />
        ) : (
          <BurgerMenu>
            <VisuallyHidden>Меню</VisuallyHidden>
            <BurgerMenuIcon />
          </BurgerMenu>
        ))}
    </Header>
  );
};

export default StoreHeader;
