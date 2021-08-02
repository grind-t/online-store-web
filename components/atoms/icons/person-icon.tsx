interface PersonIconProps {
  className?: string;
}

const PersonIcon = ({ className }: PersonIconProps) => (
  <svg
    width="21"
    viewBox="0 0 21 22"
    fill="white"
    className={className}
    aria-hidden
  >
    <path d="M10.3333 3.00202C11.8317 3.00202 13.0458 4.21618 13.0458 5.71452C13.0458 7.21285 11.8317 8.42702 10.3333 8.42702C8.835 8.42702 7.62083 7.21285 7.62083 5.71452C7.62083 4.21618 8.835 3.00202 10.3333 3.00202ZM10.3333 14.627C14.1696 14.627 18.2125 16.5128 18.2125 17.3395V18.7603H2.45417V17.3395C2.45417 16.5128 6.49708 14.627 10.3333 14.627ZM10.3333 0.547852C7.47875 0.547852 5.16667 2.85993 5.16667 5.71452C5.16667 8.5691 7.47875 10.8812 10.3333 10.8812C13.1879 10.8812 15.5 8.5691 15.5 5.71452C15.5 2.85993 13.1879 0.547852 10.3333 0.547852ZM10.3333 12.1728C6.88458 12.1728 0 13.9037 0 17.3395V21.2145H20.6667V17.3395C20.6667 13.9037 13.7821 12.1728 10.3333 12.1728Z" />
  </svg>
);

export default PersonIcon;
export type { PersonIconProps };
