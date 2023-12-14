"use client";

import * as Icons from "../icons";
import { Button } from "../ui/button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalPrimaryHeader,
  ModalTitle,
  ModalTrigger,
} from "../ui/modal";
import { VideoUploader } from "./video-uploader";

export function VideoUploadModalButton() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icons.VideoUpload className="h-10 w-10" />
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalPrimaryHeader>
            <ModalTitle>Upload videos</ModalTitle>
            <ModalClose>Cancel</ModalClose>
          </ModalPrimaryHeader>
        </ModalHeader>
        <VideoUploader onUploadSuccess={console.log} />
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
