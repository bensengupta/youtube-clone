/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as React from "react";
import { cn } from "../utils/cn";

import AccountBoxIcon from "@material-symbols/svg-400/outlined/account_box.svg";
import AccountCircleIcon from "@material-symbols/svg-400/outlined/account_circle.svg";
import CloseIcon from "@material-symbols/svg-400/outlined/close.svg";
import ErrorIcon from "@material-symbols/svg-400/outlined/error.svg";
import FeedbackIcon from "@material-symbols/svg-400/outlined/feedback.svg";
import FlagIcon from "@material-symbols/svg-400/outlined/flag.svg";
import HelpIcon from "@material-symbols/svg-400/outlined/help.svg";
import HistoryIcon from "@material-symbols/svg-400/outlined/history.svg";
import HomeIcon from "@material-symbols/svg-400/outlined/home.svg";
import LightbulbIcon from "@material-symbols/svg-400/outlined/lightbulb.svg";
import MenuIcon from "@material-symbols/svg-400/outlined/menu.svg";
import ModeHeatIcon from "@material-symbols/svg-400/outlined/mode_heat.svg";
import MovieIcon from "@material-symbols/svg-400/outlined/movie.svg";
import MusicNoteIcon from "@material-symbols/svg-400/outlined/music_note.svg";
import NewsmodeIcon from "@material-symbols/svg-400/outlined/newsmode.svg";
import NotificationsIcon from "@material-symbols/svg-400/outlined/notifications.svg";
import PlaylistPlayIcon from "@material-symbols/svg-400/outlined/playlist_play.svg";
import PodcastsIcon from "@material-symbols/svg-400/outlined/podcasts.svg";
import ScheduleIcon from "@material-symbols/svg-400/outlined/schedule.svg";
import SearchIcon from "@material-symbols/svg-400/outlined/search.svg";
import SensorsIcon from "@material-symbols/svg-400/outlined/sensors.svg";
import SettingsIcon from "@material-symbols/svg-400/outlined/settings.svg";
import SlideshowIcon from "@material-symbols/svg-400/outlined/slideshow.svg";
import StylerIcon from "@material-symbols/svg-400/outlined/styler.svg";
import SubscriptionsIcon from "@material-symbols/svg-400/outlined/subscriptions.svg";
import ThumbUpIcon from "@material-symbols/svg-400/outlined/thumb_up.svg";
import TrophyIcon from "@material-symbols/svg-400/outlined/trophy.svg";
import UploadIcon from "@material-symbols/svg-400/outlined/upload.svg";
import VideoCallIcon from "@material-symbols/svg-400/outlined/video_call.svg";

import YoutubeGamingIcon from "@/src/client/assets/youtube-gaming.svg";
import YoutubeKidsIcon from "@/src/client/assets/youtube-kids.svg";
import YoutubeMusicIcon from "@/src/client/assets/youtube-music.svg";
import YoutubeShortsIcon from "@/src/client/assets/youtube-shorts.svg";
import YoutubeStudioIcon from "@/src/client/assets/youtube-studio.svg";
import YoutubeIcon from "@/src/client/assets/youtube.svg";

type IconProps = React.SVGProps<SVGSVGElement>;

function wrapIcon(Icon: React.FC<IconProps>) {
  return function WrappedIcon({ className, ...props }: IconProps) {
    return <Icon {...props} className={cn("fill-[currentColor]", className)} />;
  };
}

const GenericError = wrapIcon(ErrorIcon);

