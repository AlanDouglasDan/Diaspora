import { useState } from "react";
import type { VerifyOtpScreenProps } from "./VerifyOtp.types";

export function useVerifyOtpLogic({ route, navigation }: VerifyOtpScreenProps) {
  const { value, context } = route.params;

  const [code, setCode] = useState<string>("");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    if (context === "email") {
      // Navigate to AddPhone after email verification
      navigation.navigate("AddPhone");
    } else if (context === "phone") {
      // Navigate to Onboarding after phone verification
      navigation.navigate("Onboarding");
    }
  };

  return {
    context,
    value,
    code,
    setCode,
    handleGoBack,
    handleSubmit,
  };
}
