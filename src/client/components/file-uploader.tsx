import { useDropzone, type Accept } from "react-dropzone";
import * as Icons from "./icons";

interface FileDropzoneProps {
  multiple?: boolean;
  accept?: Accept;
  maxSize?: number;
  /**
   * Progress from 0 to 1
   */
  title: string;
  uploadLabel: string;
  onDrop: (files: File[]) => Promise<void>;
  errorMessage?: string;
}

export function FileDropzone({
  onDrop,
  accept,
  maxSize,
  title,
  uploadLabel,
  errorMessage,
}: FileDropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: (files) => void onDrop(files),
    accept,
    maxSize,
  });

  return (
    <div
      className="flex flex-1 cursor-pointer select-none flex-col items-center justify-center gap-4 rounded-md p-4 transition-all duration-200 ease-out"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Icons.FileUpload className="h-14 w-14 text-secondary-foreground" />
      <div className="flex flex-col gap-1 text-center">
        <p>{title}</p>
        <p className="text-sm text-secondary-foreground">{uploadLabel}</p>
        {errorMessage && <p className="text-destructive">{errorMessage}</p>}
      </div>
    </div>
  );
}
