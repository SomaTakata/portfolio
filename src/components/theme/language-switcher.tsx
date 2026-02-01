"use client";

import { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { type Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";

type LanguageSwitcherProps = {
  className?: string;
};

const localeLabels: Record<Locale, string> = {
  en: "EN",
  ja: "JP",
};

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  const nextLocale = currentLocale === "en" ? "ja" : "en";

  return (
    <Button
      onClick={() => switchLanguage(nextLocale)}
      variant="ghost"
      size="icon"
      className={cn(
        "size-10 md:size-14 aspect-square p-0 border-l border-dashed text-xs md:text-base font-medium",
        className,
      )}
      disabled={isPending}
      title={`Switch to ${localeLabels[nextLocale]}`}
    >
      {localeLabels[currentLocale]}
    </Button>
  );
}
