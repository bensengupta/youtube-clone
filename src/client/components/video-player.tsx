interface VideoPlayerProps {
  fileUrl: string;
}

export function VideoPlayer({ fileUrl }: VideoPlayerProps) {
  return <video className="aspect-video rounded-xl" src={fileUrl} controls />;
}
