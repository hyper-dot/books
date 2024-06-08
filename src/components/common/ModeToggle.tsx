"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={handleToggle}>
      <Sun size={18} className="hidden dark:inline" />
      <Moon size={18} className="inline dark:hidden" />
    </button>
  );
}
