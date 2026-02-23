import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import {
  useAppDispatch,
  useAppSelector,
  setSubscriptionType,
} from "@/src/store";

export function useGetSubscriptionStatus() {
  const dispatch = useAppDispatch();
  const subscriptionType = useAppSelector(
    (state) => state.subscription.subscriptionType,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSubscriptionStatus = useCallback(
    async (userId: string): Promise<string | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAPI(`/status/${userId}`, {
          method: "GET",
        });

        const data = response.data || response;
        const type = data?.subscriptionType ?? null;
        dispatch(setSubscriptionType(type));
        return type;
      } catch (err: any) {
        dispatch(setSubscriptionType(null));
        const errorMessage =
          err?.message || "Failed to get subscription status";
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  return { subscriptionType, getSubscriptionStatus, isLoading, error };
}
