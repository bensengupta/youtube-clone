import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/client/components/ui/avatar";
import { Button } from "@/src/client/components/ui/button";
import { Skeleton } from "@/src/client/components/ui/skeleton";
import { Heading1 } from "@/src/client/components/ui/typography/headings";
import { VideoPlayer } from "@/src/client/components/video-player";
import { formatSubscriberCount } from "@/src/client/utils/format";
import {
  getVideoForWatch,
  type VideoFragmentForWatch,
} from "@/src/server/fetchers/videos";
import { notFound } from "next/navigation";

export function VideoSectionSkeleton() {
  return (
    <main className="flex flex-1 flex-col gap-3">
      <Skeleton className="aspect-video w-full rounded-xl" />
      <Skeleton className="h-7 w-3/4" />

      <div className="flex justify-between">
        <div className="flex gap-8">
          <Skeleton className="h-10 w-64" />
        </div>
      </div>
    </main>
  );
}

interface VideoSectionProps {
  videoId: string;
}

export async function VideoSection(props: VideoSectionProps) {
  const video = await getVideoForWatch(props.videoId);

  if (!video) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-3">
      <VideoPlayer fileUrl={video.fileUrl} />
      <Heading1>{video.title}</Heading1>

      <div className="flex justify-between">
        <div className="flex gap-8">
          <AuthorDetails author={video.owner} />

          <Button variant="ghost-active">Subscribe</Button>
        </div>
      </div>
    </main>
  );
}

interface AuthorDetailsProps {
  author: VideoFragmentForWatch["owner"];
}

function AuthorDetails({ author }: AuthorDetailsProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={author.thumbnailUrl} />
        <AvatarFallback />
      </Avatar>
      <div className="flex flex-col">
        <p className="font-medium">{author.name}</p>
        <p className="text-xs">
          {formatSubscriberCount(author.subscriberCount)} subscribers
        </p>
      </div>
    </div>
  );
}
