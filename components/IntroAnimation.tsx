import Image from "next/image";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  <IntroAnimation /> — MOUNT POINT for the logo entrance animation.
 *
 *  Rendered on the SERVER so the overlay exists in the very first painted
 *  frame: no flash of the page before it appears. It dismisses itself with
 *  a pure CSS animation, so it can never trap the page if JS fails.
 *
 *  The tiny inline script runs before the overlay is parsed and marks the
 *  session as "seen", so only the first page view of a session plays it.
 *  In development it always plays (easier to iterate on the animation).
 * ─────────────────────────────────────────────────────────────────────────
 */
export default function IntroAnimation() {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <>
      {!isDev && (
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('aulon-intro-seen')){document.documentElement.setAttribute('data-intro','seen')}else{sessionStorage.setItem('aulon-intro-seen','1')}}catch(e){}`,
          }}
        />
      )}
      <div
        aria-hidden="true"
        className="intro-overlay pointer-events-none fixed inset-0 z-[100] flex animate-intro-fade items-center justify-center bg-ink"
      >
        <div className="animate-intro-logo">
          <Image
            src="/logo/aulon.svg"
            alt=""
            width={320}
            height={103}
            priority
            className="h-auto w-56 sm:w-72"
          />
        </div>
      </div>
    </>
  );
}
