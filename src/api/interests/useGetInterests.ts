import { useState, useCallback } from "react";

import { fetchAPI } from "@/src/lib/fetch";
import type { Interest } from "./types";

export function useGetInterests() {
  const [data, setData] = useState<Interest[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getInterests = useCallback(async (): Promise<Interest[] | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchAPI("/interests", {
        method: "GET",
      });

      const interestsData = response.data || response;
      setData(interestsData.interests);
      return interestsData.interests;
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to get interests";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, getInterests, isLoading, error };
}
