import { getAppAuth, signOut } from 'app/firebase/auth';
import StandaloneBearIcon from 'components/atoms/icons/bear-icon';
import OrdersIcon from 'components/atoms/icons/orders-icon';
import PersonIcon from 'components/atoms/icons/person-icon';
import SignOutIcon from 'components/atoms/icons/sign-out-icon';
import StandaloneCartLink from 'components/atoms/links/cart-link';
import Navigation, { NavigationItem } from 'components/organisms/navigation';
import HeaderTemplate, {
  xsFontSize,
  lerpByFontSize,
} from 'components/templates/header-template';
import { useAuth } from 'hooks/useAuth';
import styled from 'styled-components';
import { em, up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
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

const Header = styled(HeaderTemplate)`
  position: relative;
`;
//#endregion

const guestNav: NavigationItem[] = [
  { href: '/sign-in', icon: <PersonIcon />, text: 'Войти' },
];

const userNav: NavigationItem[] = [
  { href: '/user', icon: <PersonIcon />, text: 'Личный кабинет' },
  { href: '/orders', icon: <OrdersIcon />, text: 'Заказы' },
  {
    text: 'Выйти',
    icon: <SignOutIcon />,
    onClick: () => signOut(getAppAuth()),
  },
];

const StoreHeader = () => {
  const user = useAuth();

  return (
    <Header>
      <BearIcon />
      <Heading>Самый долгий магазин цифровых товаров</Heading>
      <CartLink />
      <Navigation
        items={user ? userNav : guestNav}
        hiddenItems={user ? guestNav : userNav}
      />
    </Header>
  );
};

export default StoreHeader;
