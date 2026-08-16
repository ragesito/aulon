import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-ink px-4">
      <div className="text-center">
        <p className="kicker">404</p>
        <h1 className="mt-3 text-3xl font-bold text-ivory sm:text-4xl">
          This page took a wrong turn
        </h1>
        <p className="mt-4 text-ivory-dim">
          The page you&apos;re looking for doesn&apos;t exist, but your car still
          deserves that showroom finish.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-outline">
            Back Home
          </Link>
          <Link href="/book" className="btn-gold">
            Book a Detail
          </Link>
        </div>
      </div>
    </section>
  );
}
