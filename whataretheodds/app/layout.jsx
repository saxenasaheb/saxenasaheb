import { Bricolage_Grotesque, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "What Are The Odds?",
  description:
    "Describe the wild thing that just happened to you. The engine calculates the odds and tells you exactly how impressed to be.",
  openGraph: {
    title: "What Are The Odds?",
    description:
      "Something wild just happened to you. Find out exactly how impressed to be.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${splineMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
