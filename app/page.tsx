'use client'

import { useState, useEffect } from 'react'

type Project = {
  id: string
  emoji: string
  title: string
  desc: string
}

type WeekData = {
  num: string
  theme: string
  subtitle: string
  stack: string
  projects: Project[]
}

const weeks: WeekData[] = [
  {
    num: '01',
    theme: 'Get something live on the internet',
    subtitle: 'Pure frontend, no backend.',
    stack: 'HTML · CSS · JavaScript · Vercel',
    projects: [
      { id: 'w1p1', emoji: '🌅', title: 'Personal Dashboard', desc: 'time, weather, daily quote, countdown to college, goals on one screen' },
      { id: 'w1p2', emoji: '🎧', title: 'Music Shrine', desc: 'love letter to favorite artist, embedded YouTube, lyrics, playlist' },
      { id: 'w1p3', emoji: '🏏', title: 'Cricket / Football Stats', desc: 'pick a team, pull recent matches from a free sports API' },
      { id: 'w1p4', emoji: '🔥', title: 'Roast My Day', desc: 'input what you did, page roasts you, pure JS logic' },
      { id: 'w1p5', emoji: '🏠', title: 'Hostel Finder Mockup', desc: 'fake student housing listings with filters, cards, hover effects' },
    ],
  },
  {
    num: '02',
    theme: 'Make it remember things',
    subtitle: 'Add localStorage, state, event handlers.',
    stack: 'React · useState · localStorage',
    projects: [
      { id: 'w2p1', emoji: '📚', title: 'Study Planner + Habit Tracker', desc: 'subjects, daily progress, streaks' },
      { id: 'w2p2', emoji: '💸', title: 'Expense Tracker', desc: 'log spends, categorize, weekly totals' },
      { id: 'w2p3', emoji: '🍅', title: 'Pomodoro + Task List', desc: '25-min timer, task queue, completed log' },
      { id: 'w2p4', emoji: '🎴', title: 'Flashcard App', desc: "decks, flip cards, knew it / didn't" },
      { id: 'w2p5', emoji: '📓', title: 'Mini Journal', desc: 'daily entries with mood emojis, timeline view' },
    ],
  },
  {
    num: '03',
    theme: 'Backend, database, real users',
    subtitle: 'Add Supabase, auth, APIs, async.',
    stack: 'Next.js · Supabase · TypeScript',
    projects: [
      { id: 'w3p1', emoji: '🔐', title: 'Journal With Login', desc: "week 2's journal but in a real database, accessible across devices" },
      { id: 'w3p2', emoji: '📝', title: 'Class Notes Sharing', desc: 'students post notes by subject, others browse and upvote' },
      { id: 'w3p3', emoji: '🎭', title: 'Anonymous Confessions Board', desc: 'login required to post, anonymous to viewers' },
      { id: 'w3p4', emoji: '📖', title: 'Book / Movie Tracker', desc: 'log, rate, see history, personal Goodreads' },
      { id: 'w3p5', emoji: '🧾', title: 'Group Expense Splitter', desc: 'Splitwise-lite, who owes whom' },
    ],
  },
  {
    num: '04',
    theme: 'Ship something someone else uses',
    subtitle: 'Everything so far, real feedback, iteration.',
    stack: 'Full stack · Real users · Feedback loops',
    projects: [
      { id: 'w4p1', emoji: '💝', title: 'Build For Mom', desc: 'grocery list with recurring items, recipe saver, reminders' },
      { id: 'w4p2', emoji: '🏪', title: 'Local Business Site', desc: 'free site for a neighborhood shop in exchange for testimonial' },
      { id: 'w4p3', emoji: '🤖', title: 'Telegram Bot For Classmates', desc: 'timetable, mess menu, assignment deadlines' },
      { id: 'w4p4', emoji: '🌶️', title: 'Build For Saumya', desc: 'something tiny for Inner Circle or Base' },
      { id: 'w4p5', emoji: '✨', title: 'AI-Powered Tool', desc: 'idea generator or study-question maker, hook into Claude API' },
    ],
  },
]

