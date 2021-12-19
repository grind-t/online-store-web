interface ArrowIconProps {
  className?: string;
}

const ArrowIcon = ({ className }: ArrowIconProps) => (
  <svg
    width="10"
    viewBox="0 0 10 8"
    fill="#2C2C2C"
    className={className}
    aria-hidden
  >
    <path d="M10 7.11111C10 7.35185 9.93815 7.56019 9.81445 7.73611C9.69075 7.91204 9.54427 8 9.375 8H0.625C0.455729 8 0.309245 7.91204 0.185547 7.73611C0.061849 7.56019 0 7.35185 0 7.11111C0 6.87037 0.061849 6.66204 0.185547 6.48611L4.56055 0.263889C4.68424 0.087963 4.83073 0 5 0C5.16927 0 5.31576 0.087963 5.43945 0.263889L9.81445 6.48611C9.93815 6.66204 10 6.87037 10 7.11111Z" />
  </svg>
);

export default ArrowIcon;
export type { ArrowIconProps };
