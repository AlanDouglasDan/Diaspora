import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { CreateSubscriptionPayload, SubscriptionResponse } from "./types";

export function useCreateSubscription() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSubscription = useCallback(
    async (
      payload: CreateSubscriptionPayload
    ): Promise<SubscriptionResponse | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI("/subscription", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        return response.data || response;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to create subscription";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { createSubscription, isLoading, error };
}
