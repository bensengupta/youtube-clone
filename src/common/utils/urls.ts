export function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export function getVideoWatchUrl(videoId: string) {
  return `${getBaseUrl()}/watch/${videoId}`;
}

export function getUserChannelUrl(userId: string) {
  return `${getBaseUrl()}/channel/${userId}`;
}
