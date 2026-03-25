"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import ThemeToggler from "./toggler";
import LanguageSwitcher from "./language-switcher";

export default function ThemeAndLanguageTogglers() {
  const router = useRouter();
  const [isWarping, setIsWarping] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isWarping) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const cellSize = 8;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    const cols = Math.ceil(window.innerWidth / cellSize);
    const rows = Math.ceil(window.innerHeight / cellSize);
    const total = cols * rows;
    const order = Array.from({ length: total }, (_, i) => i);

    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    let cursor = 0;
    let didNavigate = false;

    const paint = () => {
      const progress = cursor / total;
      const burst = Math.min(700, 40 + Math.floor(progress * 420));

      for (let i = 0; i < burst && cursor < total; i++) {
        const index = order[cursor++];
        const x = (index % cols) * cellSize;
        const y = Math.floor(index / cols) * cellSize;

        context.fillStyle = "rgba(255, 96, 168, 1)";
        context.fillRect(x, y, cellSize, cellSize);
      }

      if (!didNavigate && cursor >= total) {
        didNavigate = true;
        context.fillStyle = "rgba(255, 96, 168, 1)";
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);
        timeoutRef.current = window.setTimeout(() => {
          router.push("/alien");
        }, 80);
      }

      if (cursor < total) {
        frameRef.current = window.requestAnimationFrame(paint);
      }
    };

    frameRef.current = window.requestAnimationFrame(paint);

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [isWarping, router]);

  const handleAlienClick = () => {
    if (isWarping) return;
    setIsWarping(true);
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={handleAlienClick}
        title="Alien"
        className="size-10 md:size-14 aspect-square p-0 border-l border-dashed relative hover:bg-muted/50 transition-colors"
      >
        <Image
          src="/alien.png"
          alt="alien"
          fill
          className="object-contain scale-75"
        />
      </button>
      <LanguageSwitcher />
      <ThemeToggler />

      {isWarping && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      )}
    </div>
  );
}
