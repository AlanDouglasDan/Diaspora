import { useState } from "react";
import { useOAuth, useClerk, useUser } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import Toast from "react-native-toast-message";
import type { WelcomeScreenProps } from "./Welcome.types";

WebBrowser.maybeCompleteAuthSession();

export function useWelcomeLogic({ navigation }: WelcomeScreenProps) {
  const [authState, setAuthState] = useState<"welcome" | "sign-in" | "sign-up">(
    "welcome",
  );

  const { signOut, session } = useClerk();
  const { user } = useUser();

  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isAppleLoading, setIsAppleLoading] = useState<boolean>(false);

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startAppleOAuthFlow } = useOAuth({
    strategy: "oauth_apple",
  });

  const handleContinueWithEmail = () => {
    navigation.navigate("EmailAuth", {
      mode: authState as "sign-in" | "sign-up",
    });
  };

  const handleLogout = async () => {
    if (session) {
      try {
        await signOut();
        Toast.show({
          type: "success",
          text1: "Signed Out",
          text2: "You have been signed out successfully",
        });
      } catch (error) {
        console.error("Logout error:", error);
        // Toast.show({
        //   type: "error",
        //   text1: "Logout Failed",
        //   text2: "Could not sign out. Please try again.",
        // });
      }
    }
  };

  console.log(user?.id);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { createdSessionId, setActive } = await startGoogleOAuthFlow();

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });

        if (authState === "sign-up") {
          // For sign-up, navigate to AddPhone to continue onboarding
          // Toast.show({
          //   type: "success",
          //   text1: "Welcome!",
          //   text2: "Successfully signed up with Google",
          // });
          navigation.navigate("AddPhone");
        } else {
          // Toast.show({
          //   type: "success",
          //   text1: "Welcome!",
          //   text2: "Successfully signed in with Google",
          // });
          navigation.navigate("Loading");
        }
      }
    } catch (error: any) {
      console.error("Google OAuth error:", error);
      const errorMessage =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        "Could not sign in with Google. Please try again.";
      Toast.show({
        type: "error",
        text1: authState === "sign-up" ? "Sign Up Failed" : "Sign In Failed",
        text2: errorMessage,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setIsAppleLoading(true);
    try {
      const { createdSessionId, setActive } = await startAppleOAuthFlow();

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });

        if (authState === "sign-up") {
          // For sign-up, navigate to AddPhone to continue onboarding
          // Toast.show({
          //   type: "success",
          //   text1: "Welcome!",
          //   text2: "Successfully signed up with Apple",
          // });

          navigation.navigate("AddPhone");
        } else {
          // For sign-in, check if user has complete profile
          // Toast.show({
          //   type: "success",
          //   text1: "Welcome!",
          //   text2: "Successfully signed in with Apple",
          // });
          navigation.navigate("Loading");
        }
      }
    } catch (error: any) {
      console.error("Apple OAuth error:", error);
      const errorMessage =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        "Could not sign in with Apple. Please try again.";
      Toast.show({
        type: "error",
        text1: authState === "sign-up" ? "Sign Up Failed" : "Sign In Failed",
        text2: errorMessage,
      });
    } finally {
      setIsAppleLoading(false);
    }
  };

  return {
    authState,
    setAuthState,
    handleContinueWithEmail,
    handleGoogleSignIn,
    handleAppleSignIn,
    handleLogout,
    isGoogleLoading,
    isAppleLoading,
  };
}
