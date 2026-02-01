export const dynamic = "force-dynamic";

import ThemeAndLanguageTogglersContainer from "@/components/theme/togglers-container";
import { Locale } from "@/types";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/user-profile";
import { siteConfig } from "@/constants/site.config";
import {
  ArrowUpRight,
  BarChart2,
  CreditCard,
  Layout,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <MockNavbar locale={locale} />
      <div className="flex h-full">
        <MockSidebar locale={locale} />
        <div id="main" className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

const MockNavbar = ({ locale }: { locale: string }) => {
  return (
    <div
      id="nav"
      className="border-b border-dashed flex items-center justify-between"
    >
      <div
        id="brand"
        className="h-full md:border-r border-dashed w-[300px] flex items-center justify-center"
      >
        <Button
          variant="ghost"
          className="w-full h-full font-heading text-lg md:text-2xl font-bold"
          asChild
        >
          <Link href={`/${locale}`}>
            <span>{siteConfig.name}</span>
          </Link>
        </Button>
      </div>
      <div className="flex-1 flex items-center justify-end h-full border-dashed divide-x">
        <Button
          className="h-full border-l border-dashed"
          size="lg"
          variant="ghost"
          asChild
        >
          <a
            href={siteConfig.socials.x_jp}
            target="_blank"
            className="flex items-center gap-2 group/nav"
          >
            <span>X</span>
            <div className="relative z-10 size-4 overflow-hidden flex items-center justify-center">
              <ArrowUpRight className="-z-10 absolute opacity-100 scale-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/nav:-translate-y-5 group-hover/nav:translate-x-5 group-hover/nav:opacity-0 group-hover/nav:scale-0 transition-all duration-200" />
              <ArrowUpRight className="absolute -z-10 -bottom-4 -left-4 opacity-0 scale-0 group-hover/nav:-translate-y-[15px] group-hover/nav:translate-x-4 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-200" />
            </div>
          </a>
        </Button>
        <Button
          className="h-full border-l border-dashed"
          size="lg"
          variant="ghost"
          asChild
        >
          <a
            href={siteConfig.socials.github}
            target="_blank"
            className="flex items-center gap-2 group/nav"
          >
            <span>Github</span>
            <div className="relative z-10 size-4 overflow-hidden flex items-center justify-center">
              <ArrowUpRight className="-z-10 absolute opacity-100 scale-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/nav:-translate-y-5 group-hover/nav:translate-x-5 group-hover/nav:opacity-0 group-hover/nav:scale-0 transition-all duration-200" />
              <ArrowUpRight className="absolute -z-10 -bottom-4 -left-4 opacity-0 scale-0 group-hover/nav:-translate-y-[15px] group-hover/nav:translate-x-4 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-200" />
            </div>
          </a>
        </Button>
        <ThemeAndLanguageTogglersContainer />
        <UserProfile className="size-10 md:size-14" />
      </div>
    </div>
  );
};

const MockSidebar = ({ locale }: { locale: string }) => {
  return (
    <div
      id="sidebar"
      className="w-[300px] border-r border-dashed hidden md:block"
    >
      <div className="flex flex-col divide-y border-b border-dashed">
        <Button
          variant="ghost"
          className="border-dashed h-14 text-left justify-start pl-8"
          asChild
        >
          <Link href={`/${locale}/dashboard`}>
            <Layout />
            <span>Dashboard</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="border-dashed h-14 text-left justify-start pl-8 opacity-50 cursor-not-allowed"
          disabled
          asChild
        >
          <Link href="/settings">
            <Settings />
            <span>Settings</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="border-dashed h-14 text-left justify-start pl-8 opacity-50 cursor-not-allowed"
          disabled
          asChild
        >
          <Link href="/analytics">
            <BarChart2 />
            <span>Analytics</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="border-dashed h-14 text-left justify-start pl-8 opacity-50 cursor-not-allowed"
          disabled
          asChild
        >
          <Link href="/users">
            <Users />
            <span>Users</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="border-dashed h-14 text-left justify-start pl-8 opacity-50 cursor-not-allowed"
          disabled
          asChild
        >
          <Link href="/billing">
            <CreditCard />
            <span>Billing</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
