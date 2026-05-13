'use client'

import { motion } from 'framer-motion'

interface WobblyFrameProps {
  width: number
  height: number
  className?: string
}

export function WobblyFrame({ width, height, className = '' }: WobblyFrameProps) {
  const o = 12
  const W = width + o * 2
  const H = height + o * 2

  const d = [
    `M ${o + 7} ${o}`,
    `Q ${W * 0.28} ${o - 5} ${W * 0.58} ${o + 3}`,
    `Q ${W - o - 3} ${o - 2} ${W - o + 3} ${o + 9}`,
    `Q ${W - o + 5} ${H * 0.28} ${W - o - 2} ${H * 0.62}`,
    `Q ${W - o + 4} ${H - o - 5} ${W - o - 3} ${H - o + 3}`,
    `Q ${W * 0.62} ${H - o + 6} ${W * 0.32} ${H - o - 3}`,
    `Q ${o + 3} ${H - o + 4} ${o - 3} ${H - o - 5}`,
    `Q ${o - 5} ${H * 0.62} ${o + 2} ${H * 0.3}`,
    `Q ${o - 4} ${o + 13} ${o + 7} ${o}`,
    'Z',
  ].join(' ')

  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      style={{ top: -o, left: -o }}
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d={d}
        stroke="#E85D24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.4 }}
      />
    </svg>
  )
}
