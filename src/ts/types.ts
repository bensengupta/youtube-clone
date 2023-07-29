import type { RouterOutputs } from "@/utils/api";

export type VideoListItem = RouterOutputs["videos"]["list"][number];
export type VideoGetByIdItem = RouterOutputs["videos"]["getVideoById"];
