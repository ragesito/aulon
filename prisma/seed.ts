/**
 * Seeds example bookings for admin testing.
 * Run: npm run db:seed
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function daysFromNow(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  // skip Sundays â€” business is closed
  if (d.getDay() === 0) d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

async function main() {
  await prisma.booking.deleteMany();

  await prisma.booking.createMany({
    data: [
      {
        serviceSlug: "full-detail",
        serviceName: "Full Detail",
        vehicleType: "suv",
        priceQuoted: 199,
        date: daysFromNow(2),
        timeSlot: "9:00 AM",
        name: "Maria Gonzalez",
        phone: "(708) 555-0192",
        email: "maria.g@example.com",
        isMobile: true,
        address: "1500 N 19th Ave, Melrose Park, IL 60160",
        notes: "Dog hair in the trunk, please bring pet-hair tools.",
        status: "pending",
        paymentStatus: "paid",
      },
      {
        serviceSlug: "odor-treatment",
        serviceName: "Odor Treatment",
        vehicleType: "sedan",
        priceQuoted: 89,
        date: daysFromNow(5),
        timeSlot: "8:00 AM",
        name: "David Chen",
        phone: "(312) 555-0147",
        email: "dchen@example.com",
        isMobile: false,
        notes: "Bought the car used, strong cigarette smell. Wants it gone completely.",
        status: "confirmed",
        paymentStatus: "paid",
      },
      {
        serviceSlug: "interior-detail",
        serviceName: "Interior Detail",
        vehicleType: "truck",
        priceQuoted: 149,
        date: daysFromNow(-3),
        timeSlot: "1:00 PM",
        name: "Robert Miller",
        phone: "(708) 555-0110",
        email: "rmiller@example.com",
        isMobile: true,
        address: "220 Lake St, Oak Park, IL 60302",
        status: "completed",
        paymentStatus: "paid",
      },
      {
        serviceSlug: "exterior-detail",
        serviceName: "Exterior Detail",
        vehicleType: "coupe",
        priceQuoted: 85,
        date: daysFromNow(1),
        timeSlot: "3:00 PM",
        name: "Jasmine Lee",
        phone: "(773) 555-0166",
        email: "jlee@example.com",
        isMobile: false,
        status: "cancelled",
        paymentStatus: "unpaid",
      },
    ],
  });

  const count = await prisma.booking.count();
  console.log(`Seeded ${count} example bookings.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
