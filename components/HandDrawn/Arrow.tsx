interface MarginArrowProps {
  className?: string
}

export function MarginArrow({ className = '' }: MarginArrowProps) {
  return (
    <svg
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      className={`flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 2 9 Q 5 5 9 7 Q 14 9 16 5"
        stroke="#E85D24"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M 13 2 L 16 5 L 12 7"
        stroke="#E85D24"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.8"
      />
    </svg>
  )
}
