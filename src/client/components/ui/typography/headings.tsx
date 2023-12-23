import { cn } from "@/src/client/utils/cn";
import { Fira_Sans } from "next/font/google";
import * as React from "react";

const firaSans = Fira_Sans({
  weight: ["500"],
  subsets: ["latin"],
  fallback: ["Arial", "sans-serif"],
});

export function Heading1({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-2xl font-medium tracking-tight",
        firaSans.className,
        className
      )}
      {...props}
    />
  );
}
