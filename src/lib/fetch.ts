import { getClerkInstance } from "@clerk/clerk-expo";
import { useState, useEffect, useCallback } from "react";

export const fetchAPI = async (url: string, options?: RequestInit) => {
  const token = await getClerkInstance().session?.getToken();
  const fullUrl = `${process.env.EXPO_PUBLIC_BACKEND_API + url}`;

  // Log request details
  console.log(`🚀 API Request: ${options?.method || "GET"} ${fullUrl}`);
  if (options?.body) {
    try {
      const body =
        typeof options.body === "string"
          ? JSON.parse(options.body)
          : options.body;
      console.log(`📤 Request Body:`, body);
    } catch (e) {
      console.log(`📤 Request Body:`, options.body);
    }
  }

  try {
    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...options,
    });

    // Log response status
    console.log(
      `📥 API Response: ${response.status} ${response.statusText} for ${
        options?.method || "GET"
      } ${url}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const res = await response.json();

    // Log response data
    console.log(`📦 Response Data:`, res);

    // Check if the API returned an error in the response body
    if (res?.error || res?.status === "fail") {
      const errorMessage =
        res?.message || res?.error?.message || "API returned an error";
      throw new Error(`API error: ${errorMessage}`);
    }

    return res;
  } catch (error) {
    console.log(
      `❌ Fetch Error for ${options?.method || "GET"} ${url}:`,
      error
    );
    throw error;
  }
};

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAPI(
        `${process.env.EXPO_PUBLIC_BACKEND_API + url}`,
        options
      );
      setData(result.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
