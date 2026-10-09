"use client";

import { QrCode } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/constants/site.config";
import { usePathname } from "@/i18n/navigation";
import { QrPanel } from "./QrPanel";

/**
 * ナビに常駐する QR ボタン。テーマ・言語のトグルと同じ寸法・枠線で並ぶ。
 * `q` キーでも開けるようにして、会場で見せる場面での一手を減らしている。
 */
export function QrButton() {
  const t = useTranslations("qr");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // window.location ではなく既知の値から組む。SSR とクライアントで同じ文字列になり、
  // 流入計測のクエリなどが QR に混ざらない。
  const url = useMemo(() => {
    const path = pathname === "/" ? "" : pathname;
    return `${siteConfig.origin}/${locale}${path}`;
  }, [locale, pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "q" || e.metaKey || e.ctrlKey || e.altKey) return;

      // 入力中のキーを奪わない。将来フォームが増えても誤爆しない。
      const el = e.target as HTMLElement | null;
      if (
        el?.isContentEditable ||
        el?.tagName === "INPUT" ||
        el?.tagName === "TEXTAREA"
      ) {
        return;
      }

      setIsOpen((open) => !open);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        title={`${t("title")} (q)`}
        aria-label={t("title")}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="size-10 md:size-14 aspect-square grid place-items-center border-l border-dashed p-0 transition-colors hover:bg-muted/50"
      >
        <QrCode className="size-4" />
      </button>

      {isOpen && <QrPanel url={url} onClose={() => setIsOpen(false)} />}
    </>
  );
}
