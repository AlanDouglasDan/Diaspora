import { useState } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { User, UpdateUserPayload } from "./types";

export function useUpdateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (
    clerkId: string,
    payload: UpdateUserPayload
  ): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchAPI(`/user/${clerkId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      return response.data || response;
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to update user";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUser, isLoading, error };
}
