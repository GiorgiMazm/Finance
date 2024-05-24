"use client";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export function Header() {
  return (
    <div className="border-1">
      <div className="container mx-auto flex justify-between py-3">
        header
        <ThemeSwitcher />
      </div>
    </div>
  );
}
