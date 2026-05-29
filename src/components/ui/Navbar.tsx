"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useScroll } from "../../hooks/useScroll";
import { navDrawerItems, siteConfig } from "../../lib/data";

export default function Navbar() {
  const prefersReducedMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const glass = scrollY > 50;

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
    <nav
      className={`fixed left-0 top-0 z-[70] w-full transition-all duration-300 ease-out ${glass ? "border-b border-white/6 bg-[rgba(5,5,5,0.8)] backdrop-blur-[20px]" : "bg-transparent"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10"
      >
        <a
          className="group inline-flex items-center gap-3"
          href="#home"
          aria-label="Go to top"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/30 bg-[linear-gradient(135deg,rgba(59,130,246,0.95),rgba(124,58,237,0.95))] text-sm font-semibold text-white shadow-[0_0_24px_rgba(59,130,246,0.35)]">
            SP
          </span>
          <span className="hidden text-sm font-medium tracking-[0.32em] text-slate-100/85 group-hover:text-white sm:inline-flex">
            Sankalp Pingalwad
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navDrawerItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="group relative text-sm text-slate-200/80 transition-colors hover:text-blue-400"
              whileHover={prefersReducedMotion ? undefined : { y: -1 }}
            >
              {item.label}
              <span className="absolute left-0 top-full mt-1 h-px w-full origin-left scale-x-0 bg-blue-400 transition-transform duration-300 group-hover:scale-x-100" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.resume}
            download
            className="hidden rounded-full border border-blue-500/80 px-4 py-2 text-sm text-blue-400 transition hover:bg-blue-500 hover:text-white sm:inline-flex"
          >
            Resume →
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-blue-400/35 hover:bg-blue-400/10 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={`h-px w-5 bg-current transition ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span
                className={`h-px w-5 bg-current transition ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-px w-5 bg-current transition ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="border-t border-white/6 bg-[rgba(5,5,5,0.96)] px-5 pb-5 pt-3 backdrop-blur-[20px] lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {navDrawerItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-white/6 bg-white/4 px-4 py-3 text-sm text-slate-100/85 transition hover:border-blue-400/35 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={siteConfig.resume}
                download
                className="mt-2 rounded-2xl border border-blue-500/70 px-4 py-3 text-center text-sm text-blue-400 transition hover:bg-blue-500 hover:text-white"
              >
                Resume →
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
