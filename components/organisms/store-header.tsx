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
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from 'state/auth';
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

const StoreHeader = () => {
  const user = useRecoilValue(authState);
  const t = useTranslations('StoreHeader');

  const guestNav = useMemo<NavigationItem[]>(
    () => [
      { href: '/sign-in', icon: <PersonIcon />, text: t('guestNav.signIn') },
    ],
    [t]
  );

  const userNav = useMemo<NavigationItem[]>(
    () => [
      { href: '/profile', icon: <PersonIcon />, text: t('userNav.profile') },
      { href: '/orders', icon: <OrdersIcon />, text: t('userNav.orders') },
      {
        text: t('userNav.signOut'),
        icon: <SignOutIcon />,
        onClick: () => signOut(getAppAuth()),
      },
    ],
    [t]
  );

  return (
    <Header>
      <BearIcon />
      <Heading>{t('heading')}</Heading>
      <CartLink />
      <Navigation
        items={user ? userNav : guestNav}
        hiddenItems={user ? guestNav : userNav}
      />
    </Header>
  );
};

export default StoreHeader;
