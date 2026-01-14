import { useState } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { SaveImagesPayload } from "./types";

export function useSaveImages() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveImages = async (payload: SaveImagesPayload): Promise<any> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchAPI("/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return response.data || response;
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to save images";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { saveImages, isLoading, error };
}
