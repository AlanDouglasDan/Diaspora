import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "navigation/RootNavigator";

export type PrivacyScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Privacy"
>;

export interface PrivacySetting {
  id: string;
  label: string;
  value: boolean;
  note?: string;
}
