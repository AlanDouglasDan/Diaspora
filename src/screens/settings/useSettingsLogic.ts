import { useCallback, useMemo, useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";

import type { SettingsScreenProps, SettingsSection } from "./Settings.types";
import {
  useAppSelector,
  clearUser,
  clearProfile,
  clearPlans,
  clearLikes,
  clearPreferences,
  clearProfileViews,
  clearReceivedLikes,
} from "@/src/store";
import { useAppDispatch } from "@/src/store";
import { clearStreamToken } from "@/src/api/stream";

export const useSettingsLogic = ({ navigation }: SettingsScreenProps) => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.data);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = useCallback(async () => {
    setIsSigningOut(true);
    try {
      // Clear Stream token first
      await clearStreamToken();

      await signOut();

      // Clear Redux state
      dispatch(clearUser());
      dispatch(clearProfile());
      dispatch(clearPlans());
      dispatch(clearLikes());
      dispatch(clearPreferences());
      dispatch(clearProfileViews());
      dispatch(clearReceivedLikes());

      Toast.show({
        type: "success",
        text1: "Signed Out",
        text2: "You have been successfully signed out",
      });

      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    } catch (error: any) {
      console.error("Sign out error:", error);
      Toast.show({
        type: "error",
        text1: "Sign Out Failed",
        text2: error?.message || "Could not sign out. Please try again.",
      });
    } finally {
      setIsSigningOut(false);
    }
  }, [signOut, navigation, dispatch]);

  const handleDeleteAccount = useCallback(() => {
    // TODO: Implement delete account logic
  }, []);

  const userEmail = user?.emailAddresses[0]?.emailAddress || "No email";
  const userPhone = userData?.phone || "No phone";

  const sections: SettingsSection[] = useMemo(
    () => [
      {
        id: "account",
        items: [
          { id: "email", label: "Email", value: userEmail },
          { id: "phone", label: "Phone number", value: userPhone },
        ],
      },
      {
        id: "support",
        items: [
          { id: "about", label: "About" },
          { id: "help", label: "Help Center" },
        ],
      },
      {
        id: "preferences",
        items: [
          { id: "privacy", label: "Privacy" },
          { id: "notifications", label: "Notifications" },
          { id: "feedback", label: "Feedback" },
        ],
      },
    ],
    [userEmail, userPhone]
  );

  return {
    handleSignOut,
    handleDeleteAccount,
    sections,
    isSigningOut,
  };
};
