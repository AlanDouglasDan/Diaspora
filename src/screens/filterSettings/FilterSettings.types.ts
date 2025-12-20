import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../../navigation";

export type FilterSettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "FilterSettings"
>;

export interface FilterState {
  gender: string | null;
  activity: string | null;
  country: string | null;
  distanceRange: [number, number];
  ageRange: [number, number];
  minPhotos: number;
  hasBio: boolean;
  lookingFor: string | null;
  ethnicity: string | null;
  starSign: string | null;
  height: string | null;
  drinking: string | null;
  smoking: string | null;
  educationLevel: string | null;
  children: string | null;
  sexuality: string | null;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectRowItem {
  key: string;
  label: string;
}
