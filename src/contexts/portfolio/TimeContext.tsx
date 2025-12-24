"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const TimeContext = createContext<Date | null>(null);

export const TimeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    // We have to set the date to not null inside the useEffect on the client side once resources have been loaded.
    // Otherwise this will throw hydration errors in production
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
