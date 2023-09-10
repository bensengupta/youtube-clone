import { VideoCardSkeleton } from "@/components/video-card";
import { nanoid } from "nanoid";
import { HomeLayout, HomeVideoCardContainer } from "./components";

const VIDEO_PLACEHOLDERS = Array(24)
  .fill(undefined)
  .map(() => nanoid());

export default function Loading() {
  return (
    <HomeLayout>
      {VIDEO_PLACEHOLDERS.map((id) => (
        <HomeVideoCardContainer key={id}>
          <VideoCardSkeleton />
        </HomeVideoCardContainer>
      ))}
    </HomeLayout>
  );
}