export const VideoUpload = wrapIcon(VideoCallIcon);
export const Clear = wrapIcon(CloseIcon);
export const FashionAndBeauty = wrapIcon(StylerIcon);
export const FileUpload = wrapIcon(UploadIcon);
export const Help = wrapIcon(HelpIcon);
export const History = wrapIcon(HistoryIcon);
export const Home = wrapIcon(HomeIcon);
export const InvalidFile = GenericError;
export const Learning = wrapIcon(LightbulbIcon);
export const AccountBox = wrapIcon(AccountBoxIcon);
export const LikedVideos = wrapIcon(ThumbUpIcon);
export const Podcasts = wrapIcon(PodcastsIcon);
export const Live = wrapIcon(SensorsIcon);
export const Menu = wrapIcon(MenuIcon);
export const MoviesAndTV = wrapIcon(MovieIcon);
export const Music = wrapIcon(MusicNoteIcon);
export const News = wrapIcon(NewsmodeIcon);
export const NotificationNone = wrapIcon(NotificationsIcon);
export const Profile = wrapIcon(AccountCircleIcon);
export const Report = wrapIcon(FlagIcon);
export const Search = wrapIcon(SearchIcon);
export const SendFeedback = wrapIcon(FeedbackIcon);
export const Settings = wrapIcon(SettingsIcon);
export const SongList = wrapIcon(PlaylistPlayIcon);
export const Sports = wrapIcon(TrophyIcon);
export const Subscriptions = wrapIcon(SubscriptionsIcon);
export const Trending = wrapIcon(ModeHeatIcon);
export const WatchLater = wrapIcon(ScheduleIcon);
export const YourVideos = wrapIcon(SlideshowIcon);

export const Youtube = wrapIcon(YoutubeIcon);
export const YtKids = wrapIcon(YoutubeKidsIcon);
export const YtMusic = wrapIcon(YoutubeMusicIcon);
export const YtStudio = wrapIcon(YoutubeStudioIcon);
export const YtShorts = wrapIcon(YoutubeShortsIcon);
export const YtGaming = wrapIcon(YoutubeGamingIcon);

