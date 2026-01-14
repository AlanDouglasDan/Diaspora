import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import { useAppDispatch, useAppSelector, setUser } from "@/src/store";
import type { User } from "./types";

export function useGetUser() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUser = useCallback(
    async (clerkId: string): Promise<User | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI(`/user/${clerkId}`, {
          method: "GET",
        });

        const data = response.data || response;
        dispatch(setUser(data));
        return data;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to get user";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  return { data: userData, getUser, isLoading, error };
}
