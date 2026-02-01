"use client";

// import { useState } from "react";
import ThemeAndLanguageTogglersContainer from "@/components/theme/togglers-container";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/user-profile";
import { siteConfig } from "@/constants/site.config";
import { cn } from "@/utils/utils";
import { useTranslations } from "next-intl";
import {
  PanelsTopLeft,
  Shield,
  Database,
  Github,
  // ArrowUpRight,
  Twitter,
  Linkedin,
  Zap,
  Newspaper,
  Activity,
  Terminal,
  User,
  Circle,
  AlignJustify,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useSession } from "@/lib/auth-client";
import { usePathname } from "@/i18n/navigation";
import { useState, useMemo } from "react";

const getTechConfig = (t: any) => [
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
];

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const t = useTranslations("home");
  const techConfig = useMemo(() => getTechConfig(t), [t]);

  const toggleMobileModal = () => {
    setIsMobileModalOpen(!isMobileModalOpen);
  };

  const closeMobileModal = () => {
    setIsMobileModalOpen(false);
  };

  const getPageName = () => {
    // next-intl's usePathname returns pathname without locale
    const parts = pathname.split("/").filter(Boolean);
    return parts.length > 0 ? parts[0] : "";
  };

  const currentPageName = getPageName();

  return (
    <>
      {/* Mobile Modal Overlay */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col h-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-3 py-2.5 border-y mt-2 border-dashed">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={closeMobileModal}
              >
                <Circle size={15} />
                <span className="font-mono text-sm">Agenda</span>
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
                {techConfig.map((tech, index) => {
                  const techPath = tech.link.replace("/", "");
                  if (currentPageName === techPath) {
                    return (
                      <div
                        key={tech.name}
                        className={cn(
                          "relative w-full p-6  transition-all duration-150 group/item border-dashed border-b",
                        )}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="group-hover/item:animate-pulse">
                            {tech.icon}
                          </span>
                          <h1 className="text-3xl font-bold font-heading tracking-tight">
                            {tech.name}
                          </h1>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {tech.description}
                        </p>
                      </div>
                    );
                  }

                  if (currentPageName !== techPath) {
                    return (
                      <Link
                        href={tech.link}
                        key={tech.name}
                        className={cn(
                          cn(
                            "flex gap-2 items-center w-full p-6 transition-all duration-150 group/item border-dashed border-b hover:text-primary hover:font-semibold text-muted-foreground",
                          ),
                        )}
                      >
                        <span className="">{tech.icon}</span>
                        <p className="text-sm">{tech.name}</p>
                      </Link>
                    );
                  }
                  return null;
                })}

                {/* Social Links */}
                <div className="p-4 border-b border-dashed">
                  <div className="flex flex-wrap gap-2">
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
                        <span className="text-xs">GitHub</span>
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
                        <span className="text-xs">JP</span>
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
                        <span className="text-xs">Global</span>
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
                        <span className="text-xs">Zenn</span>
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
                        <span className="text-xs">LinkedIn</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="md:hidden sticky top-0 pt-2 bg-background z-10">
        <div
          id="nav"
          className="w-full flex items-center justify-end border-y border-dashed divide-x"
        >
          <div
            id="brand"
            className="font-mono text-sm flex-1 flex items-center h-full px-3 border-dashed"
          >
            <Link
              href="/"
              className="hover:underline flex items-center gap-2"
            >
              <Circle size={15} />
              Soma Takata
            </Link>
          </div>
          <ThemeAndLanguageTogglersContainer />
          <div
            id="brand"
            className="font-mono text-sm flex items-center h-full px-3 border-dashed cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={toggleMobileModal}
          >
            <AlignJustify size={15} />
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
        </div>
        <div className="flex flex-col bg-background items-center justify-start group/soma border-dashed">
          {techConfig.map((tech, index) => {
            const techPath = tech.link.replace("/", "");
            if (currentPageName === techPath) {
              return (
                <div
                  key={tech.name}
                  className={cn(
                    "relative w-full p-6  transition-all duration-150 group/item border-dashed border-b",
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="group-hover/item:animate-pulse">
                      {tech.icon}
                    </span>
                    <h1 className="text-3xl font-bold font-heading tracking-tight">
                      {tech.name}
                    </h1>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {tech.description}
                  </p>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>

      <div className="w-full md:h-screen grid place-items-center">
        <div className="w-full max-w-7xl mx-auto border border-t-0 md:border-t border-dashed flex flex-col mb-2 md:mt-2">
          <div className="w-full flex justify-between divide-x">
            <div className="hidden md:flex flex-col w-1/3 aspect-square bg-background items-center justify-start group/soma border-dashed">
              <div
                id="brand"
                className="md:border-b w-full border-dashed flex items-center justify-start"
              >
                <Link
                  href="/"
                  className="flex items-center gap-1 w-full p-3"
                >
                  <svg
                    className="w-8 h-8 aspect-square"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="24"
                      cy="24"
                      r="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="24" cy="24" r="4" fill="currentColor" />
                  </svg>
                  <p className="text-lg">Soma Takata</p>
                </Link>
              </div>
              {techConfig.map((tech, index) => {
                const techPath = tech.link.replace("/", "");
                if (currentPageName === techPath) {
                  return (
                    <div
                      key={tech.name}
                      className={cn(
                        "relative w-full p-6  transition-all duration-150 group/item border-dashed border-b",
                      )}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="group-hover/item:animate-pulse">
                          {tech.icon}
                        </span>
                        <h1 className="text-3xl font-bold font-heading tracking-tight">
                          {tech.name}
                        </h1>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {tech.description}
                      </p>
                    </div>
                  );
                }

                if (currentPageName !== techPath) {
                  return (
                    <Link
                      href={tech.link}
                      key={tech.name}
                      className={cn(
                        cn(
                          "flex gap-2 items-center w-full p-6 transition-all duration-150 group/item border-dashed border-b hover:text-primary hover:font-semibold text-muted-foreground",
                        ),
                      )}
                    >
                      <span className="">{tech.icon}</span>
                      <p className="text-sm">{tech.name}</p>
                    </Link>
                  );
                }
                return null;
              })}
              <div
                id="cta"
                className="hidden md:flex flex-wrap items-center gap-4 py-11 border-b border-dashed w-full"
              />
              <div
                id="cta"
                className="hidden md:flex flex-wrap items-center gap-4 p-4 border-none"
              >
                <Button
                  variant="outline"
                  asChild
                  className="relative border-dashed text-muted-foreground hover:text-primary"
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
                  className="relative border-dashed text-muted-foreground hover:text-primary"
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
                  className="relative border-dashed text-muted-foreground hover:text-primary"
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
                  className="relative border-dashed text-muted-foreground hover:text-primary"
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
                  className="relative border-dashed text-muted-foreground hover:text-primary"
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

            <div className="flex-1 flex flex-col">
              <div
                id="nav"
                className="hidden w-full md:flex items-center justify-end border-b border-dashed divide-x"
              >
                <ThemeAndLanguageTogglersContainer />
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
              </div>
              <div className="flex-1 relative">
                <div className="md:absolute inset-0 md:overflow-y-auto">
                  {/* Page content is inserted here */}
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
