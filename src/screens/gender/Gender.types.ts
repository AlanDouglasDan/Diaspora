import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation";

export type GenderScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Gender"
>;

export type GenderOption = "WOMAN" | "MAN" | "NONBINARY";
