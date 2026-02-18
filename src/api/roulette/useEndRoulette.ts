import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { EndRouletteResponse } from "./types";

export function useEndRoulette() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const endRoulette = useCallback(
    async (matchId: string): Promise<EndRouletteResponse | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI("/roulette/end", {
          method: "POST",
          body: JSON.stringify({ matchId }),
        });

        const responseData = response.data || response;
        return responseData;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to end roulette";
        setError(errorMessage);
        console.error("End roulette error:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { endRoulette, isLoading, error };
}
