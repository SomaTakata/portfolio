"use client";

import { useEffect, useRef } from "react";

const FLIP_UNITS = [
  { id: "h0" },
  { id: "h1" },
  { id: "m0" },
  { id: "m1" },
  { id: "s0" },
  { id: "s1" },
] as const;

type FlipUnitId = (typeof FLIP_UNITS)[number]["id"];

class FlipDigit {
  root: HTMLElement;
  staticTop: HTMLElement;
  staticBottom: HTMLElement;
  leafFront: HTMLElement;
  leafBack: HTMLElement;
  leaf: HTMLElement;
  currentValue = "0";
  isFlipping = false;
  nextValue = "0";
  timeout: ReturnType<typeof setTimeout> | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.staticTop = root.querySelector(".static-top .card-num") as HTMLElement;
    this.staticBottom = root.querySelector(
      ".static-bottom .card-num",
    ) as HTMLElement;
    this.leafFront = root.querySelector(".leaf-front .card-num") as HTMLElement;
    this.leafBack = root.querySelector(".leaf-back .card-num") as HTMLElement;
    this.leaf = root.querySelector(".leaf") as HTMLElement;
  }

  update(val: string) {
    if (val === this.currentValue) return;

    if (this.isFlipping) {
      this.finishFlip(this.nextValue);
    }

    this.nextValue = val;
    this.flip();
  }

  flip() {
    this.isFlipping = true;
    const next = this.nextValue;
    const current = this.currentValue;

    this.staticTop.textContent = next;
    this.staticBottom.textContent = current;
    this.leafFront.textContent = current;
    this.leafBack.textContent = next;

    this.root.classList.add("flip-active");
    this.leaf.classList.remove("flipping");
    void this.leaf.offsetWidth;
    this.leaf.classList.add("flipping");

    this.timeout = setTimeout(() => {
      this.finishFlip(next);
    }, 600);
  }

  finishFlip(val: string) {
    this.isFlipping = false;
    this.currentValue = val;

    this.staticBottom.textContent = val;
    this.leafFront.textContent = val;
    this.staticTop.textContent = val;

    this.leaf.classList.remove("flipping");
    this.root.classList.remove("flip-active");
  }

  destroy() {
    if (this.timeout) clearTimeout(this.timeout);
  }
}

/** Returns hh/mm/ss for a given IANA time zone using Intl. */
function getTimeParts(timeZone: string): { h: string; m: string; s: string } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const lookup = (type: string) =>
    parts.find((p) => p.type === type)?.value.padStart(2, "0") ?? "00";

  // Intl can emit "24" at midnight for hour12:false — normalize to "00".
  let h = lookup("hour");
  if (h === "24") h = "00";

  return { h, m: lookup("minute"), s: lookup("second") };
}

export default function FlipClock({
  timeZone,
  color,
}: {
  timeZone: string;
  color: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const digits = {} as Record<FlipUnitId, FlipDigit>;
    for (const { id } of FLIP_UNITS) {
      const el = container.querySelector(`#${id}`) as HTMLElement | null;
      if (!el) return;
      digits[id] = new FlipDigit(el);
    }

    const setAll = (h: string, m: string, s: string) => {
      digits.h0.update(h[0]);
      digits.h1.update(h[1]);
      digits.m0.update(m[0]);
      digits.m1.update(m[1]);
      digits.s0.update(s[0]);
      digits.s1.update(s[1]);
    };

    const initAll = (h: string, m: string, s: string) => {
      Object.values(digits).forEach((d) => {
        d.currentValue = "0";
        d.finishFlip("0");
      });
      digits.h0.finishFlip(h[0]);
      digits.h1.finishFlip(h[1]);
      digits.m0.finishFlip(m[0]);
      digits.m1.finishFlip(m[1]);
      digits.s0.finishFlip(s[0]);
      digits.s1.finishFlip(s[1]);
    };

    const initial = getTimeParts(timeZone);
    initAll(initial.h, initial.m, initial.s);

    const interval = setInterval(() => {
      const { h, m, s } = getTimeParts(timeZone);
      setAll(h, m, s);
    }, 1000);

    return () => {
      clearInterval(interval);
      Object.values(digits).forEach((d) => d.destroy());
    };
  }, [timeZone]);

  return (
    <div
      className="flip-clock-scene"
      ref={containerRef}
      style={{ "--text-color": color } as React.CSSProperties}
    >
      <div className="clock-housing">
        <DigitGroup ids={["h0", "h1"]} initial={["1", "7"]} />
        <Separator />
        <DigitGroup ids={["m0", "m1"]} initial={["5", "1"]} />
        <Separator />
        <DigitGroup ids={["s0", "s1"]} initial={["1", "4"]} />

        <div className="clock-overlay-sheen" />
        <div className="clock-overlay-ring" />
      </div>
    </div>
  );
}

function DigitGroup({
  ids,
  initial,
}: {
  ids: [FlipUnitId, FlipUnitId];
  initial: [string, string];
}) {
  return (
    <div className="digit-group">
      <FlipUnit id={ids[0]} value={initial[0]} />
      <FlipUnit id={ids[1]} value={initial[1]} />
    </div>
  );
}

function FlipUnit({ id, value }: { id: FlipUnitId; value: string }) {
  return (
    <div className="flip-unit" id={id}>
      <div className="card-half card-top static-top">
        <span className="card-num">{value}</span>
      </div>
      <div className="card-half card-bottom static-bottom">
        <span className="card-num">{value}</span>
      </div>
      <div className="leaf">
        <div className="leaf-front">
          <span className="card-num">{value}</span>
        </div>
        <div className="leaf-back">
          <span className="card-num">0</span>
        </div>
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="clock-separator">
      <div className="clock-dot" />
      <div className="clock-dot" />
    </div>
  );
}
