import type { SetupCompleteScreenProps } from "./SetupComplete.types";

export function useSetupCompleteLogic({
  navigation,
}: SetupCompleteScreenProps) {
  const handleContinue = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
  };

  return {
    handleContinue,
  };
}
