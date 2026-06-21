'use client'

import { motion } from 'framer-motion'

interface WobblyUnderlineProps {
  width?: number
  className?: string
}

export function WobblyUnderline({ width = 200, className = '' }: WobblyUnderlineProps) {
  const w = width
  return (
    <svg
      width={w}
      height={14}
      viewBox={`0 0 ${w} 14`}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d={`M 4 8 Q ${w * 0.1} 3 ${w * 0.22} 8 Q ${w * 0.36} 12 ${w * 0.5} 6 Q ${w * 0.63} 2 ${w * 0.76} 9 Q ${w * 0.87} 12 ${w - 4} 7`}
        stroke="#E85D24"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      />
    </svg>
  )
}
