"use client";

import { TimelineItemComponent } from "@/components/shared/TimelineItem";
import { useTranslations } from "next-intl";

export default function ExperiencePage() {
  const t = useTranslations("experience");
  const EXPERIENCE_DATA = t.raw("items");

  return (
    <div className="flex flex-col gap-3 p-4">
      {EXPERIENCE_DATA.map((item: any, idx: number) => (
        <TimelineItemComponent key={idx} item={item} index={idx} />
      ))}
    </div>
  );
}