export const Logo = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 507.893 113.387"
    {...props}
  >
    <path
      d="M1189.46 717.605c-13.97 52.266-55.13 93.434-107.4 107.403-94.744 25.387-474.638 25.387-474.638 25.387s-379.891 0-474.633-25.387c-52.266-13.969-93.433-55.137-107.402-107.403C0 622.863 0 425.199 0 425.199s0-197.672 25.387-292.41C39.355 80.527 80.523 39.356 132.789 25.391 227.531-.004 607.422-.004 607.422-.004s379.894 0 474.638 25.395c52.27 13.965 93.43 55.136 107.4 107.398 25.39 94.738 25.39 292.41 25.39 292.41s0 197.664-25.39 292.406"
      fill="#ed1d24"
      fillOpacity="1"
      fillRule="nonzero"
      stroke="none"
      transform="matrix(.13333 0 0 -.13333 0 113.387)"
    />
    <path
      d="m485.938 242.969 315.617 182.226-315.617 182.231ZM1898.01 160.164c6.65 17.363 9.99 45.742 9.99 85.125v165.945c0 38.223-3.34 66.161-9.99 83.832-6.66 17.661-18.39 26.5-35.18 26.5-16.22 0-27.67-8.839-34.32-26.5-6.66-17.671-9.99-45.609-9.99-83.832V245.289c0-39.383 3.18-67.762 9.56-85.125 6.36-17.383 17.94-26.062 34.75-26.062 16.79 0 28.52 8.679 35.18 26.062zm-134.65-83.406c-24.05 16.199-41.14 41.402-51.26 75.586-10.14 34.16-15.2 79.629-15.2 136.39v77.321c0 57.336 5.78 103.386 17.37 138.133 11.58 34.75 29.67 60.082 54.3 76.015 24.61 15.922 56.9 23.891 96.87 23.891 39.38 0 70.94-8.114 94.69-24.324 23.74-16.215 41.12-41.563 52.13-76.016 10.99-34.465 16.5-80.363 16.5-137.699v-77.321c0-56.761-5.36-102.379-16.07-136.832-10.72-34.461-28.1-59.66-52.13-75.578-24.04-15.926-56.61-23.894-97.73-23.894-42.29 0-75.45 8.117-99.47 24.328M3623.76 511.609c-6.07-7.531-10.14-19.839-12.16-36.918-2.04-17.089-3.03-43.003-3.03-77.753v-38.227h87.73v38.227c0 34.164-1.16 60.082-3.47 77.753-2.32 17.661-6.51 30.106-12.59 37.352-6.09 7.242-15.5 10.863-28.24 10.863-12.75 0-22.16-3.773-28.24-11.297zm-15.19-224.14v-26.934c0-34.18.99-59.805 3.03-76.883 2.02-17.089 6.21-29.543 12.6-37.367 6.37-7.808 16.2-11.726 29.54-11.726 17.94 0 30.26 6.953 36.92 20.859 6.65 13.898 10.27 37.062 10.85 69.504l103.39-6.086c.58-4.648.87-11.016.87-19.109 0-49.239-13.46-86.02-40.4-110.344-26.92-24.317-65.02-36.485-114.24-36.485-59.07 0-100.49 18.528-124.23 55.606-23.76 37.051-35.63 94.394-35.63 172.012v92.964c0 79.926 12.31 138.266 36.93 175.059 24.61 36.774 66.75 55.164 126.41 55.164 41.11 0 72.68-7.531 94.69-22.586 22-15.07 37.5-38.527 46.48-70.371 8.98-31.859 13.47-75.883 13.47-132.055v-91.222h-200.68M1471.42 297.441l-136.4 492.598h119.02l47.78-223.277c12.17-55.035 21.14-101.946 26.93-140.739h3.48c4.05 27.797 13.03 74.415 26.93 139.868l49.52 224.148h119.02l-138.13-492.598V61.121h-118.15v236.32M2415.86 593.676V61.121h-93.83l-10.43 65.156h-2.6c-25.49-49.226-63.72-73.836-114.68-73.836-35.33 0-61.39 11.57-78.19 34.746-16.8 23.153-25.19 59.364-25.19 108.594v397.895h119.89V202.734c0-23.761 2.61-40.695 7.82-50.824 5.21-10.144 13.9-15.203 26.06-15.203 10.43 0 20.42 3.176 29.97 9.563 9.56 6.367 16.65 14.46 21.29 24.312v423.094h119.89M3030.82 593.676V61.121h-93.83l-10.43 65.156h-2.59c-25.51-49.226-63.73-73.836-114.69-73.836-35.33 0-61.39 11.57-78.19 34.746-16.8 23.153-25.19 59.364-25.19 108.594v397.895h119.89V202.734c0-23.761 2.6-40.695 7.81-50.824 5.22-10.144 13.91-15.203 26.07-15.203 10.43 0 20.42 3.176 29.97 9.563 9.56 6.367 16.65 14.46 21.29 24.312v423.094h119.89"
      fill="#fff"
      fillOpacity="1"
      fillRule="nonzero"
      stroke="none"
      transform="matrix(.13333 0 0 -.13333 0 113.387)"
    />
    <path
      d="M1898.01 160.164c6.65 17.363 9.99 45.742 9.99 85.125v165.945c0 38.223-3.34 66.161-9.99 83.832-6.66 17.661-18.39 26.5-35.18 26.5-16.22 0-27.67-8.839-34.32-26.5-6.66-17.671-9.99-45.609-9.99-83.832V245.289c0-39.383 3.18-67.762 9.56-85.125 6.36-17.383 17.94-26.062 34.75-26.062 16.79 0 28.52 8.679 35.18 26.062zm-134.65-83.406c-24.05 16.199-41.14 41.402-51.26 75.586-10.14 34.16-15.2 79.629-15.2 136.39v77.321c0 57.336 5.78 103.386 17.37 138.133 11.58 34.75 29.67 60.082 54.3 76.015 24.61 15.922 56.9 23.891 96.87 23.891 39.38 0 70.94-8.114 94.69-24.324 23.74-16.215 41.12-41.563 52.13-76.016 10.99-34.465 16.5-80.363 16.5-137.699v-77.321c0-56.761-5.36-102.379-16.07-136.832-10.72-34.461-28.1-59.66-52.13-75.578-24.04-15.926-56.61-23.894-97.73-23.894-42.29 0-75.45 8.117-99.47 24.328M3623.76 511.609c-6.07-7.531-10.14-19.839-12.16-36.918-2.04-17.089-3.03-43.003-3.03-77.753v-38.227h87.73v38.227c0 34.164-1.16 60.082-3.47 77.753-2.32 17.661-6.51 30.106-12.59 37.352-6.09 7.242-15.5 10.863-28.24 10.863-12.75 0-22.16-3.773-28.24-11.297zm-15.19-224.14v-26.934c0-34.18.99-59.805 3.03-76.883 2.02-17.089 6.21-29.543 12.6-37.367 6.37-7.808 16.2-11.726 29.54-11.726 17.94 0 30.26 6.953 36.92 20.859 6.65 13.898 10.27 37.062 10.85 69.504l103.39-6.086c.58-4.648.87-11.016.87-19.109 0-49.239-13.46-86.02-40.4-110.344-26.92-24.317-65.02-36.485-114.24-36.485-59.07 0-100.49 18.528-124.23 55.606-23.76 37.051-35.63 94.394-35.63 172.012v92.964c0 79.926 12.31 138.266 36.93 175.059 24.61 36.774 66.75 55.164 126.41 55.164 41.11 0 72.68-7.531 94.69-22.586 22-15.07 37.5-38.527 46.48-70.371 8.98-31.859 13.47-75.883 13.47-132.055v-91.222h-200.68M1471.42 297.441l-136.4 492.598h119.02l47.78-223.277c12.17-55.035 21.14-101.946 26.93-140.739h3.48c4.05 27.797 13.03 74.415 26.93 139.868l49.52 224.148h119.02l-138.13-492.598V61.121h-118.15v236.32M2415.86 593.676V61.121h-93.83l-10.43 65.156h-2.6c-25.49-49.226-63.72-73.836-114.68-73.836-35.33 0-61.39 11.57-78.19 34.746-16.8 23.153-25.19 59.364-25.19 108.594v397.895h119.89V202.734c0-23.761 2.61-40.695 7.82-50.824 5.21-10.144 13.9-15.203 26.06-15.203 10.43 0 20.42 3.176 29.97 9.563 9.56 6.367 16.65 14.46 21.29 24.312v423.094h119.89M3030.82 593.676V61.121h-93.83l-10.43 65.156h-2.59c-25.51-49.226-63.73-73.836-114.69-73.836-35.33 0-61.39 11.57-78.19 34.746-16.8 23.153-25.19 59.364-25.19 108.594v397.895h119.89V202.734c0-23.761 2.6-40.695 7.81-50.824 5.22-10.144 13.91-15.203 26.07-15.203 10.43 0 20.42 3.176 29.97 9.563 9.56 6.367 16.65 14.46 21.29 24.312v423.094h119.89"
      className="fill-[#252323] dark:fill-white"
      fillOpacity="1"
      fillRule="nonzero"
      stroke="none"
      transform="matrix(.13333 0 0 -.13333 0 113.387)"
    />
    <path
      d="M2741.64 693.586h-119.02V61.121h-117.28v632.465h-119.02v96.437h355.32v-96.437M3317.72 291.316c0-38.808-1.61-69.218-4.79-91.218-3.18-22.024-8.54-37.657-16.07-46.914-7.53-9.27-17.68-13.899-30.4-13.899-9.86 0-18.98 2.305-27.37 6.953-8.41 4.629-15.2 11.575-20.42 20.852v302.328c4.05 14.469 11 26.348 20.85 35.617 9.85 9.254 20.55 13.899 32.14 13.899 12.17 0 21.57-4.782 28.24-14.332 6.65-9.555 11.29-25.629 13.9-48.223 2.61-22.582 3.92-54.727 3.92-96.426zm109.89 217.231c-7.25 33.582-18.98 57.906-35.19 72.976-16.22 15.047-38.52 22.582-66.89 22.582-22.01 0-42.57-6.23-61.68-18.675-19.11-12.457-33.89-28.821-44.31-49.09h-.88l.01 280.617h-115.54V61.133h99.03l12.17 50.379h2.6c9.26-17.95 23.16-32.14 41.7-42.567 18.53-10.422 39.1-15.636 61.69-15.636 40.53 0 70.36 18.683 89.48 56.035 19.11 37.363 28.67 95.703 28.67 175.058v84.27c0 59.648-3.63 106.273-10.86 139.875"
      className="fill-[#252323] dark:fill-white"
      fillOpacity="1"
      fillRule="nonzero"
      stroke="none"
      transform="matrix(.13333 0 0 -.13333 0 113.387)"
    />
  </svg>
);
