import { useAuth } from 'components/auth/auth-provider';
import StandaloneCartLink from 'components/cart/cart-link';
import StandaloneBearIcon from 'components/common/icons/bear-icon';
import OrdersIcon from 'components/common/icons/orders-icon';
import PersonIcon from 'components/common/icons/person-icon';
import SignOutIcon from 'components/common/icons/sign-out-icon';
import Navigation, {
  NavigationItem,
} from 'components/common/sections/navigation';
import HeaderTemplate, {
  xsFontSize,
  lerpByFontSize,
} from 'components/common/templates/header-template';
import VisuallyHidden from 'components/common/utils/visually-hidden';
import { signOut } from 'lib/auth';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo } from 'react';
import styled from 'styled-components';
import { em, up } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const BearIcon = styled(StandaloneBearIcon)`
  width: ${lerpByFontSize(42, 60)};
`;

const HomeAnchor = styled.a`
  flex: none;
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

const Container = styled(HeaderTemplate)`
  position: relative;
`;
//#endregion

const Header = () => {
  const { user } = useAuth();
  const t = useTranslations('Header');

  const guestNav = useMemo<NavigationItem[]>(
    () => [
      {
        href: '/auth#sign-in',
        icon: <PersonIcon />,
        text: t('guestNav.signIn'),
      },
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
        onClick: signOut,
      },
    ],
    [t]
  );

  return (
    <Container>
      <Link href="/" passHref>
        <HomeAnchor>
          <VisuallyHidden>{t('home')}</VisuallyHidden>
          <BearIcon />
        </HomeAnchor>
      </Link>
      <Heading>{t('heading')}</Heading>
      <CartLink />
      <Navigation
        items={user ? userNav : guestNav}
        hiddenItems={user ? guestNav : userNav}
      />
    </Container>
  );
};

export default Header;
