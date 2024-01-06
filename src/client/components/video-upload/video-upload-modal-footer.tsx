import { Button } from "../ui/button";
import { ModalFooter } from "../ui/modal";
import type { ProcessingState } from "./video-upload-contoller";

interface VideoUploadModalFooterProps {
  processingState: ProcessingState;
}

export function VideoUploadModalFooter(props: VideoUploadModalFooterProps) {
  if (props.processingState.status === "idle") {
    return null;
  }

  return (
    <ModalFooter>
      <p className="flex-1">{formatLabel(props.processingState)}</p>
      <Button type="submit">Next</Button>
    </ModalFooter>
  );
}

function formatLabel(state: ProcessingState) {
  const progress =
    typeof state.progress === "number"
      ? `${Math.round(state.progress * 100)}% `
      : "";
  switch (state.status) {
    case "complete":
      return `Complete`;
    case "uploading":
      return `Uploading ${progress}...`;
    case "processing":
      return `Processing ${progress}...`;
    default:
      return "";
  }
}
