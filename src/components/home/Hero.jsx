
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const [phase, setPhase] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (media.matches) {
      setReducedMotion(true);
      setPhase(2);
      return;
    }

    const focusTimer = setTimeout(() => {
      setPhase(1);
    }, 900);

    const revealTimer = setTimeout(() => {
      setPhase(2);
    }, 3000);

    return () => {
      clearTimeout(focusTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  const revealed = phase === 2;

  const contentAnimation = (delay = 0) => ({
    initial: false,
    animate: {
      opacity: revealed ? 1 : 0,
      y: revealed ? 0 : 24,
    },
    transition: {
      duration: reducedMotion ? 0 : 0.85,
      delay: reducedMotion ? 0 : delay,
      ease,
    },
  });

  return (
    <section
      id="hero"
      aria-label="Doğanın ruhunu keşfet"
      className="
        relative isolate flex min-h-[720px]
        w-full flex-col overflow-hidden
        bg-[#211F1B] text-white
        max-lg:min-h-[100svh]
        lg:h-[100svh]
      "
    >
      {/* RESPONSIVE BACKGROUND */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          filter: revealed
            ? "blur(0px)"
            : phase === 1
              ? "blur(6px)"
              : "blur(15px)",
          scale: revealed ? 1 : 1.07,
        }}
        transition={{
          duration: reducedMotion ? 0 : 1.5,
          ease,
        }}
        className="
          hero-deer-background
          absolute inset-0
          bg-no-repeat
        "
        style={{
          backgroundImage:
            "url('/images/hero-deer.jpg')",
        }}
      />

      {/* GRADIENTS */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-t
          from-[#11110F]/95
          via-[#11110F]/20
          to-[#11110F]/35
          lg:bg-gradient-to-r
          lg:from-black/75
          lg:via-black/25
          lg:to-transparent
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-b
          from-black/30
          via-transparent
          to-black/20
        "
      />

      {/* BINOCULAR INTRO */}
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{
            opacity: revealed ? 0 : 1,
            scale: revealed ? 2.6 : 1,
          }}
          transition={{
            duration: 1.1,
            ease,
          }}
          className={`
            pointer-events-none
            absolute inset-0 z-20
            flex items-center justify-center
            ${
              revealed
                ? "invisible"
                : "visible"
            }
          `}
        >
          <div className="absolute inset-0 bg-black/90" />

          <div
            className="
              hero-deer-background
              binocular-view absolute inset-0
              bg-no-repeat
            "
            style={{
              backgroundImage:
                "url('/images/hero-deer.jpg')",
              filter:
                phase === 0
                  ? "blur(12px)"
                  : "blur(5px)",
            }}
          />

          <motion.div
            animate={{
              opacity: phase === 0 ? 0.5 : 0,
            }}
            transition={{ duration: 0.7 }}
            className="
              relative z-10 flex
              items-center justify-center
            "
          >
            <span
              className="
                absolute h-px w-12
                bg-white/50
              "
            />

            <span
              className="
                absolute h-12 w-px
                bg-white/50
              "
            />

            <span
              className="
                h-2 w-2 rounded-full
                border border-white/60
              "
            />
          </motion.div>
        </motion.div>
      )}

      {/* HERO CONTENT */}
      <div
        className="
          relative z-10 mx-auto flex
          w-full max-w-[1600px]
          flex-1 items-end
          px-6 pb-24 pt-32
          sm:px-10
          lg:items-center
          lg:px-20 lg:pb-12
        "
      >
        <div className="w-full max-w-[760px]">
          <motion.div
            {...contentAnimation(0.2)}
            className="
              mb-5 flex items-center gap-3
              sm:mb-7
            "
          >
            <span
              className="
                h-px w-8 bg-[#C2A46B]
                sm:w-10
              "
            />

            <span
              className="
                text-[9px] font-semibold
                uppercase tracking-[0.23em]
                text-[#E0BF83]
                sm:text-xs
              "
            >
              Av & Outdoor Ekipmanları
            </span>
          </motion.div>

          <motion.h1
            {...contentAnimation(0.4)}
            className="
              font-display
              text-[clamp(3.5rem,12vw,6rem)]
              leading-[0.86]
              tracking-[-0.025em]
              lg:text-[clamp(5rem,8vw,9rem)]
            "
          >
            DOĞANIN
            <span
              className="
                mt-2 block
                text-[#C2A46B]
              "
            >
              RUHUNU KEŞFET.
            </span>
          </motion.h1>

          <motion.p
            {...contentAnimation(0.65)}
            className="
              mt-6 max-w-[420px]
              text-[13px] leading-6
              text-white/85
              sm:mt-8 sm:text-base
              sm:leading-7
            "
          >
            Doğaya açılan her yolculukta yanınızdayız.
            Keşif tutkunları için özenle seçilmiş
            ekipmanlarla sınırları yeniden keşfedin.
          </motion.p>

          <motion.div
            {...contentAnimation(0.85)}
            className="mt-7 sm:mt-9"
          >
            <Link
              href="/urunler"
              className="
                group inline-flex min-h-12
                items-center justify-between
                gap-6 border border-[#C2A46B]
                px-5 text-[10px]
                font-bold uppercase
                tracking-[0.13em]
                text-[#EACD95]
                transition-all duration-300
                hover:bg-[#C2A46B]
                hover:text-[#171717]
                sm:min-h-14 sm:px-7
                sm:text-[11px]
              "
            >
              Koleksiyonu Keşfet

              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        {...contentAnimation(1)}
        className="
          pointer-events-none absolute
          bottom-5 left-1/2 z-10
          flex -translate-x-1/2
          flex-col items-center gap-1
          lg:bottom-8
        "
      >
        <span
          className="
            text-[9px] uppercase
            tracking-[0.28em]
            text-white/70
          "
        >
          Kaydır
        </span>

        <ChevronDown
          size={18}
          strokeWidth={1.4}
          className="text-[#C2A46B]"
        />
      </motion.div>
    </section>
  );
}
