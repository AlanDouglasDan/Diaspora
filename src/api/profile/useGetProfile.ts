import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import { useAppDispatch, useAppSelector, setProfile } from "@/src/store";
import type { Profile } from "./types";

export function useGetProfile() {
  const dispatch = useAppDispatch();
  const profileData = useAppSelector((state) => state.profile.data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfile = useCallback(
    async (userId: string): Promise<Profile | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI(`/profile/${userId}`, {
          method: "GET",
        });

        const data = response.data || response;
        dispatch(setProfile(data));
        return data;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to get profile";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  return { data: profileData, getProfile, isLoading, error };
}
