import type { NewVideo } from "@/src/common/types";
import { useState } from "react";
import { useVideoUploadLifecycle } from "./video-upload-lifecycle";
import type { VideoDetailsFormValues } from "./video-upload-step-two";

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
  function onSubmitStepTwo(values: VideoDetailsFormValues) {
    console.log(values);
  }

  const onDrop = useVideoUploadLifecycle({
    onStartUpload,
    onChangeUploadProgress,
    onFinishUpload,
  });

  return { step, onDrop, processingState, video, onSubmitStepTwo };
}
