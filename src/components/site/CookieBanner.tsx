"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const COOKIE_KEY = "sue-ellen-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
    // Enable analytics after consent
    if (typeof window !== "undefined" && (window as Window & { enableAnalytics?: () => void }).enableAnalytics) {
      (window as Window & { enableAnalytics?: () => void }).enableAnalytics?.();
    }
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 bg-charcoal text-cream border-t border-cream/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-cream/80 leading-relaxed max-w-xl">
          This site uses cookies to analyse traffic and improve your experience. No personal data is sold or shared with third parties.{" "}
          <a href="/privacy" className="underline hover:text-cream transition-colors">
            Privacy Policy
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-sm text-cream/60 hover:text-cream transition-colors underline underline-offset-2"
          >
            Decline
          </button>
          <Button variant="terracotta" size="sm" onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
