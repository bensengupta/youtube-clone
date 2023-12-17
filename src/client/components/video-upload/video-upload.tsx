import type { NewVideo } from "@/src/common/types";
import { useState } from "react";
import { useVideoUploadLifecycle } from "./video-upload-controller";
import { VideoUploadStepOne } from "./video-upload-step-one";
import { VideoUploadStepTwo } from "./video-upload-step-two";

export interface ProcessingState {
  status: "idle" | "uploading" | "processing";
  progress?: number;
}

export function VideoUpload() {
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

  const onDrop = useVideoUploadLifecycle({
    onStartUpload,
    onChangeUploadProgress,
    onFinishUpload,
  });

  return (
    <>
      {step === 1 && <VideoUploadStepOne onDrop={onDrop} />}
      {step === 2 && (
        <VideoUploadStepTwo processingState={processingState} video={video!} />
      )}
    </>
  );
}
