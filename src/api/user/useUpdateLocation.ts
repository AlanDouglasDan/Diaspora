import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";

export interface UpdateLocationPayload {
  userId: string;
  latitude: string;
  longitude: string;
}

export interface UpdateLocationResponse {
  success: boolean;
  message?: string;
}

export function useUpdateLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateLocation = useCallback(
    async (
      payload: UpdateLocationPayload
    ): Promise<UpdateLocationResponse | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI("/location", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        const data = response.data || response;
        return data;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to update location";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { updateLocation, isLoading, error };
}
