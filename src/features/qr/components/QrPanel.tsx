"use client";

import { Check, Copy, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// QR の生成コードは初回表示まで読み込まない。ナビに常駐するボタンなので、
// 開かれない限り初期バンドルを重くしたくない。
const QRCodeSVG = dynamic(
  () => import("qrcode.react").then((m) => m.QRCodeSVG),
  {
    ssr: false,
    loading: () => <div className="size-[200px] animate-pulse bg-muted" />,
  },
);

type QrPanelProps = {
  url: string;
  onClose: () => void;
};

export function QrPanel({ url, onClose }: QrPanelProps) {
  const t = useTranslations("qr");
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // 開いた時点のフォーカス位置に戻す。ナビのボタンから開くので、
  // 閉じたあとキーボード操作が先頭に飛ばないようにする。
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    return () => previous?.focus?.();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success(t("copied"));
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // クリップボードは権限や http で失敗する。URL は画面に出ているので致命的ではない。
      toast.error(t("copyFailed"));
    }
  }, [t, url]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("title")}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm border border-dashed bg-background outline-none"
      >
        <div className="flex items-center justify-between border-b border-dashed px-3 py-2.5">
          <span className="font-mono text-sm">{t("title")}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="rounded-sm transition-colors hover:bg-muted"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 p-6">
          {/*
            QR は常に明色の下地に暗色で描く。ダークテーマで反転させると
            読み取り精度が落ちるカメラがあるため、テーマに追従させない。
          */}
          <div className="border border-dashed border-muted-foreground/40 bg-white p-4">
            <QRCodeSVG
              value={url}
              size={200}
              level="M"
              marginSize={0}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          <p className="break-all text-center font-mono text-xs text-muted-foreground">
            {url}
          </p>

          <button
            type="button"
            onClick={copy}
            className="flex w-full items-center justify-center gap-2 border border-dashed px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
            <span>{copied ? t("copied") : t("copy")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
