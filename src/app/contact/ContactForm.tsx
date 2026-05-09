"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitContactForm } from "@/app/actions/contact";
import { CheckCircle, AlertCircle, Send } from "lucide-react";

const SUBJECTS = [
  "General enquiry",
  "Book an appointment",
  "Initial MSK Assessment",
  "Sports Injury Consultation",
  "Injection Therapy",
  "Running Gait Analysis",
  "Referral",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const result = await submitContactForm({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      subject: fd.get("subject") as string,
      message: fd.get("message") as string,
      gdprConsent: fd.get("gdprConsent") === "on",
      honeypot: fd.get("_hp") as string,
    });

    if (result.success) {
      setStatus("success");
      formRef.current?.reset();
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="h-10 w-10 text-terracotta mb-4" aria-hidden="true" />
        <h3 className="font-display text-2xl text-charcoal mb-2">Message received</h3>
        <p className="text-warm-grey text-sm max-w-sm">
          Thank you for getting in touch. You will receive a reply within one working day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-terracotta hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from real users, bots fill this */}
      <div aria-hidden="true" className="hidden" tabIndex={-1}>
        <label htmlFor="_hp">Leave this blank</label>
        <input type="text" id="_hp" name="_hp" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            required
            autoComplete="name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone number (optional)</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+44 7700 000000"
            autoComplete="tel"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="subject">Subject *</Label>
          <select
            id="subject"
            name="subject"
            required
            className="flex h-11 w-full rounded-xl border border-border bg-cream px-4 py-2.5 text-sm text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta transition-colors"
          >
            <option value="">Select a subject</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Please describe your condition or query, and any relevant history..."
          required
          className="min-h-[140px]"
        />
      </div>

      {/* GDPR consent */}
      <div className="flex items-start gap-3 p-4 bg-taupe rounded-xl border border-border">
        <input
          type="checkbox"
          id="gdprConsent"
          name="gdprConsent"
          required
          className="mt-0.5 h-4 w-4 rounded border-border accent-terracotta cursor-pointer"
        />
        <label htmlFor="gdprConsent" className="text-sm text-warm-grey leading-relaxed cursor-pointer">
          I consent to Sue-Ellen Pereira processing my personal data to respond to this enquiry, in accordance with the{" "}
          <a href="/privacy" className="text-terracotta hover:underline">
            Privacy Policy
          </a>
          . *
        </label>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-200 text-sm text-red-700"
        >
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
          {errorMsg}
        </div>
      )}

      <Button
        type="submit"
        variant="terracotta"
        size="lg"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? "Sending..." : "Send message"}
        {status !== "loading" && <Send className="h-4 w-4" />}
      </Button>
    </form>
  );
}
