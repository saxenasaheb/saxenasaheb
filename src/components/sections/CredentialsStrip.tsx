import { ShieldCheck } from "lucide-react";
import { credentials } from "@/lib/site-config";

export function CredentialsStrip() {
  return (
    <section
      className="bg-taupe py-6"
      aria-label="Professional credentials"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {credentials.map((cred) => (
            <div key={cred.abbr} className="flex items-center gap-2">
              <ShieldCheck
                className="h-3.5 w-3.5 text-terracotta shrink-0"
                aria-hidden="true"
              />
              <span className="text-sm text-charcoal">{cred.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
