interface PlusIconProps {
  className?: string
  fill?: string
}

const PlusIcon = ({ className, fill }: PlusIconProps) => {
  return (
    <svg
      viewBox="0 0 13 13"
      fill={fill}
      className={className}
      aria-hidden="true"
    >
      <path d="M10.938 4.95365H7.29199V1.23841C7.29199 0.5545 6.74783 0 6.07666 0C5.40549 0 4.86133 0.5545 4.86133 1.23841V4.95365H1.21533C0.544165 4.95365 0 5.50815 0 6.19207C0 6.87598 0.544165 7.43048 1.21533 7.43048H4.86133V11.1457C4.86133 11.8296 5.40549 12.3841 6.07666 12.3841C6.74783 12.3841 7.29199 11.8296 7.29199 11.1457V7.43048H10.938C11.6092 7.43048 12.1533 6.87598 12.1533 6.19207C12.1533 5.50815 11.6092 4.95365 10.938 4.95365Z" />
    </svg>
  )
}

export default PlusIcon
export type { PlusIconProps }
