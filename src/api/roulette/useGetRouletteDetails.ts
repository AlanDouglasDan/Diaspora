import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { RouletteDetailsResponse } from "./types";

export function useGetRouletteDetails() {
  const [data, setData] = useState<RouletteDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRouletteDetails = useCallback(
    async (userId: string): Promise<RouletteDetailsResponse | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI(`/roulette/details/${userId}`, {
          method: "GET",
        });

        const responseData = response.data || response;
        setData(responseData);
        return responseData;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to get roulette details";
        setError(errorMessage);
        console.error("Roulette details error:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { data, getRouletteDetails, isLoading, error };
}
