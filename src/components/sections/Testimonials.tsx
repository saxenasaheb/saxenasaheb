"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { EyebrowHeading } from "@/components/site/EyebrowHeading";
import { CurvedDivider } from "@/components/site/CurvedDivider";
import { testimonials } from "@/lib/site-config";

export function Testimonials() {
  return (
    <>
      <CurvedDivider variant="taupe-to-cream" />
      <section className="bg-cream py-12 pb-20" aria-label="Client testimonials">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Script "Kind words" — use 2 of max 2 script instances */}
          <div className="text-center mb-2">
            <span className="script-accent text-4xl text-terracotta">Kind words</span>
          </div>
          <EyebrowHeading
            eyebrow="Client Testimonials"
            title="What patients say"
            align="center"
            titleSize="lg"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
                className="bg-taupe rounded-2xl p-7 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-terracotta text-terracotta"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="font-display text-xl text-charcoal leading-snug mb-5 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <footer>
                  <p className="text-sm font-medium text-charcoal">{t.author}</p>
                  <p className="text-xs text-warm-grey mt-0.5">{t.context}</p>
                </footer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
