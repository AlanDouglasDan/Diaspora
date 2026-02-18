import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation";
import type { ImageSourcePropType } from "react-native";

export type SendLoveLetterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SendLoveLetter"
>;

export interface SendLoveLetterParams {
  userId: string;
  userName: string;
  userAge: number;
  userImages: ImageSourcePropType[];
}
