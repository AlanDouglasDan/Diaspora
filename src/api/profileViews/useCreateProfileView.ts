import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";

interface CreateProfileViewParams {
  viewedId: string;
  viewerId: string;
}

export function useCreateProfileView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProfileView = useCallback(
    async (params: CreateProfileViewParams): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await fetchAPI("/profile-views", {
          method: "POST",
          body: JSON.stringify(params),
        });

        return true;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to create profile view";
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { createProfileView, isLoading, error };
}
