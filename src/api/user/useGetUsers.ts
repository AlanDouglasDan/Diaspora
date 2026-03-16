import { useState, useCallback, useRef } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import type { GetUsersResponse } from "./types";

export type UsersGenderFilter = "man" | "woman" | "nonbinary" | "null";

export type UsersActivityFilter = "justJoined" | "null";

export interface AdvancedUserFilters {
  bio?: boolean;
  ethnicity?: string;
  zodiac?: string;
  height?: string;
  drinking?: boolean;
  smoking?: boolean;
  educationLevel?: string;
  familyPlans?: string;
  lookingFor?: string;
  numberOfPhotos?: number[];
}

export interface GetUsersArgs {
  userId: string;
  radius: [number, number];
  age: [number, number];
  gender?: UsersGenderFilter;
  activity?: UsersActivityFilter;
  country?: string;
  advancedFilters?: AdvancedUserFilters;
}

const encodeArrayParam = (values: number[]) => {
  return `[${values.join(",")}]`;
};

// Module-level cache so data survives component remounts
let _cachedUsersData: GetUsersResponse | null = null;
let _isFetching = false;

export function useGetUsers() {
  const [data, setData] = useState<GetUsersResponse | null>(_cachedUsersData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUsers = useCallback(
    async (args: GetUsersArgs): Promise<GetUsersResponse | null> => {
      const {
        userId,
        radius,
        age,
        gender,
        activity,
        country,
        advancedFilters,
      } = args;

      // Prevent concurrent duplicate calls
      if (_isFetching) return _cachedUsersData;
      _isFetching = true;

      // Only show loading on first fetch (no cached data)
      if (!_cachedUsersData) {
        setIsLoading(true);
      }
      setError(null);

      try {
        const normalizedRadius = radius.map((r) => r);

        let url = `/users?userId=${encodeURIComponent(
          userId,
        )}&radius=${encodeArrayParam(normalizedRadius)}&age=${encodeArrayParam(
          age,
        )}`;

        if (gender && !String(gender).includes("null")) {
          url += `&gender=${encodeURIComponent(String(gender))}`;
        }

        if (activity && !String(activity).includes("null")) {
          url += `&activity=${encodeURIComponent(String(activity))}`;
        }

        if (country?.length && Number(country) !== 0) {
          url += `&country=${encodeURIComponent(country)}`;
        }

        if (advancedFilters?.bio) {
          url += "&hasBio=true";
        }
        if (advancedFilters?.ethnicity) {
          url += `&ethnicity=${encodeURIComponent(advancedFilters?.ethnicity)}`;
        }
        if (advancedFilters?.zodiac) {
          url += `&zodiac=${encodeURIComponent(advancedFilters?.zodiac)}`;
        }
        if (advancedFilters?.height) {
          url += `&height=${encodeURIComponent(advancedFilters?.height)}`;
        }
        if (advancedFilters?.drinking) {
          url += "&drinking=true";
        }
        if (advancedFilters?.smoking) {
          url += "&smoking=true";
        }
        if (advancedFilters?.educationLevel) {
          url += `&educationLevel=${encodeURIComponent(
            advancedFilters?.educationLevel,
          )}`;
        }
        if (advancedFilters?.familyPlans) {
          url += `&familyPlans=${encodeURIComponent(
            advancedFilters?.familyPlans,
          )}`;
        }
        if (advancedFilters?.lookingFor) {
          url += `&lookingFor=${encodeURIComponent(
            advancedFilters?.lookingFor,
          )}`;
        }

        if (Number(advancedFilters?.numberOfPhotos?.[0]) > 2) {
          url += `&minPhotos=${encodeURIComponent(
            String(advancedFilters?.numberOfPhotos?.[0]),
          )}`;
        }

        const response = await fetchAPI(url, { method: "GET" });
        const resolved = response.data || response;

        _cachedUsersData = resolved;
        setData(resolved);
        return resolved;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to get users";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
        _isFetching = false;
      }
    },
    [],
  );

  return { data, getUsers, isLoading, error };
}
