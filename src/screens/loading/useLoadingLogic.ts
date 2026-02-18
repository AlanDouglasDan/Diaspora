import { useEffect, useCallback, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";

import useAbly from "hooks/useAbly";
import { useUpdateLocation, useGetUser } from "@/src/api/user";
import type { LoadingScreenProps } from "./Loading.types";

export const useLoadingLogic = ({ navigation }: LoadingScreenProps) => {
  const { user: clerkUser } = useUser();
  const { updateLocation } = useUpdateLocation();
  const { getUser } = useGetUser();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Ably
  useAbly();

  const initializeApp = useCallback(async () => {
    if (!clerkUser?.id || isInitialized) return;

    // Check if user exists in backend
    const userData = await getUser(clerkUser.id);

    if (!userData) {
      // User doesn't exist in backend - navigate to onboarding
      setIsInitialized(true);
      navigation.navigate("AddPhone");
      return;
    }

    try {
      // User exists - continue with location and navigate to MainTabs
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        // Get current location
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        // Update location on backend
        await updateLocation({
          userId: clerkUser.id,
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

      setIsInitialized(true);
      // Navigate to MainTabs after initialization
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    } catch (error) {
      console.error("Initialization error:", error);
      setIsInitialized(true);
      // Still navigate even if there's an error
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    }
  }, [clerkUser?.id, updateLocation, getUser, navigation, isInitialized]);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return {};
};
