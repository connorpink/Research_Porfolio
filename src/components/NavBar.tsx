import { motion, useScroll, useSpring } from "motion/react";
import { siteConfig } from "@/data/site";

export function NavBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.2,
  });

  return (
    <div className="sticky top-0 z-50">
      <motion.div
        className="h-[2px] origin-left bg-[linear-gradient(90deg,var(--color-signal),var(--color-signal-2))]"
        style={{ scaleX }}
      />
      <nav className="shell mt-4">
        <div className="panel grid-overlay flex items-center justify-between gap-4 overflow-x-auto px-4 py-3 sm:px-6">
          <a href="/" className="shrink-0 font-mono text-sm uppercase tracking-[0.3em] text-white">
            {siteConfig.name}
          </a>
          <div className="flex min-w-max items-center gap-2 sm:gap-3">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
