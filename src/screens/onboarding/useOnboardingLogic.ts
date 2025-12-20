import type { OnboardingScreenProps } from "./Onboarding.types";

export function useOnboardingLogic({ navigation }: OnboardingScreenProps) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    navigation.navigate("DisplayName");
  };

  return {
    handleGoBack,
    handleContinue,
  };
}
