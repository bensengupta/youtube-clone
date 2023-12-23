import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/src/client/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center rounded-[2px] uppercase select-none text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/80 focus-visible:bg-primary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:bg-destrictive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:bg-secondary/80",
        link: "text-primary underline-offset-4 hover:underline focus-visible:underline",
        ghost:
          "hover:bg-accent-transparent hover:text-accent-foreground focus-visible:bg-accent-transparent focus-visible:text-accent-foreground",
        "ghost-active":
          "bg-accent-transparent text-accent-foreground hover:bg-accent-foreground/20 focus-visible:bg-accent-foreground/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "p-2.5 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
