import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation";

export type DatingPreferenceScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "DatingPreference"
>;

export type PreferenceOption = "woman" | "man" | "nonbinary";
