import { api } from "@/src/client/utils/trpc-client";
import type { NewVideo } from "@/src/common/types";
import { multipartUpload } from "./multipart-upload";

interface UseVideoUploadLifecycleProps {
  onStartUpload: (video: NewVideo) => void;
  onChangeUploadProgress: (progress: number) => void;
  onFinishUpload: () => void;
}

export function useVideoUploadLifecycle(props: UseVideoUploadLifecycleProps) {
  const initiateVideoUpload = api.videos.initiateVideoUpload.useMutation();
  const completeVideoUpload = api.videos.completeVideoUpload.useMutation();

  const onDrop = async (files: File[]) => {
    const [file] = files;

    if (!file) {
      throw new Error("VideoUploader onDrop expected a file");
    }

    const { video, multipartUploadId, partSize, presignedUrls } =
      await initiateVideoUpload.mutateAsync({
        fileSize: file.size,
        filename: file.name,
        contentType: file.type as "video/mp4",
      });

    props.onStartUpload(video);

    const parts = await multipartUpload({
      file,
      presignedUrls,
      partSize,
      onProgress: props.onChangeUploadProgress,
    });

    await completeVideoUpload.mutateAsync({
      videoId: video.id,
      multipartUploadId,
      parts,
    });

    props.onFinishUpload();
  };

  return onDrop;
}
