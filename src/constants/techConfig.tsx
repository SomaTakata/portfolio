import React from "react";
import {
  PanelsTopLeft,
  Shield,
  Database,
  Newspaper,
  Activity,
  Images,
} from "lucide-react";

export const getTechConfig = (t?: (key: string) => string) => [
  {
    icon: <PanelsTopLeft className="size-4" />,
    category: "1",
    name: t ? t("items.experience.name") : "Experience",
    description: t
      ? t("items.experience.description")
      : "A timeline of my professional background and career highlights.",
    link: "/experience",
  },
  {
    icon: <Shield className="size-4" />,
    category: "2",
    name: t ? t("items.skills.name") : "Skills",
    description: t
      ? t("items.skills.description")
      : "A showcase of my technical and soft skills across various domains.",
    link: "/skills",
  },
  {
    icon: <Database className="size-4" />,
    category: "3",
    name: t ? t("items.works.name") : "Works",
    description: t
      ? t("items.works.description")
      : "Selected projects that demonstrate my capabilities and creativity.",
    link: "/works",
  },
  {
    icon: <Newspaper className="size-4" />,
    category: "4",
    name: t ? t("items.news.name") : "News",
    description: t
      ? t("items.news.description")
      : "Latest updates, announcements, and things I'm currently working on.",
    link: "/news",
  },
  {
    icon: <Images className="size-4" />,
    category: "5",
    name: t ? t("items.terminal.name") : "Art Gallery",
    description: t
      ? t("items.terminal.description")
      : "A curated gallery-like space to explore works, news, and skills.",
    link: "/gallery",
  },
  {
    icon: <Activity className="size-4" />,
    category: "6",
    name: t ? t("items.activity.name") : "Activity",
    description: t
      ? t("items.activity.description")
      : "GitHub activity and contributions across various open source projects.",
    link: "/activity",
  },
];

export default getTechConfig;
