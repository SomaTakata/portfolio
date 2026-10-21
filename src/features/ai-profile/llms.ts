import { siteConfig } from "@/constants/site.config";
import {
  resume,
  resumeContact,
  type ResumeContent,
  type ResumeEntry,
} from "@/constants/resume";
import en from "@/i18n/messages/en.json";
import ja from "@/i18n/messages/ja.json";

const ORIGIN = siteConfig.origin;

type Messages = typeof en;

/** 「Nulogic Inc.」「Mercari Inc. (Hallo Div.)」などを会社単位にそろえる。 */
export function normalizeOrganization(name: string): string {
  return name
    .replace(/\s*[(（].*$/, "")
    .replace(/,?\s*(Inc\.|Co\.,\s*Ltd\.)\s*$/i, "")
    .trim();
}

export function countCompanies(): number {
  return new Set(
    resume.en.experience.map((e) => normalizeOrganization(e.organization)),
  ).size;
}

function highlights(): string[] {
  const n = countCompanies();
  return [
    "IBM Japan AI Innovator Hackathon (Aug 2026): placed 1st of 10 teams and was named team MVP.",
    "SORACOM (summer 2026 intern): designed and implemented eUICC search for Connectivity Hypervisor across 5 layers (API definition, index building, search API, eUICC management service, UI) using Go, Java, TypeScript, DynamoDB, Amazon OpenSearch Service and Lambda; featured on the SORACOM engineering blog.",
    "Recruit (10-month intern): built an LLM-powered feature for a business proposal review system that reduced reviewer workload by 40%.",
    `Internships and contract work at ${n} companies, including Mercari, LayerX, Medley, NOT A HOTEL, Recruit, SORACOM and IBM Japan.`,
    "Founded ShibaYoko, a design x engineering community at Shibaura Institute of Technology: 360 members within 3 months, 540 members today.",
    "How Television: replatformed Gaishishukatsu.com from PHP to Next.js.",
  ];
}

const SUMMARY = `${siteConfig.description}`;

function bulletList(items: string[]): string {
  return items.map((i) => `- ${i}`).join("\n");
}

export function buildLlmsTxt(): string {
  const pages: [string, string, string][] = [
    ["Home", `${ORIGIN}/en`, "Overview and navigation (English)"],
    ["Experience", `${ORIGIN}/en/experience`, "Timeline of work experience"],
    ["Works", `${ORIGIN}/en/works`, "Selected projects"],
    ["News", `${ORIGIN}/en/news`, "Awards, articles and updates"],
    ["Skills", `${ORIGIN}/en/skills`, "Technical skills"],
    ["Home (Japanese)", `${ORIGIN}/ja`, "Japanese version of the site"],
    ["Resume (English PDF)", `${ORIGIN}${siteConfig.resume.en.href}`, "CV"],
    ["Resume (Japanese PDF)", `${ORIGIN}${siteConfig.resume.ja.href}`, "履歴書"],
  ];
  const socialLabels: Record<string, string> = {
    github: "GitHub",
    x_jp: "X (Japanese)",
    x_global: "X (English)",
    zenn: "Zenn (technical articles)",
    linkedin: "LinkedIn",
  };

  return [
    "# Soma Takata (高田颯真)",
    "",
    `> ${SUMMARY}`,
    "",
    "## Key highlights",
    "",
    bulletList(highlights()),
    "",
    "## Pages",
    "",
    pages.map(([t, u, d]) => `- [${t}](${u}): ${d}`).join("\n"),
    "",
    "## Links",
    "",
    Object.entries(siteConfig.socials)
      .map(([k, u]) => `- [${socialLabels[k] ?? k}](${u})`)
      .join("\n"),
    "",
    "## Contact",
    "",
    `- Email: ${resumeContact.email}`,
    "",
    "## Full profile",
    "",
    `- [Full profile in Markdown (English and Japanese)](${ORIGIN}/llms-full.txt)`,
    "",
  ].join("\n");
}

function entryBlock(e: ResumeEntry): string {
  const head = `### ${e.organization}${e.role ? ` — ${e.role}` : ""}`;
  const lines = [head, "", `Period: ${e.period}`];
  if (e.bullets.length) lines.push("", bulletList(e.bullets));
  return lines.join("\n");
}

function section(title: string, entries: ResumeEntry[]): string {
  return [`## ${title}`, "", entries.map(entryBlock).join("\n\n"), ""].join("\n");
}

function localeSection(
  r: ResumeContent,
  m: Messages,
  base: string,
  heading: string,
  projectsLabel: string,
  newsLabel: string,
): string {
  const projects = m.projects.items
    .map((p) => {
      const meta = [p.period, p.technologies.join(", ")].filter(Boolean).join(" / ");
      return `- [${p.title}](${p.link}) (${meta}): ${p.description}`;
    })
    .join("\n");
  const news = m.news.items
    .map((n) => `- ${n.date} [${n.title}](${n.link}): ${n.description}`)
    .join("\n");
  const skills = r.skills
    .map((s) => `- ${s.category}: ${s.items.join(", ")}`)
    .join("\n");

  return [
    `# ${heading}`,
    "",
    `Site: ${base}`,
    "",
    `## ${r.headline}`,
    "",
    r.summary.join("\n\n"),
    "",
    section(r.labels.experience, r.experience),
    section(r.labels.community, r.community),
    section(r.labels.education, r.education),
    `## ${r.labels.languages}`,
    "",
    bulletList(r.languages),
    "",
    `## ${r.labels.skills}`,
    "",
    skills,
    "",
    `## ${projectsLabel}`,
    "",
    projects,
    "",
    `## ${newsLabel}`,
    "",
    news,
    "",
  ].join("\n");
}

export function buildLlmsFullTxt(): string {
  return [
    "# Soma Takata (高田颯真) — Full profile",
    "",
    `> ${SUMMARY}`,
    "",
    "## Key highlights",
    "",
    bulletList(highlights()),
    "",
    "## Contact and links",
    "",
    `- Email: ${resumeContact.email}`,
    `- Site: ${ORIGIN}`,
    ...Object.entries(siteConfig.socials).map(([k, u]) => `- ${k}: ${u}`),
    `- Résumé (English PDF): ${ORIGIN}${siteConfig.resume.en.href}`,
    `- Résumé (Japanese PDF): ${ORIGIN}${siteConfig.resume.ja.href}`,
    "",
    "---",
    "",
    localeSection(resume.en, en, `${ORIGIN}/en`, "English", "Projects", "News"),
    "---",
    "",
    localeSection(resume.ja, ja as Messages, `${ORIGIN}/ja`, "日本語", "プロジェクト", "ニュース"),
  ].join("\n");
}
