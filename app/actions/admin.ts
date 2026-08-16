"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const statusSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
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
