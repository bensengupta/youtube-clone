import { FileDropzone } from "@/src/client/components/file-uploader";
import { MAX_VIDEO_SIZE_IN_BYTES } from "@/src/common/config/shared-constants";

interface VideoUploadStepOneProps {
  onDrop: (file: File[]) => Promise<void>;
}

export function VideoUploadStepOne({ onDrop }: VideoUploadStepOneProps) {
  return (
    <div className="flex h-[80vh] w-full">
      <FileDropzone
        title="Drag and drop video files to upload"
        uploadLabel="Your videos will be private until you publish them."
        accept={{ "video/mp4": [".mp4"] }}
        maxSize={MAX_VIDEO_SIZE_IN_BYTES}
        onDrop={onDrop}
        multiple={false}
      />
    </div>
  );
}
