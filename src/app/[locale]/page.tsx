"use client";

// import { useState } from "react";
import { useTranslations } from "next-intl";
import ThemeAndLanguageTogglersContainer from "@/components/theme/togglers-container";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/user-profile";
import { siteConfig } from "@/constants/site.config";
import { cn } from "@/utils/utils";
import {
  PanelsTopLeft,
  Shield,
  Database,
  ArrowRight,
  Sparkle,
  Github,
  // ArrowUpRight,
  Twitter,
  Linkedin,
  Zap,
  Newspaper,
  Activity,
  Terminal,
  User,
  CircleIcon,
  AlignJustify,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
// import { useSession } from "@/lib/auth-client";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  // Determine locale from pathname
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";

  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const toggleMobileModal = () => {
    setIsMobileModalOpen(!isMobileModalOpen);
  };

  const closeMobileModal = () => {
    setIsMobileModalOpen(false);
  };

  const techConfig = useMemo(
    () => [
      {
        icon: <PanelsTopLeft className="size-4" />,
        category: "1",
        name: t("items.experience.name"),
        description: t("items.experience.description"),
        link: "/experience",
      },
      {
        icon: <Shield className="size-4" />,
        category: "2",
        name: t("items.skills.name"),
        description: t("items.skills.description"),
        link: "/skills",
      },
      {
        icon: <Database className="size-4" />,
        category: "3",
        name: t("items.works.name"),
        description: t("items.works.description"),
        link: "/works",
      },
      {
        icon: <Newspaper className="size-4" />,
        category: "4",
        name: t("items.news.name"),
        description: t("items.news.description"),
        link: "/news",
      },
      {
        icon: <Terminal className="size-4" />,
        category: "5",
        name: t("items.terminal.name"),
        description: t("items.terminal.description"),
        link: "/terminal",
      },
      {
        icon: <Activity className="size-4" />,
        category: "6",
        name: t("items.activity.name"),
        description: t("items.activity.description"),
        link: "/activity",
      },
    ],
    [t],
  );

  return (
    <>
      {/* Mobile Modal Overlay */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden px-2">
          <div className="flex flex-col h-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-3 py-2.5 border mt-2 border-dashed">
              <Link
                href={`/${locale}`}
                className="flex items-center gap-2"
                onClick={closeMobileModal}
              >
                <CircleIcon size={15} />
                <span className="font-mono text-sm">Soma Takata</span>
              </Link>
              <button
                onClick={closeMobileModal}
                className="hover:bg-muted rounded-sm transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col">
                {/* Navigation Items */}
                {techConfig.map((tech) => {
                  return (
                    <a
                      href={`/${locale}${tech.link}`}
                      key={tech.name}
                      className="flex gap-2 items-center w-full p-6 transition-all duration-150 group/item border-dashed border-b hover:text-primary hover:font-semibold text-muted-foreground border-x"
                      onClick={closeMobileModal}
                    >
                      <span className="">{tech.icon}</span>
                      <p className="text-sm">{tech.name}</p>
                    </a>
                  );
                })}

                {/* Social Links */}
                <div className="p-6 border-b border-dashed border-x">
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-dashed text-muted-foreground border-muted hover:text-primary"
                    >
                      <a
                        href={siteConfig.socials.github}
                        target="_blank"
                        className="gap-2"
                      >
                        <Github className="size-3" />
                        <span className="text-xs">
                          {tCommon("socials.github")}
                        </span>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-dashed text-muted-foreground hover:text-primary"
                    >
                      <a
                        href={siteConfig.socials.x_jp}
                        target="_blank"
                        className="gap-2"
                      >
                        <Twitter className="size-3" />
                        <span className="text-xs">
                          {tCommon("socials.x_jp")}
                        </span>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-dashed text-muted-foreground hover:text-primary"
                    >
                      <a
                        href={siteConfig.socials.x_global}
                        target="_blank"
                        className="gap-2"
                      >
                        <Twitter className="size-3" />
                        <span className="text-xs">
                          {tCommon("socials.x_global")}
                        </span>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-dashed text-muted-foreground hover:text-primary"
                    >
                      <a
                        href={siteConfig.socials.zenn}
                        target="_blank"
                        className="gap-2"
                      >
                        <Zap className="size-3" />
                        <span className="text-xs">
                          {tCommon("socials.zenn")}
                        </span>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-dashed text-muted-foreground hover:text-primary"
                    >
                      <a
                        href={siteConfig.socials.linkedin}
                        target="_blank"
                        className="gap-2"
                      >
                        <Linkedin className="size-3" />
                        <span className="text-xs">
                          {tCommon("socials.linkedin")}
                        </span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-auto md:h-screen overflow-y-auto md:overflow-hidden flex flex-col items-center justify-center px-2">
        <div className="w-full max-w-7xl mx-auto border border-dashed flex flex-col my-2">
          <div className="w-full flex justify-between divide-x">
            <div className="relative hidden md:flex w-1/3 aspect-square bg-background items-center justify-center group/soma border-dashed">
              <Circle />
              <div className="absolute top-0 left-0 size-4 border-t-2 border-l-2 border-foreground opacity-0 group-hover/soma:opacity-100 transition-all duration-200"></div>
              <div className="absolute top-0 right-0 size-4 border-t-2 border-r-2 border-foreground opacity-0 group-hover/soma:opacity-100 transition-all duration-200"></div>
              <div className="absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-foreground opacity-0 group-hover/soma:opacity-100 transition-all duration-200"></div>
              <div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-foreground opacity-0 group-hover/soma:opacity-100 transition-all duration-200"></div>
            </div>
            <div className="flex-1 flex flex-col">
              <div
                id="nav"
                className="w-full flex items-center justify-end border-b border-dashed divide-x"
              >
                <div
                  id="brand"
                  className="md:hidden font-mono text-sm flex-1 flex items-center h-full px-3 border-none"
                >
                  <Link
                    href={`/${locale}`}
                    className="hover:underline flex items-center gap-2"
                  >
                    <CircleIcon size={15} />
                    Soma Takata
                  </Link>
                </div>
                {/* {!isPending &&
                (session ? (
                  <Button
                    className="h-full border-dashed"
                    size="lg"
                    variant="ghost"
                    asChild
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 group/nav"
                    >
                      <span>Dashboard</span>
                      <div className="relative z-10 size-4 overflow-hidden flex items-center justify-center">
                        <ArrowUpRight className="-z-10 absolute opacity-100 scale-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/nav:-translate-y-5 group-hover/nav:translate-x-5 group-hover/nav:opacity-0 group-hover/nav:scale-0 transition-all duration-200" />
                        <ArrowUpRight className="absolute -z-10 -bottom-4 -left-4 opacity-0 scale-0 group-hover/nav:-translate-y-[15px] group-hover/nav:translate-x-4 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-200" />
                      </div>
                    </Link>
                  </Button>
                ) : (
                  <Button
                    className="h-full border-dashed"
                    size="lg"
                    variant="ghost"
                    asChild
                  >
                    <Link
                      href="/sign-in"
                      className="flex items-center gap-2 group/nav"
                    >
                      <span>Sign In</span>
                      <div className="relative z-10 size-4 overflow-hidden flex items-center justify-center">
                        <ArrowUpRight className="-z-10 absolute opacity-100 scale-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/nav:-translate-y-5 group-hover/nav:translate-x-5 group-hover/nav:opacity-0 group-hover/nav:scale-0 transition-all duration-200" />
                        <ArrowUpRight className="absolute -z-10 -bottom-4 -left-4 opacity-0 scale-0 group-hover/nav:-translate-y-[15px] group-hover/nav:translate-x-4 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-200" />
                      </div>
                    </Link>
                  </Button>
                ))} */}
                {/* <UserProfile className="border-dashed size-10 md:size-14" /> */}
                <div className="flex items-center">
                  <ThemeAndLanguageTogglersContainer />
                  <button
                    onClick={toggleMobileModal}
                    className="md:hidden font-mono border-l border-dashed text-sm flex items-center h-full p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <AlignJustify size={15} />
                  </button>
                </div>
              </div>
              <div id="hero" className="flex flex-col px-6 pt-6">
                <h1 className="head-text-md">Soma Takata</h1>
                <p className="text-muted-foreground max-w-3xl">{t("bio")}</p>
              </div>
              <div id="cta" className="flex flex-wrap items-center gap-3 p-6">
                <Button
                  variant="outline"
                  asChild
                  className="relative border-dashed"
                >
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    className="gap-2 group"
                  >
                    <div className="w-full h-[1px] bg-linear-to-r from-primary/0 via-primary to-primary/0 absolute top-0 -left-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <Github className="size-4" />
                    <span>GitHub</span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="relative border-dashed"
                >
                  <a
                    href={siteConfig.socials.x_jp}
                    target="_blank"
                    className="gap-2 group"
                  >
                    <div className="w-full h-[1px] bg-linear-to-r from-primary/0 via-primary to-primary/0 absolute top-0 -left-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <Twitter className="size-4" />
                    <span>JP</span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="relative border-dashed"
                >
                  <a
                    href={siteConfig.socials.x_global}
                    target="_blank"
                    className="gap-2 group"
                  >
                    <div className="w-full h-[1px] bg-linear-to-r from-primary/0 via-primary to-primary/0 absolute top-0 -left-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <Twitter className="size-4" />
                    <span>Global</span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="relative border-dashed"
                >
                  <a
                    href={siteConfig.socials.zenn}
                    target="_blank"
                    className="gap-2 group"
                  >
                    <div className="w-full h-[1px] bg-linear-to-r from-primary/0 via-primary to-primary/0 absolute top-0 -left-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <Zap className="size-4" />
                    <span>Zenn</span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="relative border-dashed"
                >
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    className="gap-2 group"
                  >
                    <div className="w-full h-[1px] bg-linear-to-r from-primary/0 via-primary to-primary/0 absolute top-0 -left-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <Linkedin className="size-4" />
                    <span>Linkedin</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
          <div
            id="grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-dashed"
          >
            {techConfig.map((tech, index) => (
              <a
                key={index}
                href={`/${locale}${tech.link}`}
                className={cn(
                  "relative w-full p-6 hover:bg-muted/50 transition-all duration-150 group/item border-dashed",
                  {
                    "border-b": index < techConfig.length - 1,
                    "md:border-b-0": index >= techConfig.length - 2,
                    "md:border-b": index < techConfig.length - 2,
                    "lg:border-b-0": index >= techConfig.length - 3,
                    "lg:border-b": index < techConfig.length - 3,
                  },
                  {
                    "md:border-r":
                      index % 2 === 0 && index !== techConfig.length - 1,
                    "lg:border-r-0": (index + 1) % 3 === 0,
                    "lg:border-r":
                      (index + 1) % 3 !== 0 && index !== techConfig.length - 1,
                  },
                )}
              >
                {(index === 0 || index === techConfig.length - 1) && (
                  <Sparkle
                    className={cn(
                      "absolute w-4 h-4 z-10 fill-current hidden md:block",
                      {
                        "-bottom-2 -right-2": index === 0,
                        "-top-2 -left-2": index === techConfig.length - 1,
                      },
                    )}
                  />
                )}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="group-hover/item:animate-pulse">
                      {tech.icon}
                    </span>
                    <h3 className="text-zinc-500 dark:text-zinc-400 text-base font-semibold">
                      {tech.category}
                    </h3>
                  </div>
                  <ArrowRight className="size-4 opacity-0 scale-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:-translate-x-0 group-hover/item:scale-100 transition-all duration-150" />
                </div>
                <h1 className="text-xl font-semibold font-heading tracking-tight mb-2">
                  {tech.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {tech.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const techConfig = (locale: string) => [
  {
    icon: <PanelsTopLeft className="size-4" />,
    category: "1",
    name: "Experience",
    description:
      "A timeline of my professional background and career highlights.",
    link: "/experience",
  },
  {
    icon: <Shield className="size-4" />,
    category: "2",
    name: "Skills",
    description:
      "A showcase of my technical and soft skills across various domains.",
    link: "/skills",
  },
  {
    icon: <Database className="size-4" />,
    category: "3",
    name: "Works",
    description:
      "Selected projects that demonstrate my capabilities and creativity.",
    link: "/works",
  },
  {
    icon: <Newspaper className="size-4" />,
    category: "4",
    name: "News",
    description:
      "Latest updates, announcements, and things I'm currently working on.",
    link: "/news",
  },
  {
    icon: <Terminal className="size-4" />,
    category: "5",
    name: "Terminal",
    description:
      "An interactive terminal-style space to explore more about me.",
    link: "/terminal",
  },
  {
    icon: <Activity className="size-4" />,
    category: "6",
    name: "Activity",
    description:
      "GitHub activity and contributions across various open source projects.",
    link: "/activity",
  },
];

const Circle = () => {
  return (
    <svg
      className="w-full h-full aspect-square"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="200" cy="200" r="100" fill="CurrentColor" />
    </svg>
  );
};
