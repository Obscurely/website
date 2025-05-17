"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@ui/button";
import { IconMoon, IconSun } from "@tabler/icons-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="opacity-0" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-slate-400 hover:text-slate-200"
    >
      {theme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
    </Button>
  );
};
