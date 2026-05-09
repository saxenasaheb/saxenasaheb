"use client";

import { useEffect, useRef } from "react";

interface AcuityEmbedProps {
  ownerId: string;
}

export function AcuityEmbed({ ownerId }: AcuityEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || !containerRef.current) return;
    scriptLoaded.current = true;

    // Acuity official inline embed script
    // https://help.acuityscheduling.com/hc/en-us/articles/16670165497485
    const script = document.createElement("script");
    script.src = "https://embed.acuityscheduling.com/js/embed.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="rounded-2xl overflow-hidden bg-cream border border-border">
      {/*
        Acuity inline iframe embed.
        The embed.js script transforms this iframe into the full scheduler.
        Styles: https://embed.acuityscheduling.com/embed/checkstyle.css
        Owner ID is sourced from NEXT_PUBLIC_ACUITY_OWNER_ID env var.
      */}
      <iframe
        src={`https://app.acuityscheduling.com/schedule.php?owner=${ownerId}`}
        title="Book an appointment with Sue-Ellen Pereira"
        width="100%"
        height="800"
        frameBorder="0"
        className="w-full min-h-[800px]"
        loading="lazy"
        allow="payment"
      />
    </div>
  );
}
