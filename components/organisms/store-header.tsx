import styled from 'styled-components';
import { useSigninCheck } from 'reactfire';
import { useMemo } from 'react';
import { em, lerpByEM, up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';
import StandaloneBearIcon from 'components/atoms/icons/bear-icon';
import StandaloneCartLink from 'components/atoms/links/cart-link';
import PersonIcon from 'components/atoms/icons/person-icon';
import OrdersIcon from 'components/atoms/icons/orders-icon';
import SignOutIcon from 'components/atoms/icons/sign-out-icon';
import Navigation from 'components/organisms/navigation';

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
  position: fixed;
  right: 15px;
  bottom: 12px;
  font-size: 1rem;
  z-index: 1;

  @media ${up(breakpoints.md)} {
    position: static;
    margin: 0 30px;
  }
`;

const Header = styled.header`
  position: relative;
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
  const isSignedIn = useSigninCheck().data?.signedIn;
  const links = useMemo(
    () => [
      {
        href: '/sign-in',
        icon: <PersonIcon />,
        text: 'Войти',
        display: !isSignedIn,
      },
      {
        href: '/user',
        icon: <PersonIcon />,
        text: 'Личный кабинет',
        display: isSignedIn,
      },
      {
        href: '/orders',
        icon: <OrdersIcon />,
        text: 'Заказы',
        display: isSignedIn,
      },
      {
        href: '/sign-out',
        icon: <SignOutIcon />,
        text: 'Выйти',
        display: isSignedIn,
      },
    ],
    [isSignedIn]
  );

  return (
    <Header>
      <BearIcon />
      <Heading>Самый долгий магазин цифровых товаров</Heading>
      <CartLink />
      <Navigation links={links} />
    </Header>
  );
};

export default StoreHeader;
