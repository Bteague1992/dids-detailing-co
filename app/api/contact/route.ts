import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isSpamSubmission } from "@/lib/spam-filter";

interface ContactRequestBody {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  pageContext?: string;
  serviceInterest?: string;
  vehicleInfo?: string;
  source?: string;
  // Honeypot field. Named to look like a normal field to a bot; real visitors
  // never see it (visually hidden off-screen, see ContactForm/LeadCaptureModal).
  company?: string;
}

// The visible confirmation (and the HTTP 200 status) is identical whether or
// not the submission is spam, so a bot gets no UI signal it was filtered out.
// `filtered` rides along in the JSON purely so the client can decide whether
// to fire a GA4 conversion event (contact_form_submit / exit_intent_modal_submit)
// — real leads only, not honeypot/phone-only-message spam — without that field
// affecting what's rendered on screen.
const SUCCESS_MESSAGE = "Thanks! We'll be in touch soon.";

export async function POST(request: Request) {
  let body: ContactRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, phone, email, message, pageContext, serviceInterest, vehicleInfo, source, company } =
    body;

  if (!name?.trim() || !phone?.trim() || !email?.trim()) {
    return NextResponse.json(
      { success: false, message: "Name, phone, and email are required." },
      { status: 400 },
    );
  }

  // Spam gate: honeypot + phone-only-message check (shared with the exit-intent
  // modal form via lib/spam-filter.ts). Flagged submissions still return the
  // normal success response below — we just skip sending the email.
  const spam = isSpamSubmission({ honeypot: company, message });

  if (!spam) {
    const fields: Array<[string, string | undefined]> = [
      ["Name", name],
      ["Phone", phone],
      ["Email", email],
      ["Service Interest", serviceInterest],
      ["Vehicle", vehicleInfo],
      ["Message", message],
      ["Page", pageContext],
      ["Source", source ?? "contact-form"],
    ];

    const textBody = fields
      .filter(([, value]) => value && value.trim().length > 0)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");

    const htmlBody = fields
      .filter(([, value]) => value && value.trim().length > 0)
      .map(
        ([label, value]) =>
          `<p><strong>${label}:</strong> ${escapeHtml(value!)}</p>`,
      )
      .join("");

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL!,
        to: process.env.CONTACT_TO_EMAIL!,
        replyTo: email,
        subject: `New contact form submission from ${name}`,
        text: textBody,
        html: htmlBody,
      });
    } catch (error) {
      console.error("Failed to send contact form email via Resend:", error);
      return NextResponse.json(
        { success: false, message: "Something went wrong. Please text us instead." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json(
    { success: true, message: SUCCESS_MESSAGE, filtered: spam },
    { status: 200 },
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
