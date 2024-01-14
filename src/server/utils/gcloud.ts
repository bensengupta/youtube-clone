import { getVideoWorkerCallbackUrl } from "@/src/common/utils/urls";
import { env } from "@/src/env.mjs";
import { JobsClient } from "@google-cloud/run";

const client = new JobsClient({
  credentials: JSON.parse(env.GOOGLE_CLOUD_KEY) as Record<string, string>,
});

export async function triggerCloudRunVideoWorkerJob(videoId: string) {
  const callbackUrl = getVideoWorkerCallbackUrl();

  const envVars = [{ name: "VIDEO_ID", value: videoId }];

  if (!callbackUrl.startsWith("http://localhost")) {
    envVars.push({ name: "CALLBACK_URL", value: callbackUrl });
  }

  const projectId = await client.getProjectId();

  await client.runJob({
    name: `projects/${projectId}/locations/${env.GOOGLE_CLOUD_RUN_REGION}/jobs/${env.GOOGLE_CLOUD_RUN_WORKER_JOB_NAME}`,
    overrides: { containerOverrides: [{ env: envVars }] },
  });
}
