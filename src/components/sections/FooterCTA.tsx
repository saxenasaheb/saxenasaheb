"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurvedDivider } from "@/components/site/CurvedDivider";

export function FooterCTA() {
  return (
    <>
      <CurvedDivider variant="taupe-to-clay" />
      <section className="bg-clay py-20 text-center" aria-label="Call to action">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="eyebrow mb-4">Get started</p>
            <h2 className="heading-display text-[clamp(2rem,3vw+1rem,3rem)] mb-4">
              Ready to get started?
            </h2>
            <p className="text-warm-grey leading-relaxed mb-8">
              Expert MSK care, privately accessible in London. Book a comprehensive assessment and take the first step towards diagnostic clarity.
            </p>
            <Button asChild variant="terracotta" size="lg">
              <Link href="/book">
                Book an Appointment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      <CurvedDivider variant="clay-to-cream" />
    </>
  );
}
