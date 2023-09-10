import { env } from "@/env.mjs";
import {
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  PutObjectCommand,
  S3Client,
  UploadPartCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

export enum ObjectPrefix {
  ProfilePicture = "profile-picture-",
  Video = "video-",
}

interface ProfilePictureUploadProps {
  ownerId: string;
  contentType: string;
  contentLength: number;
}

export function ProfilePictureUploadCommand({
  ownerId,
  contentType,
  contentLength,
}: ProfilePictureUploadProps) {
  return new PutObjectCommand({
    Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: ObjectPrefix.ProfilePicture + ownerId,
    ContentType: contentType,
    ContentLength: contentLength,
  });
}

interface VideoCreateMultipartUploadCommandProps {
  videoId: string;
  contentType: string;
}

export function VideoCreateMultipartUploadCommand({
  videoId,
  contentType,
}: VideoCreateMultipartUploadCommandProps) {
  return new CreateMultipartUploadCommand({
    Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: ObjectPrefix.Video + videoId,
    ContentType: contentType,
  });
}

interface VideoUploadPartCommandProps {
  videoId: string;
  partNumber: number;
  uploadId: string;
}

export function VideoUploadPartCommand({
  videoId,
  partNumber,
  uploadId,
}: VideoUploadPartCommandProps) {
  return new UploadPartCommand({
    Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: ObjectPrefix.Video + videoId,
    PartNumber: partNumber,
    UploadId: uploadId,
  });
}

interface VideoCompleteUploadCommandProps {
  videoId: string;
  uploadId: string;
  parts: { ETag: string; partNumber: number }[];
}

export function VideoCompleteMultipartUploadCommand({
  videoId,
  uploadId,
  parts,
}: VideoCompleteUploadCommandProps) {
  return new CompleteMultipartUploadCommand({
    Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: ObjectPrefix.Video + videoId,
    UploadId: uploadId,
    MultipartUpload: {
      Parts: parts.map((p) => ({ ETag: p.ETag, PartNumber: p.partNumber })),
    },
  });
}

export async function createSignedUrl(command: PutObjectCommand) {
  const url = await getSignedUrl(S3, command, { expiresIn: 3600 });
  return url;
}
