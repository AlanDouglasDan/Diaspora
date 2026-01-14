import { useState } from "react";
import { useSignUp, useSignIn } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";

import type { EmailAuthScreenProps } from "./EmailAuth.types";

export function useEmailAuthLogic({ navigation, route }: EmailAuthScreenProps) {
  const { mode } = route.params ?? {};

  const { isLoaded: signUpLoaded, signUp } = useSignUp();
  const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();

  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    if (!signUpLoaded || !signInLoaded) return;

    setIsLoading(true);
    try {
      if (mode === "sign-up") {
        await signUp.create({ emailAddress: email });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        Toast.show({
          type: "success",
          text1: "Verification Code Sent",
          text2: "Check your email for the verification code",
        });

        navigation.navigate("VerifyOtp", { value: email, context: "email" });
      } else {
        const signInAttempt = await signIn.create({
          identifier: email,
          strategy: "email_code", // Request OTP
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });

          Toast.show({
            type: "success",
            text1: "Welcome Back!",
            text2: "Successfully signed in",
          });

          navigation.navigate("MainTabs");
        } else {
          // OTP was sent, navigate to verify
          Toast.show({
            type: "success",
            text1: "Verification Code Sent",
            text2: "Check your email for the verification code",
          });

          navigation.navigate("VerifyOtp", {
            value: email,
            context: "email",
            mode: "sign-in",
          });
        }
      }
    } catch (error: any) {
      console.error("Email auth error:", error);
      const errorMessage =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        "Could not process your request. Please try again.";
      Toast.show({
        type: "error",
        text1: "Authentication Failed",
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    handleGoBack,
    handleSubmit,
    isLoading,
  };
}
