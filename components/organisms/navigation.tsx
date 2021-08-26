import { useMediaQuery } from '@react-hookz/web';
import StandaloneBurgerMenuIcon from 'components/atoms/icons/burger-menu-icon';
import CrossIcon from 'components/atoms/icons/cross-icon';
import VisuallyHidden from 'components/atoms/utils/visually-hidden';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { hideVisually, up, em } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';

//#region styled
const xsFontSize = 18;
const hoverItemWidth = 49;
const hoverItemHeight = 49;
const hoverNavQuery = `${up(breakpoints.md)} and (hover: hover)`;
const burgerNavQuery = `not all and ${hoverNavQuery}`;

const NavItemText = styled.span`
  @media ${hoverNavQuery} {
    ${hideVisually()}
  }
`;

const NavItem = styled.span`
  background: none;
  border: none;
  cursor: pointer;

  @media ${burgerNavQuery} {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${em(122, xsFontSize)};
    min-height: ${em(40, xsFontSize)};
    margin-bottom: ${em(8, xsFontSize)};
    border: 1.5px solid black;
    border-radius: 30px;
    color: inherit;
    text-align: center;
  }

  @media ${hoverNavQuery} {
    display: block;
    width: ${hoverItemWidth}px;
    height: ${hoverItemHeight}px;
    margin: 0 0 4px 0;
  }
`;

const NavList = styled.ul`
  list-style: none;

  @media ${burgerNavQuery} {
    position: relative;
    width: fit-content;
    margin: 1em auto 0;
  }

  @media ${hoverNavQuery} {
    position: absolute;
    top: 0;
    left: 0;
    max-height: 100%;
    z-index: 2;

    li + li {
      visibility: hidden;
      opacity: 0;
      transition: visibility 500ms, opacity 500ms;
    }

    :hover {
      max-height: none;

      li {
        visibility: visible;
        opacity: 1;
      }
    }
  }
`;

const Nav = styled.nav<{ isBurgerNav?: boolean; isBurgerOpen?: boolean }>`
  @media ${burgerNavQuery} {
    ${(props) => !props.isBurgerNav && 'display: none;'}
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: white;
    border-top: 1px solid #e5e5e5;
    visibility: hidden;
    opacity: 0;
    transition: visibility 200ms, opacity 200ms;
    z-index: 2;

    ${(props) => props.isBurgerOpen && 'visibility: visible; opacity: 1;'}
  }

  @media ${hoverNavQuery} {
    ${(props) => props.isBurgerNav && 'display: none;'}
    position: relative;
    width: ${hoverItemWidth}px;
    min-height: ${hoverItemHeight}px;
  }
`;

const BurgerMenuIcon = styled(StandaloneBurgerMenuIcon)`
  width: ${em(22, xsFontSize)};
`;

const CloseIcon = styled(CrossIcon)`
  width: 1em;
`;

const BurgerMenu = styled.button.attrs({ type: 'button' })`
  width: ${em(22, xsFontSize)};
  background: none;
  border: none;
  line-height: 0;
  text-align: right;
`;
//#endregion

interface NavigationLinkProps {
  href: string;
  text: string;
  icon?: ReactNode;
}

const NavigationLink = ({ href, text, icon }: NavigationLinkProps) => (
  <Link href={href} passHref>
    <NavItem as="a">
      <NavItemText>{text}</NavItemText>
      {icon}
    </NavItem>
  </Link>
);

interface NavigationButtonProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
}

const NavigationButton = ({ text, icon, onClick }: NavigationButtonProps) => (
  <NavItem as="button" onClick={onClick}>
    <NavItemText>{text}</NavItemText>
    {icon}
  </NavItem>
);

type NavigationItemProps = NavigationItem & { showIcon?: boolean };

const NavigationItem = (props: NavigationItemProps) =>
  'href' in props ? (
    <NavigationLink
      href={props.href}
      text={props.text}
      icon={props.showIcon && props.icon}
    />
  ) : (
    <NavigationButton
      text={props.text}
      icon={props.showIcon && props.icon}
      onClick={props.onClick}
    />
  );

export interface NavigationLink {
  text: string;
  icon: ReactNode;
  href: string;
}

export interface NavigationButton {
  text: string;
  icon: ReactNode;
  onClick: () => void;
}

export type NavigationItem = NavigationLink | NavigationButton;

export interface NavigationProps {
  items: NavigationItem[];
  hiddenItems?: NavigationItem[];
  className?: string;
}

const Navigation = ({ items, hiddenItems, className }: NavigationProps) => {
  const isHoverNav = useMediaQuery(hoverNavQuery);
  const isBurgerNav = !isHoverNav;
  const isClient = isHoverNav !== undefined;
  const [isBurgerOpen, showBurgerNav] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isBurgerOpen ? 'hidden' : '';
  }, [isBurgerOpen]);

  return (
    <>
      <Nav
        className={className}
        isBurgerNav={isBurgerNav}
        isBurgerOpen={isBurgerOpen}
      >
        <NavList>
          {items.map((item) => (
            <li key={item.text}>
              <NavigationItem {...item} showIcon={isHoverNav} />
            </li>
          ))}
          {hiddenItems &&
            hiddenItems.map((item) => (
              <li style={{ display: 'none' }} key={item.text}>
                <NavigationItem {...item} />
              </li>
            ))}
        </NavList>
      </Nav>
      {isClient && isBurgerNav && (
        <BurgerMenu onClick={() => showBurgerNav((v) => !v)}>
          <VisuallyHidden>
            {isBurgerOpen ? 'Закрыть меню' : 'Открыть меню'}
          </VisuallyHidden>
          {isBurgerOpen ? <CloseIcon /> : <BurgerMenuIcon />}
        </BurgerMenu>
      )}
    </>
  );
};

export default Navigation;
