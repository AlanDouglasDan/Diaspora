import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { Dislike, DislikeUserPayload } from "./types";

export function useDislikeUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dislikeUser = useCallback(
    async (payload: DislikeUserPayload): Promise<Dislike | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI("/dislikes", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        const data = response.data || response;
        return data;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to like user";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { dislikeUser, isLoading, error };
}
