import { useState, useCallback } from "react";
import { fetchAPI } from "@/src/lib/fetch";
import * as SecureStore from "expo-secure-store";
import type { StreamTokenData, StreamTokenResponse } from "./types";

const STREAM_TOKEN_KEY = "stream_token_data";

// Helper to decode JWT and get expiry
const getTokenExpiry = (token: string): number => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.exp * 1000; // Convert to milliseconds
  } catch {
    // Default to 1 hour from now if we can't decode
    return Date.now() + 60 * 60 * 1000;
  }
};

// Cache token in secure storage
const cacheStreamToken = async (tokenData: StreamTokenData): Promise<void> => {
  try {
    await SecureStore.setItemAsync(STREAM_TOKEN_KEY, JSON.stringify(tokenData));
  } catch (error) {
    console.error("Failed to cache stream token:", error);
  }
};

// Get cached token from secure storage
const getCachedStreamToken = async (): Promise<StreamTokenData | null> => {
  try {
    const cached = await SecureStore.getItemAsync(STREAM_TOKEN_KEY);
    if (cached) {
      const tokenData: StreamTokenData = JSON.parse(cached);
      // Check if token is still valid (with 5 min buffer)
      if (tokenData.expiresAt > Date.now() + 5 * 60 * 1000) {
        return tokenData;
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to get cached stream token:", error);
    return null;
  }
};

// Clear cached token
export const clearStreamToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(STREAM_TOKEN_KEY);
  } catch (error) {
    console.error("Failed to clear stream token:", error);
  }
};

export function useGetStreamToken() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStreamToken = useCallback(
    async (
      userId: string,
      forceRefresh = false,
    ): Promise<StreamTokenData | null> => {
      setIsLoading(true);
      setError(null);

      try {
        // Check cache first unless force refresh
        if (!forceRefresh) {
          const cached = await getCachedStreamToken();
          if (cached) {
            setIsLoading(false);
            return cached;
          }
        }

        // Fetch new token from backend
        const response: StreamTokenResponse = await fetchAPI("/stream/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        console.log("stream api key", response.apiKey);

        // Build token data
        const tokenData: StreamTokenData = {
          token: response.token,
          apiKey:
            response.apiKey || process.env.EXPO_PUBLIC_GET_STREAM_API_KEY!,
          expiresAt: response.expiresAt || getTokenExpiry(response.token),
        };

        // Cache the token
        await cacheStreamToken(tokenData);

        return tokenData;
      } catch (err: any) {
        const errorMessage = err?.message || "Failed to get stream token";
        setError(errorMessage);
        console.error("Stream token error:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { getStreamToken, isLoading, error };
}
