// Builds the notification email Dad receives when someone submits the contact
// form or the pop-up (both post to /api/contact).
//
// Email clients ignore stylesheets and modern layout CSS, so this is plain
// tables with inline styles and no images — it renders the same in Gmail,
// Apple Mail, and Outlook, on a phone or a desktop.

export interface LeadEmailInput {
  name: string;
  phone: string;
  email: string;
  source?: string;
  serviceInterest?: string;
  vehicleInfo?: string;
  town?: string;
  preferredTime?: string;
  message?: string;
  pageContext?: string;
}

const CHARCOAL = "#2B2B2B";
const ORANGE = "#E06A10";
const WARM_GRAY = "#F5F3F0";
const MUTED = "#5F5B56";
const LINE = "#E6E1DA";
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const kinds: Record<string, { heading: string; subject: string; from: string }> = {
  "exit-intent-modal": {
    heading: "New lead from the pop-up",
    subject: "New pop-up lead",
    from: "the pop-up",
  },
  "contact-form": {
    heading: "New message",
    subject: "New contact form message",
    from: "the contact form",
  },
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** "18282616906" / "828-261-6906" -> { display: "(828) 261-6906", tel: "+18282616906" } */
function formatPhone(raw: string): { display: string; tel: string } {
  const digits = raw.replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (ten.length !== 10) return { display: raw.trim(), tel: digits };
  return {
    display: `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`,
    tel: `+1${ten}`,
  };
}

function clean(value?: string): string {
  return value?.trim() ?? "";
}

export function buildLeadEmail(input: LeadEmailInput): {
  subject: string;
  html: string;
  text: string;
} {
  const kind = kinds[input.source ?? ""] ?? kinds["contact-form"];
  const name = clean(input.name);
  const email = clean(input.email);
  const phone = formatPhone(input.phone);
  const service = clean(input.serviceInterest);

  const details: Array<[string, string]> = (
    [
      ["Service", service],
      ["Vehicle", clean(input.vehicleInfo)],
      ["Town", clean(input.town)],
      ["Day / time", clean(input.preferredTime)],
      ["Message", clean(input.message)],
    ] as Array<[string, string]>
  ).filter(([, value]) => value.length > 0);

  const received = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());

  const subject = [kind.subject, name, service].filter(Boolean).join(" · ");
  const preheader = [service, clean(input.vehicleInfo), clean(input.town), phone.display]
    .filter(Boolean)
    .join(" · ");
  const firstName = name.split(/\s+/)[0] || "there";
  const replySubject = encodeURIComponent("Your detail with Dad's Mobile Detailing Co.");
  const replyBody = encodeURIComponent(`Hi ${firstName},\n\n`);

  const button = (href: string, label: string, primary: boolean) => `
    <td style="padding:0 8px 8px 0;">
      <a href="${href}" style="display:inline-block;padding:12px 22px;border-radius:999px;font-family:${FONT};font-size:16px;font-weight:700;text-decoration:none;${
        primary
          ? `background:${ORANGE};color:#ffffff;border:2px solid ${ORANGE};`
          : `background:#ffffff;color:${CHARCOAL};border:2px solid ${CHARCOAL};`
      }">${label}</a>
    </td>`;

  const row = ([label, value]: [string, string]) => `
    <tr>
      <td style="padding:12px 0;border-top:1px solid ${LINE};font-family:${FONT};vertical-align:top;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${MUTED};">${label}</div>
        <div style="margin-top:3px;font-size:17px;line-height:1.5;color:${CHARCOAL};">${escapeHtml(value).replace(/\n/g, "<br>")}</div>
      </td>
    </tr>`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${WARM_GRAY};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${WARM_GRAY};">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${LINE};">
        <tr>
          <td style="background:${CHARCOAL};padding:20px 24px;font-family:${FONT};">
            <div style="font-size:13px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#F47A1F;">Dad&#39;s Mobile Detailing Co.</div>
            <div style="margin-top:4px;font-size:22px;font-weight:800;color:#ffffff;">${kind.heading}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 24px 8px 24px;font-family:${FONT};">
            <div style="font-size:26px;font-weight:800;line-height:1.2;color:${CHARCOAL};">${escapeHtml(name)}</div>
            <div style="margin-top:6px;font-size:17px;line-height:1.6;color:${CHARCOAL};">
              <a href="tel:${phone.tel}" style="color:${CHARCOAL};font-weight:700;text-decoration:none;">${escapeHtml(phone.display)}</a><br>
              <a href="mailto:${escapeHtml(email)}" style="color:${MUTED};text-decoration:underline;">${escapeHtml(email)}</a>
            </div>
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:16px;">
              <tr>
                ${button(`tel:${phone.tel}`, "Call", true)}
                ${button(`mailto:${escapeHtml(email)}?subject=${replySubject}&amp;body=${replyBody}`, "Reply by email", false)}
              </tr>
            </table>
          </td>
        </tr>
        ${
          details.length > 0
            ? `<tr>
          <td style="padding:8px 24px 16px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${details.map(row).join("")}
            </table>
          </td>
        </tr>`
            : ""
        }
        <tr>
          <td style="background:${WARM_GRAY};padding:14px 24px;font-family:${FONT};font-size:13px;line-height:1.5;color:${MUTED};">
            Sent from ${kind.from}${clean(input.pageContext) ? ` on ${escapeHtml(clean(input.pageContext))}` : ""} · ${received} ET<br>
            Replying to this email goes straight to ${escapeHtml(firstName)}.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const text = [
    kind.heading.toUpperCase(),
    "",
    name,
    phone.display,
    email,
    "",
    ...details.map(([label, value]) => `${label}: ${value}`),
    "",
    `Sent from ${kind.from}${clean(input.pageContext) ? ` on ${clean(input.pageContext)}` : ""} · ${received} ET`,
  ].join("\n");

  return { subject, html, text };
}
