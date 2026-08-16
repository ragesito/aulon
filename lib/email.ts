/**
 * Email delivery: Resend if RESEND_API_KEY is set, otherwise SMTP via
 * nodemailer if SMTP_HOST is set, otherwise a no-op that logs.
 * Bookings NEVER fail because email failed — email errors are swallowed.
 */

import { site } from "@/content/site";

interface Mail {
  to: string;
  subject: string;
  html: string;
}

const FROM = process.env.EMAIL_FROM ?? "Aulon Detailing <onboarding@resend.dev>";

async function sendViaResend(mail: Mail) {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({ from: FROM, ...mail });
}

async function sendViaSmtp(mail: Mail) {
  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });
  await transporter.sendMail({ from: FROM, ...mail });
}

export async function sendMail(mail: Mail): Promise<void> {
  try {
    if (process.env.RESEND_API_KEY) {
      await sendViaResend(mail);
    } else if (process.env.SMTP_HOST) {
      await sendViaSmtp(mail);
    } else {
      console.log(`[email skipped - no provider configured] to=${mail.to} subject="${mail.subject}"`);
    }
  } catch (err) {
    console.error("[email] delivery failed:", err);
  }
}

/** Escape user-provided values before interpolating into HTML emails. */
export function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const emailShell = (title: string, body: string) => `
<div style="background:#0a0a0c;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#111114;border:1px solid #2a2a30;border-radius:8px;overflow:hidden;">
    <div style="padding:24px;border-bottom:2px solid #daa520;">
      <span style="color:#daa520;font-size:20px;font-weight:bold;letter-spacing:4px;">AULON DETAILING</span>
    </div>
    <div style="padding:24px;color:#f5f0e6;font-size:15px;line-height:1.6;">
      <h1 style="color:#eec95f;font-size:20px;margin:0 0 16px;">${title}</h1>
      ${body}
    </div>
    <div style="padding:16px 24px;border-top:1px solid #2a2a30;color:#b9b3a6;font-size:12px;">
      ${site.name} &middot; ${site.addressLine} &middot; ${site.phone}
    </div>
  </div>
</div>`;

export interface BookingEmailData {
  serviceName: string;
  vehicleType: string;
  date: string;
  timeSlot: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  isMobile: boolean;
  notes?: string;
  priceQuoted: number;
}

const row = (k: string, v: string) =>
  `<tr><td style="padding:6px 12px 6px 0;color:#b9b3a6;white-space:nowrap;vertical-align:top;">${k}</td><td style="padding:6px 0;color:#f5f0e6;">${v}</td></tr>`;

function bookingTable(b: BookingEmailData): string {
  return `<table style="width:100%;border-collapse:collapse;font-size:14px;">
    ${row("Service", esc(b.serviceName))}
    ${row("Vehicle", esc(b.vehicleType))}
    ${row("Date", esc(b.date))}
    ${row("Time", esc(b.timeSlot))}
    ${row("Price (quoted)", `$${b.priceQuoted}`)}
    ${row("Name", esc(b.name))}
    ${row("Phone", esc(b.phone))}
    ${row("Email", esc(b.email))}
    ${b.isMobile ? row("Mobile service at", esc(b.address ?? "")) : row("Location", "Drop-off")}
    ${b.notes ? row("Notes", esc(b.notes)) : ""}
  </table>`;
}

export async function sendOwnerBookingNotification(b: BookingEmailData) {
  const owner = process.env.OWNER_EMAIL;
  if (!owner) {
    console.log("[email] OWNER_EMAIL not set - owner notification skipped");
    return;
  }
  await sendMail({
    to: owner,
    subject: `New booking request: ${b.serviceName} on ${b.date} ${b.timeSlot}`,
    html: emailShell(
      "New booking request",
      `<p>A new booking just came in. Confirm it in the admin panel.</p>${bookingTable(b)}`
    ),
  });
}

export async function sendCustomerConfirmation(b: BookingEmailData) {
  await sendMail({
    to: b.email,
    subject: "We received your booking request | Aulon Detailing",
    html: emailShell(
      `Thanks, ${esc(b.name.split(" ")[0] ?? b.name)}: request received`,
      `<p>We'll confirm your slot shortly by phone or email. Here's what you requested:</p>
       ${bookingTable(b)}
       <p style="margin-top:16px;color:#b9b3a6;">Need to change something? Call us at
       <a href="${site.phoneHref}" style="color:#daa520;">${site.phone}</a>.</p>`
    ),
  });
}
