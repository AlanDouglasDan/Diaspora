import { useState } from "react";
import type { DisplayNameScreenProps } from "./DisplayName.types";

export function useDisplayNameLogic({ navigation }: DisplayNameScreenProps) {
  const [displayName, setDisplayName] = useState("");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    navigation.navigate("Birthday");
  };

  return {
    displayName,
    setDisplayName,
    handleGoBack,
    handleSubmit,
  };
}
