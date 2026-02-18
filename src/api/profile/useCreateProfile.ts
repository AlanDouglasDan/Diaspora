import { useState } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { Profile, CreateProfilePayload } from "./types";

export function useCreateProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProfile = async (
    payload: CreateProfilePayload
  ): Promise<Profile | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchAPI("/profile", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      return response.data || response;
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to create profile";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createProfile, isLoading, error };
}
