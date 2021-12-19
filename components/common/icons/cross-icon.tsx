interface CrossIconProps {
  className?: string;
}

const CrossIcon = ({ className }: CrossIconProps) => (
  <svg width="18" viewBox="0 0 18 19" fill="black" className={className}>
    <rect
      x="0.209991"
      y="17.0465"
      width="23.2424"
      height="1.91041"
      rx="0.955203"
      transform="rotate(-45 0.209991 17.0465)"
    />

    <rect
      width="23.2225"
      height="1.90877"
      rx="0.954386"
      transform="matrix(0.707107 0.707107 0.707107 -0.707107 0.22754 1.96826)"
    />
  </svg>
);
export default CrossIcon;
