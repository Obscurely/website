"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const TimeContext = createContext<Date>(new Date());

export const TimeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
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
