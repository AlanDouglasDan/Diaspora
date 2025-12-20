import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { SheetProvider } from "react-native-actions-sheet";

import { RootNavigator } from "@src/navigation";
import { navigationRef } from "navigation/utils";
import { customFonts } from "core/utils";
import "sheets";

export default function App() {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <SheetProvider>
          <RootNavigator />

          <StatusBar style="auto" />
        </SheetProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
