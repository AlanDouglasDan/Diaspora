import { useState } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { User, CreateUserPayload } from "./types";

export function useCreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (
    payload: CreateUserPayload
  ): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchAPI("/user", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      return response.data || response;
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to create user";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createUser, isLoading, error };
}
