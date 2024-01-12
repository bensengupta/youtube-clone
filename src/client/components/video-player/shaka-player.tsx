"use client";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect, useRef } from "react";
import "shaka-player/dist/controls.css";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shaka = require("shaka-player/dist/shaka-player.ui.js");

interface VideoPlayerProps {
  dashManifestUrl: string;
  hlsManifestUrl: string;
}

export default function ShakaPlayer(props: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current || !videoContainerRef.current) return;

    const video = videoRef.current;
    const videoContainer = videoContainerRef.current;

    const player = new shaka.Player(video);
    const ui = new shaka.ui.Overlay(player, videoContainer, video);

    player.load(props.hlsManifestUrl).catch((error: unknown) => {
      console.error(error);
    });

    return () => {
      ui.destroy();
      player.destroy();
    };
  });

  return null;
}
