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
import { VideoUpload } from "./video-upload";

export function VideoUploadModalButton() {
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
        <VideoUpload />
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
