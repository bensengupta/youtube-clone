import { env } from "@/env.mjs";
import {
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  PutObjectCommand,
  S3Client,
  UploadPartCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";

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

export function createUploadKey(prefix: ObjectPrefix) {
  return prefix + nanoid();
}

interface GetProfilePictureUploadPresignedUrl {
  uploadKey: string;
  contentType: string;
  contentLength: number;
}

export async function getProfilePictureUploadPresignedUrl({
  uploadKey,
  contentType,
  contentLength,
}: GetProfilePictureUploadPresignedUrl) {
  const command = new PutObjectCommand({
    Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: uploadKey,
    ContentType: contentType,
    ContentLength: contentLength,
  });

  const url = await getSignedUrl(S3, command, { expiresIn: 3600 });

  return url;
}

interface InitiateVideoMultipartUploadProps {
  uploadKey: string;
  contentType: string;
}

export async function initiateVideoMultipartUpload({
  uploadKey,
  contentType,
}: InitiateVideoMultipartUploadProps) {
  const command = new CreateMultipartUploadCommand({
    Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: uploadKey,
    ContentType: contentType,
  });

  const { UploadId } = await S3.send(command);

  if (!UploadId) {
    throw new Error("Video upload initiation failed");
  }

  return UploadId;
}

interface GetVideoUploadPartPresignedUrlProps {
  uploadKey: string;
  multipartUploadId: string;
  numParts: number;
}

export async function getVideoUploadPartPresignedUrls({
  uploadKey,
  multipartUploadId,
  numParts,
}: GetVideoUploadPartPresignedUrlProps) {
  const promises: Promise<string>[] = [];

  for (let idx = 0; idx < numParts; idx++) {
    const command = new UploadPartCommand({
      Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: uploadKey,
      PartNumber: idx + 1,
      UploadId: multipartUploadId,
    });

    promises.push(getSignedUrl(S3, command, { expiresIn: 3600 }));
  }

  const urls = await Promise.all(promises);

  return urls;
}

interface Part {
  ETag: string;
  PartNumber: number;
}

interface CompleteVideoMultipartUploadProps {
  uploadKey: string;
  multipartUploadId: string;
  parts: Part[];
}

export async function completeVideoMultipartUpload({
  uploadKey,
  multipartUploadId,
  parts,
}: CompleteVideoMultipartUploadProps) {
  const command = new CompleteMultipartUploadCommand({
    Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: uploadKey,
    UploadId: multipartUploadId,
    MultipartUpload: {
      Parts: parts,
    },
  });

  await S3.send(command);
}
