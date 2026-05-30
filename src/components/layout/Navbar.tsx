"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScroll } from "@/hooks/useScroll";
import { navItems } from "@/lib/data";

const springHover = { type: "spring" as const, stiffness: 400, damping: 25 };

export default function Navbar() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const isScrolled = scrollY > 50;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [mobileOpen]);

  return (
    <header className="fixed left-0 top-0 z-[70] w-full">
      <nav
        className={`w-full transition-all duration-300 ease-out ${
          isScrolled
            ? "border-b border-[var(--border)] bg-[rgba(5,5,5,0.8)] backdrop-blur-[20px]"
            : "border-b border-transparent bg-transparent"
        }`}
        aria-label="Primary"
      >
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10"
        >
          <a href="#home" className="group inline-flex items-center gap-3" aria-label="Go to top">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/25 bg-[linear-gradient(135deg,var(--accent-blue)_0%,var(--accent-purple)_100%)] font-[family-name:var(--font-syne)] text-sm font-bold tracking-tight text-white shadow-[0_0_24px_rgba(59,130,246,0.35)] transition-transform duration-300 group-hover:scale-[1.03]">
              SP
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="group relative text-sm text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--accent-blue)]"
                whileHover={prefersReducedMotion ? undefined : { y: -1, ...springHover }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent-blue)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              href="/resume/resume.pdf"
              download="Sankalp_Pingalwad_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-[var(--accent-blue)] px-4 py-2 text-sm text-[var(--accent-blue)] transition-colors duration-300 hover:bg-[var(--accent-blue)] hover:text-white sm:inline-flex"
              whileHover={prefersReducedMotion ? undefined : springHover}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97, ...springHover }}
            >
              Resume →
            </motion.a>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-blue-400/35 hover:bg-blue-400/10 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span className="flex flex-col gap-1.5">
                <span
                  className={`h-px w-5 bg-current transition-transform duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
                />
                <span
                  className={`h-px w-5 bg-current transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`h-px w-5 bg-current transition-transform duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              id="mobile-nav-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden border-t border-[var(--border)] bg-[rgba(5,5,5,0.96)] backdrop-blur-[20px] lg:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 pb-5 pt-3">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.35 }}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--glass-bg)] px-4 py-3 text-sm text-[var(--text-primary)] transition hover:border-blue-400/35 hover:text-white"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <a
                  href="/resume/resume.pdf"
                  download="Sankalp_Pingalwad_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 rounded-2xl border border-[var(--accent-blue)] px-4 py-3 text-center text-sm text-[var(--accent-blue)] transition hover:bg-[var(--accent-blue)] hover:text-white"
                >
                  Resume →
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </header>
  );
}
