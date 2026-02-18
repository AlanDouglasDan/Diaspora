import { useState } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { Preference, UpdatePreferencePayload } from "./types";

export function useUpdatePreference() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePreference = async (
    preferenceId: string,
    userId: string,
    payload: UpdatePreferencePayload
  ): Promise<Preference | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchAPI(`/preference/${preferenceId}/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      return response.data || response;
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to update preference";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updatePreference, isLoading, error };
}
