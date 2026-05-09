import type { Metadata } from "next";
import { EyebrowHeading } from "@/components/site/EyebrowHeading";
import { practitioner, cancellationPolicy } from "@/lib/site-config";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions for appointments and services with Sue-Ellen Pereira Physiotherapy.",
  path: "/terms",
});

const LAST_REVIEWED = "May 2026";

export default function TermsPage() {
  return (
    <section className="bg-cream pt-28 pb-20 md:pt-36">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <EyebrowHeading
          eyebrow="Legal"
          title="Terms & Conditions"
          className="mb-4"
        />
        <p className="text-sm text-warm-grey mb-10">Last reviewed: {LAST_REVIEWED}</p>

        <div className="prose-constraint space-y-10 text-charcoal">
          {/* 1 */}
          <section aria-labelledby="t-intro">
            <h2 id="t-intro" className="font-display text-2xl mb-4">1. About these terms</h2>
            <p className="text-warm-grey text-sm leading-relaxed">
              These terms govern your use of services provided by {practitioner.name} (&ldquo;the practitioner&rdquo;). By booking an appointment, you agree to these terms. Please read them carefully.
            </p>
          </section>

          {/* 2 */}
          <section aria-labelledby="t-services">
            <h2 id="t-services" className="font-display text-2xl mb-4">2. Services</h2>
            <div className="text-warm-grey text-sm leading-relaxed space-y-2">
              <p>All services are provided subject to clinical assessment. The practitioner reserves the right to decline or discontinue treatment where it is not clinically appropriate or where the clinical relationship cannot be maintained.</p>
              <p>Services are provided as private physiotherapy and are not a substitute for emergency medical care. If you believe you have a medical emergency, contact 999 or your local A&E.</p>
              {/* TODO: Add specific exclusions / contraindications language reviewed by professional indemnity insurer */}
            </div>
          </section>

          {/* 3 */}
          <section aria-labelledby="t-booking">
            <h2 id="t-booking" className="font-display text-2xl mb-4">3. Booking and confirmation</h2>
            <div className="text-warm-grey text-sm leading-relaxed space-y-2">
              <p>Appointments are booked through the online booking system (Acuity Scheduling) or by direct contact. A booking is confirmed when you receive a confirmation email.</p>
              <p>Please ensure your contact details are accurate to receive appointment reminders and correspondence.</p>
            </div>
          </section>

          {/* 4 */}
          <section aria-labelledby="t-cancellation">
            <h2 id="t-cancellation" className="font-display text-2xl mb-4">4. Cancellation & attendance policy</h2>
            <div className="text-warm-grey text-sm leading-relaxed space-y-2">
              <p>{cancellationPolicy.detail}</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Cancellation with less than {cancellationPolicy.noticePeriod} notice: {cancellationPolicy.lateCancellationFee}</li>
                <li>Non-attendance without notice: {cancellationPolicy.nonAttendanceFee}</li>
              </ul>
              <p>Cancellation fees are invoiced and payable within 14 days. Persistent non-attendance may result in the inability to book future appointments.</p>
            </div>
          </section>

          {/* 5 */}
          <section aria-labelledby="t-fees">
            <h2 id="t-fees" className="font-display text-2xl mb-4">5. Fees and payment</h2>
            <div className="text-warm-grey text-sm leading-relaxed space-y-2">
              <p>Fees are as stated on the website and are subject to change. The fee applicable is that confirmed at the time of booking.</p>
              <p>Payment is due at the time of or immediately following the appointment unless otherwise agreed.</p>
              {/* TODO: Specify accepted payment methods */}
              <p>Receipts are provided on request. The practitioner is not a VAT-registered business (physiotherapy services are VAT-exempt); no VAT is charged.</p>
            </div>
          </section>

          {/* 6 */}
          <section aria-labelledby="t-records">
            <h2 id="t-records" className="font-display text-2xl mb-4">6. Clinical records</h2>
            <p className="text-warm-grey text-sm leading-relaxed">
              Clinical records are maintained in accordance with HCPC standards and applicable healthcare legislation. You have the right to request access to your records. See the Privacy Policy for full details.
            </p>
          </section>

          {/* 7 */}
          <section aria-labelledby="t-liability">
            <h2 id="t-liability" className="font-display text-2xl mb-4">7. Limitation of liability</h2>
            <div className="text-warm-grey text-sm leading-relaxed space-y-2">
              <p>The practitioner carries appropriate professional indemnity insurance in accordance with HCPC and CSP requirements.</p>
              <p>Nothing in these terms limits liability for death or personal injury caused by negligence, fraud, or any liability that cannot legally be excluded.</p>
              {/* TODO: Review liability cap language with professional indemnity insurer */}
            </div>
          </section>

          {/* 8 */}
          <section aria-labelledby="t-governing-law">
            <h2 id="t-governing-law" className="font-display text-2xl mb-4">8. Governing law</h2>
            <p className="text-warm-grey text-sm leading-relaxed">
              These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          {/* 9 */}
          <section aria-labelledby="t-contact">
            <h2 id="t-contact" className="font-display text-2xl mb-4">9. Contact</h2>
            <p className="text-warm-grey text-sm leading-relaxed">
              Queries regarding these terms should be directed to{" "}
              <a href={`mailto:${practitioner.email}`} className="text-terracotta hover:underline">
                {practitioner.email}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
