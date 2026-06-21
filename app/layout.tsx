import type { Metadata } from 'next'
import { Fraunces, Inter, Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--src-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--src-inter',
  display: 'swap',
})

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--src-devanagari',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Saumya Saxena',
  description: "Most startup stories are told after they work out. These aren't those.",
  openGraph: {
    title: 'Saumya Saxena',
    description: 'Founder, builder, community champion. Bangalore.',
    type: 'website',
    url: 'https://saumya.xyz',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${notoSansDevanagari.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
