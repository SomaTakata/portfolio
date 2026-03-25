import fs from "node:fs/promises";
import path from "node:path";
import Image from "next/image";

export default async function TerminalPage() {
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  const files = await fs.readdir(galleryDir);

  const images = files
    .filter((file) => /\.(png|jpe?g|webp|gif|avif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => ({
      src: `/gallery/${file}`,
      alt: file.replace(/\.[^.]+$/, ""),
    }));

  return (
    <div className="p-4 md:p-6">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((item, idx) => (
          <article
            key={`${item.src}-${idx}`}
            className="relative overflow-hidden border border-dashed bg-muted/20 aspect-[3/4]"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-contain p-3 md:p-4 brightness-75 transition-transform duration-500 hover:scale-[1.02]"
              priority={idx < 2}
            />
          </article>
        ))}
      </section>
    </div>
  );
}
