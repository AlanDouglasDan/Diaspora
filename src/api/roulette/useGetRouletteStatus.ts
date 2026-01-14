import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { RouletteStatusResponse } from "./types";

export function useGetRouletteStatus() {
  const [data, setData] = useState<RouletteStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRouletteStatus = useCallback(
    async (userId: string): Promise<RouletteStatusResponse | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI(`/roulette/status/${userId}`, {
          method: "GET",
        });

        const responseData = response.data || response;
        setData(responseData);
        return responseData;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to get roulette status";
        setError(errorMessage);
        console.error("Roulette status error:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { data, getRouletteStatus, isLoading, error };
}
