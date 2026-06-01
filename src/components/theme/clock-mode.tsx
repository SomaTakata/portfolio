"use client";

import { createContext, useContext, useMemo, useState } from "react";

type ClockModeValue = {
  isClockMode: boolean;
  toggle: () => void;
  setClockMode: (on: boolean) => void;
};

const ClockModeContext = createContext<ClockModeValue | null>(null);

export function ClockModeProvider({ children }: { children: React.ReactNode }) {
  const [isClockMode, setClockMode] = useState(false);

  const value = useMemo<ClockModeValue>(
    () => ({
      isClockMode,
      setClockMode,
      toggle: () => setClockMode((v) => !v),
    }),
    [isClockMode],
  );

  return (
    <ClockModeContext.Provider value={value}>
      {children}
    </ClockModeContext.Provider>
  );
}

/** Returns the clock-mode controls, or null when no provider is mounted. */
export function useClockMode(): ClockModeValue | null {
  return useContext(ClockModeContext);
}
