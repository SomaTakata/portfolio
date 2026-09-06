import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { resume, resumeContact, type ResumeEntry } from "@/constants/resume";
import { siteConfig } from "@/constants/site.config";
import { locales, type Locale } from "@/i18n/config";
import { PrintButton } from "./print-button";
import "./resume.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ja" ? "履歴書" : "Résumé";
  return {
    title: `${title} — ${siteConfig.name}`,
    description: resume[locale as Locale]?.summary[0] ?? siteConfig.description,
  };
}

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = resume[locale as Locale] ?? resume.en;
  const pdf = siteConfig.resume[locale as Locale] ?? siteConfig.resume.en;

  return (
    <div className="min-h-screen bg-background">
      <div className="resume-no-print sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-dashed bg-background px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm hover:underline"
        >
          <ArrowLeft className="size-4" />
          <span>{siteConfig.name}</span>
        </Link>
        <div className="flex items-center gap-2">
          <PrintButton label={content.labels.print} />
        </div>
      </div>

      <article className="resume-sheet mx-auto max-w-3xl px-6 py-10 md:py-14">
        <header>
          <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            {siteConfig.name === "SomaTakata" ? "Soma Takata" : siteConfig.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {content.headline}
          </p>

          <div className="mt-4 space-y-1.5 text-sm leading-relaxed">
            {content.summary.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-muted-foreground">
            <li>
              <a href={`mailto:${resumeContact.email}`} className="hover:underline">
                {resumeContact.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.socials.github} className="hover:underline">
                GitHub: SomaTakata
              </a>
            </li>
            <li>
              <a href={siteConfig.socials.x_jp} className="hover:underline">
                X: @soma_takata
              </a>
            </li>
            <li>
              <a href={siteConfig.socials.linkedin} className="hover:underline">
                LinkedIn: SomaTakata
              </a>
            </li>
          </ul>
        </header>

        <Section title={content.labels.experience}>
          {content.experience.map((entry) => (
            <Entry key={`${entry.organization}-${entry.period}`} entry={entry} />
          ))}
        </Section>

        <Section title={content.labels.community}>
          {content.community.map((entry) => (
            <Entry key={`${entry.organization}-${entry.period}`} entry={entry} />
          ))}
        </Section>

        <Section title={content.labels.education}>
          {content.education.map((entry) => (
            <Entry key={`${entry.organization}-${entry.period}`} entry={entry} />
          ))}
        </Section>

        <Section title={content.labels.skills}>
          <div className="grid gap-4 sm:grid-cols-3">
            {content.skills.map((group) => (
              <div key={group.category} className="resume-entry">
                <h3 className="text-sm font-semibold">{group.category}</h3>
                <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title={content.labels.languages}>
          <ul className="flex flex-wrap gap-x-6 text-sm text-muted-foreground">
            {content.languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </Section>

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-dashed pt-4 font-mono text-xs text-muted-foreground">
          <span>
            {content.labels.updated}: {resumeContact.updatedAt}
          </span>
          <a
            href={pdf.href}
            download={pdf.fileName}
            className="resume-no-print hover:underline"
          >
            PDF ({pdf.fileName})
          </a>
        </footer>
      </article>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="resume-section mt-9">
      <h2 className="resume-rule border-b border-dashed pb-1 font-heading text-lg font-bold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 space-y-5">{children}</div>
    </section>
  );
}

function Entry({ entry }: { entry: ResumeEntry }) {
  return (
    <div className="resume-entry">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="text-sm font-semibold">
          {entry.organization}
          {entry.role ? (
            <span className="font-normal text-muted-foreground">
              {" — "}
              {entry.role}
            </span>
          ) : null}
        </h3>
        <span className="font-mono text-xs text-muted-foreground">
          {entry.period}
        </span>
      </div>
      {entry.bullets.length > 0 && (
        <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {entry.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
