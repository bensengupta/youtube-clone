import { VideoGetByIdItem } from "@/ts/types";

interface WatchProps {
  video?: VideoGetByIdItem;
}

export function Watch({ video }: WatchProps) {
  return <div>Watch page</div>;
}
