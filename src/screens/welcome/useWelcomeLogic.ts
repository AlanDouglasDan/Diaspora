import { useState } from "react";
import type { WelcomeScreenProps } from "./Welcome.types";

export function useWelcomeLogic({ navigation }: WelcomeScreenProps) {
  const [authState, setAuthState] = useState<"welcome" | "sign-in" | "sign-up">(
    "welcome"
  );

  const handleContinueWithEmail = () => {
    navigation.navigate("EmailAuth");
  };

  return {
    authState,
    setAuthState,
    handleContinueWithEmail,
  };
}
