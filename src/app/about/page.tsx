import type { Metadata } from "next";
import { ArchedImage } from "@/components/site/ArchedImage";
import { EyebrowHeading } from "@/components/site/EyebrowHeading";
import { CurvedDivider } from "@/components/site/CurvedDivider";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { bio, credentials, memberships } from "@/lib/site-config";
import { Trophy, Users, ShieldCheck } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "About Sue-Ellen",
  description:
    "Learn about Sue-Ellen Pereira — Advanced MSK Physiotherapist, Clinical Lead, and FCP Supervisor with NHS and Health Education England. MSc qualified, HCPC registered, London-based.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* Hero section */}
      <section className="bg-cream pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-start">
            {/* Portrait */}
            <div className="w-full max-w-xs mx-auto md:mx-0 md:w-72 lg:w-80 shrink-0">
              <ArchedImage
                src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&q=80"
                alt="Sue-Ellen Pereira — Advanced MSK Physiotherapist"
                width={480}
                height={600}
                priority
              />
            </div>

            {/* Bio */}
            <div>
              <p className="eyebrow mb-3">About</p>
              {/* Script accent — NOT used here (already used twice on homepage) */}
              <h1 className="heading-display text-[clamp(2.5rem,4vw+1rem,4rem)] mb-6 leading-tight">
                Sue-Ellen Pereira
              </h1>
              <p className="text-warm-grey text-lg mb-2 font-medium">
                Advanced Musculoskeletal Physiotherapist · Clinical Lead · FCP Supervisor
              </p>
              <div className="space-y-4 max-w-[65ch] mt-6">
                {bio.paragraphs.map((para, i) => (
                  <p key={i} className="text-warm-grey leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CurvedDivider variant="cream-to-taupe" />

      {/* Qualifications grid */}
      <section className="bg-taupe py-16 md:py-20" aria-label="Qualifications and credentials">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <EyebrowHeading
            eyebrow="Qualifications"
            title="Credentials & Registrations"
            align="center"
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {credentials.map((cred) => (
              <div
                key={cred.abbr}
                className="bg-cream rounded-2xl p-6 flex items-start gap-4 border border-border"
              >
                <ShieldCheck className="h-5 w-5 text-terracotta mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-charcoal text-sm">{cred.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider variant="taupe-to-cream" />

      {/* Sporting events */}
      <section className="bg-cream py-16 md:py-20" aria-label="Sporting event experience">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <EyebrowHeading
            eyebrow="Sporting Experience"
            title="On the world stage"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bio.sportingEvents.map((event) => (
              <div
                key={event.event}
                className="bg-taupe rounded-2xl p-8 flex items-start gap-5"
              >
                <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                  <Trophy className="h-5 w-5 text-terracotta" aria-hidden="true" />
                </div>
                <div>
                  <p className="eyebrow mb-1">{event.role}</p>
                  <h3 className="font-display text-xl text-charcoal mb-2">{event.event}</h3>
                  <p className="text-sm text-warm-grey leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider variant="cream-to-taupe" />

      {/* Memberships */}
      <section className="bg-taupe py-16 md:py-20" aria-label="Professional memberships">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <EyebrowHeading
            eyebrow="Memberships"
            title="Professional bodies"
            align="center"
            titleSize="lg"
            className="mb-10"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {memberships.map((m) => (
              <div
                key={m.name}
                className="bg-cream rounded-2xl p-6 flex flex-col items-center gap-3 border border-border"
              >
                <div className="w-16 h-10 rounded-lg bg-taupe flex items-center justify-center">
                  <span className="eyebrow text-charcoal">{m.logoPlaceholder}</span>
                </div>
                <p className="text-sm font-medium text-charcoal text-center">{m.fullName}</p>
                <p className="text-xs text-warm-grey text-center leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
    </>
  );
}
