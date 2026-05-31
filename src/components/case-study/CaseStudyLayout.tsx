"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

interface CaseStudyLayoutProps {
  children: React.ReactNode;
  sections?: Section[];
}

const defaultSections: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "solution", label: "Solution" },
  { id: "architecture", label: "Architecture" },
  { id: "tradeoffs", label: "Trade-offs" },
  { id: "metrics", label: "Metrics" },
  { id: "reflection", label: "Reflection" },
];

export default function CaseStudyLayout({
  children,
  sections = defaultSections,
}: CaseStudyLayoutProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-20% 0px -55% 0px", // Trigger when section is in upper-middle viewport
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [sections]);

  const handleDotClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F8FAFC]">
      {/* Scroll Progress Bar at very top */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 bg-[#3B82F6] origin-left"
        style={{ scaleX }}
      />

      {/* Dynamic Background Gradients matching portfolio design system */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.05),transparent_35%)]" />

      {/* STICKY SIDEBAR DOT-NAVIGATION (Desktop Only, lg+) */}
      <aside className="fixed left-8 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-6 lg:flex">
        <div className="relative flex flex-col gap-5 border-l border-white/5 pl-4 py-2">
          {sections.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => handleDotClick(id)}
                className="group flex items-center gap-3 text-left transition duration-300 focus:outline-none cursor-pointer"
              >
                {/* Visual Dot: 8px circle, active = filled blue #3B82F6, inactive = border only */}
                <span
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-[#3B82F6] scale-125 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                      : "border border-slate-600 bg-transparent group-hover:border-slate-300"
                  }`}
                />
                {/* Active Muted Text Labels: text-xs uppercase tracking-widest, active = white, inactive = muted */}
                <span
                  className={`font-[family-name:var(--font-syne)] text-[10px] uppercase tracking-[0.25em] transition-all duration-300 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* MAIN SINGLE COLUMN CONTAINER */}
      <main className="relative z-10 mx-auto max-w-4xl px-6 py-24 sm:px-8">
        {/* Back Button top-left */}
        <div className="flex items-center mb-16">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300 transition duration-300 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            <span>Back to Portfolio</span>
          </Link>
        </div>

        {/* Section Entrances: animated via Framer Motion */}
        {children}
      </main>
    </div>
  );
}
