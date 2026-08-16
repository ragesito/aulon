import { site } from "@/content/site";

const icons = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.36 1.05.42 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.06 1.18-.25 1.8-.42 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.17-1.05.36-2.23.42-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.18-.06-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.36-1.05-.42-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.06-1.18.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.05-.36 2.23-.42C8.42 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.74.07-1.1.05-1.7.23-2.1.39-.52.2-.9.45-1.28.84-.4.39-.63.76-.84 1.29-.16.4-.34 1-.39 2.1C2.6 8.5 2.6 8.84 2.6 12s0 3.5.06 4.74c.05 1.1.23 1.7.4 2.1.2.53.44.9.83 1.29.39.39.76.63 1.29.84.4.15 1 .33 2.1.38 1.24.06 1.59.07 4.74.07s3.5 0 4.74-.07c1.1-.05 1.7-.23 2.1-.38a3.5 3.5 0 0 0 1.29-.84c.39-.4.63-.76.84-1.29.15-.4.33-1 .38-2.1.06-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.05-1.1-.23-1.7-.38-2.1a3.5 3.5 0 0 0-.84-1.29 3.5 3.5 0 0 0-1.29-.84c-.4-.16-1-.34-2.1-.39C15.5 4 15.16 4 12 4Zm0 3.13a5.03 5.03 0 1 1 0 10.06A5.03 5.03 0 0 1 12 7.13Zm0 8.29a3.27 3.27 0 1 0 0-6.53 3.27 3.27 0 0 0 0 6.53Zm5.23-9.65a1.18 1.18 0 1 1 0 2.35 1.18 1.18 0 0 1 0-2.35Z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M16.6 3c.36 1.9 1.62 3.35 3.4 3.75v3.06c-1.26.03-2.44-.34-3.4-1.02v6.62A5.6 5.6 0 1 1 11 9.85c.32 0 .63.03.94.09v3.13a2.55 2.55 0 1 0 1.78 2.44V3h2.87Z" />
    </svg>
  ),
};

export default function SocialLinks({ className = "" }: { className?: string }) {
  const links = [
    { href: site.social.instagram, label: "Instagram", icon: icons.instagram },
    { href: site.social.facebook, label: "Facebook", icon: icons.facebook },
    { href: site.social.tiktok, label: "TikTok", icon: icons.tiktok },
  ];
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${l.label} (opens in new tab)`}
            className="flex h-11 w-11 items-center justify-center border border-ink-line text-ivory-dim transition-all duration-300 hover:border-gold hover:text-gold"
          >
            {l.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
