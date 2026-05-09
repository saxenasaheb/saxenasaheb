"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { siteNav } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  acuityOwnerId?: string;
}

export function MobileNav({ acuityOwnerId }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="md:hidden p-2 text-charcoal hover:text-terracotta transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] bg-cream flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl font-normal text-charcoal text-left">
            Sue-Ellen Pereira
          </SheetTitle>
          <p className="text-xs text-warm-grey tracking-wide uppercase">
            Advanced MSK Physiotherapist
          </p>
        </SheetHeader>
        <nav className="flex flex-col gap-1 mt-8" aria-label="Mobile navigation">
          {siteNav.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className="block px-3 py-3 text-base text-charcoal hover:text-terracotta hover:bg-taupe rounded-xl transition-colors"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-border">
          <SheetClose asChild>
            <Button
              asChild
              variant="terracotta"
              className="w-full"
            >
              <Link href="/book">Book an Appointment</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
