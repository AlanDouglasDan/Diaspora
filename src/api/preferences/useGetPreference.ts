import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import { useAppDispatch, useAppSelector, setPreferences } from "@/src/store";
import type { Preference } from "./types";

export function useGetPreference() {
  const dispatch = useAppDispatch();
  const preferencesData = useAppSelector((state) => state.preferences.data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPreference = useCallback(
    async (userId: string): Promise<Preference | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI(`/preference/${userId}`, {
          method: "GET",
        });

        const data = response.data || response;
        dispatch(setPreferences(data));
        return data;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to get preference";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  return { data: preferencesData, getPreference, isLoading, error };
}
