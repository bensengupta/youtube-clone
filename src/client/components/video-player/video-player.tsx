"use client";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useRef } from "react";
import "shaka-player/dist/controls.css";

interface VideoPlayerProps {
  thumbnailUrl: string;
  dashManifestUrl: string;
  hlsManifestUrl: string;
}

export default function VideoPlayer(props: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={videoContainerRef} className="aspect-video flex-1">
      <video
        ref={videoRef}
        className="h-full w-full rounded-xl object-cover shadow-sm"
        poster={props.thumbnailUrl}
      />
    </div>
  );
}
