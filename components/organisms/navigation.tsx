import styled from 'styled-components';
import Link from 'next/link';
import { useMediaQuery } from '@react-hookz/web';
import { ReactNode, useEffect, useState } from 'react';
import { hideVisually, up, em } from 'styles/mixins';
import { breakpoints } from 'styles/varibles';
import DisplayNone from 'components/atoms/utils/display-none';
import StandaloneBurgerMenuIcon from 'components/atoms/icons/burger-menu-icon';
import CrossIcon from 'components/atoms/icons/cross-icon';
import VisuallyHidden from 'components/atoms/utils/visually-hidden';

//#region styled
const xsFontSize = 18;
const hoverLinkWidth = 49;
const hoverLinkHeight = 49;
const hoverNavQuery = `${up(breakpoints.md)} and (hover: hover)`;
const burgerNavQuery = `not all and ${hoverNavQuery}`;

const AnchorText = styled.span`
  @media ${hoverNavQuery} {
    ${hideVisually()}
  }
`;

const Anchor = styled.a`
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
    width: ${hoverLinkWidth}px;
    height: ${hoverLinkHeight}px;
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
    z-index: 3;

    ${(props) => props.isBurgerOpen && 'visibility: visible; opacity: 1;'}
  }

  @media ${hoverNavQuery} {
    ${(props) => props.isBurgerNav && 'display: none;'}
    position: relative;
    width: ${hoverLinkWidth}px;
    min-height: ${hoverLinkHeight}px;
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

interface NavLinkProps {
  href: string;
  text: string;
  icon?: ReactNode;
}

const NavLink = ({ href, text, icon }: NavLinkProps) => (
  <Link href={href} passHref>
    <Anchor>
      <AnchorText>{text}</AnchorText>
      {icon}
    </Anchor>
  </Link>
);

interface NavigationProps {
  links: NavLinkProps[];
  hiddenLinks?: NavLinkProps[];
  className?: string;
}

const Navigation = ({ links, hiddenLinks, className }: NavigationProps) => {
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
          {links.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                text={link.text}
                icon={isHoverNav && link.icon}
              />
            </li>
          ))}
          {hiddenLinks &&
            hiddenLinks.map((link) => (
              <DisplayNone as="li" key={link.href}>
                <NavLink href={link.href} text={link.text} />
              </DisplayNone>
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
