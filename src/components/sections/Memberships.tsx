import { EyebrowHeading } from "@/components/site/EyebrowHeading";
import { CurvedDivider } from "@/components/site/CurvedDivider";
import { memberships } from "@/lib/site-config";

// Placeholder logo component — replace with real SVG logos before launch
function LogoPlaceholder({ name, fullName }: { name: string; fullName: string }) {
  return (
    <div
      className="flex flex-col items-center gap-2"
      title={fullName}
    >
      <div className="w-20 h-12 rounded-xl bg-cream/60 flex items-center justify-center border border-border">
        <span className="eyebrow text-charcoal text-[10px]">{name}</span>
      </div>
    </div>
  );
}

export function Memberships() {
  return (
    <>
      <CurvedDivider variant="clay-to-taupe" />
      <section className="bg-taupe py-12 pb-16" aria-label="Professional memberships">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <EyebrowHeading
            eyebrow="Trusted Memberships"
            title="Regulated. Accredited. Expert."
            align="center"
            titleSize="lg"
            className="mb-10"
          />
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {memberships.map((m) => (
              <LogoPlaceholder
                key={m.name}
                name={m.logoPlaceholder}
                fullName={m.fullName}
              />
            ))}
          </div>
          <p className="mt-8 text-xs text-warm-grey">
            {/* PLACEHOLDER: logos to be supplied by client */}
            Professional body logos shown as placeholders — replace before launch.
          </p>
        </div>
      </section>
    </>
  );
}
