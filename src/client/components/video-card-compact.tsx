"use client";
import {
  formatPublishedAtDate,
  formatVideoDuration,
  formatViewCount,
} from "@/src/client/utils/format";
import type { VideoFragmentForList } from "@/src/server/fetchers/videos";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export function VideoCardCompactSkeleton() {
  return (
    <div className="flex flex-1 gap-[10px] rounded-sm p-1">
      <div className="relative flex aspect-video w-40 overflow-hidden rounded-md">
        <Skeleton className="flex-1" />
      </div>
      <div className="flex-1 space-y-2.5">
        <Skeleton className="h-5 w-[90%] rounded-[2px]" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-2.5 w-[60%] rounded-[2px]" />
          <Skeleton className="h-2.5 w-[40%] rounded-[2px]" />
        </div>
      </div>
    </div>
  );
}

interface VideoCardCompactProps {
  video: VideoFragmentForList;
}

export function VideoCardCompact({ video }: VideoCardCompactProps) {
  const router = useRouter();
  return (
    <button
      onClick={() => void router.push(video.url)}
      aria-hidden
      tabIndex={-1}
      className="flex flex-1 cursor-pointer gap-[10px] rounded-sm p-1 transition-colors active:bg-accent-transparent"
    >
      <div className="relative flex aspect-video w-40 overflow-hidden rounded-md border-[1px]">
        <Link href={video.url} aria-hidden tabIndex={-1}>
          <Image
            src={video.thumbnailUrl}
            alt=""
            className="rounded-md object-cover"
            fill
            unoptimized
          />
          {video.duration ? (
            <span className="absolute bottom-0 right-0 z-10 m-1 rounded-sm bg-black/80 px-1 py-0.5 text-xs font-medium text-white">
              {formatVideoDuration(video.duration)}
            </span>
          ) : null}
        </Link>
      </div>
      <div className="flex flex-1 flex-col items-start">
        <Link
          href={video.url}
          className="line-clamp-2 font-medium leading-snug"
        >
          {video.title}
        </Link>
        <span className="flex flex-col items-start text-xs text-muted-foreground">
          <Link href={video.owner.url} className="line-clamp-1 pt-1">
            {video.owner.name}
          </Link>
          <p className="flex">
            <span>{formatViewCount(video.viewCount)} views</span>
            <span
              className="before:mx-1 before:content-['•']"
              suppressHydrationWarning
            >
              {formatPublishedAtDate(video.publishedAt)}
            </span>
          </p>
        </span>
      </div>
    </button>
  );
}
