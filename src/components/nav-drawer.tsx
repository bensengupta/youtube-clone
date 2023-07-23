import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import * as Icons from "@/components/icons";
import { siteConfig, navConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/drawer";

interface NavDrawerRootProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export function NavDrawerRoot(props: NavDrawerRootProps) {
  const { isOpen, onOpenChange, children } = props;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      {children}
    </Sheet>
  );
}

export function NavDrawerTrigger({ children }: React.PropsWithChildren) {
  return <SheetTrigger asChild>{children}</SheetTrigger>;
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
    <SheetContent side="left">
      <MobileLink
        href="/"
        className="flex items-center"
        onClickLink={onClickLink}
      >
        <Icons.Logo className="mr-2 h-4 w-4" />
        <span className="font-bold">{siteConfig.name}</span>
      </MobileLink>
      <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
        <div className="flex flex-col space-y-3">
          {navConfig.mainNav.map(
            (item) =>
              item.href && (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  onClickLink={onClickLink}
                >
                  {item.title}
                </MobileLink>
              )
          )}
        </div>
        <div className="flex flex-col space-y-2">
          {navConfig.sidebarNav.map((item, index) => (
            <div key={index} className="flex flex-col space-y-3 pt-6">
              <h4 className="font-medium">{item.title}</h4>
              {item.items.map((item) => (
                <React.Fragment key={item.href}>
                  {!item.disabled &&
                    (item.href ? (
                      <MobileLink
                        href={item.href}
                        onClickLink={onClickLink}
                        className="text-muted-foreground"
                      >
                        {item.title}
                      </MobileLink>
                    ) : (
                      item.title
                    ))}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </SheetContent>
  );
}

interface MobileLinkProps extends LinkProps {
  onClickLink?: () => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onClickLink,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onClickLink?.();
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}