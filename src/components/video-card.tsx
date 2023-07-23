import * as React from "react";
import { Skeleton } from "./ui/skeleton";
import type { VideoListItem } from "@/ts/types";
import Image from "next/image";
import { formatPublishedAtDate, formatViewCount } from "@/lib/utils/format";

interface VideoCardProps {
  video?: VideoListItem;
}

export function VideoCard(props: VideoCardProps) {
  const { video } = props;
  return (
    <article className="flex flex-1 flex-col gap-[10px]">
      <div className="relative flex aspect-video w-full overflow-hidden rounded-md">
        {video ? (
          <Image
            src={video.thumbnailUrl}
            alt=""
            className="rounded-md object-cover"
            fill
            unoptimized
          />
        ) : (
          <Skeleton className="flex-1" />
        )}
      </div>
      <div className="flex gap-3">
        <div className="relative mt-0.5 flex h-9 w-9 overflow-hidden rounded-full">
          {video ? (
            <Image
              src={video.owner.thumbnailUrl}
              alt=""
              className="rounded-full object-cover"
              fill
              unoptimized
            />
          ) : (
            <Skeleton className="flex-1 rounded-full" />
          )}
        </div>
        {video ? (
          <div className="flex-1">
            <a className="line-clamp-2 font-medium leading-snug">
              {video.title}
            </a>
            <span className="text-sm text-muted-foreground">
              <a className="line-clamp-1 pt-1">{video.owner.name}</a>
              <p className="flex">
                <span>{formatViewCount(video.viewCount)} views</span>
                <span className="before:mx-1 before:content-['•']">
                  {formatPublishedAtDate(video.publishedAt)}
                </span>
              </p>
            </span>
          </div>
        ) : (
          <div className="flex-1 space-y-2.5">
            <Skeleton className="h-5 w-[90%] rounded-[2px]" />
            <Skeleton className="h-5 w-[60%] rounded-[2px]" />
          </div>
        )}
      </div>
    </article>
  );
}
