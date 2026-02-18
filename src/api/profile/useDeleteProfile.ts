import { useState } from "react";
import { fetchAPI } from "@/src/lib/fetch";

export function useDeleteProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProfile = async (userId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await fetchAPI(`/profile/${userId}`, {
        method: "DELETE",
      });
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to delete profile";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteProfile, isLoading, error };
}
