"use client";

import { MainNav } from "@/components/main-nav";
import { NavDrawerContent, NavDrawerRoot } from "@/components/nav-drawer";
import { useDisclosure } from "@/lib/hooks/useDisclosure";

const useSiteHeaderController = () => {
  const drawer = useDisclosure();

  const isDrawerOpen = drawer.isOpen;
  const onDrawerOpenChange = drawer.setIsOpen;
  const onClickDrawerLink = drawer.close;

  return { isDrawerOpen, onDrawerOpenChange, onClickDrawerLink };
};

export function SiteHeader() {
  const { isDrawerOpen, onDrawerOpenChange, onClickDrawerLink } =
    useSiteHeaderController();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full bg-background/95 backdrop-blur">
      <NavDrawerRoot isOpen={isDrawerOpen} onOpenChange={onDrawerOpenChange}>
        <MainNav />
        <NavDrawerContent onClickLink={onClickDrawerLink} />
      </NavDrawerRoot>
    </header>
  );
}
