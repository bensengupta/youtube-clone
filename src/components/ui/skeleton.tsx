import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const skeletonVariants = cva("rounded-md bg-muted", {
  variants: {
    variant: {
      default: "",
      animated: "animate-pulse",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SkeletonProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div className={cn(skeletonVariants({ variant, className }))} {...props} />
  );
}

export { Skeleton, skeletonVariants };
