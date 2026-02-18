import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { CreateCustomerPayload } from "./types";

export function useCreateCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCustomer = useCallback(
    async (payload: CreateCustomerPayload): Promise<string | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI("/customer", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        return response.data || response;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to create customer";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { createCustomer, isLoading, error };
}
