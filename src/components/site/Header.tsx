"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";
import { siteNav } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-cream/95 backdrop-blur-sm border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex flex-col leading-tight hover:opacity-80 transition-opacity"
          aria-label="Sue-Ellen Pereira — home"
        >
          <span className="font-display text-xl md:text-2xl text-charcoal tracking-wide">
            Sue-Ellen Pereira
          </span>
          <span className="eyebrow text-warm-grey hidden md:block">
            MSK Physiotherapist
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {siteNav.filter(item => item.href !== "/book").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-terracotta",
                pathname === item.href
                  ? "text-terracotta"
                  : "text-charcoal"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="terracotta"
            size="sm"
            className="hidden md:inline-flex"
          >
            <Link href="/book">Book Now</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
