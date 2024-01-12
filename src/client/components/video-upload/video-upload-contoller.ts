import type { NewVideo } from "@/src/common/types";
import { useState, type FormEvent } from "react";
import { useVideoUploadLifecycle } from "./video-upload-lifecycle";

export interface ProcessingState {
  status: "idle" | "uploading" | "processing" | "complete";
  progress?: number;
}

export function useVideoUploadController() {
  const [step, setStep] = useState(1);
  const [processingState, setProcessingState] = useState<ProcessingState>({
    status: "idle",
  });
  const [video, setVideo] = useState<NewVideo | undefined>();

  function onStartUpload(video: NewVideo) {
    setProcessingState({ status: "uploading", progress: 0 });
    setVideo(video);
    setStep(2);
  }
  function onChangeUploadProgress(progress: number) {
    setProcessingState({ status: "uploading", progress });
  }
  function onFinishUpload() {
    setProcessingState({ status: "processing", progress: 0 });
  }
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step === 2) {
      const formData = new FormData(event.currentTarget);
      console.log(formData.entries());
    }
  }

  const onDrop = useVideoUploadLifecycle({
    onStartUpload,
    onChangeUploadProgress,
    onFinishUpload,
  });

  return { step, onDrop, processingState, video, onSubmit };
}
