import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { Like, LikeUserPayload } from "./types";

export function useLikeUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const likeUser = useCallback(
    async (payload: LikeUserPayload): Promise<Like | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI("/likes", {
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

  return { likeUser, isLoading, error };
}
