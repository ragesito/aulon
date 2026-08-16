"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { TIME_SLOTS } from "@/lib/validation";
import { sendMail, esc } from "@/lib/email";
import { site } from "@/content/site";

const statusSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
});

const rescheduleSchema = z.object({
  id: z.string().cuid(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date")
    .refine((d) => !Number.isNaN(new Date(`${d}T12:00:00`).getTime()), "Invalid date")
    .refine((d) => new Date(`${d}T12:00:00`).getDay() !== 0, "Closed on Sundays"),
  timeSlot: z.enum(TIME_SLOTS),
});

/** Defense in depth: middleware already gates /admin, but server actions are
 *  their own endpoints — verify Basic Auth again here. */
function isAuthorized(): boolean {
  const auth = headers().get("authorization");
  if (!auth?.startsWith("Basic ")) return false;
  const [user, pass] = Buffer.from(auth.slice(6), "base64").toString().split(":");
  return (
    user === process.env.ADMIN_USER &&
    pass === process.env.ADMIN_PASSWORD &&
    !!process.env.ADMIN_USER &&
    !!process.env.ADMIN_PASSWORD
  );
}

export async function updateBookingStatus(formData: FormData) {
  if (!isAuthorized()) throw new Error("Unauthorized");

  const parsed = statusSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) throw new Error("Invalid input");

  await prisma.booking.update({
    where: { id: parsed.data.id },
    data: { status: parsed.data.status },
  });

  revalidatePath("/admin");
}

/** Owner-side rescheduling: move a booking to a new date/time.
 *  The deposit stays with the booking. Customer is notified by email. */
export async function rescheduleBooking(formData: FormData) {
  if (!isAuthorized()) throw new Error("Unauthorized");

  const parsed = rescheduleSchema.safeParse({
    id: formData.get("id"),
    date: formData.get("date"),
    timeSlot: formData.get("timeSlot"),
  });
  if (!parsed.success) throw new Error("Invalid input");

  const booking = await prisma.booking.findUnique({
    where: { id: parsed.data.id },
  });
  if (!booking) throw new Error("Booking not found");

  const unchanged =
    booking.date === parsed.data.date && booking.timeSlot === parsed.data.timeSlot;
  if (unchanged) return;

  await prisma.booking.update({
    where: { id: booking.id },
    data: { date: parsed.data.date, timeSlot: parsed.data.timeSlot },
  });

  // Best-effort notification; rescheduling never fails because email failed
  await sendMail({
    to: booking.email,
    subject: `Your appointment was moved to ${parsed.data.date} at ${parsed.data.timeSlot}`,
    html: `<p>Hi ${esc(booking.name.split(" ")[0] ?? booking.name)},</p>
           <p>Your <strong>${esc(booking.serviceName)}</strong> appointment has been rescheduled:</p>
           <p><strong>New date:</strong> ${esc(parsed.data.date)} at ${esc(parsed.data.timeSlot)}<br/>
           <span style="color:#888;">(previously ${esc(booking.date)} at ${esc(booking.timeSlot)})</span></p>
           <p>Your deposit stays with your appointment. Questions? Call us at ${site.phone}.</p>`,
  });

  revalidatePath("/admin");
}
