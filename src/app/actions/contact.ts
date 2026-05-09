"use server";

import { Resend } from "resend";
import { practitioner } from "@/lib/site-config";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  gdprConsent: boolean;
  honeypot?: string;
}

interface ContactResult {
  success: boolean;
  error?: string;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactResult> {
  // Honeypot check
  if (data.honeypot && data.honeypot.trim() !== "") {
    return { success: true };
  }

  // GDPR consent required
  if (!data.gdprConsent) {
    return { success: false, error: "GDPR consent is required." };
  }

  // Basic validation
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    return { success: false, error: "Please complete all required fields." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Development fallback — log to console
    console.log("[Contact Form] RESEND_API_KEY not set. Form submission received:");
    console.log({
      name: data.name,
      email: data.email,
      phone: data.phone || "not provided",
      subject: data.subject,
      message: data.message,
    });
    console.log("TODO: Set RESEND_API_KEY in .env.local to send emails.");
    return { success: true };
  }

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Website Contact Form <noreply@sueellenpereira.co.uk>", // Update domain after DNS setup
      to: practitioner.email,
      replyTo: data.email,
      subject: `[Website Enquiry] ${data.subject} — ${data.name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #F5F0E8; color: #2A2826;">
          <h2 style="font-size: 24px; font-weight: 400; margin-bottom: 24px; border-bottom: 1px solid #E0D6C7; padding-bottom: 16px;">
            New Enquiry from ${data.name}
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B6560; font-size: 14px; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; font-size: 14px;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B6560; font-size: 14px; vertical-align: top;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${escapeHtml(data.email)}" style="color: #A8654A;">${escapeHtml(data.email)}</a></td>
            </tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; color: #6B6560; font-size: 14px; vertical-align: top;">Phone</td><td style="padding: 8px 0; font-size: 14px;">${escapeHtml(data.phone)}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #6B6560; font-size: 14px; vertical-align: top;">Subject</td>
              <td style="padding: 8px 0; font-size: 14px;">${escapeHtml(data.subject)}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #E8DFD3; border-radius: 12px;">
            <p style="margin: 0 0 8px; color: #6B6560; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
          </div>
          <p style="margin-top: 24px; font-size: 11px; color: #6B6560; border-top: 1px solid #E0D6C7; padding-top: 16px;">
            GDPR consent given. Sent from the contact form on sueellenpereira.co.uk.
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("[Contact Form] Failed to send email:", err);
    return {
      success: false,
      error: "Failed to send your message. Please try again or email directly.",
    };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
