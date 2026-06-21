'use client'

import { motion } from 'framer-motion'
import { WobblyUnderline } from '@/components/HandDrawn/Underline'

// REPLACE: swap these beliefs with your own — each needs body paragraphs + a pull quote
const beliefs = [
  {
    title: "India's decade is now",
    body: [
      "The infrastructure is finally here — UPI, Aadhaar, Jio — and the people who understand how to build on it are just getting started. We're not 'emerging'. We've arrived.",
      "The question isn't whether India will produce world-class companies. It's whether those companies will carry an Indian identity or dress themselves in global-neutral aesthetics to seem legible to Western capital.",
    ],
    pullQuote: "The question isn't whether India will produce world-class companies.",
  },
  {
    title: 'TradFi × onchain is the interesting seam',
    body: [
      'Most onchain builders are building for the already-converted. The real opportunity is the seam where legacy finance and programmable rails actually touch — and India is uniquely positioned here. We have the regulatory complexity and the technology hunger simultaneously.',
    ],
    pullQuote: 'The real opportunity is the seam where legacy finance and programmable rails touch.',
  },
  {
    title: 'Community is leverage, not support',
    body: [
      "Community gets filed under 'marketing' or 'support' at most companies. That's a category error. Community, when built right, is the actual product — the thing that makes your product defensible, your users sticky, and your story compelling.",
      'Inner Circle exists because I believe this literally. Not as a philosophy — as a business thesis.',
    ],
    pullQuote: 'Community, when built right, is the actual product.',
  },
  {
    title: 'The platform thesis still holds',
    body: [
      "Applications come and go. The platforms they run on compound. I've spent years thinking about which platforms will matter in India's next decade — and where the leverage is for founders building on top of them.",
    ],
    pullQuote: 'Applications come and go. The platforms they run on compound.',
  },
  {
    title: 'Slow is smooth, smooth is fast',
    body: [
      "There's a category of founder hustle that is actually just burning throughput on the wrong things. I've done it. The people I admire most operate with an unusual amount of calm — and move faster because of it, not in spite of it.",
    ],
    pullQuote: 'The people I admire most operate with an unusual amount of calm.',
  },
]

export default function Beliefs() {
  return (
    <section className="bg-butter py-24 px-6">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2
            className="font-fraunces text-ink mb-3"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4rem)',
              fontVariationSettings: '"SOFT" 20',
            }}
          >
            What I Believe
          </h2>
          <WobblyUnderline width={270} />
        </motion.div>

        <div className="space-y-24">
          {beliefs.map((belief) => (
            <motion.div
              key={belief.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65 }}
            >
              <h3
                className="font-fraunces text-ink mb-6"
                style={{
                  fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
                  fontVariationSettings: '"SOFT" 25',
                }}
              >
                {belief.title}
              </h3>

              <div className="space-y-4 mb-9">
                {belief.body.map((para, j) => (
                  <p key={j} className="font-inter text-base text-ink/65 leading-[1.8] max-w-[60ch]">
                    {para}
                  </p>
                ))}
              </div>

              {/* Pull quote */}
              <blockquote className="relative pl-8 ml-2">
                <span
                  className="absolute left-0 top-0 font-fraunces text-saffron leading-none select-none"
                  style={{
                    fontSize: '3.5rem',
                    fontVariationSettings: '"SOFT" 100',
                    lineHeight: 0.8,
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p
                  className="font-fraunces italic text-ink/70"
                  style={{
                    fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
                    fontVariationSettings: '"SOFT" 55, "WONK" 0',
                    lineHeight: 1.5,
                  }}
                >
                  {belief.pullQuote}
                </p>
              </blockquote>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
