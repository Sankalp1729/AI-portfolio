"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import FloatingOrb from "@/components/avatar/FloatingOrb";
import ProfileImage from "@/components/ui/ProfileImage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STORAGE_KEY = "sp-avatar-intro-seen";
const INTRO_TEXT = `Welcome.

I'm Sankalp — an AI Engineer building intelligent systems, multi-agent architectures, and production-ready AI products.

I create technology that doesn't just process data — it understands, reasons, and acts.

Let's explore what I've built.`;
const TYPING_DELAY_MS = 40;
const AVATAR_FADE_MS = 1000;
const POST_TYPE_WAIT_MS = 1500;
const MORPH_DURATION_MS = 800;
const INTRO_VIDEO_SOURCES = [
  "/avatar/intro-video.mp4",
  "/avatar/intro-video.webm",
];

function getMorphDelay(text: string) {
  return AVATAR_FADE_MS + text.length * TYPING_DELAY_MS + POST_TYPE_WAIT_MS;
}

function TypewriterText({ text, enabled }: { text: string; enabled: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setVisibleCount(text.length);
      return;
    }

    setVisibleCount(0);
    let index = 0;

    const intervalId = window.setInterval(() => {
      index += 1;
      setVisibleCount(index);

      if (index >= text.length) {
        window.clearInterval(intervalId);
      }
    }, TYPING_DELAY_MS);

    return () => window.clearInterval(intervalId);
  }, [enabled, text]);

  return (
    <p
      className="min-h-28 max-w-xl text-balance font-[family-name:var(--font-dm-sans)] text-lg leading-8 text-[var(--text-primary)] sm:text-2xl sm:leading-9"
      aria-live="polite"
    >
      {text.slice(0, visibleCount).split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.08 }}
        >
          {char}
        </motion.span>
      ))}
      {enabled && visibleCount < text.length ? (
        <motion.span
          aria-hidden
          className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-blue-400"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        />
      ) : null}
    </p>
  );
}

type AvatarFigureProps = {
  className?: string;
  introVideoSrc: string | null;
  onVideoEnd: () => void;
  isSettled: boolean;
  onToggleSettled: () => void;
  isMuted: boolean;
  onToggleMuted: () => void;
  hasInteracted: boolean;
};

function AvatarFigure({
  className,
  introVideoSrc,
  onVideoEnd,
  isSettled,
  onToggleSettled,
  isMuted,
  onToggleMuted,
  hasInteracted,
}: AvatarFigureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (!isMuted && hasInteracted) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isMuted, hasInteracted]);

  return (
    <div
      className={`relative overflow-hidden rounded-full border border-white/10 bg-[#050505] shadow-[0_0_80px_rgba(59,130,246,0.28)] ${className ?? ""}`}
      onPointerDown={onToggleSettled}
    >
      {introVideoSrc ? (
        <>
          <video
            ref={videoRef}
            src={introVideoSrc}
            autoPlay={hasInteracted}
            muted={isMuted}
            playsInline
            preload="auto"
            loop={false}
            onEnded={onVideoEnd}
            className="h-full w-full object-cover"
          />
        </>
      ) : (
        <>
          <ProfileImage
            src="/profile/sankalp.webp"
            alt="Sankalp Pingalwad holographic avatar"
            className="h-full w-full"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.3),transparent_55%)]" />
          {isSettled ? null : (
            <div className="pointer-events-none absolute inset-0 mix-blend-screen">
              <div className="hologram-scanline absolute left-0 top-0 h-[28%] w-full bg-[linear-gradient(180deg,rgba(59,130,246,0)_0%,rgba(96,165,250,0.4)_50%,rgba(59,130,246,0)_100%)]" />
            </div>
          )}
        </>
      )}
      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
    </div>
  );
}

