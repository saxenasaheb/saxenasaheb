"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EyebrowHeading } from "@/components/site/EyebrowHeading";
import { CurvedDivider } from "@/components/site/CurvedDivider";
import { services } from "@/lib/site-config";

// Show 4 services in the homepage grid (exclude follow-up from hero)
const heroServices = [
  "initial-assessment",
  "sports-injury",
  "injection-therapy",
  "gait-analysis",
];

export function Services() {
  const displayed = services.filter((s) => heroServices.includes(s.id));

  return (
    <>
      <CurvedDivider variant="cream-to-clay" />
      <section className="bg-clay py-12 pb-24" aria-label="Services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <EyebrowHeading
              eyebrow="Services"
              title="Find the option that's right for you"
              className="max-w-lg"
            />
            <Button asChild variant="outline">
              <Link href="/services">
                View all services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* 4-up portrait card grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {displayed.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              >
                <Link
                  href={`/services#${service.id}`}
                  className="block group relative overflow-hidden rounded-2xl aspect-[3/4] bg-taupe"
                  aria-label={service.title}
                >
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
                  {/* Card label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="eyebrow text-cream mb-1">{service.label}</p>
                    <p className="text-cream font-display text-lg leading-tight">
                      {service.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
