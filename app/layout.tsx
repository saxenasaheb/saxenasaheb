import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Anuj's 30-Day Builder Bootcamp",
  description: 'A personal 30-day coding bootcamp for Anuj Saxena — 4 projects, shipped live.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
