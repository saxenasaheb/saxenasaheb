import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EyebrowHeading } from "@/components/site/EyebrowHeading";
import { CurvedDivider } from "@/components/site/CurvedDivider";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { services, cancellationPolicy } from "@/lib/site-config";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Services & Fees",
  description:
    "Specialist MSK physiotherapy services in London. Initial assessments, sports injury consultations, injection therapy and running gait analysis. HCPC registered.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-cream pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <EyebrowHeading
            eyebrow="Services & Fees"
            title="Specialist care for complex MSK conditions"
            body="Evidence-based assessment and treatment across the full spectrum of musculoskeletal conditions. All fees are confirmed at booking."
            align="center"
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>

      <CurvedDivider variant="cream-to-taupe" />

      {/* Services list */}
      <section className="bg-taupe py-12 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
          {services.map((service, i) => (
            <div
              key={service.id}
              id={service.id}
              className="bg-cream rounded-2xl overflow-hidden border border-border scroll-mt-24"
            >
              <div className={`grid grid-cols-1 md:grid-cols-[1fr_auto] gap-0`}>
                {/* Content */}
                <div className="p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <p className="eyebrow">{service.label}</p>
                    {service.placeholder && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-taupe text-warm-grey text-[10px] font-medium uppercase tracking-wide">
                        Confirm with client
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-charcoal mb-2">
                    {service.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 mb-5">
                    <div className="flex items-center gap-1.5 text-sm text-warm-grey">
                      <Clock className="h-4 w-4 text-terracotta" aria-hidden="true" />
                      {service.duration}
                    </div>
                    <div className="text-lg font-display text-charcoal">
                      {service.price}
                      {service.priceNote && (
                        <span className="ml-2 text-sm text-warm-grey font-body">
                          — {service.priceNote}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-warm-grey leading-relaxed mb-6 max-w-[65ch]">
                    {service.description}
                  </p>
                  <div>
                    <p className="text-sm font-medium text-charcoal mb-3">What to expect:</p>
                    <ul className="space-y-2">
                      {service.whatToExpect.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-warm-grey">
                          <CheckCircle className="h-4 w-4 text-terracotta mt-0.5 shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <Button asChild variant="terracotta">
                      <Link href="/book">
                        Book this service
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Image */}
                <div className="relative hidden md:block w-64 lg:w-80 shrink-0">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CurvedDivider variant="taupe-to-cream" />

      {/* Cancellation policy */}
      <section className="bg-cream py-16" aria-label="Cancellation policy">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <EyebrowHeading
            eyebrow="Booking Policy"
            title="Cancellation & attendance"
            className="mb-6"
          />
          <div className="bg-taupe rounded-2xl p-8 border border-border space-y-3">
            <p className="text-warm-grey leading-relaxed">{cancellationPolicy.detail}</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex-1 bg-cream rounded-xl p-4 border border-border">
                <p className="text-xs eyebrow mb-1">Late cancellation</p>
                <p className="font-medium text-charcoal">{cancellationPolicy.lateCancellationFee}</p>
              </div>
              <div className="flex-1 bg-cream rounded-xl p-4 border border-border">
                <p className="text-xs eyebrow mb-1">Non-attendance</p>
                <p className="font-medium text-charcoal">{cancellationPolicy.nonAttendanceFee}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterCTA />
    </>
  );
}
