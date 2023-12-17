import type { RouterOutputs } from "../client/utils/trpc-client";

export type NewVideo = RouterOutputs["videos"]["initiateVideoUpload"]["video"];
