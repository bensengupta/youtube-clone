"use client";

import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { useDisclosure } from "@/lib/hooks/useDisclosure";

const useSiteHeaderController = () => {
  const drawer = useDisclosure();

  const isDrawerOpen = drawer.isOpen;
  const onClickMenu = drawer.open;

  return { isDrawerOpen, onClickMenu };
};

export function SiteHeader() {
  const { isDrawerOpen, onClickMenu } = useSiteHeaderController();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full bg-background/95 backdrop-blur">
      <MainNav onClickMenu={onClickMenu} />
      <MobileNav />
    </header>
  );
}
