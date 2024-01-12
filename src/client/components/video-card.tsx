"use client";
import {
  formatPublishedAtDate,
  formatVideoLength,
  formatViewCount,
} from "@/src/client/utils/format";
import type { VideoFragmentForList } from "@/src/server/fetchers/videos";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export function VideoCardSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-[10px] rounded-sm p-1">
      <div className="relative flex aspect-video w-full overflow-hidden rounded-md">
        <Skeleton className="flex-1" />
      </div>
      <div className="flex gap-3">
        <div className="relative mt-0.5 flex h-9 w-9 overflow-hidden rounded-full">
          <Skeleton className="flex-1 rounded-full" />
        </div>

        <div className="flex-1 space-y-2.5">
          <Skeleton className="h-5 w-[90%] rounded-[2px]" />
          <Skeleton className="h-5 w-[60%] rounded-[2px]" />
        </div>
      </div>
    </div>
  );
}

interface VideoCardProps {
  video: VideoFragmentForList;
}

export function VideoCard({ video }: VideoCardProps) {
  const router = useRouter();
  return (
    <button
      onClick={() => void router.push(video.url)}
      aria-hidden
      tabIndex={-1}
      className="active flex flex-1 cursor-pointer flex-col gap-[10px] rounded-sm p-1 transition-colors active:bg-accent-transparent"
    >
      <div className="relative flex aspect-video w-full overflow-hidden rounded-md border-[1px]">
        <Link href={video.url} aria-hidden tabIndex={-1}>
          <Image
            src={video.thumbnailUrl}
            alt=""
            className="rounded-md object-cover"
            fill
            unoptimized
          />
          {video.metadata ? (
            <span className="absolute bottom-0 right-0 z-10 m-1 rounded-sm bg-black/80 px-1 py-0.5 text-xs font-medium text-white">
              {formatVideoLength(video.metadata.length)}
            </span>
          ) : null}
        </Link>
      </div>
      <div className="flex gap-3">
        <div className="relative mt-0.5 flex h-9 w-9 overflow-hidden rounded-full">
          <Link href={video.owner.url} tabIndex={-1}>
            <Image
              src={video.owner.thumbnailUrl}
              alt=""
              className="rounded-full object-cover"
              fill
              unoptimized
            />
          </Link>
        </div>
        <div className="flex flex-1 flex-col items-start">
          <Link
            href={video.url}
            className="line-clamp-2 font-medium leading-snug"
          >
            {video.title}
          </Link>
          <span className="flex flex-col items-start text-sm text-muted-foreground">
            <Link href={video.owner.url} className="line-clamp-1 pt-1">
              {video.owner.name}
            </Link>
            <p className="flex">
              <span>{formatViewCount(video.viewCount)} views</span>
              <span className="before:mx-1 before:content-['•']">
                {formatPublishedAtDate(video.publishedAt)}
              </span>
            </p>
          </span>
        </div>
      </div>
    </button>
  );
}
