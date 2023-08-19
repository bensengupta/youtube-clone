"use client";

import { FileUploader, FileUploaderKind } from "@/components/file-uploader";
import { useCallback } from "react";

export default function Library() {
  const onDrop = useCallback(async (files: File[]) => {}, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <FileUploader kind={FileUploaderKind.Video} onDrop={onDrop} />
    </main>
  );
}
