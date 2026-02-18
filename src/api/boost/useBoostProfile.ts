import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { BoostProfilePayload, BoostProfileResponse } from "./types";

export function useBoostProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const boostProfile = useCallback(
    async (userId: string): Promise<BoostProfileResponse | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI(`/boost/${userId}`, {
          method: "POST",
          body: JSON.stringify({
            visibilityBoost: true,
            userId,
          }),
        });

        const data = response.data || response;
        return data;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to boost profile";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { boostProfile, isLoading, error };
}
