import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "navigation/RootNavigator";

export type EditInterestsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EditInterests"
>;

export interface Interest {
  id: string;
  label: string;
  emoji: string;
}

export interface InterestCategory {
  id: string;
  title: string;
  interests: Interest[];
}
