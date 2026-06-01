"use client";

import { useState } from "react";
import FlipClock from "./FlipClock";

type City = {
  label: string;
  timeZone: string;
};

const CITIES: City[] = [
  { label: "Tokyo", timeZone: "Asia/Tokyo" },
  { label: "Seoul", timeZone: "Asia/Seoul" },
  { label: "Shanghai", timeZone: "Asia/Shanghai" },
  { label: "Singapore", timeZone: "Asia/Singapore" },
  { label: "Dubai", timeZone: "Asia/Dubai" },
  { label: "London", timeZone: "Europe/London" },
  { label: "Paris", timeZone: "Europe/Paris" },
  { label: "New York", timeZone: "America/New_York" },
  { label: "Los Angeles", timeZone: "America/Los_Angeles" },
  { label: "Sydney", timeZone: "Australia/Sydney" },
];

const COLORS: { label: string; value: string }[] = [
  { label: "White", value: "#f0f0f0" },
  { label: "Amber", value: "#ffb000" },
  { label: "Green", value: "#39ff14" },
  { label: "Cyan", value: "#22d3ee" },
  { label: "Pink", value: "#ff60a8" },
  { label: "Red", value: "#ef4444" },
];

export default function ClockApp({
  embedded = false,
  showControls = true,
}: {
  embedded?: boolean;
  showControls?: boolean;
}) {
  const [timeZone, setTimeZone] = useState(CITIES[0].timeZone);
  const [color, setColor] = useState(COLORS[0].value);

  const offsetLabel = formatOffset(timeZone);

  return (
    <>
      {showControls && (
        <div className={"clock-controls" + (embedded ? " is-embedded" : "")}>
        <div className="clock-control-group">
          <span className="clock-control-label">City</span>
          <div className="clock-select-wrap">
            <select
              className="clock-select"
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              aria-label="Select city"
            >
              {CITIES.map((c) => (
                <option key={c.timeZone} value={c.timeZone}>
                  {c.label}
                </option>
              ))}
            </select>
            <span className="clock-offset">{offsetLabel}</span>
          </div>
        </div>

        <div className="clock-control-group">
          <span className="clock-control-label">Color</span>
          <div className="clock-swatches">
            {COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                className={
                  "clock-swatch" + (c.value === color ? " is-active" : "")
                }
                style={{ backgroundColor: c.value }}
                onClick={() => setColor(c.value)}
                aria-label={c.label}
                title={c.label}
              />
            ))}
            <label className="clock-swatch clock-swatch-custom" title="Custom">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                aria-label="Custom color"
              />
            </label>
          </div>
        </div>
        </div>
      )}

      <FlipClock timeZone={timeZone} color={color} embedded={embedded} />
    </>
  );
}

/** Returns a "GMT+9" style label for the given IANA time zone. */
function formatOffset(timeZone: string): string {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "shortOffset",
    }).formatToParts(new Date());
    const name = parts.find((p) => p.type === "timeZoneName")?.value;
    return name ?? "";
  } catch {
    return "";
  }
}
