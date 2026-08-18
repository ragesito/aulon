"use server";

import { prisma } from "@/lib/prisma";

/**
 * Time slots already taken on a given date.
 * Cancelled bookings free their slot again. Returns only slot labels —
 * no customer data is exposed.
 */
export async function getTakenSlots(date: string): Promise<string[]> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  try {
    const rows = await prisma.booking.findMany({
      where: { date, status: { not: "cancelled" } },
      select: { timeSlot: true },
    });
    return rows.map((r) => r.timeSlot);
  } catch (err) {
    console.error("[availability] db error:", err);
    return [];
  }
}
