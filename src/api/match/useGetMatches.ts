import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import { useAppDispatch, useAppSelector, setMatches } from "@/src/store";
import type { TItsAMatch } from "./types";

export function useGetMatches() {
  const dispatch = useAppDispatch();
  const matchesData = useAppSelector((state) => state.matches.data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMatches = useCallback(
    async (userId: string): Promise<TItsAMatch[] | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI(`/matches/${userId}`, {
          method: "GET",
        });

        const data = response.data || response;
        dispatch(setMatches(data));
        return data;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to get matches";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  return { data: matchesData, getMatches, isLoading, error };
}
