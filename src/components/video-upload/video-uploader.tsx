import { FileUploader } from "@/components/file-uploader";
import { MAX_VIDEO_SIZE_IN_BYTES } from "@/config/shared-constants";
import { api } from "@/lib/utils/trpc-client";
import { useState } from "react";
import { useMultipartUploadController } from "./multipart-upload";

interface VideoUploaderProps {
  onUploadSuccess: (uploadKey: string) => void;
}

export function VideoUploader({ onUploadSuccess }: VideoUploaderProps) {
  const initiateVideoUpload = api.videos.initiateVideoUpload.useMutation();
  const completeVideoUpload = api.videos.completeVideoUpload.useMutation();
  const { multipartUpload } = useMultipartUploadController();

  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const onDrop = async (files: File[]) => {
    const [file] = files;

    if (!file) {
      console.warn("VideoUploader onDrop expected a file");
      return;
    }

    const { uploadKey, multipartUploadId, partSize, presignedUrls } =
      await initiateVideoUpload.mutateAsync({
        fileSize: file.size,
        contentType: file.type as "video/mp4",
      });

    const parts = await multipartUpload({
      file,
      presignedUrls,
      partSize,
      onProgress: setProgress,
    });

    await completeVideoUpload.mutateAsync({
      uploadKey,
      multipartUploadId,
      parts,
    });

    setVideoUrl(uploadKey);
    onUploadSuccess(uploadKey);
  };

  return videoUrl ? (
    <p>{videoUrl}</p>
  ) : (
    <FileUploader
      uploadLabel="MP4, file size no more than 1GB"
      accept={{ "video/mp4": [".mp4"] }}
      maxSize={MAX_VIDEO_SIZE_IN_BYTES}
      onDrop={onDrop}
      multiple={false}
      progress={progress}
    />
  );
}
