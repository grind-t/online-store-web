import VisuallyHidden from 'components/atoms/visually-hidden';
import Link from 'next/link';
import { ReactNode } from 'react';
import styled from 'styled-components';

//#region styled
const linkSize = 49;
const gap = 4;

const Anchor = styled.a`
  display: block;
  width: ${linkSize}px;
  height: ${linkSize}px;
`;

const FloatingNavListItem = styled.li<{ index: number }>`
  position: absolute;
  top: ${(props) => linkSize * (props.index + 1) + gap * props.index}px;
  padding-top: ${gap}px;
  visibility: hidden;
  opacity: 0;

  transition: opacity 500ms;
`;

const NavList = styled.ul`
  position: relative;
  list-style: none;
  z-index: 1;

  &:hover {
    ${FloatingNavListItem} {
      visibility: visible;
      opacity: 1;
    }
  }
`;
//#endregion

interface HoverNavLinkProps {
  href: string;
  icon?: ReactNode;
  alt?: string;
}

const HoverNavLink = ({ href, icon, alt }: HoverNavLinkProps) => (
  <Link href={href} passHref>
    <Anchor>
      {alt && <VisuallyHidden>{alt}</VisuallyHidden>}
      {icon}
    </Anchor>
  </Link>
);

interface HoverNavProps {
  links: HoverNavLinkProps[];
  className?: string;
}

const HoverNav = ({ links, className }: HoverNavProps) => (
  <nav className={className}>
    <NavList>
      {links.length && (
        <li>
          <HoverNavLink {...links[0]} />
        </li>
      )}
      {links.slice(1).map((v, i) => (
        <FloatingNavListItem key={v.href} index={i}>
          <HoverNavLink {...v} />
        </FloatingNavListItem>
      ))}
    </NavList>
  </nav>
);

export default HoverNav;
export type { HoverNavLink, HoverNavProps };
