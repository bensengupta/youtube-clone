import React, { useCallback, useState } from "react";
import { useDropzone, type Accept, type DropzoneOptions } from "react-dropzone";
import * as Icons from "./icons";
import { cn } from "@/lib/utils/cn";

export enum FileUploaderKind {
  Video,
}

interface FileUploaderProps {
  kind: FileUploaderKind.Video;
  onDrop: (files: [File]) => Promise<void>;
}

export function FileUploader({ onDrop, ...props }: FileUploaderProps) {
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onDropWrapped = useCallback<typeof onDrop>(
    async (files) => {
      setStatus("uploading");

      await onDrop(files).catch((error: unknown) => {
        if (
          error &&
          typeof error === "object" &&
          "message" in error &&
          typeof error.message === "string"
        ) {
          setErrorMessage(error.message);
        }
        setStatus("error");
      });
    },
    [onDrop]
  );

  return (
    <div className="flex h-64 w-96">
      {status === "idle" && <FileDropzone {...props} onDrop={onDropWrapped} />}
      {status === "uploading" && <FileUploading progress={0.5} />}
    </div>
  );
}

function FileDropzone({ kind, onDrop }: FileUploaderProps) {
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDropAccepted: (files) => void onDrop([files[0]!]),
      multiple: false,
      ...getDropzoneParams(kind),
    });

  return (
    <div
      className={cn(
        "flex flex-1 cursor-pointer select-none flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-border p-4 transition-all duration-200 ease-out",
        isDragAccept && "border-solid border-primary bg-primary/10",
        isDragReject && "border-solid border-destructive bg-destructive/10"
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragReject ? (
        <Icons.InvalidFile className={"h-14 w-14 text-destructive"} />
      ) : (
        <Icons.FileUpload
          className={cn(
            "h-14 w-14 text-secondary-foreground",
            isDragAccept && "text-primary"
          )}
        />
      )}
      <div className="flex flex-col gap-1 text-center">
        <p
          className={cn(
            "font-medium",
            isDragAccept && "text-primary",
            isDragReject && "text-destructive"
          )}
        >
          Browse or drop your file here
        </p>
        <p className="text-secondary-foreground">{getUploadLabel(kind)}</p>
      </div>
    </div>
  );
}

function getUploadLabel(kind: FileUploaderKind) {
  switch (kind) {
    case FileUploaderKind.Video:
      return "MP4, file size no more than 1GB";
  }
}

function getDropzoneParams(kind: FileUploaderKind) {
  let accept: Accept;
  let maxSize: number;

  switch (kind) {
    case FileUploaderKind.Video:
      accept = { "video/mp4": [".mp4"] };
      maxSize = 1 * 1024 ** 3; // 1 GB
      break;
  }

  return { accept, maxSize } satisfies DropzoneOptions;
}

interface FileUploadingProps {
  // Float from 0 to 1
  progress: number;
}

function FileUploading({ progress }: FileUploadingProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-4 rounded-md border-2 border-border p-4"
      )}
    >
      <Icons.FileUpload className={cn("h-14 w-14 text-primary")} />
      <div className="flex flex-col gap-1 text-center">
        <div className="mb-4 h-1.5 w-64 rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-1.5 rounded-full bg-blue-600 dark:bg-blue-500"
            style={{ width: `${normalizeProgress(progress)}%` }}
          />
        </div>
        <p className="text-secondary-foreground">Uploading...</p>
      </div>
    </div>
  );
}

/**
 * @param progress Progress from 0 to 1
 */
function normalizeProgress(progress: number) {
  return Math.min(Math.max(Math.floor(progress * 100), 0), 100);
}
