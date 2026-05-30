"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { fadeUp, sectionStagger, viewportReveal } from "../../lib/animations";
import { siteConfig } from "../../lib/data";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

function ContactIcon({
  icon,
}: {
  icon: "mail" | "linkedin" | "github" | "pin";
}) {
  switch (icon) {
    case "mail":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          aria-hidden="true"
        >
          <path d="M4 7.5h16v9H4z" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="m4 8 8 5 8-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6.5 9.5V18m0-7.1V7.7m0 1.8h.02M11 18v-4.7c0-1.7.9-2.8 2.4-2.8 1.4 0 2.1.9 2.1 2.7V18M11 13.2V18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 4h16v16H4z"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.35"
          />
        </svg>
      );
    case "github":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 4.3a7.6 7.6 0 0 0-2.4 14.8c.4.1.5-.2.5-.4v-1.5c-2 .4-2.4-.8-2.4-.8-.3-.8-.8-1.2-.8-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.6-.2-3.2-.8-3.2-3.6 0-.8.3-1.5.8-2-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.7 7.7 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2 0 2.8-1.6 3.4-3.2 3.6.3.2.5.8.5 1.6v2.4c0 .2.1.5.5.4A7.6 7.6 0 0 0 12 4.3Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "pin":
      return (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 21s5-4.3 5-10a5 5 0 0 0-10 0c0 5.7 5 10 5 10Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="11" r="1.7" fill="currentColor" />
        </svg>
      );
  }
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
    <div className="flex items-center gap-4 rounded-[24px] border border-white/6 bg-[rgba(255,255,255,0.04)] px-5 py-4 transition duration-300 hover:border-blue-400/25 hover:bg-[rgba(59,130,246,0.08)]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-100 shadow-[0_0_20px_rgba(59,130,246,0.12)]">
        <ContactIcon icon={icon} />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
          {label}
        </div>
        <div className="truncate text-sm text-white sm:text-base">{value}</div>
      </div>
    </div>
  );

  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {content}
    </a>
  ) : (
    <button type="button" onClick={onCopy} className="text-left">
      {content}
    </button>
  );
}

export default function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText("pingalwadsankalp1729@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState === "submitting") {
      return;
    }

    setSubmitState("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setSubmitState("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-6 py-24 text-white sm:px-10 lg:px-16"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.12),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.08),transparent_30%)]"
        animate={
          prefersReducedMotion ? { opacity: 0.75 } : { opacity: [0.6, 1, 0.6] }
        }
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="mx-auto max-w-7xl space-y-10"
        variants={sectionStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
      >
        <div className="space-y-4">
          <motion.p
            className="text-sm uppercase tracking-[0.42em] text-cyan-200/70"
            variants={fadeUp}
          >
            Contact
          </motion.p>
          <motion.h2
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            variants={fadeUp}
          >
            Let's Build Intelligent Systems Together
          </motion.h2>
          <motion.p
            className="max-w-3xl text-base leading-8 text-slate-300/90 sm:text-lg"
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
              value="pingalwadsankalp1729@gmail.com"
              onCopy={handleCopy}
            />
            {copied ? (
              <div className="ml-1 text-xs uppercase tracking-[0.28em] text-blue-300">
                Email copied to clipboard
              </div>
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
            className="relative overflow-hidden rounded-[32px] border border-white/8 bg-[rgba(255,255,255,0.04)] p-6 backdrop-blur-2xl sm:p-8"
            variants={fadeUp}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-200/80">
                <span>Name</span>
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/30"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-200/80">
                <span>Email</span>
                <input
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/30"
                />
              </label>
            </div>
            <div className="mt-4 grid gap-4">
              <label className="space-y-2 text-sm text-slate-200/80">
                <span>Subject</span>
                <input
                  value={form.subject}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      subject: event.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Project, role, or research collaboration"
                  className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/30"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-200/80">
                <span>Message</span>
                <textarea
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                  rows={6}
                  placeholder="Tell me what you are building and what outcome matters most."
                  className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/30"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-300/75">
                Prefer email? Reach me at{" "}
                {siteConfig.email.replace("mailto:", "")}
              </div>
              <motion.button
                type="submit"
                className="inline-flex min-w-48 items-center justify-center rounded-full bg-blue-500 px-8 py-3.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(59,130,246,0.22)] transition hover:bg-blue-600"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                disabled={submitState === "submitting"}
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
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12.5 9.2 16.7 19 7"
                          stroke="currentColor"
                          strokeWidth="2.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Message sent!
                    </motion.span>
                  ) : submitState === "submitting" ? (
                    <motion.span
                      key="submitting"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      Sending...
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

            {submitState === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 text-sm text-emerald-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12.5 9.2 16.7 19 7"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Message sent! I&apos;ll get back to you soon.
              </motion.div>
            ) : null}

            {submitState === "error" ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-sm text-rose-300"
              >
                Something went wrong. Email me directly.
              </motion.div>
            ) : null}
          </motion.form>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/8 pt-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>Built by Sankalp Pingalwad · 2026</span>
          <span>Made with Next.js + ❤️</span>
        </div>
      </motion.div>
    </section>
  );
}
