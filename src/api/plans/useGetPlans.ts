import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import { useAppDispatch, useAppSelector, setPlans } from "@/src/store";
import type { Plan } from "./types";

export function useGetPlans() {
  const dispatch = useAppDispatch();
  const plansData = useAppSelector((state) => state.plans.data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPlans = useCallback(async (): Promise<Plan[] | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchAPI("/plans", {
        method: "GET",
      });

      const data = response.data || response;
      dispatch(setPlans(data));
      return data;
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to get plans";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  return { data: plansData, getPlans, isLoading, error };
}
