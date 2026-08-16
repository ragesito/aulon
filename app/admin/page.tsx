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
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-ivory">Bookings</h1>
        <div className="mt-4 flex flex-wrap gap-3">
          {counts.map((c) => (
            <span
              key={c.status}
              className={`border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest ${statusStyles[c.status]}`}
            >
              {c.status}: {c.n}
            </span>
          ))}
        </div>

        <div className="mt-8 overflow-x-auto border border-ink-line">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-ink-line bg-ink-soft text-xs uppercase tracking-widest text-ivory-dim">
              <tr>
                <th className="px-4 py-3 font-semibold">Date / Time</th>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Vehicle</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Deposit</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-line">
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-ivory-dim">
                    No bookings yet.
                  </td>
                </tr>
              )}
              {bookings.map((b) => (
                <tr key={b.id} className="align-top hover:bg-ink-soft/60">
                  <td className="px-4 py-3">
                    {/* Reschedule: deposit stays with the booking; customer gets an email */}
                    <form action={rescheduleBooking} className="space-y-1.5">
                      <input type="hidden" name="id" value={b.id} />
                      <input
                        type="date"
                        name="date"
                        defaultValue={b.date}
                        required
                        className="block w-[150px] border border-ink-line bg-ink px-2 py-1 text-xs text-ivory [color-scheme:dark]"
                      />
                      <div className="flex items-center gap-1.5">
                        <select
                          name="timeSlot"
                          defaultValue={b.timeSlot}
                          className="border border-ink-line bg-ink px-2 py-1 text-xs text-ivory"
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
                          className="border border-gold/50 px-2 py-1 text-[10px] font-bold uppercase text-gold hover:bg-gold/10"
                        >
                          Move
                        </button>
                      </div>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-ivory">{b.serviceName}</td>
                  <td className="px-4 py-3 text-ivory-dim">
                    {vehicleTypes.find((v) => v.value === b.vehicleType)?.label ?? b.vehicleType}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-ivory">{b.name}</span>
                    <a href={`tel:${b.phone}`} className="block text-xs text-gold">{b.phone}</a>
                    <a href={`mailto:${b.email}`} className="block text-xs text-ivory-dim">{b.email}</a>
                    {b.notes && (
                      <span className="mt-1 block max-w-[240px] text-xs italic text-ivory-dim/70">
                        “{b.notes}”
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-ivory-dim">
                    {b.isMobile ? (
                      <>
                        <span className="text-gold">Mobile</span>
                        <span className="block max-w-[200px] text-xs">{b.address}</span>
                      </>
                    ) : (
                      "Drop-off"
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gold">${b.priceQuoted}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`border px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        b.paymentStatus === "paid"
                          ? "border-green-500/50 text-green-400"
                          : b.paymentStatus === "waived"
                            ? "border-ink-line text-ivory-dim"
                            : b.paymentStatus === "refunded"
                              ? "border-red-500/50 text-red-400"
                              : "border-yellow-500/50 text-yellow-400"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <form action={updateBookingStatus} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={b.id} />
                      <select
                        name="status"
                        defaultValue={b.status}
                        className={`border bg-ink px-2 py-1.5 text-xs font-semibold uppercase tracking-wider ${statusStyles[b.status] ?? "border-ink-line text-ivory"}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="border border-gold/50 px-3 py-1.5 text-xs font-bold uppercase text-gold hover:bg-gold/10"
                      >
                        Save
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
