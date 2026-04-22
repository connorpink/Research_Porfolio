import { siteConfig } from "@/data/site";

type Props = {
  compact?: boolean;
};

function SocialIcon({ icon, className }: { icon?: string; className: string }) {
  if (icon === "github") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.344-3.369-1.344-.455-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.706.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .269.18.58.688.481A10.019 10.019 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.96 1.96 0 1 0 5.3 6.92 1.96 1.96 0 0 0 5.25 3ZM20 12.78c0-3.47-1.85-5.08-4.32-5.08-1.99 0-2.88 1.1-3.37 1.86V8.5H8.94c.04.7 0 11.5 0 11.5h3.37v-6.42c0-.34.03-.68.13-.92.27-.68.88-1.38 1.9-1.38 1.34 0 1.88 1.04 1.88 2.56V20H20v-7.22Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 7h16v10H4z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m5 8 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SocialLinks({ compact = false }: Props) {
  const iconClass = compact ? "h-4 w-4" : "h-5 w-5";
  const linkClass = compact
    ? "group inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[var(--color-muted)] [font-family:var(--font-mono)]"
    : "group inline-flex items-center gap-3 rounded-full border px-4 py-3 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[var(--color-muted)] [font-family:var(--font-mono)]";

  return (
    <div className="flex flex-wrap gap-3">
      {siteConfig.socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noreferrer"
          className={linkClass}
          style={{
            borderColor: "var(--color-line)",
            background: "rgba(255, 255, 255, 0.04)",
          }}
        >
          <span className="text-[var(--color-accent)] transition-colors group-hover:text-[var(--color-accent-strong)]">
            <SocialIcon icon={link.icon} className={iconClass} />
          </span>
          <span className="group-hover:text-[var(--color-text)]">{link.label}</span>
        </a>
      ))}
    </div>
  );
}
