"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import ThemeToggler from "./toggler";
import LanguageSwitcher from "./language-switcher";

const WARP_DURATION = 900;

export default function ThemeAndLanguageTogglers() {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [isWarping, setIsWarping] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!isWarping) return;
    timeoutRef.current = window.setTimeout(() => {
      router.push("/clock");
    }, WARP_DURATION - 60);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [isWarping, router]);

  const handleClockClick = () => {
    if (isWarping) return;

    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setOrigin({
        x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
        y: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
      });
    }
    setIsWarping(true);
  };

  return (
    <div className="flex items-center">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClockClick}
        title="Clock"
        className="size-10 md:size-14 aspect-square p-0 border-l border-dashed relative hover:bg-muted/50 transition-colors"
      >
        <Image
          src="/clock.png"
          alt="clock"
          fill
          className="object-contain scale-75"
        />
      </button>
      <LanguageSwitcher />
      <ThemeToggler />

      {isWarping && (
        <div
          className="warp-overlay"
          style={
            {
              "--warp-x": `${origin.x}%`,
              "--warp-y": `${origin.y}%`,
              "--warp-duration": `${WARP_DURATION}ms`,
            } as React.CSSProperties
          }
        >
          {/* Solid backdrop that fades in so the screen ends fully dark */}
          <div className="warp-backdrop" />
          {/* Ring with a transparent center that collapses into the icon */}
          <div className="warp-iris" />
          {/* Swirl being pulled into the center */}
          <div className="warp-swirl" />
        </div>
      )}

      <style jsx>{`
        .warp-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          overflow: hidden;
        }

        /* Fades in late so the page stays visible during the suck-in,
           then ends fully dark right before navigation. */
        .warp-backdrop {
          position: absolute;
          inset: 0;
          background: rgb(8, 8, 10);
          opacity: 0;
          animation: warp-backdrop-in var(--warp-duration) ease-in forwards;
        }

        @keyframes warp-backdrop-in {
          0%,
          55% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        /* A huge ring with a transparent center, anchored at the icon.
           Scaling it down collapses the transparent hole into the clock,
           so the whole page appears to be sucked inward. */
        .warp-iris {
          position: absolute;
          left: var(--warp-x);
          top: var(--warp-y);
          width: 300vmax;
          height: 300vmax;
          transform: translate(-50%, -50%) scale(1);
          border-radius: 50%;
          background: radial-gradient(
            circle,
            transparent 0%,
            transparent 33%,
            rgba(10, 10, 12, 0.9) 40%,
            rgba(8, 8, 10, 1) 55%
          );
          animation: warp-iris-close var(--warp-duration)
            cubic-bezier(0.66, 0, 0.84, 0.1) forwards;
        }

        /* A thin pink ring + streaks that spiral inward. */
        .warp-swirl {
          position: absolute;
          left: var(--warp-x);
          top: var(--warp-y);
          width: 220vmax;
          height: 220vmax;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(255, 96, 168, 0) 200deg,
            rgba(255, 96, 168, 0.18) 300deg,
            rgba(255, 96, 168, 0.55) 350deg,
            rgba(255, 255, 255, 0.7) 360deg
          );
          mix-blend-mode: screen;
          opacity: 0;
          animation: warp-swirl-in var(--warp-duration)
            cubic-bezier(0.6, 0, 0.85, 0.2) forwards;
        }

        @keyframes warp-iris-close {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            transform: translate(-50%, -50%) scale(0);
          }
        }

        @keyframes warp-swirl-in {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          25% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.02) rotate(540deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .warp-iris,
          .warp-swirl {
            animation-duration: 1ms;
          }
        }
      `}</style>
    </div>
  );
}
