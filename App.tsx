import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { SheetProvider } from "react-native-actions-sheet";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Provider } from "react-redux";
import BootSplash from "react-native-bootsplash";
import Toast from "react-native-toast-message";

import { RootNavigator } from "@src/navigation";
import { navigationRef } from "navigation/utils";
import { customFonts } from "core/utils";
import { toastConfig } from "core/toastConfig";
import { tokenCache } from "core/auth";
import { store } from "@/src/store";
import { StreamChatProvider, StreamVideoProvider } from "@/src/providers";
import "sheets";

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);

  useEffect(() => {
    const init = async () => {};

    if (fontsLoaded) {
      init().finally(() => {
        BootSplash.hide({ fade: true });
      });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  return (
    <Provider store={store}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <ClerkLoaded>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <StreamChatProvider>
                <StreamVideoProvider>
                  <SheetProvider>
                    <RootNavigator />

                    <StatusBar style="auto" />
                  </SheetProvider>
                </StreamVideoProvider>
              </StreamChatProvider>
            </NavigationContainer>
          </SafeAreaProvider>

          <Toast config={toastConfig} />
        </ClerkLoaded>
      </ClerkProvider>
    </Provider>
  );
}
