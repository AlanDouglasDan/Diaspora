import { useState } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { Preference, CreatePreferencePayload } from "./types";

export function useCreatePreference() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPreference = async (
    payload: CreatePreferencePayload
  ): Promise<Preference | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchAPI("/preference", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      return response.data || response;
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to create preference";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createPreference, isLoading, error };
}
