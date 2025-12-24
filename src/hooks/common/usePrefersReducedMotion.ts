import { useSyncExternalStore } from "react";

// Type definitions for experimental Navigator APIs
interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

interface NavigatorConnection {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NavigatorConnection;
}

const isLowEndDevice = (): boolean => {
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 1;
  if (cores <= 2) return true;

  // Check device memory if available
  const deviceMemory = (navigator as NavigatorWithMemory).deviceMemory;
  if (deviceMemory && deviceMemory <= 2) return true;

  // Check connection type if available
  const connection = (navigator as NavigatorWithConnection).connection;
  if (connection) {
    const slowConnections = ["slow-2g", "2g", "3g"];
    if (slowConnections.includes(connection.effectiveType || "")) return true;
  }

  // Check user agent for known low-end device patterns
  const userAgent = navigator.userAgent.toLowerCase();
  const lowEndPatterns = [
    "android 4",
    "android 5",
    "android 6",
    "android 7",
    "android 8",
    "android 9",
    "iphone os 9",
    "iphone os 10",
    "iphone os 11",
    "iphone os 12",
  ];

  return lowEndPatterns.some((pattern) => userAgent.includes(pattern));
};

const subscribe = (callback: () => void) => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getSnapshot = () => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mediaQuery.matches || isLowEndDevice();
};

const getServerSnapshot = () => false;

export const usePrefersReducedMotion = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
