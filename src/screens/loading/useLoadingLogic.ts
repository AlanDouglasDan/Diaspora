import { useEffect, useCallback, useState, useRef } from "react";
import { useClerk, useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";

import useAbly from "hooks/useAbly";
import { useUpdateLocation, useGetUser } from "@/src/api/user";
import { useAppDispatch } from "@/src/store";
import { hydrateFilters } from "@/src/store/slices";
// import { useGetSubscriptionStatus } from "@/src/api/subscription";
import type { LoadingScreenProps } from "./Loading.types";

export const useLoadingLogic = ({ navigation }: LoadingScreenProps) => {
  const { loaded: clerkLoaded } = useClerk();
  const { user: clerkUser, isSignedIn } = useUser();
  const { updateLocation } = useUpdateLocation();
  const { getUser } = useGetUser();
  const dispatch = useAppDispatch();
  // const { getSubscriptionStatus } = useGetSubscriptionStatus();
  const hasRedirected = useRef(false);

  const initializeApp = useCallback(async (userId: string) => {
    try {
      // try {
      //   const subscriptionStatus = await getSubscriptionStatus(userId);
      //   console.log("Subscription status:", subscriptionStatus);
      // } catch (error) {
      //   console.log("Failed to get subscription status:", error);
      // }

      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        await updateLocation({
          userId,
          latitude: String(location.coords.latitude),
          longitude: String(location.coords.longitude),
        });
      } else {
        Toast.show({
          type: "info",
          text1: "Location Access Required",
          text2: "Enable location to find matches near you",
        });
      }

      // Hydrate persisted filters before navigating
      await dispatch(hydrateFilters());

      // Navigate to MainTabs after initialization
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    } catch (error) {
      console.error("Initialization error:", error);
      // Still navigate even if there's an error
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    }
  }, []);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      // Wait for Clerk to load
      if (!clerkLoaded) return;

      // Prevent multiple redirects
      if (hasRedirected.current) return;

      // If not signed in, go to Welcome
      if (!isSignedIn || !clerkUser?.id) {
        hasRedirected.current = true;
        navigation.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        });
        return;
      }

      // User is signed in - fetch user data
      try {
        const userData = await getUser(clerkUser.id);

        if (userData?.displayName) {
          // Complete profile - initialize app and go to MainTabs
          hasRedirected.current = true;

          await initializeApp(clerkUser.id);
        } else if (userData && !userData.displayName) {
          // Incomplete profile - go to DisplayName
          hasRedirected.current = true;
          navigation.reset({
            index: 0,
            routes: [{ name: "DisplayName" }],
          });
        } else {
          // No data at all - go to AddPhone
          hasRedirected.current = true;
          navigation.reset({
            index: 0,
            routes: [{ name: "AddPhone" }],
          });
        }
      } catch (error) {
        console.error("Error checking user:", error);
        // On error, go to Welcome as fallback
        hasRedirected.current = true;
        navigation.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        });
      }
    };

    checkAuthAndRedirect();
  }, [
    clerkLoaded,
    isSignedIn,
    clerkUser?.id,
    getUser,
    initializeApp,
    navigation,
  ]);

  // Initialize Ably
  useAbly();

  return {};
};
