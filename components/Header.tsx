"use client";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Header() {
  const pathname = usePathname();

  return (
    <Navbar isBordered maxWidth="full" className="mb-4">
      <ThemeSwitcher />
      <NavbarBrand>
        <p className="font-bold text-inherit">FinanceApp</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem isActive={pathname === "/"} aria-current="page">
          <Link
            className={pathname === "/" ? "text-primary" : undefined}
            href="/"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/spending"}>
          <Link
            className={pathname === "/spending" ? "text-primary" : undefined}
            href="/spending"
          >
            Spending
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/dashboard"}>
          <Link
            className={pathname === "/dashboard" ? "text-primary" : undefined}
            href="/dashboard"
          >
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
