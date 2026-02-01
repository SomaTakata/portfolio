"use client";

import { SkillItemComponent } from "@/components/shared/SkillItem";
import { useTranslations } from "next-intl";

export default function SkillsPage() {
  const t = useTranslations("skills");
  const SKILLS_DATA = t.raw("items");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {SKILLS_DATA.map((skill: any, idx: number) => (
        <SkillItemComponent
          key={idx}
          skill={skill}
          index={idx}
          totalItems={SKILLS_DATA.length}
        />
      ))}
    </div>
  );
}
