"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { sendContactMessage, type ContactResult } from "@/app/actions/contact";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}

export default function ContactForm() {
  const [result, formAction] = useFormState<ContactResult | null, FormData>(
    sendContactMessage,
    null
  );
  const [startedAt] = useState(() => Date.now());

  if (result?.ok) {
    return (
      <div className="border border-gold/40 bg-ink-soft p-8 text-center">
        <h3 className="text-xl font-bold text-ivory">Message sent</h3>
        <p className="mt-2 text-sm text-ivory-dim">
          Thanks for reaching out. We&apos;ll get back to you within one business day.
        </p>
      </div>
    );
  }

  const fieldErrors = result?.fieldErrors ?? {};

  return (
    <form action={formAction} noValidate className="space-y-5">
      <input type="hidden" name="startedAt" value={startedAt} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div>
        <label htmlFor="ct-name" className="field-label">Name</label>
        <input id="ct-name" name="name" autoComplete="name" required maxLength={80} className="field" />
        {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
      </div>
      <div>
        <label htmlFor="ct-email" className="field-label">Email</label>
        <input id="ct-email" name="email" type="email" autoComplete="email" required maxLength={120} className="field" />
        {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
      </div>
      <div>
        <label htmlFor="ct-message" className="field-label">Message</label>
        <textarea id="ct-message" name="message" rows={5} required maxLength={2000} className="field resize-none" />
        {fieldErrors.message && <span className="field-error">{fieldErrors.message}</span>}
      </div>

      {result?.error && (
        <p role="alert" className="border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
          {result.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
