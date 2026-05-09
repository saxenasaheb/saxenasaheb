import type { Metadata } from "next";
import { EyebrowHeading } from "@/components/site/EyebrowHeading";
import { practitioner, registrations } from "@/lib/site-config";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Sue-Ellen Pereira Physiotherapy. How we collect, use and protect your personal data.",
  path: "/privacy",
});

// Last reviewed date — update manually when policy changes
const LAST_REVIEWED = "May 2026";

export default function PrivacyPage() {
  return (
    <section className="bg-cream pt-28 pb-20 md:pt-36">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <EyebrowHeading
          eyebrow="Legal"
          title="Privacy Policy"
          className="mb-4"
        />
        <p className="text-sm text-warm-grey mb-10">Last reviewed: {LAST_REVIEWED}</p>

        <div className="prose-constraint space-y-10 text-charcoal">
          {/* 1 */}
          <section aria-labelledby="intro">
            <h2 id="intro" className="font-display text-2xl mb-4">1. Who we are</h2>
            <p className="text-warm-grey leading-relaxed">
              {practitioner.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is the data controller for personal information collected through this website and in the course of providing physiotherapy services. Our registered address is {practitioner.location.addressLine1}, {practitioner.location.city}, {practitioner.location.postcode}.
            </p>
            <p className="text-warm-grey leading-relaxed mt-3">
              ICO Registration Number: <strong>{registrations.ico}</strong>
            </p>
            {/* TODO: Confirm ICO registration number before launch */}
          </section>

          {/* 2 */}
          <section aria-labelledby="data-collected">
            <h2 id="data-collected" className="font-display text-2xl mb-4">2. What data we collect</h2>
            <p className="text-warm-grey leading-relaxed mb-3">We may collect the following categories of personal data:</p>
            <ul className="list-disc list-inside space-y-2 text-warm-grey text-sm leading-relaxed">
              <li>Identity data: name, date of birth</li>
              <li>Contact data: email address, phone number, postal address</li>
              <li>Health data: medical history, symptoms, treatment records (special category data)</li>
              <li>Financial data: payment records (processed via third-party payment provider)</li>
              <li>Technical data: IP address, browser type, pages visited (analytics only, with consent)</li>
              <li>Communications: enquiry messages, appointment correspondence</li>
            </ul>
          </section>

          {/* 3 */}
          <section aria-labelledby="lawful-basis">
            <h2 id="lawful-basis" className="font-display text-2xl mb-4">3. Lawful basis for processing</h2>
            <div className="text-warm-grey text-sm leading-relaxed space-y-3">
              <p><strong className="text-charcoal">Contract:</strong> Processing necessary to provide the physiotherapy services you have requested.</p>
              <p><strong className="text-charcoal">Legitimate interests:</strong> Responding to enquiries, managing appointments, maintaining clinical records.</p>
              <p><strong className="text-charcoal">Legal obligation:</strong> Retaining clinical records as required by professional regulatory bodies (HCPC) and healthcare legislation.</p>
              <p><strong className="text-charcoal">Explicit consent (health data):</strong> Processing health data for treatment purposes, obtained at the point of first consultation.</p>
              <p><strong className="text-charcoal">Consent (analytics):</strong> Website analytics cookies are only activated following your explicit consent via our cookie banner.</p>
            </div>
          </section>

          {/* 4 */}
          <section aria-labelledby="retention">
            <h2 id="retention" className="font-display text-2xl mb-4">4. How long we retain your data</h2>
            <div className="text-warm-grey text-sm leading-relaxed space-y-2">
              <p>Clinical records are retained for a minimum of 8 years from the date of last treatment (or until age 25 for patients who were minors at the time of treatment), in line with HCPC guidance.</p>
              <p>Contact enquiry data is retained for 12 months unless it leads to an active client relationship.</p>
              {/* TODO: Confirm retention periods with professional indemnity insurer */}
            </div>
          </section>

          {/* 5 */}
          <section aria-labelledby="sharing">
            <h2 id="sharing" className="font-display text-2xl mb-4">5. Who we share data with</h2>
            <div className="text-warm-grey text-sm leading-relaxed space-y-2">
              <p>We do not sell or share personal data with third parties for marketing purposes.</p>
              <p>Data may be shared with:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Your GP or referring clinician, where clinically necessary and with your consent</li>
                <li>Diagnostic imaging providers or specialist referees, where clinically indicated</li>
                <li>Acuity Scheduling (appointment booking processor) — see their privacy policy</li>
                <li>Resend (email processing) — for contact form responses</li>
                <li>Vercel (website hosting)</li>
              </ul>
              {/* TODO: Add full list of processors and links to their privacy policies */}
            </div>
          </section>

          {/* 6 */}
          <section aria-labelledby="rights">
            <h2 id="rights" className="font-display text-2xl mb-4">6. Your rights</h2>
            <div className="text-warm-grey text-sm leading-relaxed space-y-2">
              <p>Under UK GDPR, you have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Access your personal data (Subject Access Request)</li>
                <li>Rectify inaccurate data</li>
                <li>Erasure (&ldquo;right to be forgotten&rdquo;) where legally permissible</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time (where consent is the lawful basis)</li>
              </ul>
              <p className="mt-3">To exercise any right, contact us at{" "}
                <a href={`mailto:${practitioner.email}`} className="text-terracotta hover:underline">
                  {practitioner.email}
                </a>. We will respond within 30 days.
              </p>
            </div>
          </section>

          {/* 7 */}
          <section aria-labelledby="cookies">
            <h2 id="cookies" className="font-display text-2xl mb-4">7. Cookies</h2>
            <div className="text-warm-grey text-sm leading-relaxed space-y-2">
              <p>This website uses essential cookies required for functionality (e.g., remembering your cookie consent preference). Analytics cookies (Vercel Analytics, Plausible) are only activated following explicit consent.</p>
              <p>You can withdraw cookie consent at any time by clearing your browser cookies and re-visiting this site.</p>
            </div>
          </section>

          {/* 8 */}
          <section aria-labelledby="complaints">
            <h2 id="complaints" className="font-display text-2xl mb-4">8. How to complain</h2>
            <p className="text-warm-grey text-sm leading-relaxed">
              If you have concerns about how we handle your personal data, you have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) at{" "}
              <a href="https://ico.org.uk" className="text-terracotta hover:underline" target="_blank" rel="noopener noreferrer">
                ico.org.uk
              </a>{" "}
              or by calling 0303 123 1113.
            </p>
          </section>

          {/* 9 */}
          <section aria-labelledby="contact-dpo">
            <h2 id="contact-dpo" className="font-display text-2xl mb-4">9. Contact</h2>
            <p className="text-warm-grey text-sm leading-relaxed">
              For any data protection queries, contact {practitioner.name} at{" "}
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
