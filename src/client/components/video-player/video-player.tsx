"use client";

import { VideoJSPlayer } from "./video-js";

interface VideoPlayerProps {
  thumbnailUrl: string;
  dashManifestUrl: string;
  hlsManifestUrl: string;
}

export default function VideoPlayer(props: VideoPlayerProps) {
  return (
    <div className="aspect-video w-full">
      <VideoJSPlayer
        options={{
          fill: true,
          autoplay: false,
          controls: true,
          sources: [
            {
              src: props.dashManifestUrl,
              type: "application/dash+xml",
            },
            {
              src: props.hlsManifestUrl,
              type: "application/x-mpegURL",
            },
          ],
        }}
      />
    </div>
  );
}
