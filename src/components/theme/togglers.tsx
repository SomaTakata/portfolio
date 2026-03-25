"use client";

import Image from "next/image";
import ThemeToggler from "./toggler";
import LanguageSwitcher from "./language-switcher";

export default function ThemeAndLanguageTogglers() {
  return (
    <div className="flex items-center">
      <div className="size-10 md:size-14 aspect-square p-0 border-l border-dashed relative">
        <Image
          src="/alien.png"
          alt="alien"
          fill
          className="object-contain scale-75"
        />
      </div>
      <LanguageSwitcher />
      <ThemeToggler />
    </div>
  );
}
