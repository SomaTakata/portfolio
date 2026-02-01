export type Locale = "en" | "ja";

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  origin: string;
  og: string;
  keywords: string[];
  creator: {
    name: string;
    url: string;
  };
  socials: {
    github: string;
    x_jp: string;
    x_global: string;
    zenn: string;
    linkedin: string;
  };
};
