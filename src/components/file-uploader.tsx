import { cn } from "@/lib/utils/cn";
import { useCallback, useState } from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import * as Icons from "./icons";
import { Progress } from "./ui/progress";

const GENERIC_UPLOAD_FAILED_ERROR = "Upload failed :(";

interface FileUploaderProps
  extends Pick<DropzoneOptions, "accept" | "maxSize" | "multiple"> {
  /**
   * Progress from 0 to 1
   */
  progress?: number;
  uploadLabel: string;
  onDrop: (files: File[]) => Promise<void>;
}

export function FileUploader({
  onDrop,
  progress = 0,
  ...props
}: FileUploaderProps) {
  const [status, setStatus] = useState<"idle" | "uploading">("idle");
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
        } else {
          setErrorMessage(GENERIC_UPLOAD_FAILED_ERROR);
        }
        setStatus("idle");
      });
    },
    [onDrop]
  );

  return (
    <div className="flex h-64 w-96">
      {status === "idle" && (
        <FileDropzone
          {...props}
          errorMessage={errorMessage}
          onDrop={onDropWrapped}
        />
      )}
      {status === "uploading" && <FileUploading progress={progress} />}
    </div>
  );
}

interface FileDropzoneProps extends Omit<FileUploaderProps, "progress"> {
  errorMessage: string | null;
}

function FileDropzone({
  onDrop,
  accept,
  maxSize,
  uploadLabel,
  errorMessage,
}: FileDropzoneProps) {
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDropAccepted: (files) => void onDrop(files),
      accept,
      maxSize,
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
        <p className="text-secondary-foreground">{uploadLabel}</p>
        {errorMessage && <p className="text-destructive">{errorMessage}</p>}
      </div>
    </div>
  );
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
        <Progress
          className="mb-4 h-1.5 w-64"
          value={normalizeProgress(progress)}
        />
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
