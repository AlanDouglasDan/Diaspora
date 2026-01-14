import { useState } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { Profile, UpdateProfilePayload } from "./types";

export function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (
    userId: string,
    payload: UpdateProfilePayload
  ): Promise<Profile | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchAPI(`/profile/${userId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      return response.data || response;
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to update profile";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading, error };
}
