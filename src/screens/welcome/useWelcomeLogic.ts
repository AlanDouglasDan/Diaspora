import { useState, useEffect } from "react";
import { useOAuth, useClerk, useUser } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import Toast from "react-native-toast-message";
import type { WelcomeScreenProps } from "./Welcome.types";

WebBrowser.maybeCompleteAuthSession();

export function useWelcomeLogic({ navigation }: WelcomeScreenProps) {
  const [authState, setAuthState] = useState<"welcome" | "sign-in" | "sign-up">(
    "welcome",
  );

  const clerk = useClerk();
  const { signOut, session } = clerk;
  const { user } = useUser();

  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isAppleLoading, setIsAppleLoading] = useState<boolean>(false);

  // Log out any existing session when entering welcome screen
  // Only run once on mount, not when session changes
  // useEffect(() => {
  //   const logoutExistingSession = async () => {
  //     if (session) {
  //       try {
  //         await signOut();
  //         console.log("Logged out existing session on Welcome screen mount");
  //       } catch (error) {
  //         console.log("Error signing out existing session:", error);
  //       }
  //     }
  //   };

  //   logoutExistingSession();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []); // Only run on mount, not when session changes

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

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { createdSessionId, setActive, signUp, signIn } =
        await startGoogleOAuthFlow();

      if (createdSessionId) {
        // Check if user already exists (signIn has data means existing user)
        // signUp.createdUserId only exists for brand new users
        const isNewUser = signUp?.createdUserId && !signIn?.userData?.firstName;

        if (authState === "sign-in" && isNewUser) {
          // OAuth auto-created a Clerk account — activate session to delete it
          await setActive!({ session: createdSessionId });
          try {
            if (clerk.user) {
              await clerk.user.delete();
            }
          } catch (e) {
            // Fallback: at least sign out to clear the session
            await signOut();
          }
          Toast.show({
            type: "error",
            text1: "Account Not Found",
            text2: "No account exists with this email. Please sign up first.",
          });
          return;
        }

        await setActive!({ session: createdSessionId });

        if (authState === "sign-up") {
          if (!isNewUser) {
            // User already has an account, sign them in directly
            navigation.navigate("Loading");
          } else {
            // New user, continue with onboarding
            navigation.navigate("AddPhone");
          }
        } else {
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
      const { createdSessionId, setActive, signUp, signIn } =
        await startAppleOAuthFlow();

      if (createdSessionId) {
        // Check if user already exists (signIn has data means existing user)
        // signUp.createdUserId only exists for brand new users
        const isNewUser = signUp?.createdUserId && !signIn?.userData?.firstName;

        if (authState === "sign-in" && isNewUser) {
          // OAuth auto-created a Clerk account — activate session to delete it
          await setActive!({ session: createdSessionId });
          try {
            if (clerk.user) {
              await clerk.user.delete();
            }
          } catch (e) {
            // Fallback: at least sign out to clear the session
            await signOut();
          }
          Toast.show({
            type: "error",
            text1: "Account Not Found",
            text2: "No account exists with this email. Please sign up first.",
          });
          return;
        }

        await setActive!({ session: createdSessionId });

        if (authState === "sign-up") {
          if (!isNewUser) {
            // User already has an account, sign them in directly
            navigation.navigate("Loading");
          } else {
            // New user, continue with onboarding
            navigation.navigate("AddPhone");
          }
        } else {
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
