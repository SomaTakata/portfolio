import { siteConfig } from "@/constants/site.config";
import { resume, resumeContact } from "@/constants/resume";
import en from "@/i18n/messages/en.json";
import ja from "@/i18n/messages/ja.json";

export function buildPersonJsonLd(locale: string) {
  const isJa = locale === "ja";
  const r = isJa ? resume.ja : resume.en;
  const description = isJa ? ja.home.bio : en.home.bio;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Soma Takata",
    alternateName: ["高田颯真", "髙田颯真", "SomaTakata"],
    url: `${siteConfig.origin}/${isJa ? "ja" : "en"}`,
    image: `${siteConfig.origin}/soma.png`,
    jobTitle: r.headline,
    description,
    email: resumeContact.email,
    sameAs: Object.values(siteConfig.socials),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Shibaura Institute of Technology",
      url: "https://www.shibaura-it.ac.jp/",
    },
    knowsAbout: resume.en.skills.flatMap((s) =>
      s.items.map((i) => i.replace(/\s*\(.*\)$/, "")),
    ),
    award: [
      "1st place of 10 teams, IBM Japan AI Innovator Hackathon (August 2026)",
      "Team MVP, IBM Japan AI Innovator Hackathon (August 2026)",
    ],
    founder: {
      "@type": "Organization",
      name: "ShibaYoko",
      description:
        "Design x engineering community at Shibaura Institute of Technology (540 members)",
      url: "https://x.com/ShibaYoko_SIT",
    },
  };
}
