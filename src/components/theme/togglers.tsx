"use client";

import Image from "next/image";
import ThemeToggler from "./toggler";
import LanguageSwitcher from "./language-switcher";
import { useClockMode } from "./clock-mode";

export default function ThemeAndLanguageTogglers() {
  const clockMode = useClockMode();

  return (
    <div className="flex items-center">
      {/* The clock toggle only exists on the home page, where a
          ClockModeProvider is mounted to flip the hero into a clock. */}
      {clockMode && (
        <button
          type="button"
          onClick={clockMode.toggle}
          title="Clock"
          aria-pressed={clockMode.isClockMode}
          className="size-10 md:size-14 aspect-square p-0 border-l border-dashed relative hover:bg-muted/50 transition-colors"
        >
          <Image
            src="/clock.png"
            alt="clock"
            fill
            className="object-contain scale-75"
          />
        </button>
      )}
      <LanguageSwitcher />
      <ThemeToggler />
    </div>
  );
}
