import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "navigation/RootNavigator";

export type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Settings"
>;

export interface SettingsSection {
  id: string;
  items: SettingsItem[];
}

export interface SettingsItem {
  id: string;
  label: string;
  value?: string;
  onPress?: () => void;
}
