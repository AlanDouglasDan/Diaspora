import { useState } from "react";
import { fetchAPI } from "@/src/lib/fetch";

export function useDeleteUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (clerkId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await fetchAPI(`/user/${clerkId}`, {
        method: "DELETE",
      });

      return true;
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to delete user";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteUser, isLoading, error };
}
