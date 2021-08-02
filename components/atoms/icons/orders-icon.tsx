interface OrdersIconProps {
  className?: string;
}

const OrdersIcon = ({ className }: OrdersIconProps) => (
  <svg
    width="25"
    viewBox="0 0 25 31"
    fill="none"
    stroke="white"
    strokeWidth="2.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <path d="M21.6 4.04761H3.4C2.6268 4.04761 2 4.67441 2 5.44761V27.8476C2 28.6208 2.6268 29.2476 3.4 29.2476H21.6C22.3732 29.2476 23 28.6208 23 27.8476V5.44761C23 4.67441 22.3732 4.04761 21.6 4.04761Z" />
    <path d="M8.30005 1.24756V5.44756" />
    <path d="M16.7 1.24756V5.44756" />
    <path d="M6.90015 11.7476H18.1001" />
    <path d="M6.90015 17.3475H15.3001" />
    <path d="M6.90015 22.9476H12.5001" />
  </svg>
);

export default OrdersIcon;
export type { OrdersIconProps };
