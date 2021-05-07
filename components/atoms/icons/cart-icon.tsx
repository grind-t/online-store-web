interface CartIconProps {
  className?: string;
}

const CartIcon = ({ className }: CartIconProps) => (
  <svg
    viewBox="0 0 18 18"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <path d="M6.51283 16.161C7.25877 16.161 7.86348 15.5449 7.86348 14.7849C7.86348 14.025 7.25877 13.4089 6.51283 13.4089C5.76688 13.4089 5.16217 14.025 5.16217 14.7849C5.16217 15.5449 5.76688 16.161 6.51283 16.161Z" />
    <path d="M14.6142 16.161C15.3602 16.161 15.9649 15.5449 15.9649 14.7849C15.9649 14.025 15.3602 13.4089 14.6142 13.4089C13.8683 13.4089 13.2635 14.025 13.2635 14.7849C13.2635 15.5449 13.8683 16.161 14.6142 16.161Z" />
    <path d="M4.93705 4.46433H16.638L15.5037 10.2367C15.4419 10.5535 15.2728 10.838 15.026 11.0405C14.7791 11.243 14.4702 11.3506 14.1533 11.3444H7.01662C6.68691 11.3472 6.36758 11.2271 6.11883 11.0066C5.87008 10.786 5.7091 10.4804 5.66625 10.1473L4.63997 2.22142C4.59741 1.89066 4.43837 1.58691 4.19245 1.36669C3.94654 1.14648 3.63048 1.0248 3.3031 1.02429H1.78394" />
  </svg>
);

export default CartIcon;
export type { CartIconProps };
