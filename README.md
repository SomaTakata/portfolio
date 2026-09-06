# Soma

SomaTakata Portfolio — https://somatakata.com

## Tech Stack

- Framework: Next.js 16 (App Router)
- UI: Tailwind CSS v4 / shadcn/ui
- i18n: next-intl (`en` / `ja`)
- Hosting: Cloudflare Workers via `@opennextjs/cloudflare`

サーバー側のデータベースも認証もありません。コンテンツは静的な JSON、画像は `public/` に置いてビルド時に取り込みます。

## Getting Started

```bash
git clone https://github.com/SomaTakata/portfolio.git
bun install
bun run dev
```

`bun run dev` は Node 上の Next.js dev サーバー、`bun run preview` は Cloudflare Workers ランタイム (workerd) 上での確認用です。

## Content

コンテンツは管理画面を持たず、ファイルを直接編集して push します。

| 追加したいもの | 編集する場所 |
| --- | --- |
| 経歴 / ニュース / 作品 / スキル | `src/i18n/messages/ja.json` と `en.json` の各 `items` 配列（先頭が最新） |
| ギャラリーの絵 | `public/gallery/` に画像を置く |
| サイトのメタ情報 | `src/constants/site.config.ts` |

`public/gallery/` はビルド時に `scripts/generate-gallery-manifest.mjs` が走査して
`src/features/terminal/gallery-manifest.ts` を生成します。Cloudflare Workers には
実行時のファイルシステムがないため、ディレクトリ走査はビルド時に済ませています。

## Deploy

```bash
bun run deploy
```

`opennextjs-cloudflare build` でビルドし、Worker `portfolio` に配信します。
カスタムドメイン (`somatakata.com` / `www.somatakata.com`) は `wrangler.jsonc` の
`routes` で管理しています。
