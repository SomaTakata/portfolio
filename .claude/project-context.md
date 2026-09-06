# Portfolio Project Context

## Project Overview
https://somatakata.com の個人ポートフォリオ。経歴・スキル・作品・ニュース・アートギャラリー・GitHub アクティビティを表示する。バックエンドを持たない静的寄りのサイト。

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **i18n**: next-intl (`en` / `ja`、`localePrefix: "always"`)
- **Hosting**: Cloudflare Workers (`@opennextjs/cloudflare`)

データベース・認証・管理画面はない。2026年9月に better-auth / Neon Postgres / drizzle / dashboard を全て撤去した。

## Content
コンテンツは `src/i18n/messages/{ja,en}.json` を直接編集して push する。各セクションの `items` 配列は新しい順（先頭が最新）。ギャラリー画像は `public/gallery/` に置くと、`prebuild` で `scripts/generate-gallery-manifest.mjs` が `src/features/terminal/gallery-manifest.ts` を生成して取り込む。

## Constraints
- Workers には実行時のファイルシステムがない。`fs` でディレクトリを走査せず、必要ならビルド時にマニフェストを生成する。
- `src/proxy.ts` は next-intl のロケールルーティングのみ。認証ロジックを足さない。
- 環境変数もシークレットも使っていない（Worker のシークレットは 0 件）。

## Architecture Principles
- Feature-based organization (`src/features/`)
- 型は `src/types/index.d.ts` と各 `src/components/shared/*` に置く
- 使われていないコンポーネントや依存は残さない
