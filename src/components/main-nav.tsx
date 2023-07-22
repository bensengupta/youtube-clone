import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { MdNotificationsNone, MdOutlineVideoCall } from "react-icons/md";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Searchbar } from "./searchbar";
import Image from "next/image";

interface MainNavProps {
  onClickMenu: () => void;
}

export function MainNav({ onClickMenu }: MainNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-14 flex-1 items-center justify-between gap-4 px-4">
      <div className="flex flex-shrink-0 items-center">
        <Button variant="ghost" size="icon" onClick={onClickMenu}>
          <HamburgerMenuIcon className="h-[22px] w-[22px]" />
        </Button>
        <div className="flex">
          <Link href="/">
            <Icons.logo className="mx-3 my-4 h-5" />
          </Link>
          <span className="-ml-1.5 mt-3 text-xs text-foreground/60">CLONE</span>
        </div>
      </div>
      <div className="hidden basis-[732px] sm:block">
        <Searchbar />
      </div>
      <nav className="text-sm flex flex-shrink-0 items-center gap-4 font-medium">
        <Link
          href="/hello"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/hello" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Hello
        </Link>
        <Link
          href={siteConfig.links.github}
          className={cn(
            "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
          )}
        >
          GitHub
        </Link>
        <ModeToggle />
        <Button variant="ghost" size="icon">
          <MdOutlineVideoCall className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <MdNotificationsNone className="h-6 w-6" />
        </Button>
        <Image
          width={32}
          height={32}
          className="rounded-full"
          src="https://picsum.photos/id/237/200/200"
          alt="Profile Picture"
          unoptimized
        />
      </nav>
    </div>
  );
}
