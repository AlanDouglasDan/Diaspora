import { useMemo, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "navigation/RootNavigator";

export interface SafetyOptionData {
  id: number;
  label: string;
  iconType: "shield" | "verify" | "padlock";
  route?: keyof RootStackParamList;
}

export const useSafetyTabLogic = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const safetyOptions: SafetyOptionData[] = useMemo(
    () => [
      {
        id: 1,
        label: "Get help from Diaspora",
        iconType: "shield",
        route: "GetHelp",
      },
      {
        id: 2,
        label: "Verify your profile now",
        iconType: "verify",
      },
      {
        id: 3,
        label: "Manage your privacy",
        iconType: "padlock",
        route: "Privacy",
      },
    ],
    []
  );

  const handleOptionPress = useCallback(
    (option: SafetyOptionData) => {
      if (option.route) {
        navigation.navigate(option.route as any);
      }
    },
    [navigation]
  );

  return {
    safetyOptions,
    handleOptionPress,
  };
};
