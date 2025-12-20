import { useState, useCallback } from "react";

import type { PrivacySetting } from "./Privacy.types";

export const usePrivacyLogic = () => {
  const [settings, setSettings] = useState<PrivacySetting[]>([
    { id: "faceId", label: "Enable Face ID", value: false },
    { id: "location", label: "Show location", value: true },
    { id: "onlineStatus", label: "Show online status", value: false },
    { id: "publicSearch", label: "Allow public search", value: false },
    {
      id: "showAds",
      label: "Show ads",
      value: true,
      note: "You need Diaspora premium to turn this off",
    },
  ]);

  const handleToggle = useCallback((id: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, value: !setting.value } : setting
      )
    );
  }, []);

  return {
    settings,
    handleToggle,
  };
};