export default function AvatarIntro() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showOrb, setShowOrb] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [introVideoStatus, setIntroVideoStatus] = useState<
    "checking" | "available" | "missing"
  >("available");
  const [introVideoSrc, setIntroVideoSrc] = useState<string | null>("/avatar/intro-video.mp4?v=2");
  const [isOrbPaused, setIsOrbPaused] = useState(true);
  const [isAvatarSettled, setIsAvatarSettled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const finishIntro = useCallback(() => {
    setShowIntro(false);
    setShowOrb(true);
    setIsReplay(false);
  }, []);

  const handleSkip = useCallback(() => {
    finishIntro();
  }, [finishIntro]);

  const handleReplay = useCallback(() => {
    setShowOrb(false);
    setIntroVideoStatus("available");
    setIntroVideoSrc("/avatar/intro-video.mp4?v=2");
    setShowIntro(true);
    setIsReplay(true);
    setIsMuted(false);
    setHasInteracted(true);
  }, []);

  const handleOrbToggle = useCallback(() => {
    setIsOrbPaused((current) => !current);
  }, []);

  const handleAvatarToggle = useCallback(() => {
    setIsAvatarSettled((current) => !current);
  }, []);

  const handleMuteToggle = useCallback(() => {
    setIsMuted((current) => !current);
  }, []);

  useEffect(() => {
    setMounted(true);

    if (prefersReducedMotion) {
      setShowIntro(false);
      setShowOrb(true);
      return;
    }

    const alreadySeen = window.sessionStorage.getItem(STORAGE_KEY) === "1";

    if (alreadySeen) {
      setShowIntro(false);
      setShowOrb(true);
      return;
    }

    setShowIntro(true);
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!mounted || !showIntro || prefersReducedMotion) {
      return;
    }

    if (introVideoStatus !== "missing") {
      return;
    }

    const morphDelay = getMorphDelay(INTRO_TEXT);

    const morphTimer = window.setTimeout(() => {
      finishIntro();
    }, morphDelay + MORPH_DURATION_MS);

    return () => window.clearTimeout(morphTimer);
  }, [mounted, showIntro, prefersReducedMotion, finishIntro, introVideoStatus]);

  if (!mounted) {
    return null;
  }

  return (
    <LayoutGroup>
      <AnimatePresence mode="popLayout">
        {showIntro ? (
          <motion.div
            key="avatar-intro-overlay"
            className="fixed inset-0 z-[80] overflow-hidden bg-[var(--bg-base)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_32%),radial-gradient(circle_at_80%_18%,rgba(124,58,237,0.1),transparent_28%)]" />

            <motion.button
              type="button"
              onClick={handleSkip}
              className="absolute right-5 top-5 z-10 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-100/80 backdrop-blur-sm transition-colors hover:border-blue-400/40 hover:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            </motion.button>

            <div className="absolute inset-0 flex items-center justify-center px-6">
              <div className="flex w-full max-w-2xl flex-col items-center text-center">
                <motion.div
                  layoutId="avatar-orb"
                  className="relative mb-8 h-52 w-52 sm:h-64 sm:w-64"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.01 : AVATAR_FADE_MS / 1000,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <AvatarFigure
                    className="h-full w-full"
                    introVideoSrc={introVideoSrc}
                    onVideoEnd={finishIntro}
                    isSettled={isAvatarSettled}
                    onToggleSettled={handleAvatarToggle}
                    isMuted={isMuted}
                    onToggleMuted={handleMuteToggle}
                    hasInteracted={hasInteracted}
                  />
                </motion.div>

                <TypewriterText
                  text={INTRO_TEXT}
                  enabled={showIntro && !prefersReducedMotion && hasInteracted}
                />
              </div>
            </div>

            {/* Premium centered glassmorphic Enter Portfolio Experience splash overlay */}
            <AnimatePresence>
              {!hasInteracted ? (
                <motion.div
                  key="enter-experience-overlay"
                  className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] px-6 text-center"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_45%)]" />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative z-10 space-y-6 max-w-md"
                  >
                    <span className="text-xs uppercase tracking-[0.45em] text-[var(--accent-blue)] font-semibold block">
                      AI Portfolio Experience
                    </span>
                    <h1 className="font-[family-name:var(--font-syne)] text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                      Sankalp Pingalwad
                    </h1>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                      Interactive 3D showcases, autonomous multi-agent priorities, and production-ready RAG deployments.
                    </p>
                    
                    <div className="pt-4">
                      <motion.button
                        type="button"
                        onClick={() => {
                          setHasInteracted(true);
                          setIsMuted(false);
                        }}
                        className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent-blue)_0%,var(--accent-purple)_100%)] px-10 py-4 text-xs font-bold uppercase tracking-[0.32em] text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] transition hover:scale-105 active:scale-95 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Enter Portfolio
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {showOrb ? <FloatingOrb onClick={handleOrbToggle} paused={isOrbPaused} /> : null}
    </LayoutGroup>
  );
}
