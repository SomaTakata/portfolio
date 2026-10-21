import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site.config";
import { locales } from "@/i18n/config";

const SECTIONS = [
  "experience",
  "works",
  "news",
  "skills",
  "activity",
  "gallery",
  "resume",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...SECTIONS.map((s) => `/${s}`)];
  const pages = locales.flatMap((l) =>
    paths.map((p) => ({
      url: `${siteConfig.origin}/${l}${p}`,
      priority: p === "" ? 1 : 0.7,
    })),
  );
  return [
    ...pages,
    { url: `${siteConfig.origin}/llms.txt`, priority: 0.5 },
    { url: `${siteConfig.origin}/llms-full.txt`, priority: 0.5 },
  ];
}
