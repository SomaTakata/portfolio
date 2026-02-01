"use client";

import ThemeToggler from "./toggler";
import LanguageSwitcher from "./language-switcher";

export default function ThemeAndLanguageTogglers() {
  return (
    <div className="flex items-center">
      <LanguageSwitcher />
      <ThemeToggler />
    </div>
  );
}
