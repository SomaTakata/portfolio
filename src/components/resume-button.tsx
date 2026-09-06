"use client";

import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

/**
 * compact … モバイルモーダル内のソーシャルリンクと同じ見た目
 * full    … デスクトップのサイドバー CTA と同じ見た目（ホバーの光る線つき）
 */
export function ResumeButton({ size = "full" }: { size?: "compact" | "full" }) {
  const t = useTranslations("common");

  if (size === "compact") {
    return (
      <Button
        variant="outline"
        size="sm"
        asChild
        className="border-dashed text-muted-foreground hover:text-primary"
      >
        <Link href="/resume" className="gap-2">
          <FileText className="size-3" />
          <span className="text-xs">{t("resume")}</span>
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      asChild
      className="relative border-dashed text-muted-foreground hover:text-primary"
    >
      <Link href="/resume" className="gap-2 group">
        <div className="w-full h-[1px] bg-linear-to-r from-primary/0 via-primary to-primary/0 absolute top-0 -left-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <FileText className="size-4" />
        <span>{t("resume")}</span>
      </Link>
    </Button>
  );
}
