import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";

import * as Icons from "@/components/icons";
import { cn } from "@/lib/utils/cn";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button, buttonVariants } from "./ui/button";
import { siteConfig } from "@/config/site";
import { getYear } from "date-fns";

interface NavDrawerRootProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export function NavDrawerRoot(props: NavDrawerRootProps) {
  const { isOpen, onOpenChange, children } = props;

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      {children}
    </Drawer>
  );
}

export function NavDrawerTrigger({ children }: React.PropsWithChildren) {
  return <DrawerTrigger asChild>{children}</DrawerTrigger>;
}

// <Button
//   variant="ghost"
//   className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
// >
//   <ViewVerticalIcon className="h-5 w-5" />
//   <span className="sr-only">Toggle Menu</span>
// </Button>

interface NavDrawerContentProps {
  onClickLink: () => void;
}

export function NavDrawerContent({ onClickLink }: NavDrawerContentProps) {
  return (
    <DrawerContent side="left" className="flex flex-col">
      <div className="flex items-center">
        <div className="flex items-center pl-4">
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <Icons.Menu className="h-[22px] w-[22px]" />
            </Button>
          </DrawerClose>
          <div className="flex">
            <NavLink href="/" onClickLink={onClickLink}>
              <Icons.Logo className="mx-3 my-4 h-5" />
            </NavLink>
            <span className="-ml-1.5 mt-3 text-[0.625rem] text-secondary-foreground">
              CLONE
            </span>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col p-3">
          <NavItem href="/" onClickLink={onClickLink}>
            <Icons.Home className="h-6 w-6" />
            Home
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.YtShorts className="h-6 w-6" />
            Shorts
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.Subscriptions className="h-6 w-6" />
            Subscriptions
          </NavItem>
        </div>

        <div className="flex flex-col border-t border-border p-3">
          <NavItem href="/feed/library" onClickLink={onClickLink}>
            <Icons.Library className="h-6 w-6" />
            Library
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.History className="h-6 w-6" />
            History
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.YourVideos className="h-6 w-6" />
            Your videos
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.WatchLater className="h-6 w-6" />
            Watch later
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.LikedVideos className="h-6 w-6" />
            Liked videos
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.SongList className="h-6 w-6" />
            Songs
          </NavItem>
        </div>

        <div className="flex flex-col border-t border-border p-3">
          <h2 className="px-3 py-1">Subscriptions</h2>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.Profile className="h-6 w-6" />
            fasterthanlime
          </NavItem>
        </div>

        <div className="flex flex-col border-t border-border p-3">
          <h2 className="px-3 py-1">Explore</h2>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.Trending className="h-6 w-6" />
            Trending
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.Music className="h-6 w-6" />
            Music
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.MoviesAndTV className="h-6 w-6" />
            Movies & TV
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.Live className="h-6 w-6" />
            Live
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.YtGaming className="h-6 w-6" />
            Gaming
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.News className="h-6 w-6" />
            News
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.Sports className="h-6 w-6" />
            Sports
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.Learning className="h-6 w-6" />
            Learning
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.FashionAndBeauty className="h-6 w-6" />
            Fashion & Beauty
          </NavItem>
        </div>

        <div className="flex flex-col border-t border-border p-3">
          <h2 className="px-3 py-1">More from {siteConfig.name}</h2>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.Youtube className="h-6 w-6" />
            {siteConfig.name} Premium
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.YtStudio className="h-6 w-6" />
            {siteConfig.name} Studio
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.YtMusic className="h-6 w-6" />
            {siteConfig.name} Music
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.YtKids className="h-6 w-6" />
            {siteConfig.name} Kids
          </NavItem>
        </div>

        <div className="flex flex-col border-t border-border p-3">
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.Settings className="h-6 w-6" />
            Settings
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.Report className="h-6 w-6" />
            Report history
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.Help className="h-6 w-6" />
            Help
          </NavItem>
          <NavItem href="#" onClickLink={onClickLink}>
            <Icons.SendFeedback className="h-6 w-6" />
            Send feedback
          </NavItem>
        </div>

        <div className="flex flex-wrap gap-x-2 border-t border-border px-6 pt-3 text-[0.8125rem] text-secondary-foreground">
          <NavLink href="#" onClickLink={onClickLink}>
            About
          </NavLink>
          <NavLink href="#" onClickLink={onClickLink}>
            Press
          </NavLink>
          <NavLink href="#" onClickLink={onClickLink}>
            Copyright
          </NavLink>
          <NavLink href="#" onClickLink={onClickLink}>
            Contact us
          </NavLink>
          <NavLink href="#" onClickLink={onClickLink}>
            Creators
          </NavLink>
          <NavLink href="#" onClickLink={onClickLink}>
            Advertise
          </NavLink>
          <NavLink href="#" onClickLink={onClickLink}>
            Developers
          </NavLink>
        </div>

        <div className="flex flex-wrap gap-x-2 px-6 pt-3 text-[0.8125rem] text-secondary-foreground">
          <NavLink href="#" onClickLink={onClickLink}>
            Terms
          </NavLink>
          <NavLink href="#" onClickLink={onClickLink}>
            Privacy
          </NavLink>
          <NavLink href="#" onClickLink={onClickLink}>
            Policy & Safety
          </NavLink>
          <NavLink href="#" onClickLink={onClickLink}>
            How {siteConfig.name} works
          </NavLink>
          <NavLink href="#" onClickLink={onClickLink}>
            Test new features
          </NavLink>
        </div>
        <div className="p-3 text-sm text-secondary-foreground/70">
          <p>© {getYear(new Date())} Benjamin Sengupta</p>
        </div>
      </ScrollArea>
    </DrawerContent>
  );
}

interface NavLinkProps extends LinkProps {
  onClickLink: () => void;
  children: React.ReactNode;
  className?: string;
}

function NavLink({
  href,
  onClickLink,
  className,
  children,
  ...props
}: NavLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onClickLink();
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}

interface NavItemProps {
  href: string;
  onClickLink: () => void;
  children: React.ReactNode;
}

function NavItem({ href, onClickLink, children }: NavItemProps) {
  const pathname = usePathname();

  return (
    <NavLink
      href={href}
      onClickLink={onClickLink}
      className={cn(
        buttonVariants({
          variant: pathname === href ? "ghost-active" : "ghost",
        }),
        "flex gap-6"
      )}
    >
      {children}
    </NavLink>
  );
}
