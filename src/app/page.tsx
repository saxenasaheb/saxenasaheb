import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CredentialsStrip } from "@/components/sections/CredentialsStrip";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Memberships } from "@/components/sections/Memberships";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FooterCTA } from "@/components/sections/FooterCTA";

export const metadata: Metadata = {
  title: "Sue-Ellen Pereira | Advanced MSK Physiotherapist, London",
  description:
    "Expert musculoskeletal physiotherapy in London. NHS-trained, HCPC registered Advanced Physiotherapist. Specialist assessment, sports injuries, injection therapy and gait analysis.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredentialsStrip />
      <About />
      <Services />
      <Memberships />
      <Testimonials />
      <FAQ />
      <FooterCTA />
    </>
  );
}
