import * as React from "react";
import Link from "next/link";

import * as Icons from "@/components/icons";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Searchbar } from "./searchbar";
import Image from "next/image";
import { NavDrawerTrigger } from "./nav-drawer";

export function MainNav() {
  return (
    <div className="flex h-14 flex-1 items-center justify-between gap-4 px-4">
      <div className="flex flex-shrink-0 items-center">
        <NavDrawerTrigger>
          <Button variant="ghost" size="icon">
            <Icons.Menu className="h-[22px] w-[22px]" />
          </Button>
        </NavDrawerTrigger>
        <div className="flex">
          <Link href="/">
            <Icons.Logo className="mx-3 my-4 h-5" />
          </Link>
          <span className="-ml-1.5 mt-3 text-xs text-secondary-foreground">
            CLONE
          </span>
        </div>
      </div>
      <div className="hidden basis-[732px] sm:block">
        <Searchbar />
      </div>
      <nav className="flex flex-shrink-0 items-center gap-2 text-sm font-medium">
        <ModeToggle />
        <Button variant="ghost" size="icon">
          <Icons.VideoUpload className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Icons.NotificationNone className="h-6 w-6" />
        </Button>
        <button className="mx-3.5 rounded-full">
          <Image
            width={32}
            height={32}
            className="rounded-full"
            src="https://picsum.photos/id/237/200/200"
            alt="Profile Picture"
            unoptimized
          />
        </button>
      </nav>
    </div>
  );
}
