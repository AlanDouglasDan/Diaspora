import { useEffect, useCallback, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";

import useAbly from "hooks/useAbly";
import { useUpdateLocation } from "@/src/api/user";
import type { LoadingScreenProps } from "./Loading.types";

export const useLoadingLogic = ({ navigation }: LoadingScreenProps) => {
  const { user: clerkUser } = useUser();
  const { updateLocation } = useUpdateLocation();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Ably
  useAbly();

  const initializeApp = useCallback(async () => {
    if (!clerkUser?.id || isInitialized) return;

    try {
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
  }, [clerkUser?.id, updateLocation, navigation, isInitialized]);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return {};
};
