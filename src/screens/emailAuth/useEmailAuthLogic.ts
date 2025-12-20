import { useState } from "react";
import type { EmailAuthScreenProps } from "./EmailAuth.types";

export function useEmailAuthLogic({ navigation }: EmailAuthScreenProps) {
  const [email, setEmail] = useState("");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    navigation.navigate("VerifyOtp", { value: email, context: "email" });
  };

  return {
    email,
    setEmail,
    handleGoBack,
    handleSubmit,
  };
}
