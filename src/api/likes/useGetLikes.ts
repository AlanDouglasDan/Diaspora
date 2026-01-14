import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import { useAppDispatch, useAppSelector, setLikes } from "@/src/store";
import type { Like } from "./types";

export function useGetLikes() {
  const dispatch = useAppDispatch();
  const likesData = useAppSelector((state) => state.likes.data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLikes = useCallback(
    async (userId: string): Promise<Like[] | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI(`/likes/${userId}`, {
          method: "GET",
        });

        const data = response.data || response;
        dispatch(setLikes(data));
        return data;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to get likes";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  return { data: likesData, getLikes, isLoading, error };
}
