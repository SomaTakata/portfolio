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

Cloudflare への認証には、次のどちらかを使います。

- `npx wrangler login` でブラウザからログインする
- API トークンを `.dev.vars` に書き、シェルに読み込んでから実行する

```bash
cp .dev.vars.example .dev.vars   # CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID を埋める
set -a && . ./.dev.vars && set +a && bun run deploy
```

トークンは Cloudflare ダッシュボードの My Profile → API Tokens で、テンプレート
「Edit Cloudflare Workers」から作ります。アカウント ID は Workers & Pages の右側に出ています。
wrangler は `.dev.vars` を認証には使わないため、上のようにシェルへ読み込む必要があります。
`.dev.vars` は `.gitignore` 済みです。値は `bun run preview` / `wrangler dev` の Worker にも
渡りますが、デプロイ時にはアップロードされません。

`opennextjs-cloudflare build` でビルドし、Worker `portfolio` に配信します。
カスタムドメイン (`somatakata.com` / `www.somatakata.com`) は `wrangler.jsonc` の
`routes` で管理しています。
