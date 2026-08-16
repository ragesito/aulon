"use server";

import { headers } from "next/headers";
import { contactSchema, filledTooFast } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { sendMail, esc } from "@/lib/email";

export interface ContactResult {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function sendContactMessage(
  _prev: ContactResult | null,
  formData: FormData
): Promise<ContactResult> {
  const ip = clientIp(headers());
  const rl = rateLimit(`contact:${ip}`);
  if (!rl.ok) {
    return {
      ok: false,
      error: `Too many requests. Please try again in ${rl.retryAfterSec}s.`,
    };
  }

  const parsed = contactSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Please review the highlighted fields.", fieldErrors };
  }
  const data = parsed.data;

  if (filledTooFast(data.startedAt)) {
    return { ok: true }; // silently drop bot submissions
  }

  const owner = process.env.OWNER_EMAIL;
  if (owner) {
    await sendMail({
      to: owner,
      subject: `Website message from ${data.name}`,
      html: `<p><strong>From:</strong> ${esc(data.name)} &lt;${esc(data.email)}&gt;</p>
             <p style="white-space:pre-wrap;">${esc(data.message)}</p>`,
    });
  } else {
    console.log("[contact] OWNER_EMAIL not set — message logged only:", data);
  }

  return { ok: true };
}
