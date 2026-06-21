'use client'

import { motion } from 'framer-motion'
import { WobblyFrame } from '@/components/HandDrawn/Frame'
import { KurtaDoodle } from '@/components/HandDrawn/KurtaDoodle'
import { MarginArrow } from '@/components/HandDrawn/Arrow'
import { FluteIcon } from '@/components/HandDrawn/Flute'
import { DumbbellIcon } from '@/components/HandDrawn/Dumbbell'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
})

export default function Hero() {
  return (
    <section className="bg-cream min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Two-column hero ── */}
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[85vh]">

          {/* Left */}
          <div>
            <motion.h1
              {...fadeUp(0)}
              className="font-fraunces text-ink leading-[0.88] tracking-tight"
              style={{
                fontSize: 'clamp(5rem, 13vw, 9rem)',
                fontVariationSettings: '"SOFT" 100, "WONK" 1',
              }}
            >
              saumya
            </motion.h1>

            <motion.p
              {...fadeUp(0.1)}
              className="font-devanagari text-saffron mt-2 tracking-[0.18em]"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)' }}
            >
              सौम्य
            </motion.p>

            <motion.p
              {...fadeUp(0.2)}
              className="font-fraunces italic text-ink/60 mt-7 leading-snug"
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                fontVariationSettings: '"SOFT" 30, "WONK" 0',
                maxWidth: '36ch',
              }}
            >
              &ldquo;Most startup stories are told after they work out. These aren&apos;t those.&rdquo;
            </motion.p>

            {/* Currently line — REPLACE: swap text here as things change */}
            <motion.p
              {...fadeUp(0.32)}
              className="font-inter text-sm text-ink/45 mt-7 leading-relaxed"
            >
              currently:{' '}
              <span className="text-ink/65">
                <FluteIcon className="mr-0.5 mb-0.5" />
                playing flute ·{' '}
                <DumbbellIcon className="mx-0.5 mb-0.5" />
                90-day reset day 33 · building Inner Circle
              </span>
            </motion.p>
          </div>

          {/* Right — photo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center md:justify-end items-start pt-4 md:pt-0"
          >
            <div
              className="relative inline-block"
              style={{ transform: 'rotate(-2deg)' }}
            >
              {/* REPLACE: swap <div> for <Image> with actual photo src (kurta-era preferred) */}
              <div className="w-[260px] h-[320px] md:w-[290px] md:h-[360px] bg-stone-300 flex items-center justify-center overflow-hidden">
                <p className="font-inter text-xs text-stone-500 text-center px-6 leading-relaxed">
                  photo goes here<br />kurta-era ideally
                </p>
              </div>
              <WobblyFrame width={290} height={360} />
            </div>
          </motion.div>
        </div>

        {/* ── Below fold — intro copy + margin notes ── */}
        <div className="mt-20 grid md:grid-cols-[1fr_220px] gap-14">
          <div className="space-y-7" style={{ maxWidth: '65ch' }}>

            {/* Para 1 — REPLACE */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-inter text-base text-ink/75 leading-[1.75]"
            >
              {/* REPLACE: Opening paragraph — who you are, what you care about */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </motion.p>

            {/* Para 2 — Kurta story */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="relative"
            >
              <KurtaDoodle className="absolute -left-10 top-0 hidden md:block" />
              {/* KURTA STORY GOES HERE */}
              <p
                className="font-inter text-base text-ink/75 leading-[1.75] pl-3"
                style={{ borderLeft: '2px solid rgba(232,93,36,0.25)' }}
              >
                {/* REPLACE: The kurta story — the moment a kurta changed how you moved through a room */}
                There was a moment when wearing a kurta changed everything. Not metaphorically. It was the kind of decision that looks small from outside and rearranges something fundamental inside. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </motion.div>

            {/* Para 3 — REPLACE */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="font-inter text-base text-ink/75 leading-[1.75]"
            >
              {/* REPLACE: Paragraph 3 */}
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
            </motion.p>

            {/* Para 4 — REPLACE */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="font-inter text-base text-ink/75 leading-[1.75]"
            >
              {/* REPLACE: Paragraph 4 — how you think about building / India / community */}
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est qui dolorem ipsum quia dolor sit.
            </motion.p>
          </div>

          {/* Margin notes — desktop only */}
          <div className="hidden md:flex flex-col gap-12 pt-3">
            {[
              'this is where it started',       // REPLACE: margin note 1
              'still think about this one',      // REPLACE: margin note 2
              'the number keeps going up',       // REPLACE: margin note 3
            ].map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-1.5"
              >
                <MarginArrow className="mt-0.5" />
                <p
                  className="font-inter text-xs leading-relaxed italic"
                  style={{ color: 'rgba(232, 93, 36, 0.75)' }}
                >
                  {note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
