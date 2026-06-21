'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Me', href: '#me' },
  { label: 'Work', href: '#work' },
  { label: 'Beliefs', href: '#beliefs' },
  { label: 'Truths & a Lie', href: '#truths' },
  { label: 'Contact', href: '#contact' },
]

function NavUnderline({ active }: { active: boolean }) {
  return (
    <svg
      className="absolute -bottom-1 left-0 w-full overflow-visible"
      height="5"
      viewBox="0 0 100 5"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M 0 3 Q 20 0 50 3 Q 80 5.5 100 2.5"
        stroke="#E85D24"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </svg>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/85 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ boxShadow: scrolled ? '0 1px 0 rgba(31,26,23,0.06)' : 'none' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#me"
          onClick={(e) => handleClick(e, '#me')}
          className="flex flex-col leading-none gap-0.5"
        >
          <span
            className="font-fraunces text-xl text-ink"
            style={{ fontVariationSettings: '"SOFT" 80, "WONK" 1' }}
          >
            saumya
          </span>
          <span className="font-devanagari text-xs text-saffron tracking-widest">
            सौम्य
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              onMouseEnter={() => setHovered(link.href)}
              onMouseLeave={() => setHovered(null)}
              className="font-inter text-sm text-ink relative pb-1.5"
            >
              {link.label}
              <NavUnderline active={hovered === link.href} />
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-5 h-0.5 bg-ink rounded-full"
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-5 h-0.5 bg-ink rounded-full"
            animate={{ opacity: mobileOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-5 h-0.5 bg-ink rounded-full"
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(250,246,240,0.97)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(31,26,23,0.08)' }}
          >
            <div className="px-6 py-5 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="font-fraunces text-xl text-ink"
                  style={{ fontVariationSettings: '"SOFT" 30' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
