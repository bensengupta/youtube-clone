interface MultipartUploadOptions {
  file: File;
  presignedUrls: string[];
  partSize: number;
  /**
   * @param progress Progress from 0 to 1
   */
  onProgress?: (progress: number) => void;
}

export function useMultipartUploadController() {
  async function multipartUpload({
    file,
    presignedUrls,
    partSize,
    onProgress,
  }: MultipartUploadOptions) {
    let numPartsCompleted = 0;
    const numParts = presignedUrls.length;

    function processPart(index: number, presignedUrl: string) {
      return new Promise<string>((resolve, reject) => {
        const start = index * partSize;
        const end = (index + 1) * partSize;
        const blob = file.slice(start, end);

        // fetch does not have progress events but XHR does :/
        const xhr = new XMLHttpRequest();

        xhr.open("PUT", presignedUrl, true);

        xhr.upload.onprogress = (e) => {
          if (!e.lengthComputable) {
            return;
          }
          const progress = e.loaded / e.total;
          onProgress?.((numPartsCompleted + progress) / numParts);
        };

        xhr.onload = function () {
          numPartsCompleted++;

          if (xhr.status !== 200) {
            return reject("Part upload returned error status code");
          }

          const ETag = xhr.getResponseHeader("ETag");

          if (!ETag) {
            return reject("ETag not found");
          }

          return resolve(ETag);
        };

        xhr.send(blob);
      });
    }

    const parts: { ETag: string; PartNumber: number }[] = [];

    for (const [index, presignedUrl] of presignedUrls.entries()) {
      const ETag = await processPart(index, presignedUrl);
      parts.push({ ETag, PartNumber: index + 1 });
    }

    return parts;
  }

  return { multipartUpload };
}
