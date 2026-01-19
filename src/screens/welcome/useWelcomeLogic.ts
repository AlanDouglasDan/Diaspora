import { useState, useEffect, useRef } from "react";
import { useOAuth, useClerk, useUser } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import Toast from "react-native-toast-message";
import type { WelcomeScreenProps } from "./Welcome.types";
import { useGetUser } from "@/src/api/user";

WebBrowser.maybeCompleteAuthSession();

export function useWelcomeLogic({ navigation }: WelcomeScreenProps) {
  const [authState, setAuthState] = useState<"welcome" | "sign-in" | "sign-up">(
    "welcome"
  );

  const { signOut, session, loaded: clerkLoaded } = useClerk();
  const { user, isSignedIn } = useUser();
  const { data, getUser, isLoading, error: isError } = useGetUser();

  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isAppleLoading, setIsAppleLoading] = useState<boolean>(false);
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const hasRedirected = useRef<boolean>(false);

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startAppleOAuthFlow } = useOAuth({
    strategy: "oauth_apple",
  });

  // Check profile completeness on mount and when user changes
  useEffect(() => {
    if (isSignedIn && user?.id && clerkLoaded) {
      getUser(user.id).catch(console.error);
    }
  }, [isSignedIn, user?.id, clerkLoaded]);

  // Handle all auth checks and redirects
  useEffect(() => {
    // Wait for Clerk to load
    if (!clerkLoaded) return;

    // If not signed in, hide splash and show welcome screen
    if (!isSignedIn) {
      setShowSplash(false);
      return;
    }

    // If signed in, wait for user data to load
    if (isLoading) return;

    // Prevent multiple redirects
    if (hasRedirected.current) return;

    // Redirect if authenticated with complete profile
    if (data?.displayName) {
      hasRedirected.current = true;
      navigation.navigate("Loading");
      return;
    }

    // If user is signed in but profile is incomplete, redirect to complete profile
    if (data && !data?.displayName) {
      hasRedirected.current = true;
      navigation.navigate("DisplayName");
      return;
    }

    if (data || isError) {
      setShowSplash(false);
      return;
    }

    // If we get here and data is null, keep showing splash
    if (!data) return;

    // All checks done, no redirect needed, show welcome screen
    setShowSplash(false);
  }, [clerkLoaded, isSignedIn, isLoading, data, isError, navigation]);

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
    showSplash,
  };
}
