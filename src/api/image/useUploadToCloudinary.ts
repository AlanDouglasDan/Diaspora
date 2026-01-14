import { useState } from "react";
import type { UploadUrlData, CloudinaryUploadResponse } from "./types";

interface UploadParams {
  localUri: string;
  uploadData: UploadUrlData;
  fileName?: string;
}

export function useUploadToCloudinary() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadToCloudinary = async ({
    localUri,
    uploadData,
    fileName = "upload.jpg",
  }: UploadParams): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: localUri,
        type: "image/jpeg",
        name: fileName,
      } as any);
      formData.append("upload_preset", uploadData.upload_preset || "diaspora");
      formData.append("cloud_name", uploadData.cloudName);
      formData.append("api_key", uploadData.apiKey);
      formData.append("timestamp", uploadData.timestamp);
      formData.append("signature", uploadData.signature);
      formData.append("folder", uploadData.folder);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${uploadData.cloudName}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload to Cloudinary");
      }

      const uploadedData: CloudinaryUploadResponse =
        await uploadResponse.json();
      return uploadedData.secure_url;
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to upload image";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadToCloudinary, isLoading, error };
}
