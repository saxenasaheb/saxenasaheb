import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import TruthsAndLie from '@/components/TruthsAndLie'
import Work from '@/components/Work'
import Beliefs from '@/components/Beliefs'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Nav />
      <section id="me">
        <Hero />
      </section>
      <section id="truths">
        <TruthsAndLie />
      </section>
      <section id="work">
        <Work />
      </section>
      <section id="beliefs">
        <Beliefs />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  )
}
