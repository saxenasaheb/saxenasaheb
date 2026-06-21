interface MapPinIconProps {
  className?: string
}

export function MapPinIcon({ className = '' }: MapPinIconProps) {
  return (
    <svg
      width="14"
      height="20"
      viewBox="0 0 14 20"
      fill="none"
      className={`flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M 7 1.5 Q 12.5 1.5 12.5 7 Q 12.5 12.5 7 18 Q 1.5 12.5 1.5 7 Q 1.5 1.5 7 1.5 Z"
        stroke="#E85D24"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="7" r="2" stroke="#E85D24" strokeWidth="1.5" fill="none" />
    </svg>
  )
}
