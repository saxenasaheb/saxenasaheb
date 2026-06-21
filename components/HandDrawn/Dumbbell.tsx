interface DumbbellIconProps {
  className?: string
}

export function DumbbellIcon({ className = '' }: DumbbellIconProps) {
  return (
    <svg
      width="36"
      height="16"
      viewBox="0 0 36 16"
      fill="none"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      {/* Bar */}
      <line x1="9" y1="8" x2="27" y2="8" stroke="#E85D24" strokeWidth="2" strokeLinecap="round" />
      {/* Left weight */}
      <rect x="1" y="4" width="8" height="8" rx="1.5" stroke="#E85D24" strokeWidth="1.5" fill="none" />
      {/* Right weight */}
      <rect x="27" y="4" width="8" height="8" rx="1.5" stroke="#E85D24" strokeWidth="1.5" fill="none" />
    </svg>
  )
}
