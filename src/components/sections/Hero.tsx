"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArchedImage } from "@/components/site/ArchedImage";
import { practitioner, credentials } from "@/lib/site-config";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

export function Hero() {
  return (
    <section
      className="relative min-h-screen bg-cream flex items-center pt-20"
      aria-label="Introduction"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
          {/* Left — text */}
          <div className="max-w-xl">
            {/* Script greeting — use 1 of max 2 script instances */}
            <motion.p
              className="script-accent text-3xl text-terracotta mb-2"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              Hello,
            </motion.p>

            <motion.p
              className="eyebrow mb-4"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              London · Private Practice
            </motion.p>

            <motion.h1
              className="heading-display text-[clamp(2.75rem,5vw+1rem,5.5rem)] leading-[1.05] mb-6"
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              Expert
              <br />
              musculo-
              <br />
              skeletal
              <br />
              physio-
              <br />
              therapy.
            </motion.h1>

            <motion.p
              className="text-warm-grey text-lg leading-relaxed mb-8"
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              NHS-trained. London-based. Bringing consultant-level MSK expertise to private practice.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <Button asChild variant="terracotta" size="lg">
                <Link href="/book">
                  Book an Appointment
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">About Sue-Ellen</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right — arched portrait */}
          <motion.div
            className="w-full max-w-xs mx-auto md:mx-0 md:w-80 lg:w-96"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <ArchedImage
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80"
              alt="Sue-Ellen Pereira — Advanced Musculoskeletal Physiotherapist"
              width={480}
              height={600}
              priority
            />
            {/* Credential pill below image */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {credentials.slice(0, 3).map((c) => (
                <span
                  key={c.abbr}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-taupe text-charcoal text-xs font-medium"
                >
                  {c.abbr}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
