"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { AchievementItem } from "@/types";

type AchievementModalProps = {
  achievement: AchievementItem | null;
  isOpen: boolean;
  onClose: () => void;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function AchievementModal({
  achievement,
  isOpen,
  onClose,
}: AchievementModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (!achievement || !isOpen) return;
    setImageError(false);
    setImageLoading(true);
  }, [achievement, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocusedElement = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFirstElement = () => {
      const container = modalRef.current;
      if (!container) return;

      const focusableElements = container.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR,
      );
      const firstFocusable = focusableElements[0] ?? container;
      firstFocusable.focus();
    };

    const raf = window.requestAnimationFrame(focusFirstElement);

    const handleKeydown = (event: KeyboardEvent) => {
      if (!modalRef.current) return;

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        modalRef.current.focus();
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      window.cancelAnimationFrame(raf);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeydown);
      previousFocusedElement?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && achievement ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-6 py-10 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="achievement-modal-title"
            tabIndex={-1}
            className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-[var(--border)] bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:border-blue-400/40 hover:text-white"
            >
              ✕ Close
            </button>

            <div className="relative h-64 overflow-hidden rounded-2xl border border-[var(--border)]">
              {imageLoading ? (
                <div className="absolute inset-0 animate-pulse bg-white/5" />
              ) : null}

              {!imageError ? (
                <Image
                  src={achievement.image}
                  alt={`${achievement.title} certificate preview`}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageError(true);
                    setImageLoading(false);
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--bg-card),rgba(59,130,246,0.15))] px-6 text-center text-sm uppercase tracking-[0.25em] text-[var(--text-muted)]">
                  Certificate Preview Unavailable
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <h3
                id="achievement-modal-title"
                className="font-[family-name:var(--font-syne)] text-2xl font-bold text-white"
              >
                {achievement.title}
              </h3>

              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em]">
                <span className="rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1.5 text-blue-100">
                  {achievement.organization}
                </span>
                <span className="rounded-full border border-[var(--border)] bg-black/30 px-3 py-1.5 text-[var(--text-muted)]">
                  {achievement.month} {achievement.year}
                </span>
              </div>

              <p className="text-sm leading-7 text-[var(--text-secondary)]">
                {achievement.description}
              </p>

              <a
                href={achievement.credentialLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-blue-400/35 bg-blue-500/10 px-5 py-2.5 text-xs uppercase tracking-[0.26em] text-blue-100 transition hover:bg-blue-500/20"
              >
                View Credential →
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
