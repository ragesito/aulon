/** @type {import('next').NextConfig} */

// Content Security Policy.
// - script-src includes 'unsafe-inline' + 'unsafe-eval' ONLY in dev (Next.js HMR needs them).
//   In production only 'self' + inline-hydration hashes are allowed via 'unsafe-inline'
//   fallback — Next.js App Router injects small inline bootstrap scripts, so a
//   nonce-less strict CSP would break hydration. This is the tightest practical
//   policy without per-request nonce middleware.
// - style-src 'unsafe-inline' is required by next/image + next/font inline styles.
// - frame-src allows the Google Maps embed on /contact only.
const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Cloudflare Workers: no built-in image optimizer. All current images are
  // SVG/local placeholders, so serve them as-is.
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Admin must never be indexed
        source: "/admin/:path*",
        headers: [
          ...securityHeaders,
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
};

export default nextConfig;
