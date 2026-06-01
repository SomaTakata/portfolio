import type { Metadata } from "next";
import { Anton } from "next/font/google";
import ClockApp from "./ClockApp";
import "./flip-clock.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "Flip Clock",
};

export default function ClockPage() {
  return (
    <main className={anton.variable} style={{ padding: 0, margin: 0 }}>
      <ClockApp />
    </main>
  );
}
