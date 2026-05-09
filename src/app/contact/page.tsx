import type { Metadata } from "next";
import { EyebrowHeading } from "@/components/site/EyebrowHeading";
import { CurvedDivider } from "@/components/site/CurvedDivider";
import { ContactForm } from "./ContactForm";
import { practitioner } from "@/lib/site-config";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact",
  description:
    "Get in touch with Sue-Ellen Pereira, Advanced MSK Physiotherapist in London. Contact by email, phone, or use the contact form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-cream pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <EyebrowHeading
            eyebrow="Contact"
            title="Get in touch"
            body="Use the form below or contact directly. All enquiries are responded to within one working day."
          />
        </div>
      </section>

      <CurvedDivider variant="cream-to-taupe" />

      <section className="bg-taupe py-12 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
            {/* Contact form */}
            <div className="bg-cream rounded-2xl p-8 lg:p-10 border border-border">
              <h2 className="font-display text-2xl text-charcoal mb-6">Send a message</h2>
              <ContactForm />
            </div>

            {/* Info sidebar */}
            <div className="space-y-4">
              {/* Contact details */}
              <div className="bg-cream rounded-2xl p-7 border border-border space-y-5">
                <h2 className="font-display text-xl text-charcoal">Contact details</h2>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-terracotta mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-charcoal">{practitioner.location.addressLine1}</p>
                    <p className="text-sm text-warm-grey">{practitioner.location.addressLine2}</p>
                    <p className="text-sm text-warm-grey">{practitioner.location.city}, {practitioner.location.postcode}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-terracotta shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${practitioner.phone}`}
                    className="text-sm text-charcoal hover:text-terracotta transition-colors"
                  >
                    {practitioner.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-terracotta shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${practitioner.email}`}
                    className="text-sm text-charcoal hover:text-terracotta transition-colors"
                  >
                    {practitioner.email}
                  </a>
                </div>
              </div>

              {/* Opening hours */}
              <div className="bg-cream rounded-2xl p-7 border border-border">
                <div className="flex items-center gap-2 mb-5">
                  <Clock className="h-4 w-4 text-terracotta" aria-hidden="true" />
                  <h2 className="font-display text-xl text-charcoal">Opening hours</h2>
                </div>
                <dl className="space-y-2">
                  {practitioner.openingHours.map((h) => (
                    <div key={h.day} className="flex justify-between text-sm">
                      <dt className="text-warm-grey">{h.day}</dt>
                      <dd className={`font-medium ${h.hours === "Closed" ? "text-warm-grey" : "text-charcoal"}`}>
                        {h.hours}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Map placeholder */}
              <div className="bg-cream rounded-2xl overflow-hidden border border-border h-48">
                {practitioner.location.googleMapsEmbedUrl.includes("pb=") ? (
                  <iframe
                    src={practitioner.location.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Clinic location map"
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-taupe">
                    <p className="text-xs text-warm-grey text-center px-4">
                      Map placeholder — add Google Maps embed URL to site-config.ts
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
