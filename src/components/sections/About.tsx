"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArchedImage } from "@/components/site/ArchedImage";
import { EyebrowHeading } from "@/components/site/EyebrowHeading";
import { CurvedDivider } from "@/components/site/CurvedDivider";
import { bio } from "@/lib/site-config";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function About() {
  return (
    <>
      <CurvedDivider variant="cream-to-taupe" />
      <section className="bg-taupe py-8 pb-16 md:pb-24" aria-label="About Sue-Ellen">
        <CurvedDivider variant="taupe-to-cream" flip />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-center">
            {/* Left — arched portrait */}
            <motion.div
              className="w-full max-w-xs mx-auto md:mx-0 md:w-72 lg:w-80"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <ArchedImage
                src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&q=80"
                alt="Sue-Ellen Pereira — warm and approachable portrait"
                width={480}
                height={600}
              />
            </motion.div>

            {/* Right — text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <EyebrowHeading
                eyebrow="About Sue-Ellen"
                title={bio.shortIntro}
                className="mb-6"
              />
              <div className="space-y-4 max-w-[65ch]">
                {bio.paragraphs.slice(0, 2).map((para, i) => (
                  <p key={i} className="text-warm-grey leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild variant="outline">
                  <Link href="/about">
                    Read full story
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
