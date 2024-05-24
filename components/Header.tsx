"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  function setIsSelected() {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  }
  return (
    <div>
      <Switch onValueChange={setIsSelected}>Light Mode</Switch>
    </div>
  );
}
