'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { WobblyUnderline } from '@/components/HandDrawn/Underline'

interface Story {
  id: number
  title: string
  preview: string
  backHeading: string
  backDetail: string
  isLie: boolean
}

// REPLACE: Swap these three stories with your own. Keep one isLie: true.
const stories: Story[] = [
  {
    id: 1,
    title: 'The midnight pitch',
    preview:
      'I once pitched a VC at 11:47 PM in the lobby of a Delhi hotel. He was checking out for a 6 AM flight to Singapore. We talked for forty minutes standing up. He passed.',
    backHeading: 'True.',
    backDetail:
      'The "he passed" part still stings. But that conversation rewired how I think about timing, persistence, and what it means to be ready.',
    isLie: false,
  },
  {
    id: 2,
    title: "Coinbase's first India hire",
    preview:
      "I was offered a role at Coinbase in 2019, before they had any India presence. I would have been employee #1 on the ground. I turned it down to stay and build locally.",
    backHeading: 'Lie.',
    backDetail:
      "I did work on something Base-adjacent — but employee #1 in India? Made that up. The ambition was real. The offer wasn't.",
    isLie: true,
  },
  {
    id: 3,
    title: 'The event that broke even',
    preview:
      "I ran a 400-person conference on a budget of essentially zero. We traded services, called in every favour, and landed three sponsors in the final 48 hours. It broke even.",
    backHeading: 'True.',
    backDetail:
      "AGNT'Con. Every community builder will recognise this energy — scrappy, slightly terrifying, somehow the best version of the thing.",
    isLie: false,
  },
]

function FlipCard({ story, onFlip }: { story: Story; onFlip: () => void }) {
  const [flipped, setFlipped] = useState(false)

  const handleFlip = () => {
    if (!flipped) {
      setFlipped(true)
      onFlip()
    }
  }

  const backBg = story.isLie ? '#F5DDDB' : '#D9E4D6'

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ perspective: '1000px', height: '260px' }}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
      aria-label={`Card: ${story.title}. Click to reveal.`}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Front */}
        <div
          className="backface-hidden absolute inset-0 bg-cream rounded-xl p-6 flex flex-col justify-between"
          style={{ boxShadow: '0 2px 12px rgba(31,26,23,0.07)', border: '1px solid rgba(31,26,23,0.06)' }}
        >
          <div>
            <h3
              className="font-fraunces text-xl text-ink mb-3"
              style={{ fontVariationSettings: '"SOFT" 20' }}
            >
              {story.title}
            </h3>
            <p className="font-inter text-sm text-ink/65 leading-relaxed">
              {story.preview}
            </p>
          </div>
          <p className="font-inter text-xs text-saffron/50 mt-4">
            tap to reveal →
          </p>
        </div>

        {/* Back */}
        <div
          className="backface-hidden absolute inset-0 rounded-xl p-6 flex flex-col justify-between"
          style={{
            transform: 'rotateY(180deg)',
            backgroundColor: backBg,
            border: '1px solid rgba(31,26,23,0.06)',
          }}
        >
          <div>
            <p
              className="font-fraunces text-3xl text-ink mb-3"
              style={{ fontVariationSettings: '"SOFT" 60' }}
            >
              {story.backHeading}
            </p>
            <p className="font-inter text-sm text-ink/65 leading-relaxed">
              {story.backDetail}
            </p>
          </div>
          {story.isLie && (
            <p
              className="font-fraunces italic text-sm text-saffron"
              style={{ fontVariationSettings: '"SOFT" 50' }}
            >
              this is the lie.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default function TruthsAndLie() {
  const [flippedCount, setFlippedCount] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const allFlipped = flippedCount >= stories.length

  const handleReset = () => {
    setFlippedCount(0)
    setResetKey((k) => k + 1)
  }

  return (
    <section className="bg-dusty-rose py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2
            className="font-fraunces text-ink mb-3"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4rem)',
              fontVariationSettings: '"SOFT" 25',
            }}
          >
            Two Truths and a Lie
          </h2>
          <WobblyUnderline width={380} className="mb-5" />
          <p className="font-inter text-sm text-ink/55">
            Pick the lie. One of these didn&apos;t happen.
          </p>
        </motion.div>

        <div key={resetKey} className="grid md:grid-cols-3 gap-5">
          {stories.map((story, i) => (
            <motion.div
              key={`${resetKey}-${story.id}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <FlipCard story={story} onFlip={() => setFlippedCount((c) => c + 1)} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: allFlipped ? 1 : 0, y: allFlipped ? 0 : 10 }}
          transition={{ duration: 0.4 }}
          className="mt-12 text-center"
          aria-hidden={!allFlipped}
        >
          <p
            className="font-fraunces italic text-lg text-ink/55 mb-4"
            style={{ fontVariationSettings: '"SOFT" 40' }}
          >
            want another round?
          </p>
          <button
            onClick={handleReset}
            className="font-inter text-sm text-saffron px-5 py-2 rounded-full cursor-pointer transition-colors"
            style={{ border: '1px solid rgba(232,93,36,0.35)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(232,93,36,0.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            reset cards
          </button>
        </motion.div>

      </div>
    </section>
  )
}
