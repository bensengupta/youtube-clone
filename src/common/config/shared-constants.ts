// 15 MB
export const FILE_PART_SIZE = 15 * 1024 ** 2;

// 1 GB
export const MAX_VIDEO_SIZE_IN_BYTES = 1 * 1024 ** 3;

export const VIDEO_VALID_MIMETYPES = ["video/mp4"] as const;

type VideoAccept = {
  [K in (typeof VIDEO_VALID_MIMETYPES)[number]]: readonly string[];
};

export const VIDEO_VALID_ACCEPT = {
  "video/mp4": [".mp4"],
} satisfies VideoAccept;
