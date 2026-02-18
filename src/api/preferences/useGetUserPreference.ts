import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { Preference } from "./types";

/**
 * Hook to fetch another user's preferences without saving to Redux.
 * Use this when viewing other users' profiles to avoid overwriting
 * the logged-in user's preferences in the store.
 */
export function useGetUserPreference() {
  const [data, setData] = useState<Preference | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserPreference = useCallback(
    async (userId: string): Promise<Preference | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI(`/preference/${userId}`, {
          method: "GET",
        });

        const result = response.data || response;
        setData(result);
        return result;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to get user preference";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { data, getUserPreference, isLoading, error };
}
