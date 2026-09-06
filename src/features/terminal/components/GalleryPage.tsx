import { galleryFiles } from "../gallery-manifest";
import LuminaGallery, { type GalleryImage } from "./LuminaGallery";

export default function TerminalPage() {
  const images: GalleryImage[] = galleryFiles.map((file, index) => ({
    src: `/gallery/${file}`,
    label: `FIG. ${String(index + 1).padStart(2, "0")}`,
  }));

  return <LuminaGallery images={images} />;
}
