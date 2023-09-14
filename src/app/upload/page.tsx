"use client";

import { VideoUploader } from "@/components/video-upload/video-uploader";

export default function Page() {
  function onUploadSuccess(uploadKey: string) {
    console.log("upload success", { uploadKey });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <VideoUploader onUploadSuccess={onUploadSuccess} />
    </main>
  );
}
