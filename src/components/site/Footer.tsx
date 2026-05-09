import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { footerNav, practitioner, registrations } from "@/lib/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-cream/10">
          {/* Brand column */}
          <div className="md:col-span-2">
            <p className="font-display text-2xl text-cream tracking-wide mb-2">
              Sue-Ellen Pereira
            </p>
            <p className="eyebrow text-cream/50 mb-4">
              Advanced MSK Physiotherapist · London
            </p>
            <p className="text-sm leading-relaxed text-cream/60 max-w-xs">
              Expert musculoskeletal physiotherapy. NHS-trained. Evidence-based care, privately accessible in London.
            </p>
            <div className="mt-6 space-y-1.5">
              <a
                href={`mailto:${practitioner.email}`}
                className="block text-sm text-cream/60 hover:text-terracotta transition-colors"
              >
                {practitioner.email}
              </a>
              <a
                href={`tel:${practitioner.phone}`}
                className="block text-sm text-cream/60 hover:text-terracotta transition-colors"
              >
                {practitioner.phone}
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="eyebrow text-cream/40 mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {footerNav.main.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="eyebrow text-cream/40 mb-4">Legal</p>
            <ul className="space-y-2.5">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Registration numbers */}
        <div className="flex flex-wrap gap-x-8 gap-y-2 py-8 border-b border-cream/10">
          <p className="text-xs text-cream/40">
            HCPC Registration No.{" "}
            <span className="text-cream/60">{registrations.hcpc}</span>
          </p>
          <p className="text-xs text-cream/40">
            CSP Membership No.{" "}
            <span className="text-cream/60">{registrations.csp}</span>
          </p>
          <p className="text-xs text-cream/40">
            ICO Registration No.{" "}
            <span className="text-cream/60">{registrations.ico}</span>
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8">
          <p className="text-xs text-cream/40">
            © {currentYear} {practitioner.name}. All rights reserved.
          </p>
          <p className="text-xs text-cream/40">
            Registered in England and Wales. All treatments subject to clinical assessment.
          </p>
        </div>
      </div>
    </footer>
  );
}
