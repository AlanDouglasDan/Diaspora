import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { MutualLike } from "./types";

export function useGetMutualLikes() {
  const [data, setData] = useState<MutualLike[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMutualLikes = useCallback(
    async (userId: string): Promise<MutualLike[] | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI(`/user/${userId}/mutual-likes`, {
          method: "GET",
        });

        const result = response.data || response;
        const mutualLikes = result.mutualLikes || result;
        setData(mutualLikes);
        return mutualLikes;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to get mutual likes";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { data, getMutualLikes, isLoading, error };
}
