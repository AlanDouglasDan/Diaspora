import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation";

export type InterestsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Interests"
>;

export interface Interest {
  id: string;
  label: string;
  emoji: string;
}
