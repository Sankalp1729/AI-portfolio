"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";

const STORAGE_KEY = "sp-avatar-intro-seen";
const introText =
  "Hi, I'm Sankalp. I build AI systems, intelligent products, and multi-agent architectures. Explore my work.";
const typingDelay = 40;

function getIntroDuration(text: string) {
  return 1000 + text.length * typingDelay + 1500;
}

function useTypingText(text: string, enabled: boolean) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!enabled) {
      setValue(text);
      return;
    }

    setValue("");
    let index = 0;
    const intervalId = window.setInterval(() => {
      index += 1;
      setValue(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(intervalId);
      }
    }, typingDelay);

    return () => window.clearInterval(intervalId);
  }, [enabled, text]);

  return value;
}

export default function AvatarIntro() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showOrb, setShowOrb] = useState(false);
  const typedText = useTypingText(
    introText,
    mounted && showIntro && !prefersReducedMotion,
  );

  useEffect(() => {
    setMounted(true);

    if (prefersReducedMotion) {
      setShowIntro(false);
      setShowOrb(true);
      return;
    }

    const alreadySeen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    setShowIntro(!alreadySeen);
    setShowOrb(alreadySeen);

    if (!alreadySeen) {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!mounted || !showIntro || prefersReducedMotion) {
      return;
    }

    const morphDelay = getIntroDuration(introText);
    const closeDelay = morphDelay + 900;
    const orbTimer = window.setTimeout(
      () => setShowOrb(true),
      closeDelay + 250,
    );
    const closeTimer = window.setTimeout(
      () => setShowIntro(false),
      closeDelay,
    );

    return () => {
      window.clearTimeout(orbTimer);
      window.clearTimeout(closeTimer);
    };
  }, [mounted, showIntro, prefersReducedMotion]);

  return (
    <LayoutGroup>
      <AnimatePresence>
        {showIntro ? (
          <motion.div
            className="fixed inset-0 z-[80] overflow-hidden bg-[#050505]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.12),transparent_26%)]" />
            <button
              type="button"
              onClick={() => setShowIntro(false)}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-100/80 transition hover:border-blue-400/40 hover:text-white"
            >
              Skip Intro →
            </button>

            <motion.div
              className="absolute inset-0 flex items-center justify-center px-6"
              initial={false}
              animate={
                prefersReducedMotion ? { opacity: 1 } : { opacity: [0, 1] }
              }
              transition={{ duration: 1 }}
            >
              <div className="flex w-full max-w-2xl flex-col items-center text-center">
                <motion.div
                  layoutId="avatar-orb"
                  className="relative mb-8 h-52 w-52 overflow-hidden rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_center,rgba(59,130,246,0.72),rgba(5,5,5,0.12)_45%,rgba(5,5,5,0.96)_74%)] shadow-[0_0_80px_rgba(59,130,246,0.24)] sm:h-64 sm:w-64"
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 1, scale: 1 }
                  }
                  exit={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 0, scale: 0.82 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 20,
                    duration: 0.8,
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.55),rgba(5,5,5,0.16)_45%,rgba(5,5,5,0.92)_74%)]" />
                  <div className="absolute inset-5 rounded-full border border-blue-400/20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_36%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-24 w-24 sm:h-32 sm:w-32">
                      <div className="absolute left-1/2 top-0 h-11 w-11 -translate-x-1/2 rounded-full border border-white/18 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),rgba(59,130,246,0.48)_62%,rgba(5,5,5,0.72)_100%)] shadow-[0_0_32px_rgba(59,130,246,0.38)] sm:h-14 sm:w-14" />
                      <div className="absolute bottom-0 left-1/2 h-16 w-12 -translate-x-1/2 rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(125,211,252,0.22),rgba(15,23,42,0.92))] shadow-[0_0_36px_rgba(37,99,235,0.32)] sm:h-20 sm:w-16" />
                      <div className="absolute inset-x-2 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(125,211,252,0.5),transparent)] blur-[1px]" />
                    </div>
                  </div>
                </motion.div>

                <div className="min-h-28 max-w-xl text-balance text-lg leading-8 text-slate-100 transition-opacity duration-500 sm:text-2xl sm:leading-9">
                  {typedText}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {showOrb ? (
        <motion.button
          type="button"
          layoutId="avatar-orb"
          onClick={() => {
            setShowIntro(true);
            setShowOrb(false);
            window.sessionStorage.setItem(STORAGE_KEY, "1");
          }}
          className="fixed bottom-6 right-6 z-[75] flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-blue-400/30 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.92),rgba(37,99,235,0.55))] shadow-[0_0_30px_rgba(59,130,246,0.35)]"
          aria-label="Replay avatar intro"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          <span className="h-3 w-3 rounded-full bg-white/90" />
        </motion.button>
      ) : null}
    </LayoutGroup>
  );
}
