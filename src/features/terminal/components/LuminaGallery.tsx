"use client";

import { useEffect, useRef, useState } from "react";
import "./gallery.css";

export type GalleryImage = {
  src: string;
  label: string;
};

type Mode = "scroll" | "grid";

export default function LuminaGallery({ images }: { images: GalleryImage[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mode, setMode] = useState<Mode>("scroll");

  useEffect(() => {
    const stage = stageRef.current;
    if (mode !== "scroll" || !stage || images.length === 0) return;

    const getWidth = () => stage.clientWidth || window.innerWidth;

    let itemSpacing = getWidth() > 768 ? 400 : 250;
    let maxScroll = Math.max(1, (images.length - 1) * itemSpacing);

    let scrollTarget = 0;
    let scrollCurrent = 0;
    const ease = 0.07;

    let isDragging = false;
    let startX = 0;
    let startScroll = 0;
    let raf = 0;

    const clamp = () => {
      scrollTarget = Math.max(0, Math.min(scrollTarget, maxScroll));
    };

    const onWheel = (e: WheelEvent) => {
      scrollTarget += e.deltaY * 1.5 + e.deltaX * 1.5;
      clamp();
    };

    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      startScroll = scrollTarget;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const deltaX = startX - e.touches[0].clientX;
      scrollTarget = startScroll + deltaX * 2;
      clamp();
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startScroll = scrollTarget;
      stage.classList.add("is-grabbing");
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = startX - e.clientX;
      scrollTarget = startScroll + deltaX * 1.5;
      clamp();
    };
    const onMouseUp = () => {
      isDragging = false;
      stage.classList.remove("is-grabbing");
    };

    const onResize = () => {
      itemSpacing = getWidth() > 768 ? 400 : 250;
      maxScroll = Math.max(1, (images.length - 1) * itemSpacing);
      clamp();
    };

    stage.addEventListener("wheel", onWheel, { passive: true });
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    stage.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("resize", onResize);

    const render = () => {
      scrollCurrent += (scrollTarget - scrollCurrent) * ease;

      const ratio = scrollCurrent / maxScroll;
      if (progressRef.current)
        progressRef.current.style.width = `${ratio * 100}%`;

      const viewWidth = getWidth();

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const logicalX = index * itemSpacing;
        const distFromCenter = logicalX - scrollCurrent;
        const normalized = distFromCenter / (viewWidth * 0.4);

        const rotateY = normalized * -60;
        const translateZ = Math.abs(normalized) * -600;
        const translateX = normalized * (viewWidth * 0.4);
        const scale = Math.max(0.6, 1 - Math.abs(normalized) * 0.2);

        el.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        el.style.zIndex = String(Math.round((1 - Math.abs(normalized)) * 100));

        if (Math.abs(normalized) < 0.2) {
          el.classList.add("is-active");
        } else {
          el.classList.remove("is-active");
        }
      });

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      stage.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
    };
  }, [images, mode]);

  return (
    <div className="lumina">
      <header className="lumina-sys lumina-header">
        <div>GALLERY</div>

        <div className="lumina-toggle" role="group" aria-label="View mode">
          <button
            type="button"
            className={"lumina-toggle-btn" + (mode === "scroll" ? " is-on" : "")}
            aria-pressed={mode === "scroll"}
            onClick={() => setMode("scroll")}
          >
            SCROLL
          </button>
          <span className="lumina-toggle-sep">/</span>
          <button
            type="button"
            className={"lumina-toggle-btn" + (mode === "grid" ? " is-on" : "")}
            aria-pressed={mode === "grid"}
            onClick={() => setMode("grid")}
          >
            GRID
          </button>
        </div>

        <div>SOMA TAKATA</div>
      </header>

      {mode === "scroll" ? (
        <>
          <div className="lumina-stage" ref={stageRef}>
            {images.map((img, index) => (
              <div
                key={img.src}
                className="lumina-item"
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.label} draggable={false} />
                <div className="lumina-label">{img.label}</div>
              </div>
            ))}
          </div>

          <div className="lumina-progress" ref={progressRef} />
        </>
      ) : (
        <div className="lumina-grid">
          {images.map((img) => (
            <figure key={img.src} className="lumina-grid-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.label} draggable={false} />
              <figcaption className="lumina-grid-label">{img.label}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
