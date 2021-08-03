interface BurgerMenuIconProps {
  className?: string;
}

const BurgerMenuIcon = ({ className }: BurgerMenuIconProps) => (
  <svg
    width="22"
    viewBox="0 0 22 14"
    fill="black"
    className={className}
    aria-hidden
  >
    <rect x="3" y="6" width="19" height="2" rx="1" />
    <rect x="7.33334" y="12" width="14.6667" height="2" rx="1" />
    <rect width="22" height="2" rx="1" />
  </svg>
);

export default BurgerMenuIcon;
export type { BurgerMenuIconProps };
