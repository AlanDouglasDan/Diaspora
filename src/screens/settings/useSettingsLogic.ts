import { useCallback, useMemo } from "react";

import type { SettingsScreenProps, SettingsSection } from "./Settings.types";

export const useSettingsLogic = ({ navigation }: SettingsScreenProps) => {
  const handleSignOut = useCallback(() => {
    // TODO: Implement sign out logic
    navigation.reset({
      index: 0,
      routes: [{ name: "Welcome" }],
    });
  }, [navigation]);

  const handleDeleteAccount = useCallback(() => {
    // TODO: Implement delete account logic
  }, []);

  const userData = {
    email: "mJackson@gmail.com",
    phone: "+43 8948372939",
  };

  const sections: SettingsSection[] = useMemo(
    () => [
      {
        id: "account",
        items: [
          { id: "email", label: "Email", value: userData.email },
          { id: "phone", label: "Phone number", value: userData.phone },
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
    [userData.email, userData.phone]
  );

  return {
    handleSignOut,
    handleDeleteAccount,
    sections,
  };
};
