import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { updateBookingStatus, rescheduleBooking } from "@/app/actions/admin";
import { vehicleTypes } from "@/content/services";
import { TIME_SLOTS } from "@/lib/validation";

export const metadata: Metadata = {
  title: "Admin Bookings",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const;

const statusStyles: Record<string, string> = {
  pending: "border-yellow-500/50 text-yellow-400",
  confirmed: "border-gold text-gold",
  completed: "border-green-500/50 text-green-400",
  cancelled: "border-red-500/50 text-red-400",
};

const paymentStyles: Record<string, string> = {
  paid: "border-green-500/50 text-green-400",
  waived: "border-ink-line text-ivory-dim",
  refunded: "border-red-500/50 text-red-400",
  unpaid: "border-yellow-500/50 text-yellow-400",
};

type BookingRow = Awaited<ReturnType<typeof prisma.booking.findMany>>[number];

function vehicleLabel(value: string): string {
  return vehicleTypes.find((v) => v.value === value)?.label ?? value;
}

function mapsHref(address: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
}

function StatusForm({ b, compact = false }: { b: BookingRow; compact?: boolean }) {
  return (
    <form action={updateBookingStatus} className="flex items-center gap-2">
      <input type="hidden" name="id" value={b.id} />
      <select
        name="status"
        defaultValue={b.status}
        className={`${compact ? "" : "flex-1"} border bg-ink px-2 py-2 text-xs font-semibold uppercase tracking-wider ${statusStyles[b.status] ?? "border-ink-line text-ivory"}`}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="border border-gold/50 px-3 py-2 text-xs font-bold uppercase text-gold hover:bg-gold/10"
      >
        Save
      </button>
    </form>
  );
}

function RescheduleForm({ b, compact = false }: { b: BookingRow; compact?: boolean }) {
  return (
    <form action={rescheduleBooking} className={compact ? "space-y-1.5" : "flex items-center gap-2"}>
      <input type="hidden" name="id" value={b.id} />
      <input
        type="date"
        name="date"
        defaultValue={b.date}
        required
        className={`${compact ? "block w-[150px]" : "flex-1 min-w-0"} border border-ink-line bg-ink px-2 py-2 text-xs text-ivory [color-scheme:dark]`}
      />
      <div className={compact ? "flex items-center gap-1.5" : "contents"}>
        <select
          name="timeSlot"
          defaultValue={b.timeSlot}
          className={`${compact ? "" : "flex-1"} border border-ink-line bg-ink px-2 py-2 text-xs text-ivory`}
        >
          {TIME_SLOTS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <button
          type="submit"
          title="Reschedule and email the customer"
          className="border border-gold/50 px-3 py-2 text-xs font-bold uppercase text-gold hover:bg-gold/10"
        >
          Move
        </button>
      </div>
    </form>
  );
}

export default async function AdminPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: [{ date: "asc" }, { timeSlot: "asc" }],
  });

  const counts = STATUSES.map((s) => ({
    status: s,
    n: bookings.filter((b) => b.status === s).length,
  }));

  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <h1 className="text-2xl font-bold text-ivory">Bookings</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {counts.map((c) => (
            <span
              key={c.status}
              className={`border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusStyles[c.status]}`}
            >
              {c.status}: {c.n}
            </span>
          ))}
        </div>

        {bookings.length === 0 && (
          <p className="mt-10 border border-ink-line bg-ink-soft p-8 text-center text-ivory-dim">
            No bookings yet.
          </p>
        )}

        {/* ── Mobile / tablet: stacked cards ─────────────────────────── */}
        <ul className="mt-6 space-y-4 lg:hidden">
          {bookings.map((b) => (
            <li key={b.id} className="border border-ink-line bg-ink-soft">
              {/* Header: date + status */}
              <div className="flex items-center justify-between gap-3 border-b border-ink-line px-4 py-3">
                <p className="font-bold text-ivory">
                  {b.date}
                  <span className="ml-2 text-gold">{b.timeSlot}</span>
                </p>
                <span
                  className={`border px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${statusStyles[b.status] ?? "border-ink-line text-ivory"}`}
                >
                  {b.status}
                </span>
              </div>

              {/* Service + price */}
              <div className="flex items-start justify-between gap-3 px-4 pt-3">
                <div>
                  <p className="font-semibold text-ivory">{b.serviceName}</p>
                  <p className="text-xs text-ivory-dim">{vehicleLabel(b.vehicleType)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gold">${b.priceQuoted}</p>
                  <span
                    className={`mt-1 inline-block border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${paymentStyles[b.paymentStatus] ?? "border-ink-line text-ivory-dim"}`}
                  >
                    {b.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Customer */}
              <div className="space-y-1.5 px-4 pt-3 text-sm">
                <p className="text-ivory">{b.name}</p>
                {b.address && (
                  <a
                    href={mapsHref(b.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-ivory-dim underline-offset-2 hover:text-gold hover:underline"
                  >
                    📍 {b.address}
                  </a>
                )}
                {b.notes && (
                  <p className="text-xs italic text-ivory-dim/80">“{b.notes}”</p>
                )}
              </div>

              {/* Quick contact */}
              <div className="grid grid-cols-2 gap-2 px-4 pt-3">
                <a
                  href={`tel:${b.phone}`}
                  className="border border-gold/50 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-gold hover:bg-gold/10"
                >
                  Call
                </a>
                <a
                  href={`mailto:${b.email}`}
                  className="border border-ink-line py-2.5 text-center text-xs font-bold uppercase tracking-wider text-ivory-dim hover:border-gold hover:text-gold"
                >
                  Email
                </a>
              </div>

              {/* Controls */}
              <div className="mt-3 space-y-3 border-t border-ink-line px-4 py-3">
                <div>
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-ivory-dim">
                    Status
                  </p>
                  <StatusForm b={b} />
                </div>
                <div>
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-ivory-dim">
                    Reschedule
                  </p>
                  <div className="flex items-center gap-2">
                    <RescheduleForm b={b} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* ── Desktop: table ─────────────────────────────────────────── */}
        {bookings.length > 0 && (
          <div className="mt-8 hidden overflow-x-auto border border-ink-line lg:block">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-ink-line bg-ink-soft text-xs uppercase tracking-widest text-ivory-dim">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date / Time</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Address</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Deposit</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-line">
                {bookings.map((b) => (
                  <tr key={b.id} className="align-top hover:bg-ink-soft/60">
                    <td className="px-4 py-3">
                      <RescheduleForm b={b} compact />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-ivory">{b.serviceName}</span>
                      <span className="block text-xs text-ivory-dim">
                        {vehicleLabel(b.vehicleType)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-ivory">{b.name}</span>
                      <a href={`tel:${b.phone}`} className="block text-xs text-gold">
                        {b.phone}
                      </a>
                      <a href={`mailto:${b.email}`} className="block text-xs text-ivory-dim">
                        {b.email}
                      </a>
                      {b.notes && (
                        <span className="mt-1 block max-w-[240px] text-xs italic text-ivory-dim/70">
                          “{b.notes}”
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-ivory-dim">
                      {b.address ? (
                        <a
                          href={mapsHref(b.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="max-w-[200px] underline-offset-2 hover:text-gold hover:underline"
                        >
                          {b.address}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gold">${b.priceQuoted}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`border px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${paymentStyles[b.paymentStatus] ?? "border-ink-line text-ivory-dim"}`}
                      >
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusForm b={b} compact />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
