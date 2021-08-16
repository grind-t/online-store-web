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

const AnchorText = styled.span`
  @media ${hoverNavQuery} {
    ${hideVisually()}
  }
`;

const Anchor = styled.a`
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

  @media ${hoverNavQuery} {
    width: ${hoverLinkWidth}px;
    min-height: ${hoverLinkHeight}px;
    margin: 0 0 4px 0;
    border: none;
  }
`;

const NavListItem = styled.li`
  @media ${hoverNavQuery} {
    & ~ & {
      visibility: hidden;
      opacity: 0;
      transition: opacity 500ms;
    }
  }
`;

const NavList = styled.ul`
  position: relative;
  width: fit-content;
  margin: 1em auto 0;
  list-style: none;

  @media ${hoverNavQuery} {
    position: absolute;
    top: 0;
    left: 0;
    max-height: 100%;
    margin: 0;

    &:hover {
      max-height: none;

      ${NavListItem} {
        visibility: visible;
        opacity: 1;
      }
    }
  }
`;

const Nav = styled.nav<{ isVisible?: boolean }>`
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background: white;
  border-top: 1px solid #e5e5e5;
  z-index: 3;

  @media ${hoverNavQuery} {
    position: relative;
    width: ${hoverLinkWidth}px;
    min-height: ${hoverLinkHeight}px;
    background: none;
    border: none;
  }
`;

const BurgerMenuIcon = styled(StandaloneBurgerMenuIcon)`
  width: ${em(22, xsFontSize)};
`;

const CloseIcon = styled(CrossIcon)`
  width: 1em;
`;

const BurgerMenu = styled.button.attrs({ type: 'button' })`
  min-width: ${em(22, xsFontSize)};
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
  display?: boolean;
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
  className?: string;
}

const Navigation = ({ links, className }: NavigationProps) => {
  const [isModalOpen, showModal] = useState(false);
  const isHoverNav = useMediaQuery(hoverNavQuery);
  const isClient = isHoverNav !== undefined;

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
  }, [isModalOpen]);

  return (
    <>
      <Nav className={className} isVisible={isModalOpen || isHoverNav}>
        <NavList>
          {links.map((link) =>
            link.display ? (
              <NavListItem key={link.href}>
                <NavLink
                  href={link.href}
                  text={link.text}
                  icon={isHoverNav && link.icon}
                />
              </NavListItem>
            ) : (
              <DisplayNone as="li" key={link.href}>
                <NavLink href={link.href} text={link.text} />
              </DisplayNone>
            )
          )}
        </NavList>
      </Nav>
      {isClient && !isHoverNav && (
        <BurgerMenu onClick={() => showModal((v) => !v)}>
          <VisuallyHidden>
            {isModalOpen ? 'Открыть меню' : 'Закрыть меню'}
          </VisuallyHidden>
          {isModalOpen ? <CloseIcon /> : <BurgerMenuIcon />}
        </BurgerMenu>
      )}
    </>
  );
};

export default Navigation;
