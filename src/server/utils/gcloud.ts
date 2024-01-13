import credentials from "@/google-cloud-credentials.json";
import { env } from "@/src/env.mjs";
import { JobsClient } from "@google-cloud/run";

export async function triggerCloudRunVideoWorkerJob(
  downloadUrl: string,
  callbackUrl: string
) {
  const projectId = credentials.project_id;

  const client = new JobsClient({
    projectId,
    credentials,
  });

  const name = `projects/${projectId}/locations/${env.GOOGLE_CLOUD_RUN_REGION}/jobs/${env.GOOGLE_CLOUD_RUN_WORKER_JOB_NAME}`;

  console.log("Triggering job", name);

  await client.runJob({
    name,
    overrides: {
      containerOverrides: [
        {
          env: [
            { name: "DOWNLOAD_URL", value: downloadUrl },
            { name: "CALLBACK_URL", value: callbackUrl },
          ],
        },
      ],
    },
  });
}
