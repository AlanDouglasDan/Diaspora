import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { StartRouletteResponse } from "./types";

export function useStartRoulette() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startRoulette = useCallback(
    async (userId: string): Promise<StartRouletteResponse | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI("/roulette/start", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });

        const responseData = response.data || response;
        return responseData;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to start roulette";
        setError(errorMessage);
        console.error("Start roulette error:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { startRoulette, isLoading, error };
}
