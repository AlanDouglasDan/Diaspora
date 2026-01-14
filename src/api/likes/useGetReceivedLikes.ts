import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import { useAppDispatch, useAppSelector, setReceivedLikes } from "@/src/store";
import type { Like } from "./types";

export function useGetReceivedLikes() {
  const dispatch = useAppDispatch();
  const receivedLikesData = useAppSelector((state) => state.receivedLikes.data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getReceivedLikes = useCallback(
    async (userId: string): Promise<Like[] | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI(`/likes/received/${userId}`, {
          method: "GET",
        });

        const data = response.data || response;
        dispatch(setReceivedLikes(data));
        return data;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to get received likes";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  return { data: receivedLikesData, getReceivedLikes, isLoading, error };
}
