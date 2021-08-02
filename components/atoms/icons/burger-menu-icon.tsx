interface BurgerMenuIconProps {
  className?: string;
}

const BurgerMenuIcon = ({ className }: BurgerMenuIconProps) => (
  <svg viewBox="0 0 22 14" fill="none" className={className} aria-hidden>
    <rect x="3" y="6" width="19" height="2" rx="1" fill="black" />
    <rect x="7.33334" y="12" width="14.6667" height="2" rx="1" fill="black" />
    <rect width="22" height="2" rx="1" fill="black" />
    <rect width="22" height="2" rx="1" stroke="black" />
  </svg>
);

export default BurgerMenuIcon;
export type { BurgerMenuIconProps };
