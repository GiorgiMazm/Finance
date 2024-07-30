"use client";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { usePathname } from "next/navigation";

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
          <Link color={pathname !== "/" ? "foreground" : undefined} href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/overview"}>
          <Link
            color={pathname !== "/overview" ? "foreground" : undefined}
            href="/overview"
          >
            Overview
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/diagramms"}>
          <Link
            color={pathname !== "/diagramms" ? "foreground" : undefined}
            href="/diagramms"
          >
            Diagramms
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
