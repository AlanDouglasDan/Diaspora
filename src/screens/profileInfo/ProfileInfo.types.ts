import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "navigation/RootNavigator";

export type ProfileInfoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ProfileInfo"
>;

export interface ProfileField {
  id: string;
  label: string;
  subLabel?: string;
  value: string;
  icon?: string;
}

export interface ProfileSection {
  id: string;
  title: string;
  fields: ProfileField[];
  editable?: boolean;
}
