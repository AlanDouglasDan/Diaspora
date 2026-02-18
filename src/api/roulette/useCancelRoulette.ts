import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";

interface CancelRouletteResponse {
  success: boolean;
  message: string;
}

export function useCancelRoulette() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelRoulette = useCallback(
    async (userId: string): Promise<CancelRouletteResponse | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI("/roulette/cancel", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });

        const responseData = response.data || response;
        return responseData;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to cancel roulette";
        setError(errorMessage);
        console.error("Cancel roulette error:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { cancelRoulette, isLoading, error };
}
