"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { fadeUp, sectionStagger, viewportReveal } from "@/lib/animations";
import { siteConfig } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const CONTACT_EMAIL = "pingalwadsankalp1729@gmail.com";

function ContactIcon({ icon }: { icon: "mail" | "linkedin" | "github" | "pin" }) {
  const paths = {
    mail: (
      <>
        <path d="M4 7.5h16v9H4z" stroke="currentColor" strokeWidth="1.8" />
        <path d="m4 8 8 5 8-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </>
    ),
    linkedin: (
      <path
        d="M6.5 9.5V18m0-7.1V7.7m0 1.8h.02M11 18v-4.7c0-1.7.9-2.8 2.4-2.8 1.4 0 2.1.9 2.1 2.7V18M11 13.2V18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    github: (
      <path
        d="M12 4.3a7.6 7.6 0 0 0-2.4 14.8c.4.1.5-.2.5-.4v-1.5c-2 .4-2.4-.8-2.4-.8-.3-.8-.8-1.2-.8-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.6-.2-3.2-.8-3.2-3.6 0-.8.3-1.5.8-2-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.7 7.7 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2 0 2.8-1.6 3.4-3.2 3.6.3.2.5.8.5 1.6v2.4c0 .2.1.5.5.4A7.6 7.6 0 0 0 12 4.3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
    pin: (
      <>
        <path d="M12 21s5-4.3 5-10a5 5 0 0 0-10 0c0 5.7 5 10 5 10Z" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="11" r="1.7" fill="currentColor" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      {paths[icon]}
    </svg>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  onCopy,
}: {
  icon: "mail" | "linkedin" | "github" | "pin";
  label: string;
  value: string;
  href?: string;
  onCopy?: () => void;
}) {
  const content = (
    <div className="flex items-center gap-4 glass-panel px-5 py-4 transition duration-300 hover:border-blue-400/25 hover:bg-[rgba(59,130,246,0.08)]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-100 shadow-[0_0_20px_rgba(59,130,246,0.12)]">
        <ContactIcon icon={icon} />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-[0.28em] text-[var(--text-muted)]">
          {label}
        </div>
        <div className="truncate text-sm sm:text-base">{value}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        data-hoverable="true"
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onCopy} data-hoverable="true" className="w-full text-left">
      {content}
    </button>
  );
}

export default function ContactSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success">("idle");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      "",
      form.message,
    ].join("\n");

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.subject || "Portfolio inquiry")}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitState("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative overflow-hidden bg-[var(--bg-surface)] px-6 py-24 text-[var(--text-primary)] sm:px-10 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.12),transparent_34%)]"
        aria-hidden
      />

      <motion.div
        className="mx-auto max-w-7xl space-y-10"
        variants={sectionStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
      >
        <div className="space-y-4">
          <motion.h2
            className="font-[family-name:var(--font-syne)] text-4xl font-bold tracking-tight sm:text-5xl"
            variants={fadeUp}
          >
            Let&apos;s Build Intelligent Systems Together
          </motion.h2>
          <motion.p
            className="max-w-3xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg"
            variants={fadeUp}
          >
            Open to full-time AI/ML engineering roles, research collaborations,
            and consulting.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-4">
            <ContactRow
              icon="mail"
              label="Email"
              value={CONTACT_EMAIL}
              onCopy={handleCopy}
            />
            {copied ? (
              <p className="ml-1 text-xs uppercase tracking-[0.28em] text-[var(--accent-blue)]">
                Email copied to clipboard
              </p>
            ) : null}
            <ContactRow
              icon="linkedin"
              label="LinkedIn"
              value="linkedin.com/in/pingalwadsankalp"
              href={siteConfig.linkedin}
            />
            <ContactRow
              icon="github"
              label="GitHub"
              value="github.com/Sankalp1729"
              href={siteConfig.github}
            />
            <ContactRow icon="pin" label="Location" value="Mumbai, India" />
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="glass-panel p-6 sm:p-8"
            variants={fadeUp}
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-[var(--text-secondary)]">
                <span>Name</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))}
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-[var(--border)] bg-black/25 px-4 py-3 outline-none transition placeholder:text-[var(--text-muted)] focus:border-blue-400/30"
                />
              </label>
              <label className="space-y-2 text-sm text-[var(--text-secondary)]">
                <span>Email</span>
                <input
                  value={form.email}
                  onChange={(e) => setForm((c) => ({ ...c, email: e.target.value }))}
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-2xl border border-[var(--border)] bg-black/25 px-4 py-3 outline-none transition placeholder:text-[var(--text-muted)] focus:border-blue-400/30"
                />
              </label>
            </div>
            <div className="mt-4 grid gap-4">
              <label className="space-y-2 text-sm text-[var(--text-secondary)]">
                <span>Subject</span>
                <input
                  value={form.subject}
                  onChange={(e) => setForm((c) => ({ ...c, subject: e.target.value }))}
                  type="text"
                  required
                  placeholder="Project, role, or research collaboration"
                  className="w-full rounded-2xl border border-[var(--border)] bg-black/25 px-4 py-3 outline-none transition placeholder:text-[var(--text-muted)] focus:border-blue-400/30"
                />
              </label>
              <label className="space-y-2 text-sm text-[var(--text-secondary)]">
                <span>Message</span>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((c) => ({ ...c, message: e.target.value }))}
                  rows={6}
                  required
                  placeholder="Tell me what you are building and what outcome matters most."
                  className="w-full rounded-2xl border border-[var(--border)] bg-black/25 px-4 py-3 outline-none transition placeholder:text-[var(--text-muted)] focus:border-blue-400/30"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[var(--text-muted)]">
                Opens your email client with a pre-filled message.
              </p>
              <motion.button
                type="submit"
                data-hoverable="true"
                className="inline-flex min-w-48 items-center justify-center rounded-full bg-[var(--accent-blue)] px-8 py-3.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(59,130,246,0.22)] transition hover:bg-[var(--accent-blue-glow)]"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                <AnimatePresence mode="wait">
                  {submitState === "success" ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                        <path
                          d="M5 12.5 9.2 16.7 19 7"
                          stroke="currentColor"
                          strokeWidth="2.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Ready to send!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      Send Message →
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.form>
        </div>

        <footer className="flex flex-col gap-2 border-t border-[var(--border)] pt-5 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>Built by Sankalp Pingalwad · 2026</span>
          <span>Made with Next.js + ❤️</span>
        </footer>
      </motion.div>
    </section>
  );
}
