"use client";

// import { useState } from "react";
import ThemeToggler from "@/components/theme/toggler";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/user-profile";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import {
  PanelsTopLeft,
  Shield,
  Database,
  Github,
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
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { useState } from "react";

const techConfig = [
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
    link: "skills",
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

export default function Layout({ children }: { children: React.ReactNode }) {
  // const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const toggleMobileModal = () => {
    setIsMobileModalOpen(!isMobileModalOpen);
  };

  const closeMobileModal = () => {
    setIsMobileModalOpen(false);
  };

  return (
    <div className="w-full h-auto md:h-screen overflow-y-auto md:overflow-hidden flex flex-col items-center justify-center">
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
                  if (
                    pathname &&
                    pathname.replace(/^\//, "") === tech.name.toLowerCase()
                  ) {
                    return (
                      <div
                        key={tech.name}
                        className={cn(
                          "relative w-full p-6  transition-all duration-150 group/item border-dashed border-b"
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

                  if (
                    pathname &&
                    pathname.replace(/^\//, "") !== tech.name.toLowerCase()
                  ) {
                    return (
                      <a
                        href={tech.name.toLowerCase()}
                        key={tech.name}
                        className={cn(
                          cn(
                            "flex gap-2 items-center w-full p-6 transition-all duration-150 group/item border-dashed border-b hover:text-primary hover:font-semibold text-muted-foreground"
                          )
                        )}
                      >
                        <span className="">{tech.icon}</span>
                        <p className="text-sm">{tech.name}</p>
                      </a>
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
      <div className="w-full max-w-7xl mx-auto border border-dashed flex flex-col my-2">
        <div className="w-full flex justify-between divide-x">
          <div className="hidden md:flex flex-col w-1/3 aspect-square bg-background items-center justify-start group/soma border-dashed">
            <div
              id="brand"
              className="md:border-b w-full border-dashed flex items-center justify-start"
            >
              <Link href="/" className="flex items-center gap-1 w-full p-3">
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
              if (
                pathname &&
                pathname.replace(/^\//, "") === tech.name.toLowerCase()
              ) {
                return (
                  <div
                    key={tech.name}
                    className={cn(
                      "relative w-full p-6  transition-all duration-150 group/item border-dashed border-b"
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

              if (
                pathname &&
                pathname.replace(/^\//, "") !== tech.name.toLowerCase()
              ) {
                return (
                  <a
                    href={tech.name.toLowerCase()}
                    key={tech.name}
                    className={cn(
                      cn(
                        "flex gap-2 items-center w-full p-6 transition-all duration-150 group/item border-dashed border-b hover:text-primary hover:font-semibold text-muted-foreground"
                      )
                    )}
                  >
                    <span className="">{tech.icon}</span>
                    <p className="text-sm">{tech.name}</p>
                  </a>
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
            <div className="flex-1 flex flex-col">
              <div
                id="nav"
                className="w-full flex items-center justify-end border-b border-dashed divide-x"
              >
                <div
                  id="brand"
                  className="md:hidden font-mono text-sm flex-1 flex items-center h-full px-3 border-dashed"
                >
                  <Link
                    href="/"
                    className="hover:underline flex items-center gap-2"
                  >
                    <Circle size={15} />
                    Soma Takata
                  </Link>
                </div>
                <ThemeToggler className="border-dashed size-10 md:size-14" />
                <div
                  id="brand"
                  className="font-mono md:hidden text-sm flex items-center h-full px-3 border-dashed cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={toggleMobileModal}
                >
                  <AlignJustify size={15} />
                </div>
              </div>
              <div className="md:hidden flex flex-col bg-background items-center justify-start group/soma border-dashed">
                {techConfig.map((tech, index) => {
                  if (
                    pathname &&
                    pathname.replace(/^\//, "") === tech.name.toLowerCase()
                  ) {
                    return (
                      <div
                        key={tech.name}
                        className={cn(
                          "relative w-full p-6  transition-all duration-150 group/item border-dashed border-b"
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
              {/* ここにページのコンテンツが挿入される */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
