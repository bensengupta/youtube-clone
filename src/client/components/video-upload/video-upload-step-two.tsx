import type { NewVideo } from "@/src/common/types";
import Link from "next/link";
import type { FormEvent } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Heading1 } from "../ui/typography/headings";
import type { ProcessingState } from "./video-upload-contoller";
import { VideoUploadModalFooter } from "./video-upload-modal-footer";

export interface VideoDetailsFormValues {
  title: string;
  description: string;
}

interface VideoUploadStepTwoProps {
  video: NewVideo;
  processingState: ProcessingState;
  onSubmit: (formValues: VideoDetailsFormValues) => void;
}

export function VideoUploadStepTwo(props: VideoUploadStepTwoProps) {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(">>> formData", formData);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-6 px-6 py-6 md:flex-row md:px-10">
        <div className="flex flex-1 flex-col gap-6">
          <Heading1>Details</Heading1>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={props.video.title}
          />
          <Textarea
            name="description"
            placeholder="Tell viewers about your video"
          />
          <h2>Thumbnail</h2>
          <h2>Playlists</h2>
          <h2>Audience</h2>
        </div>
        <div className="flex w-72 flex-col overflow-hidden">
          <div className="aspect-video bg-slate-500">
            Video player placeholder
          </div>
          <div className="flex flex-col gap-4 bg-modal-background-alt p-4">
            <div className="flex flex-col">
              <p className="text-xs text-muted-foreground">Video link</p>
              <Link
                href={props.video.url}
                target="_blank"
                className="flex-1 truncate text-primary"
              >
                {props.video.url}
              </Link>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-muted-foreground">Filename</p>
              <p className="flex-1 truncate">{props.video.filename}</p>
            </div>
          </div>
        </div>
      </div>
      <VideoUploadModalFooter processingState={props.processingState} />
    </form>
  );
}
