import * as React from "react";
import { Skeleton } from "./ui/skeleton";
import type { VideoListItem } from "@/ts/types";

interface VideoCardProps {
  video?: VideoListItem;
}

export function VideoCardSkeleton(props: VideoCardProps) {
  return (
    <div className="flex min-w-[320px] max-w-[360px] flex-grow flex-col gap-[10px]">
      <Skeleton className="flex aspect-video w-full animate-none rounded-md" />
      <div className="flex space-x-3">
        <Skeleton className="mt-0.5 h-9 w-9 animate-none rounded-full" />
        <div className="flex-1 space-y-2.5">
          <Skeleton className="h-5 w-[90%] animate-none rounded-[2px]" />
          <Skeleton className="h-5 w-[60%] animate-none rounded-[2px]" />
        </div>
      </div>
    </div>
  );
}
