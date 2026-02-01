"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/constants/site.config";
import { toast } from "sonner";
import { ExternalLinkIcon, LogOutIcon } from "lucide-react";
import { cn } from "@/utils/utils";
import { useTranslations } from "next-intl";

export function UserProfile({ className }: { className?: string }) {
  const t = useTranslations("common");
  const [signingOut, setSigningOut] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="size-10 md:size-14 aspect-square flex items-center justify-center p-3">
        <div className="size-4 md:size-8 rounded-full bg-muted/50 animate-pulse"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "size-14 aspect-square p-2 md:p-3",
            signingOut && "animate-pulse",
            className
          )}
        >
          <Avatar>
            <AvatarImage
              src={session.user.image ?? ""}
              alt={session.user.name ?? ""}
              className="rounded-full"
            />
            <AvatarFallback className="rounded-full">
              {session.user.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]">
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={session.user.image ?? ""}
                alt={session.user.name ?? ""}
                className="rounded-full"
              />
              <AvatarFallback className="rounded-full">
                {session.user.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-medium leading-none">{session.user.name}</p>
              <p className="text-sm text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between gap-2"
          >
            <span>{t("socials.github")}</span>
            <ExternalLinkIcon className="size-4" />
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <a
            href={siteConfig.socials.x_global}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between gap-2"
          >
            <span>{t("socials.x_global")}</span>
            <ExternalLinkIcon className="size-4" />
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <a
            href={siteConfig.socials.x_jp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between gap-2"
          >
            <span>{t("socials.x_jp")}</span>
            <ExternalLinkIcon className="size-4" />
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <a
            href={siteConfig.socials.zenn}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between gap-2"
          >
            <span>{t("socials.zenn")}</span>
            <ExternalLinkIcon className="size-4" />
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between gap-2"
          >
            <span>{t("socials.linkedin")}</span>
            <ExternalLinkIcon className="size-4" />
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer w-full flex items-center justify-between gap-2"
          onClick={() =>
            signOut({
              fetchOptions: {
                onRequest: () => {
                  setSigningOut(true);
                  toast.loading("Signing out...");
                },
                onSuccess: () => {
                  setSigningOut(false);
                  toast.success("Signed out successfully");
                  toast.dismiss();
                  router.push("/");
                },
                onError: () => {
                  setSigningOut(false);
                  toast.error("Failed to sign out");
                },
              },
            })
          }
        >
          <span>{t("signOut")}</span>
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
