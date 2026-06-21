'use client'

import { motion } from 'framer-motion'
import { WobblyUnderline } from '@/components/HandDrawn/Underline'

// REPLACE: swap these principles with your own
const principles = [
  {
    number: '01',
    title: 'Direct over diplomatic',
    detail: 'Clarity is kindness. People deserve to know what you actually think.',
  },
  {
    number: '02',
    title: 'Notice the gap, be the change',
    detail: 'Complaining is a data point. Acting on it is the interesting part.',
  },
  {
    number: '03',
    title: 'India is the work, not the backdrop',
    detail: 'Not building for India. Building as India — from here, with this context, for this moment.',
  },
  {
    number: '04',
    title: 'Community is the moat',
    detail: "Products get copied. Relationships and belonging don't.",
  },
  {
    number: '05',
    title: 'Tell the story before it works out',
    detail: "Honest storytelling in the middle of the mess — that's the rare thing.",
  },
  {
    number: '06',
    title: 'Own the L',
    detail: 'The fastest way through a failure is through it. No reframes, no spin.',
  },
]

// REPLACE: swap these work entries — failures get the same visual treatment as wins
const workEntries = [
  {
    year: '2024 — now',
    title: 'Inner Circle',
    context:
      "Building the operating system for India's startup community. What started as a WhatsApp group became something we had to build infrastructure for.",
  },
  {
    year: '2023',
    title: 'Base (Coinbase L2)',
    context:
      'Ecosystem development for Base in India. Finding the builders who would build on-chain before it was obvious.',
  },
  {
    year: '2022 — 2023',
    title: 'First Dollar',
    context:
      'Helped early-stage founders make their first dollar of revenue. The moment it goes from theoretical to real is everything.',
  },
  {
    year: '2022',
    title: "AGNT'Con",
    context:
      '400 people, zero budget, three sponsors in 48 hours. A conference for the agent economy before most people knew what that meant.',
  },
  {
    year: '2021',
    title: "The payments company that didn't",
    context:
      'Right idea, wrong regulatory tailwind, wrong timing. I learned more from this than anything that worked.',
  },
  {
    year: '2020 — 2021',
    title: 'Antler',
    context:
      "Went through Antler's India cohort. Where I understood what operator-founder really means.",
  },
  {
    year: 'ongoing',
    title: 'Angel investing',
    context:
      "Small checks, big conviction. Mostly India, mostly community-native businesses, mostly founders I'd go to war with.",
  },
]

export default function Work() {
  return (
    <section className="bg-sage py-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* ── Part A: Operating Principles ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2
            className="font-fraunces text-ink mb-3"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4rem)',
              fontVariationSettings: '"SOFT" 20',
            }}
          >
            How I Operate
          </h2>
          <WobblyUnderline width={340} />
        </motion.div>

        <div className="space-y-14 mb-28">
          {principles.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex gap-7 md:gap-10 items-start"
            >
              <span
                className="font-fraunces text-saffron leading-none flex-shrink-0"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontVariationSettings: '"SOFT" 0',
                  minWidth: '3.5rem',
                }}
              >
                {p.number}
              </span>
              <div className="pt-1">
                <h3
                  className="font-fraunces text-ink mb-1.5"
                  style={{
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                    fontVariationSettings: '"SOFT" 20',
                  }}
                >
                  {p.title}
                </h3>
                <p className="font-inter text-sm text-ink/55 leading-relaxed max-w-[52ch]">
                  {p.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Part B: The Work ── */}
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
              fontVariationSettings: '"SOFT" 20',
            }}
          >
            The Work
          </h2>
          <WobblyUnderline width={210} />
        </motion.div>

        <div className="space-y-0">
          {workEntries.map((entry, i) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="pt-8 pb-8"
              style={{ borderTop: '1px solid rgba(31,26,23,0.12)' }}
            >
              <p className="font-inter text-xs text-saffron mb-1.5 tracking-wider uppercase">
                {entry.year}
              </p>
              <h3
                className="font-fraunces text-ink mb-2"
                style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  fontVariationSettings: '"SOFT" 20',
                }}
              >
                {entry.title}
              </h3>
              <p className="font-inter text-sm text-ink/55 leading-relaxed max-w-[55ch]">
                {entry.context}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
