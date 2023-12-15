import { FileUploader } from "@/src/client/components/file-uploader";
import { api } from "@/src/client/utils/trpc-client";
import { MAX_VIDEO_SIZE_IN_BYTES } from "@/src/common/config/shared-constants";
import { useState } from "react";
import { multipartUpload } from "./multipart-upload";

interface VideoUploaderProps {
  onUploadSuccess: (uploadKey: string) => void;
}

export function VideoUploader({ onUploadSuccess }: VideoUploaderProps) {
  const initiateVideoUpload = api.videos.initiateVideoUpload.useMutation();
  const completeVideoUpload = api.videos.completeVideoUpload.useMutation();

  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const onDrop = async (files: File[]) => {
    const [file] = files;

    if (!file) {
      throw new Error("VideoUploader onDrop expected a file");
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
      title="Drag and drop video files to upload"
      uploadLabel="Your videos will be private until you publish them."
      accept={{ "video/mp4": [".mp4"] }}
      maxSize={MAX_VIDEO_SIZE_IN_BYTES}
      onDrop={onDrop}
      multiple={false}
      progress={progress}
    />
  );
}
