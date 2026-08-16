import { z } from "zod";
import { services, vehicleTypes } from "@/content/services";

const serviceSlugEnum = services.map((s) => s.slug) as [string, ...string[]];
const vehicleEnum = vehicleTypes.map((v) => v.value) as [string, ...string[]];

/** Business hours: 8am–6pm, Sundays blocked. */
export const TIME_SLOTS = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
] as const;

const nameField = z
  .string()
  .trim()
  .min(2, "Please enter your name")
  .max(80, "Name is too long")
  .regex(/^[\p{L}\p{M}' .-]+$/u, "Name contains invalid characters");

const phoneField = z
  .string()
  .trim()
  .min(7, "Please enter a valid phone number")
  .max(20, "Phone number is too long")
  .regex(/^[+()\d\s.-]+$/, "Phone number contains invalid characters");

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .email("Please enter a valid email")
  .max(120);

/** Shared anti-spam fields: honeypot must be empty, form must take >= 3s to fill. */
const antiSpam = {
  // Honeypot — real users never see or fill this field
  website: z.string().max(0, "Spam detected"),
  // Timestamp when the form was rendered (ms since epoch)
  startedAt: z.coerce.number().int().positive(),
};

export const bookingSchema = z
  .object({
    serviceSlug: z.enum(serviceSlugEnum),
    vehicleType: z.enum(vehicleEnum),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date")
      .refine((d) => {
        const dt = new Date(`${d}T12:00:00`);
        return !Number.isNaN(dt.getTime());
      }, "Invalid date")
      .refine((d) => {
        const dt = new Date(`${d}T12:00:00`);
        return dt.getDay() !== 0;
      }, "We are closed on Sundays. Please pick another day")
      .refine((d) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dt = new Date(`${d}T12:00:00`);
        return dt.getTime() >= today.getTime();
      }, "Please pick a date in the future")
      .refine((d) => {
        const max = new Date();
        max.setDate(max.getDate() + 90);
        const dt = new Date(`${d}T12:00:00`);
        return dt.getTime() <= max.getTime();
      }, "Please pick a date within the next 90 days"),
    timeSlot: z.enum(TIME_SLOTS),
    name: nameField,
    phone: phoneField,
    email: emailField,
    address: z
      .string()
      .trim()
      .min(8, "Please enter the address where we should come")
      .max(200, "Address is too long"),
    notes: z.string().trim().max(1000, "Notes are too long").optional().or(z.literal("")),
    ...antiSpam,
  });

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: nameField,
  email: emailField,
  message: z.string().trim().min(10, "Tell us a bit more").max(2000, "Message is too long"),
  ...antiSpam,
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Minimum time a human plausibly needs to fill the form. */
export function filledTooFast(startedAt: number, minMs = 3000): boolean {
  return Date.now() - startedAt < minMs;
}
