import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { RewindDislikePayload } from "./types";

export function useRewindDislike() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rewindDislike = useCallback(
    async (payload: RewindDislikePayload): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await fetchAPI("/dislikes/rewind", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        return true;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to rewind dislike";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { rewindDislike, isLoading, error };
}
