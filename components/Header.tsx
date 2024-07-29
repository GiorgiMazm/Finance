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

export function Header() {
  return (
    <Navbar isBordered maxWidth="full" className="mb-4">
      <ThemeSwitcher />
      <NavbarBrand>
        <p className="font-bold text-inherit">FinanceApp</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/overview" aria-current="page">
            Overview
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/">
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
