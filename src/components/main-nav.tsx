import Link from "next/link";

import * as Icons from "@/components/icons";
import { formatAvatarInitials } from "@/lib/utils/format";
import { signIn, useSession } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";
import { NavDrawerTrigger } from "./nav-drawer";
import { Searchbar } from "./searchbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import {
  UserDropdownMenu,
  UserDropdownMenuContent,
  UserDropdownMenuTrigger,
} from "./user-dropdown";
import { VideoUploadModalButton } from "./video-upload/video-upload-modal";

export function MainNav() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex h-14 flex-1 items-center justify-between gap-4 px-4">
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
          <span className="-ml-1.5 mt-3 text-[0.625rem] text-secondary-foreground">
            CLONE
          </span>
        </div>
      </div>
      <div className="hidden basis-[732px] sm:block">
        <Searchbar />
      </div>
      <div className="flex flex-shrink-0 items-center gap-2 text-sm font-medium">
        <ModeToggle />
        <VideoUploadModalButton />
        <Button variant="ghost" size="icon">
          <Icons.NotificationNone className="h-6 w-6" />
        </Button>
        <div className="mx-3.5">
          {status === "loading" && (
            <Skeleton className="h-8 w-8 rounded-full" />
          )}
          {status === "authenticated" && (
            <UserDropdownMenu>
              <UserDropdownMenuTrigger asChild>
                <button className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user.image ?? undefined} />
                    <AvatarFallback>
                      {formatAvatarInitials(session.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </UserDropdownMenuTrigger>
              <UserDropdownMenuContent session={session} />
            </UserDropdownMenu>
          )}
          {status === "unauthenticated" && (
            <Button onClick={() => void signIn()}>Sign in</Button>
          )}
        </div>
      </div>
    </nav>
  );
}
