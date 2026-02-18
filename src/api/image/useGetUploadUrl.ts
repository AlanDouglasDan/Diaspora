import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { UploadUrlData } from "./types";

export function useGetUploadUrl() {
  const [data, setData] = useState<UploadUrlData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUploadUrl = useCallback(async (): Promise<UploadUrlData | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchAPI("/image/upload-url", {
        method: "GET",
      });

      const uploadData = response.data || response;
      setData(uploadData);
      return uploadData;
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to get upload URL";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, getUploadUrl, isLoading, error };
}
