import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import { EyebrowHeading } from "@/components/site/EyebrowHeading";
import { CurvedDivider } from "@/components/site/CurvedDivider";
import { AcuityEmbed } from "./AcuityEmbed";
import { cancellationPolicy } from "@/lib/site-config";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Book an Appointment",
  description:
    "Book your MSK physiotherapy appointment with Sue-Ellen Pereira in London. Online booking available for all services. HCPC registered.",
  path: "/book",
});

export default function BookPage() {
  const acuityOwnerId = process.env.NEXT_PUBLIC_ACUITY_OWNER_ID ?? "";

  return (
    <>
      <section className="bg-cream pt-28 pb-8 md:pt-36">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <EyebrowHeading
            eyebrow="Book"
            title="Book an appointment"
            body="Select a service and your preferred time below. All appointments are confirmed by email."
            align="center"
          />

          {/* Cancellation policy notice */}
          <div className="mt-8 bg-taupe rounded-2xl p-6 border border-border flex items-start gap-4">
            <AlertCircle className="h-5 w-5 text-terracotta shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-charcoal mb-1">Cancellation Policy</p>
              <p className="text-sm text-warm-grey leading-relaxed">
                {cancellationPolicy.detail}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-3 text-sm">
                <span className="text-warm-grey">
                  <strong className="text-charcoal">Late cancellation:</strong>{" "}
                  {cancellationPolicy.lateCancellationFee}
                </span>
                <span className="text-warm-grey">
                  <strong className="text-charcoal">Non-attendance:</strong>{" "}
                  {cancellationPolicy.nonAttendanceFee}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CurvedDivider variant="cream-to-taupe" />

      {/* Acuity embed */}
      <section className="bg-taupe py-12 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {acuityOwnerId ? (
            <AcuityEmbed ownerId={acuityOwnerId} />
          ) : (
            <div className="bg-cream rounded-2xl p-12 text-center border border-border">
              <p className="eyebrow mb-3">Setup required</p>
              <p className="font-display text-2xl text-charcoal mb-3">
                Booking system coming soon
              </p>
              <p className="text-warm-grey text-sm max-w-md mx-auto">
                Set <code className="bg-taupe px-1.5 py-0.5 rounded text-xs">NEXT_PUBLIC_ACUITY_OWNER_ID</code> in{" "}
                <code className="bg-taupe px-1.5 py-0.5 rounded text-xs">.env.local</code> to enable online booking.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
