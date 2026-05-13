'use client'

import { motion } from 'framer-motion'
import { WobblyUnderline } from '@/components/HandDrawn/Underline'
import { MapPinIcon } from '@/components/HandDrawn/MapPin'

// REPLACE: swap these with your real details
const socials = [
  { label: 'Instagram / X', handle: '@thesaumyasaxena', href: 'https://instagram.com/thesaumyasaxena' },
  { label: 'Inner Circle', handle: '@innercircle', href: '#' },
  { label: 'LinkedIn', handle: 'saumya-saxena', href: 'https://linkedin.com/in/saumyasaxena' },
]

export default function Contact() {
  return (
    <section className="bg-pale-indigo py-24 px-6">
      <div className="max-w-3xl mx-auto">

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
            Get in Touch
          </h2>
          <WobblyUnderline width={245} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-10"
        >
          {/* Email */}
          <div>
            <p className="font-inter text-xs text-ink/35 uppercase tracking-widest mb-2">email</p>
            {/* REPLACE: swap with actual email address */}
            <a
              href="mailto:hello@saumya.xyz"
              className="font-fraunces text-ink transition-colors hover:text-saffron"
              style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
                fontVariationSettings: '"SOFT" 20',
              }}
            >
              hello@saumya.xyz
            </a>
          </div>

          {/* Social */}
          <div>
            <p className="font-inter text-xs text-ink/35 uppercase tracking-widest mb-3">social</p>
            <div className="space-y-3">
              {socials.map((s) => (
                <a
                  key={s.handle}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-inter text-base text-ink/60 transition-colors hover:text-saffron"
                >
                  <span className="text-ink/35 text-sm mr-2">{s.label}</span>
                  {s.handle}
                </a>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2.5 pt-2">
            <MapPinIcon className="mt-0.5" />
            <p className="font-inter text-sm text-ink/50 leading-relaxed">
              {/* REPLACE: update address / office */}
              Inner Circle, Indiranagar, Bangalore — if you&apos;re in town, the door&apos;s open
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-24 pt-7 flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(31,26,23,0.1)' }}
        >
          <p className="font-inter text-xs text-ink/25">
            made with{' '}
            <a
              href="https://claude.ai/code"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-saffron transition-colors"
            >
              Claude Code
            </a>
          </p>
          <span className="font-devanagari text-sm text-ink/25">सौम्य</span>
        </motion.footer>

      </div>
    </section>
  )
}
