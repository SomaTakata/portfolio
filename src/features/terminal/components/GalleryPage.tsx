import fs from "node:fs/promises";
import path from "node:path";
import LuminaGallery, { type GalleryImage } from "./LuminaGallery";

export default async function TerminalPage() {
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  const files = await fs.readdir(galleryDir);

  const images: GalleryImage[] = files
    .filter((file) => /\.(png|jpe?g|webp|gif|avif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file, index) => ({
      src: `/gallery/${file}`,
      label: `FIG. ${String(index + 1).padStart(2, "0")}`,
    }));

  return <LuminaGallery images={images} />;
}
