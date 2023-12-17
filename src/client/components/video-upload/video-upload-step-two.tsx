import type { NewVideo } from "@/src/common/types";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import type { ProcessingState } from "./video-upload";

interface VideoUploadStepTwoProps {
  processingState: ProcessingState;
  video: NewVideo;
}

export function VideoUploadStepTwo(props: VideoUploadStepTwoProps) {
  return (
    <div className="flex flex-col">
      <Input defaultValue={props.video.title} />
      <Textarea />
      <p>
        State: {props.processingState.status} {props.processingState.progress}
      </p>
    </div>
  );
}