const loopItems = [
  { num: '01', title: 'Build', desc: 'Pick a project from the week. Start making it. Break things intentionally.' },
  { num: '02', title: 'Break', desc: "Add a feature that shouldn't work. See what happens. Read the error message carefully." },
  { num: '03', title: 'Understand', desc: 'Look up exactly what broke. Read docs. Not a tutorial — the actual documentation.' },
  { num: '04', title: 'Teach Back', desc: 'Explain what you just learned in one paragraph. Out loud, in your journal, anywhere.' },
]

const marqueeItems = [
  'SHIP DAILY',
  'READ THE CODE',
  'BUGS ARE TEACHERS',
  'DONE > PERFECT',
  'RETRO EVERY FRIDAY',
  'BUILD IN PUBLIC',
]

const schedule = [
  { label: 'Mornings', desc: '1h: Build. Commit. Push.' },
  { label: 'Afternoons', desc: 'Read docs. Watch short clip. Copy code.' },
  { label: 'Evenings', desc: 'Review what broke, fix one thing.' },
  { label: 'Fridays', desc: 'Record a 5-min Loom. Post it somewhere.' },
]

const skipItems = [
  'LeetCode grinding',
  '30-hour YouTube courses',
  '"Learn HTML then CSS then JS"',
  'CS theory rabbit holes',
  'Tutorials about tutorials',
  'Anything that delays shipping',
]

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [completed, setCompleted] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setMounted(true)
    try {
      const s = localStorage.getItem('anuj-selected')
      const c = localStorage.getItem('anuj-completed')
      if (s) setSelected(JSON.parse(s))
      if (c) setCompleted(JSON.parse(c))
    } catch {}
  }, [])

  const handleSelect = (weekNum: string, projectId: string) => {
    const next = { ...selected }
    if (next[weekNum] === projectId) {
      delete next[weekNum]
    } else {
      next[weekNum] = projectId
    }
    setSelected(next)
    localStorage.setItem('anuj-selected', JSON.stringify(next))
  }

  const handleComplete = (weekNum: string) => {
    const next = { ...completed, [weekNum]: !completed[weekNum] }
    setCompleted(next)
    localStorage.setItem('anuj-completed', JSON.stringify(next))
  }

  const completedCount = mounted ? Object.values(completed).filter(Boolean).length : 0

  const encouragement =
    completedCount === 0 ? "Pick your first project. Let's go." :
    completedCount === 1 ? 'One shipped. The rest gets easier.' :
    completedCount === 2 ? "Halfway. You're building momentum." :
    completedCount === 3 ? 'Three down. One more to go.' :
    "All 4 shipped. You're a builder."

  return (
    <main className="min-h-screen overflow-x-hidden font-body">

      {/* Top tag bar */}
      <div className="flex justify-between items-center px-5 py-3 border-b border-ink/15">
        <span className="font-mono text-xs tracking-widest text-ink/50">ANUJ.BUILDS / V.1</span>
        <span className="font-mono text-xs tracking-widest text-saffron">A GIFT FROM BHAIYA SAUMYA →</span>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-14 pt-16 pb-14 max-w-5xl mx-auto">
        <div
          className="inline-flex border border-saffron px-3 py-1 mb-7"
          style={{ transform: 'rotate(-0.6deg)' }}
        >
          <span className="font-mono text-xs text-saffron tracking-widest">→ HELLO ANUJ</span>
        </div>
        <h1 className="font-display text-5xl md:text-[4.5rem] leading-[1.08] mb-7 text-ink">
          30 days. 4 projects.<br />
          <em className="text-saffron italic">One builder</em> in the making.
        </h1>
        <p className="text-lg md:text-xl text-ink/65 max-w-xl leading-relaxed">
          No degree. No perfect syntax. No permission.<br />
          Just a laptop, some caffeine, and the fact that{' '}
          <span className="wavy">you can build.</span>
        </p>
      </section>

      {/* Marquee strip */}
      <div className="bg-ink py-4 overflow-hidden my-2">
        <div className="marquee-track animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 pr-6">
              <span className="font-mono text-sm text-cream tracking-widest whitespace-nowrap">{item}</span>
              <span className="text-saffron text-base">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* The Loop */}
      <section className="px-6 md:px-14 py-16 max-w-5xl mx-auto">
        <div className="mb-10">
          <span className="font-mono text-xs text-ink/45 tracking-widest uppercase">The System</span>
          <h2 className="font-display text-4xl text-ink mt-2">The Loop</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loopItems.map((item, i) => (
            <div
              key={i}
              className="border border-ink/20 p-6 hover:border-saffron transition-colors duration-200"
              style={{ transform: i % 2 === 1 ? 'rotate(0.35deg)' : 'rotate(-0.35deg)' }}
            >
              <div className="font-mono text-xs text-saffron mb-4">{item.num}</div>
              <h3 className="font-display text-2xl text-ink mb-2">{item.title}</h3>
              <p className="text-sm text-ink/55 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Progress bar */}
      <section className="bg-ink px-6 md:px-14 py-14 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-saffron/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-baseline justify-between mb-5 gap-4 flex-wrap">
            <span className="font-display text-3xl md:text-4xl text-cream">
              {completedCount} of 4 shipped
            </span>
            <span className="font-mono text-xs text-cream/45 tracking-wide">
              {mounted ? encouragement : ''}
            </span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className={`h-3 flex-1 transition-all duration-700 ${
                  completedCount >= n ? 'bg-saffron' : 'bg-cream/15'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {weeks.map((w) => (
              <span key={w.num} className="font-mono text-[10px] text-cream/30 tracking-widest">
                WK {w.num}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Week sections */}
      {weeks.map((week) => (
        <section
          key={week.num}
          className="px-6 md:px-14 py-16 max-w-5xl mx-auto border-b border-ink/10"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
            <span
              className="font-display text-[7rem] md:text-[9rem] text-saffron leading-none select-none flex-shrink-0"
              style={{ opacity: 0.88 }}
            >
              {week.num}
            </span>
            <div className="flex-1 pt-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                <span className="font-mono text-xs text-ink/45 tracking-widest uppercase">
                  Week {week.num}
                </span>
                <span className="text-ink/25 font-mono text-xs">·</span>
                <span className="font-mono text-xs text-ink/40">{week.stack}</span>
              </div>
              <h2 className="font-display text-3xl md:text-[2.4rem] text-ink leading-tight mb-2">
                {week.theme}
              </h2>
              <p className="text-ink/55 mb-6">{week.subtitle}</p>
              <button
                onClick={() => handleComplete(week.num)}
                className={`font-mono text-xs tracking-widest px-5 py-2.5 transition-all duration-200 border ${
                  mounted && completed[week.num]
                    ? 'bg-saffron text-cream border-saffron'
                    : 'bg-transparent text-ink border-ink/30 hover:border-saffron hover:text-saffron'
                }`}
              >
                {mounted && completed[week.num] ? '✓ SHIPPED' : 'MARK SHIPPED'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {week.projects.map((project, pi) => {
              const isSelected = mounted && selected[week.num] === project.id
              const baseRotation = ['-0.2deg', '0.3deg', '-0.15deg', '0.25deg', '-0.3deg'][pi % 5]
              const selectedRotation = pi % 2 === 0 ? '0.9deg' : '-0.9deg'

              return (
                <div
                  key={project.id}
                  onClick={() => handleSelect(week.num, project.id)}
                  className={`relative cursor-pointer p-5 border transition-all duration-200 select-none ${
                    isSelected
                      ? 'bg-ink text-cream border-ink'
                      : 'bg-cream/60 text-ink border-ink/20 hover:border-saffron'
                  }`}
                  style={{
                    transform: `rotate(${isSelected ? selectedRotation : baseRotation})`,
                    boxShadow: isSelected
                      ? '4px 4px 0 #e8722c'
                      : undefined,
                  }}
                >
                  {isSelected && (
                    <div
                      className="absolute -top-2.5 -right-2.5 bg-saffron font-mono text-[9px] text-cream px-2 py-0.5 z-10"
                      style={{ transform: 'rotate(3deg)' }}
                    >
                      PICKED
                    </div>
                  )}
                  <span className="text-2xl mb-3 block">{project.emoji}</span>
                  <h3
                    className={`font-display text-lg leading-snug mb-1.5 ${
                      isSelected ? 'text-cream' : 'text-ink'
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isSelected ? 'text-cream/65' : 'text-ink/50'
                    }`}
                  >
                    {project.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </section>
      ))}

      {/* Daily Rhythm */}
      <section className="px-6 md:px-14 py-16 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <span className="font-mono text-xs text-ink/45 tracking-widest uppercase block mb-3">
              Structure
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight">
              Daily<br />Rhythm
            </h2>
            <p className="text-ink/55 mt-5 leading-relaxed max-w-xs">
              Consistency beats intensity. 90 minutes a day for 30 days beats one 45-hour sprint.
            </p>
          </div>
          <div className="space-y-5">
            {schedule.map((item, i) => (
              <div
                key={i}
                className="flex gap-5 items-start border-b border-ink/10 pb-5"
              >
                <span className="font-mono text-xs text-saffron tracking-widest w-24 flex-shrink-0 mt-0.5 uppercase">
                  {item.label}
                </span>
                <p className="text-ink/65 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skip list */}
      <section className="px-6 md:px-14 py-8 max-w-5xl mx-auto">
        <div
          className="bg-marigold/8 border border-marigold/35 p-8 md:p-10"
          style={{ transform: 'rotate(-0.3deg)' }}
        >
          <span className="font-mono text-xs text-marigold tracking-widest uppercase block mb-6">
            Things to ignore
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skipItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-marigold font-mono text-sm flex-shrink-0">✗</span>
                <span className="text-ink/55 line-through decoration-marigold/60">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The One Non-Negotiable */}
      <section className="px-6 md:px-14 py-16 max-w-3xl mx-auto text-center">
        <span className="font-mono text-xs text-saffron tracking-widest uppercase block mb-5">
          The One Rule
        </span>
        <h2 className="font-display text-3xl md:text-[2.6rem] text-ink leading-snug">
          Every Friday, you record a 5-min Loom explaining the code.
        </h2>
      </section>

      {/* Note from Saumya */}
      <section className="px-6 md:px-14 py-8 pb-16 max-w-3xl mx-auto">
        <div
          className="bg-ink p-8 md:p-12"
          style={{ transform: 'rotate(-0.25deg)' }}
        >
          <span className="font-mono text-xs text-saffron tracking-widest uppercase block mb-7">
            A Note
          </span>
          <blockquote className="font-display text-xl md:text-2xl text-cream leading-relaxed italic space-y-5">
            <p>
              "Anuj — I shut down my first company because I couldn't build fast enough to find
              product-market fit before the money ran out.
            </p>
            <p>
              You're starting at a moment where that's no longer the constraint. You can build
              almost anything, almost overnight, if you're willing to learn out loud.
            </p>
            <p>
              The kids who win the next decade aren't the ones who memorized syntax. They're the
              ones who shipped 50 ugly things while everyone else was still watching tutorials.
            </p>
            <p>Be one of those kids."</p>
          </blockquote>
          <div className="font-mono text-xs text-cream/40 tracking-widest mt-8">
            — BHAIYA, INDIRANAGAR, BANGALORE
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 px-6 md:px-14 py-8 flex flex-wrap justify-between items-center gap-3">
        <span className="font-mono text-xs text-ink/35 tracking-widest">ANUJ.BUILDS / V.1</span>
        <span className="font-mono text-xs text-ink/35 tracking-widest">MADE WITH LOVE BY SAUMYA</span>
      </footer>
    </main>
  )
}
