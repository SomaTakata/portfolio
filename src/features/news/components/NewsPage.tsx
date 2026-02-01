"use client";

import { NewsItemComponent } from "@/components/shared/NewsItem";
import { useTranslations } from "next-intl";

export default function NewsPage() {
  const t = useTranslations("news");
  const NEWS_DATA = t.raw("items");

  return (
    <div className="flex flex-col md:gap-3 px-4 md:p-4">
      {NEWS_DATA.map((item: any, idx: number) => (
        <NewsItemComponent key={idx} item={item} index={idx} />
      ))}
    </div>
  );
}
