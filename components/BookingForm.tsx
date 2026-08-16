"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import {
  services,
  vehicleTypes,
  type VehicleType,
} from "@/content/services";
import { TIME_SLOTS } from "@/lib/validation";
import { createBooking, type BookingResult } from "@/app/actions/booking";
import { site } from "@/content/site";

const STEPS = ["Service", "Vehicle", "Date & Time", "Your Details"] as const;

function todayStr(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Request Booking"}
    </button>
  );
}

export default function BookingForm({
  initialService,
}: {
  initialService?: string;
}) {
  const validInitial = services.some((s) => s.slug === initialService)
    ? initialService!
    : "";

  const [step, setStep] = useState(validInitial ? 1 : 0);
  const [serviceSlug, setServiceSlug] = useState(validInitial);
  const [vehicleType, setVehicleType] = useState<VehicleType | "">("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [dateError, setDateError] = useState("");
  const [startedAt] = useState(() => Date.now());

  const [result, formAction] = useFormState<BookingResult | null, FormData>(
    createBooking,
    null
  );

  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (result?.ok) topRef.current?.scrollIntoView({ block: "start" });
  }, [result]);

  const service = useMemo(
    () => services.find((s) => s.slug === serviceSlug),
    [serviceSlug]
  );
  const price =
    service && vehicleType ? service.pricing[vehicleType as VehicleType] : null;

  const fieldErrors = result?.fieldErrors ?? {};

  function handleDate(value: string) {
    setDate(value);
    if (!value) return setDateError("");
    const d = new Date(`${value}T12:00:00`);
    if (d.getDay() === 0) {
      setDateError("We're closed on Sundays. Please pick another day.");
    } else {
      setDateError("");
    }
  }

  if (result?.ok) {
    return (
      <div ref={topRef} className="border border-gold/40 bg-ink-soft p-10 text-center">
        <svg viewBox="0 0 24 24" className="mx-auto h-14 w-14 fill-none stroke-gold" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 className="mt-6 text-2xl font-bold text-ivory">Request received</h2>
        <p className="mx-auto mt-3 max-w-md text-ivory-dim">
          We&apos;ll confirm your slot shortly by phone or email. Check your inbox
          for a confirmation of your request.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-outline">
            Back to Home
          </Link>
          <a href={site.phoneHref} className="btn-gold">
            Call {site.phone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={topRef}>
      {/* Step indicator */}
      <ol className="flex items-center justify-between gap-1 sm:gap-2" aria-label="Booking steps">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col items-center gap-2">
            <span
              aria-current={step === i ? "step" : undefined}
              className={`flex h-9 w-9 items-center justify-center border text-xs font-bold ${
                i < step
                  ? "border-gold bg-gold text-ink"
                  : i === step
                    ? "border-gold text-gold"
                    : "border-ink-line text-ivory-dim/50"
              }`}
            >
              {i < step ? "✓" : i + 1}
            </span>
            <span
              className={`hidden text-[10px] uppercase tracking-widest sm:block ${
                i <= step ? "text-gold" : "text-ivory-dim/50"
              }`}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="gold-line my-8" />

      <form action={formAction} noValidate>
        {/* Hidden state carried across steps */}
        <input type="hidden" name="serviceSlug" value={serviceSlug} />
        <input type="hidden" name="vehicleType" value={vehicleType} />
        <input type="hidden" name="date" value={date} />
        <input type="hidden" name="timeSlot" value={timeSlot} />
        <input type="hidden" name="startedAt" value={startedAt} />
        {/* Honeypot — hidden from real users */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        {/* Step 1: Service */}
        {step === 0 && (
          <fieldset>
            <legend className="sr-only">Choose a service package</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => {
                    setServiceSlug(s.slug);
                    setStep(1);
                  }}
                  aria-pressed={serviceSlug === s.slug}
                  className={`border p-5 text-left transition-all duration-200 hover:border-gold ${
                    serviceSlug === s.slug ? "border-gold bg-gold/5" : "border-ink-line bg-ink-soft"
                  }`}
                >
                  <span className="block font-bold text-ivory">{s.name}</span>
                  <span className="mt-1 block text-xs text-ivory-dim">{s.short}</span>
                  <span className="mt-3 block text-sm font-bold text-gold">
                    from ${s.fromPrice}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* Step 2: Vehicle */}
        {step === 1 && (
          <fieldset>
            <legend className="sr-only">Choose your vehicle type</legend>
            <div className="grid grid-cols-2 gap-3">
              {vehicleTypes.map((v) => (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => {
                    setVehicleType(v.value);
                    setStep(2);
                  }}
                  aria-pressed={vehicleType === v.value}
                  className={`border p-5 text-center transition-all duration-200 hover:border-gold ${
                    vehicleType === v.value ? "border-gold bg-gold/5" : "border-ink-line bg-ink-soft"
                  }`}
                >
                  <span className="block font-bold text-ivory">{v.label}</span>
                  {service && (
                    <span className="mt-2 block text-sm font-bold text-gold">
                      ${service.pricing[v.value]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* Step 3: Date & time */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="date-input" className="field-label">
                Preferred date <span className="text-ivory-dim/60">(closed Sundays)</span>
              </label>
              <input
                id="date-input"
                type="date"
                value={date}
                min={todayStr(1)}
                max={todayStr(90)}
                onChange={(e) => handleDate(e.target.value)}
                className="field"
                required
              />
              {(dateError || fieldErrors.date) && (
                <span className="field-error">{dateError || fieldErrors.date}</span>
              )}
            </div>
            <div>
              <span className="field-label">Time slot (8 AM – 6 PM)</span>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeSlot(t)}
                    aria-pressed={timeSlot === t}
                    className={`border py-3 text-sm transition-all duration-200 hover:border-gold ${
                      timeSlot === t ? "border-gold bg-gold text-ink font-bold" : "border-ink-line text-ivory"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {fieldErrors.timeSlot && <span className="field-error">{fieldErrors.timeSlot}</span>}
            </div>
            <button
              type="button"
              disabled={!date || !timeSlot || !!dateError}
              onClick={() => setStep(3)}
              className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 4: Details */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="bk-name" className="field-label">Full name</label>
                <input id="bk-name" name="name" autoComplete="name" required maxLength={80} className="field" />
                {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
              </div>
              <div>
                <label htmlFor="bk-phone" className="field-label">Phone</label>
                <input id="bk-phone" name="phone" type="tel" autoComplete="tel" required maxLength={20} className="field" />
                {fieldErrors.phone && <span className="field-error">{fieldErrors.phone}</span>}
              </div>
            </div>
            <div>
              <label htmlFor="bk-email" className="field-label">Email</label>
              <input id="bk-email" name="email" type="email" autoComplete="email" required maxLength={120} className="field" />
              {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
            </div>

            <div className="flex items-center gap-3 border border-ink-line bg-ink-soft p-4">
              <input
                id="bk-mobile"
                name="isMobile"
                type="checkbox"
                value="true"
                checked={isMobile}
                onChange={(e) => setIsMobile(e.target.checked)}
                className="h-5 w-5 accent-[#daa520]"
              />
              <label htmlFor="bk-mobile" className="text-sm text-ivory">
                Mobile service: come to my address
                <span className="block text-xs text-ivory-dim">
                  {site.serviceAreaBlurb}
                </span>
              </label>
            </div>

            {isMobile && (
              <div>
                <label htmlFor="bk-address" className="field-label">Service address</label>
                <input
                  id="bk-address"
                  name="address"
                  autoComplete="street-address"
                  maxLength={200}
                  placeholder="Street, city, ZIP"
                  className="field"
                  required
                />
                {fieldErrors.address && <span className="field-error">{fieldErrors.address}</span>}
              </div>
            )}

            <div>
              <label htmlFor="bk-notes" className="field-label">
                Notes <span className="text-ivory-dim/60">(optional)</span>
              </label>
              <textarea
                id="bk-notes"
                name="notes"
                rows={3}
                maxLength={1000}
                placeholder="Pet hair, stains, anything we should know…"
                className="field resize-none"
              />
              {fieldErrors.notes && <span className="field-error">{fieldErrors.notes}</span>}
            </div>

            {/* Summary */}
            {service && vehicleType && (
              <div className="border border-gold/30 bg-ink-soft p-5 text-sm">
                <p className="kicker mb-3">Your request</p>
                <dl className="space-y-1.5 text-ivory-dim">
                  <div className="flex justify-between"><dt>Service</dt><dd className="text-ivory">{service.name}</dd></div>
                  <div className="flex justify-between"><dt>Vehicle</dt><dd className="text-ivory">{vehicleTypes.find((v) => v.value === vehicleType)?.label}</dd></div>
                  <div className="flex justify-between"><dt>Date</dt><dd className="text-ivory">{date} · {timeSlot}</dd></div>
                  <div className="flex justify-between border-t border-ink-line pt-2">
                    <dt className="font-semibold text-ivory">Estimated price</dt>
                    <dd className="font-bold text-gold">${price}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs text-ivory-dim/70">
                  No payment now. We confirm your slot first. Price may adjust for
                  vehicle condition.
                </p>
              </div>
            )}

            {result?.error && (
              <p role="alert" className="border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                {result.error}
              </p>
            )}

            <SubmitButton />
          </div>
        )}

        {/* Back button */}
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="mt-6 text-xs font-semibold uppercase tracking-widest text-ivory-dim transition-colors hover:text-gold"
          >
            ← Back
          </button>
        )}
      </form>
    </div>
  );
}
