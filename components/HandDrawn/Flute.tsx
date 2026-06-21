interface FluteIconProps {
  className?: string
}

export function FluteIcon({ className = '' }: FluteIconProps) {
  return (
    <svg
      width="40"
      height="14"
      viewBox="0 0 40 14"
      fill="none"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      {/* Body */}
      <path
        d="M 3 7 Q 10 5 36 7"
        stroke="#E85D24"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Finger holes */}
      {[13, 19, 24, 29].map((x) => (
        <circle key={x} cx={x} cy="7" r="1.8" fill="#FAF6F0" stroke="#E85D24" strokeWidth="1" />
      ))}
      {/* Embouchure */}
      <ellipse cx="6" cy="7" rx="2.5" ry="1.8" stroke="#E85D24" strokeWidth="1" fill="none" />
    </svg>
  )
}
