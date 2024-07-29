"use client";

import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

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
