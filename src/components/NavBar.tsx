import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

type Theme = "light" | "dark";

type NavIconName = "home" | "projects" | "research" | "resume" | "contact";

type Props = {
  currentPath: string;
};

declare global {
  interface Window {
    __setPreferredTheme?: (theme: Theme) => void;
  }
}

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "dark") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d="M18 15.5A6.5 6.5 0 0 1 8.5 6a7.5 7.5 0 1 0 9.5 9.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12H2.75M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23 5.46 5.46"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NavIcon({ name, className }: { name: NavIconName; className?: string }) {
  if (name === "home") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M4 10.5 12 4l8 6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 9.5V20h10V9.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "projects") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="4" y="5" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M4 9h16M10 9v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "research") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 5.5h8a3 3 0 0 1 3 3v10H9a3 3 0 0 0-3 3V5.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9 8.5h5M9 12h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "resume") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M8 4h6l4 4v12H8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M14 4v4h4M10 13h6M10 16h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 7h14v10H5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m6 8 6 4 6-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NavBar({ currentPath }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: shouldReduceMotion ? 1000 : 180,
    damping: shouldReduceMotion ? 1000 : 30,
    mass: 0.2,
  });
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const syncTheme = () => {
      setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (typeof window.__setPreferredTheme === "function") {
      window.__setPreferredTheme(nextTheme);
      return;
    }

    document.documentElement.dataset.theme = nextTheme;
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return currentPath === "/";
    }

    if (href === "/") {
      return currentPath === "/";
    }

    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 pt-4 md:pt-5">
        <motion.div
          aria-hidden="true"
          className="origin-left"
          style={{
            scaleX,
            height: "2px",
            opacity: 0.55,
            background:
              "linear-gradient(90deg, var(--color-accent), rgba(255,255,255,0.1) 42%, transparent)",
          }}
        />
        <nav className="shell mt-3 hidden md:block">
          <div className="panel craft-card nav-shell px-4 py-3 sm:px-5">
            <div className="nav-desktop">
              {siteConfig.nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <div key={item.href} className="relative">
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="nav-indicator"
                        transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 34 }}
                      />
                    )}
                    <a href={item.href} className="nav-link" data-active={active}>
                      {item.label}
                    </a>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <ThemeIcon theme={theme} />
              <span className="theme-toggle-label">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
          </div>
        </nav>
      </header>

      <button
        type="button"
        className="theme-toggle theme-toggle--mobile"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <ThemeIcon theme={theme} />
      </button>

      <nav className="nav-mobile-wrap" aria-label="Mobile navigation">
        <div className="nav-mobile">
          {siteConfig.nav.map((item) => {
            const active = isActive(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                className="nav-dock-link"
                data-active={active}
                aria-current={active ? "page" : undefined}
              >
                <NavIcon name={item.icon as NavIconName} className="h-5 w-5" />
                <span className="nav-dock-label">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
