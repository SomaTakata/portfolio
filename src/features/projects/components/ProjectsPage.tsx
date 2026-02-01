"use client";

import { ProjectItemComponent } from "@/components/shared/ProjectItem";
import { useTranslations } from "next-intl";

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const PROJECTS_DATA = t.raw("items");

  return (
    <div className="flex flex-col p-4">
      {PROJECTS_DATA.map((item: any, idx: number) => (
        <ProjectItemComponent key={idx} item={item} index={idx} />
      ))}
    </div>
  );
}
