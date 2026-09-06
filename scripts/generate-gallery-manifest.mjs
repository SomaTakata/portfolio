// public/gallery の中身から静的なマニフェストを生成する。
// Cloudflare Workers には実行時のファイルシステムがないため、
// ディレクトリ走査はビルド時に済ませて TS ファイルとして書き出す。
import fs from "node:fs/promises";
import path from "node:path";

const galleryDir = path.join(process.cwd(), "public", "gallery");
const outFile = path.join(
  process.cwd(),
  "src",
  "features",
  "terminal",
  "gallery-manifest.ts",
);

const files = (await fs.readdir(galleryDir))
  .filter((file) => /\.(png|jpe?g|webp|gif|avif)$/i.test(file))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const contents = `// このファイルは scripts/generate-gallery-manifest.mjs が生成します。手で編集しないこと。
export const galleryFiles = [
${files.map((file) => `  ${JSON.stringify(file)},`).join("\n")}
] as const;
`;

await fs.writeFile(outFile, contents);
console.log(`gallery manifest: ${files.length} images -> ${path.relative(process.cwd(), outFile)}`);
