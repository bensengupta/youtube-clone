"use client";

import * as Icons from "../icons";
import { Button } from "../ui/button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalPrimaryHeader,
  ModalTitle,
  ModalTrigger,
} from "../ui/modal";
import { useVideoUploadController } from "./video-upload-contoller";
import { VideoUploadStepOne } from "./video-upload-step-one";
import { VideoUploadStepTwo } from "./video-upload-step-two";

export function VideoUploadModalButton() {
  const { step, onDrop, processingState, video, onSubmit } =
    useVideoUploadController();
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.VideoUpload className="h-6 w-6" />
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalPrimaryHeader>
            <ModalTitle>Upload videos</ModalTitle>
            <ModalClose>Cancel</ModalClose>
          </ModalPrimaryHeader>
        </ModalHeader>
        {step === 1 && <VideoUploadStepOne onDrop={onDrop} />}
        {step === 2 && (
          <VideoUploadStepTwo
            processingState={processingState}
            video={video!}
          />
        )}
      </ModalContent>
    </Modal>
  );
}
