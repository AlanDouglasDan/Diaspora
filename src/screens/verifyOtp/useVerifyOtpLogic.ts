import { useState } from "react";
import { useSignUp, useSignIn, useUser } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";

import type { VerifyOtpScreenProps } from "./VerifyOtp.types";

export function useVerifyOtpLogic({ route, navigation }: VerifyOtpScreenProps) {
  const { value, context, mode = "sign-up" } = route.params;
  const {
    isLoaded: signUpLoaded,
    signUp,
    setActive: setActiveSignUp,
  } = useSignUp();
  const {
    isLoaded: signInLoaded,
    signIn,
    setActive: setActiveSignIn,
  } = useSignIn();
  const { user } = useUser();

  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const resendVerification = async () => {
    setIsLoading(true);
    try {
      if (context === "email") {
        if (mode === "sign-up" && signUpLoaded) {
          await signUp.prepareEmailAddressVerification({
            strategy: "email_code",
          });
        } else if (mode === "sign-in" && signInLoaded) {
          await signIn.prepareFirstFactor({
            strategy: "email_code",
            emailAddressId:
              signIn.supportedFirstFactors?.find(
                (f) => f.strategy === "email_code"
              )?.emailAddressId || "",
          });
        }
        Toast.show({
          type: "success",
          text1: "Code Resent",
          text2: "A new verification code has been sent to your email",
        });
      } else if (context === "phone") {
        if (user && user.phoneNumbers.length > 0) {
          await user.phoneNumbers[0].prepareVerification();
          Toast.show({
            type: "success",
            text1: "Code Resent",
            text2: "A new verification code has been sent to your phone",
          });
        }
      }
    } catch (error: any) {
      console.error("Resend verification error:", error);
      const errorMessage =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        "Could not resend verification code.";
      Toast.show({
        type: "error",
        text1: "Resend Failed",
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (context === "email") {
        if (mode === "sign-up" && signUpLoaded) {
          // Sign-up email verification
          const completeSignUp = await signUp.attemptEmailAddressVerification({
            code: code.trim(),
          });

          if (completeSignUp.status === "complete") {
            await setActiveSignUp({ session: completeSignUp.createdSessionId });
            Toast.show({
              type: "success",
              text1: "Email Verified!",
              text2: "Your email has been successfully verified",
            });

            navigation.navigate("AddPhone");
          }
        } else if (mode === "sign-in" && signInLoaded) {
          // Sign-in email verification
          const completeSignIn = await signIn.attemptFirstFactor({
            strategy: "email_code",
            code: code.trim(),
          });

          if (completeSignIn.status === "complete") {
            await setActiveSignIn({ session: completeSignIn.createdSessionId });
            Toast.show({
              type: "success",
              text1: "Welcome Back!",
              text2: "Successfully signed in",
            });
            navigation.navigate("MainTabs");
          }
        }
      } else if (context === "phone") {
        if (user && user.phoneNumbers.length > 0) {
          await user.phoneNumbers[0].attemptVerification({
            code: code.trim(),
          });
          Toast.show({
            type: "success",
            text1: "Phone Verified!",
            text2: "Your phone number has been successfully verified",
          });

          navigation.navigate("Onboarding");
        }
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);
      const errorMessage =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        "Invalid code. Please check and try again.";
      Toast.show({
        type: "error",
        text1: "Verification Failed",
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    context,
    value,
    code,
    setCode,
    handleGoBack,
    handleSubmit,
    isLoading,
    resendVerification,
  };
}
