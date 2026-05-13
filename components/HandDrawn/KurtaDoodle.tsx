interface KurtaDoodleProps {
  className?: string
}

export function KurtaDoodle({ className = '' }: KurtaDoodleProps) {
  return (
    <svg
      width="28"
      height="44"
      viewBox="0 0 28 44"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Shoulders and sleeves */}
      <path
        d="M 6 8 L 2 12 L 4 20 L 8 18"
        stroke="#E85D24"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 22 8 L 26 12 L 24 20 L 20 18"
        stroke="#E85D24"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Body */}
      <path
        d="M 6 8 Q 14 6 22 8 L 22 38 Q 14 42 6 38 Z"
        stroke="#E85D24"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* V-neck */}
      <path
        d="M 8 8 Q 14 16 20 8"
        stroke="#E85D24"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Center placket */}
      <line
        x1="14"
        y1="14"
        x2="14"
        y2="28"
        stroke="#E85D24"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="2.5 3"
        opacity="0.7"
      />
    </svg>
  )
}
