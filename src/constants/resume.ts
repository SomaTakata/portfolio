import type { Locale } from "@/types";

export type ResumeEntry = {
  organization: string;
  role?: string;
  period: string;
  bullets: string[];
};

export type ResumeContent = {
  headline: string;
  summary: string[];
  labels: {
    experience: string;
    community: string;
    education: string;
    languages: string;
    skills: string;
    print: string;
    updated: string;
  };
  experience: ResumeEntry[];
  community: ResumeEntry[];
  education: ResumeEntry[];
  languages: string[];
  skills: { category: string; items: string[] }[];
};

export const resume: Record<Locale, ResumeContent> = {
  ja: {
    headline: "ソフトウェアエンジニア",
    summary: [
      "React / Next.js・TypeScript を中心に、8社・10以上のプロダクション案件に携わってきたフルスタックエンジニア。",
      "課題発見から企画・設計・実装まで一気通貫で担当。",
      "AI を既存サービスに組み込み、UX 改善や業務効率化を行った実績が多数。",
    ],
    labels: {
      experience: "職務経歴",
      community: "リーダーシップ & コミュニティ",
      education: "学歴",
      languages: "言語",
      skills: "スキル",
      print: "印刷 / PDF 保存",
      updated: "最終更新",
    },
    experience: [
      {
        organization: "日本アイ・ビー・エム株式会社",
        role: "AI Innovator Hackathon インターン",
        period: "2026年8月（5日間）",
        bullets: [
          "生成AI・AIエージェント技術を用いて企業課題の解決に取り組む",
          "10チーム中1位、あわせてチーム内MVPを受賞",
        ],
      },
      {
        organization: "株式会社ソラコム",
        role: "ソフトウェアエンジニアインターン",
        period: "2026年7月 – 2026年8月（2ヶ月）",
        bullets: [
          "Connectivity Hypervisor の eUICC 検索機能を設計・実装",
          "API定義 / インデックス構築 / 検索API / eUICC管理サービス / UI の5層にまたがる開発を担当",
          "Go・Java・TypeScript、DynamoDB・Amazon OpenSearch Service・Lambda を使用",
        ],
      },
      {
        organization: "D4V (Design for Ventures)",
        role: "業務自動化・内部ツール開発（委託）",
        period: "2025年10月 – 現在",
        bullets: ["社内オペレーションの業務自動化ツールを開発"],
      },
      {
        organization: "Nulogic Inc.",
        role: "Studio.stock — UX設計",
        period: "2025年10月 – 2025年11月",
        bullets: ["プロダクトの情報設計・UXデザインを担当"],
      },
      {
        organization: "Mercari Inc.（Hallo事業部）",
        role: "フロントエンド開発インターン",
        period: "2025年5月 – 2025年7月（3ヶ月）",
        bullets: [
          "既存サービスへの新機能追加と UX 改善",
          "AI を活用した新規プロダクトの開発",
          "開発効率向上のため最新 AI ツールを導入",
        ],
      },
      {
        organization: "Nulogic Inc.",
        role: "フルスタックエンジニア",
        period: "2025年3月 – 2025年4月（2ヶ月）",
        bullets: [
          "サブスク自動解約プロトタイプをブラウザ自動化で開発",
          "LLM を活用した UI 自動生成ツールを開発",
        ],
      },
      {
        organization: "NOT A HOTEL Inc.",
        role: "フロントエンド開発インターン",
        period: "2025年1月（2週間）",
        bullets: ["新規機能開発"],
      },
      {
        organization: "Medley Inc.",
        role: "フルスタックエンジニア",
        period: "2024年12月（2週間）",
        bullets: ["社内サービスの新規機能を Next.js / Go で実装"],
      },
      {
        organization: "LayerX Inc.",
        role: "サマーインターン（フルスタック開発）",
        period: "2024年9月（2週間）",
        bullets: ["Next.js と Go を使用してチーム開発"],
      },
      {
        organization: "How Television Co., Ltd.",
        role: "フロントエンド開発インターン",
        period: "2024年4月 – 2024年7月（3ヶ月）",
        bullets: ["外資就活ドットコムを PHP から Next.js にリプレース"],
      },
      {
        organization: "Michibiku Group Co., Ltd.",
        role: "フロントエンドエンジニア（業務委託）",
        period: "2023年11月 – 2024年1月（2ヶ月）",
        bullets: ["AI を活用した営業支援 Chrome 拡張ツールを開発"],
      },
      {
        organization: "株式会社リクルート",
        role: "フロントエンド開発インターン",
        period: "2023年5月 – 2024年2月（10ヶ月）",
        bullets: [
          "事業提案レビュー業務を自動化する AI 機能（LLM 使用）を開発し、レビュー工数を40%削減",
          "新規事業アイデア創出向けの AI ブレスト支援ツールを企画・実装",
        ],
      },
    ],
    community: [
      {
        organization: "しばよこ（Shibayoko）",
        role: "創設者 / 代表",
        period: "2025年2月 – 現在",
        bullets: [
          "デザイン × エンジニアリングの横断コミュニティを設立",
          "3ヶ月で360名に成長、現在も代表として運営",
        ],
      },
      {
        organization: "TechNova",
        role: "創設者 / 代表",
        period: "2024年3月 – 2025年2月",
        bullets: [
          "学生エンジニアコミュニティを創設し、40名まで拡大",
          "技術ワークショップを2回開催",
        ],
      },
    ],
    education: [
      {
        organization: "芝浦工業大学 大学院",
        period: "2026年4月 – 2028年3月（進学予定）",
        bullets: [],
      },
      {
        organization: "芝浦工業大学 システム理工学部 電子情報システム学科",
        period: "2022年4月 – 2026年3月（卒業見込み）",
        bullets: [],
      },
    ],
    languages: ["日本語（ネイティブ）", "英語（CEFR B1）"],
    skills: [
      {
        category: "言語",
        items: ["TypeScript（3年）", "Go（1年）", "JavaScript", "HTML / CSS"],
      },
      {
        category: "フレームワーク / ライブラリ",
        items: [
          "React",
          "Next.js",
          "Node.js",
          "Tailwind CSS",
          "Three.js",
          "Playwright",
        ],
      },
      {
        category: "ツール / 開発環境",
        items: [
          "Git / GitHub",
          "Docker",
          "Jest",
          "Figma",
          "Cursor",
          "Claude Code",
        ],
      },
    ],
  },
  en: {
    headline: "Software Engineer",
    summary: [
      "Full-stack engineer with 3 years of experience across 10+ production projects at 9 companies, specializing in React/Next.js and TypeScript.",
      "Works across the full development lifecycle, from problem identification and planning through design and implementation.",
      "Extensive experience embedding AI into existing products to improve UX and automate internal workflows.",
    ],
    labels: {
      experience: "Work Experience",
      community: "Leadership & Community",
      education: "Education",
      languages: "Languages",
      skills: "Skills",
      print: "Print / Save as PDF",
      updated: "Last updated",
    },
    experience: [
      {
        organization: "IBM Japan",
        role: "AI Innovator Hackathon Intern",
        period: "August 2026 (5 days)",
        bullets: [
          "Built a solution to a business problem using generative AI and AI agents.",
          "Placed 1st out of 10 teams and was named team MVP.",
        ],
      },
      {
        organization: "SORACOM, Inc.",
        role: "Software Engineer Intern",
        period: "July 2026 – August 2026, 2 months",
        bullets: [
          "Designed and implemented eUICC search for Connectivity Hypervisor.",
          "Covered all five layers involved: API definition, index building, the search API, the eUICC management service, and the UI.",
          "Built with Go, Java and TypeScript on DynamoDB, Amazon OpenSearch Service and Lambda.",
        ],
      },
      {
        organization: "D4V (Design for Ventures)",
        role: "Workflow Automation & Internal Tools (Contract)",
        period: "October 2025 – Present",
        bullets: ["Built internal tools that automate operations workflows."],
      },
      {
        organization: "Nulogic Inc.",
        role: "Studio.stock — UX Design",
        period: "October 2025 – November 2025",
        bullets: ["Owned information architecture and UX design for the product."],
      },
      {
        organization: "Mercari Inc. (Hallo Div.)",
        role: "Frontend Development Intern",
        period: "May 2025 – July 2025, 3 months",
        bullets: [
          "Enhanced UX by implementing new features into existing products.",
          "Developed AI-powered new products.",
          "Leveraged cutting-edge AI tools to optimize development processes.",
        ],
      },
      {
        organization: "Nulogic Inc.",
        role: "Full-stack Developer",
        period: "March 2025 – April 2025, 2 months",
        bullets: [
          "Built a subscription auto-cancellation prototype using browser automation.",
          "Developed UI generation tools powered by LLMs.",
        ],
      },
      {
        organization: "NOT A HOTEL Inc.",
        role: "Frontend Development Intern",
        period: "January 2025, 2 weeks",
        bullets: ["Developed new product features."],
      },
      {
        organization: "Medley Inc.",
        role: "Full-stack Developer",
        period: "December 2024, 2 weeks",
        bullets: ["Implemented new features for an internal service in Next.js and Go."],
      },
      {
        organization: "LayerX Inc.",
        role: "Full-stack Development Summer Intern",
        period: "September 2024, 2 weeks",
        bullets: ["Built features as a team using Next.js and Go."],
      },
      {
        organization: "How Television Inc.",
        role: "Frontend Development Intern",
        period: "April 2024 – July 2024, 3 months",
        bullets: ["Replatformed Gaishishukatsu.com from PHP to Next.js."],
      },
      {
        organization: "Michibiku Group",
        role: "Frontend Developer (Contract)",
        period: "November 2023 – January 2024, 2 months",
        bullets: ["Developed an AI-powered sales support Chrome extension."],
      },
      {
        organization: "Recruit Co., Ltd.",
        role: "Frontend Development Intern",
        period: "May 2023 – February 2024, 10 months",
        bullets: [
          "Planned, designed, and implemented AI-powered features for an internal business proposal review system, reducing reviewer workload by 40%.",
          "Built an AI-powered brainstorming assistant for business idea generation.",
        ],
      },
    ],
    community: [
      {
        organization: "Shibayoko",
        role: "Founder & President",
        period: "February 2025 – Present",
        bullets: [
          "Established a cross-functional community combining design and engineering.",
          "Grew to 360 members in 3 months, currently serving as president.",
        ],
      },
      {
        organization: "TechNova",
        role: "Founder & President",
        period: "March 2024 – February 2025",
        bullets: [
          "Founded a student programming circle and expanded it to 40 members.",
          "Organized 2 technical workshops.",
        ],
      },
    ],
    education: [
      {
        organization: "Shibaura Institute of Technology, Graduate School",
        period: "April 2026 – March 2028 (Planned)",
        bullets: [],
      },
      {
        organization:
          "Shibaura Institute of Technology — College of Systems Engineering and Science, Dept. of Electronic Information Systems",
        period: "April 2022 – March 2026 (Expected)",
        bullets: [],
      },
    ],
    languages: ["Japanese (Native)", "English (CEFR B1)"],
    skills: [
      {
        category: "Languages",
        items: ["TypeScript (3 yrs)", "Go (1 yr)", "JavaScript", "HTML & CSS"],
      },
      {
        category: "Frameworks / Libraries",
        items: [
          "React",
          "Next.js",
          "Node.js",
          "Tailwind CSS",
          "Three.js",
          "Playwright",
        ],
      },
      {
        category: "Tools / DevOps",
        items: ["Git / GitHub", "Docker", "Jest", "Figma", "Cursor", "Claude Code"],
      },
    ],
  },
};

/** 履歴書に載せる連絡先。サイトの socials とは別に、応募用アドレスを持つ。 */
export const resumeContact = {
  email: "somatakata.job@gmail.com",
  /** 内容を書き換えたらここも更新する。ページのフッターに出る。 */
  updatedAt: "2026-09",
};
