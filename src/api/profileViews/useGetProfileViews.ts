import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import { useAppDispatch, useAppSelector, setProfileViews } from "@/src/store";
import type { ProfileView } from "./types";

export function useGetProfileViews() {
  const dispatch = useAppDispatch();
  const profileViewsData = useAppSelector((state) => state.profileViews.data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfileViews = useCallback(
    async (userId: string): Promise<ProfileView[] | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI(`/profile-views/${userId}`, {
          method: "GET",
        });

        const data = response.data || response;
        dispatch(setProfileViews(data));
        return data;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to get profile views";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  return { data: profileViewsData, getProfileViews, isLoading, error };
}
