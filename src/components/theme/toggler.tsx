"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";

type ThemeTogglerProps = {
  className?: string;
};

export default function ThemeToggler({ className }: ThemeTogglerProps) {
  const { theme, setTheme } = useTheme();
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const switchTheme = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("light");
        break;
      case "system":
        setTheme(systemTheme === "light" ? "dark" : "light");
        break;
      default:
        break;
    }
  };

  const toggleTheme = () => {
    // @ts-ignore
    if (typeof document.startViewTransition === "function") {
      // @ts-ignore
      document.startViewTransition(switchTheme);
    } else {
      switchTheme();
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      className={cn(
        "size-10 md:size-14 aspect-square p-0 border-l border-dashed relative",
        className,
      )}
    >
      <Image
        src="/light.png"
        alt="light"
        fill
        className="object-contain scale-75 rotate-0 transition-all dark:scale-0"
      />
      <Image
        src="/dark.png"
        alt="dark"
        fill
        className="absolute object-contain scale-0 transition-all dark:scale-75"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
