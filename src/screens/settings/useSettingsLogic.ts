import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
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
import { useDeleteUser } from "@/src/api/user";

export const useSettingsLogic = ({ navigation }: SettingsScreenProps) => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.data);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const { deleteUser } = useDeleteUser();

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
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            if (!user?.id) return;

            setIsDeletingAccount(true);
            try {
              // Delete user from backend
              await deleteUser(user.id);

              // Clear Stream token
              await clearStreamToken();

              // Sign out from Clerk
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
                text1: "Account Deleted",
                text2: "Your account has been successfully deleted.",
              });

              navigation.reset({
                index: 0,
                routes: [{ name: "Welcome" }],
              });

              setIsDeletingAccount(false);
            } catch (error: any) {
              console.error("Delete account error:", error);
              Toast.show({
                type: "error",
                text1: "Delete Failed",
                text2:
                  error?.message ||
                  "Could not delete account. Please try again.",
              });
            } finally {
              setIsDeletingAccount(false);
            }
          },
        },
      ],
    );
  }, [user?.id, deleteUser, signOut, dispatch, navigation]);

  const userEmail = user?.primaryEmailAddress?.emailAddress || "No email";
  const userPhone = userData?.phone || "No phone";

  const sections: SettingsSection[] = useMemo(
    () => [
      {
        id: "account",
        items: [
          { id: "email", label: "Email", value: userEmail },
          // { id: "phone", label: "Phone number", value: userPhone },
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
    [userEmail, userPhone],
  );

  return {
    handleSignOut,
    handleDeleteAccount,
    sections,
    isSigningOut,
    isDeletingAccount,
  };
};
