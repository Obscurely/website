"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const TimeContext = createContext<Date | null>(null);

export const TimeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <TimeContext.Provider value={currentTime}>{children}</TimeContext.Provider>
  );
};

export const useCurrentTime = () => {
  const context = useContext(TimeContext);
  if (context === undefined) {
    throw new Error("useCurrentTime must be used within a TimeProvider");
  }
  return context;
};
