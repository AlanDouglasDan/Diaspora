import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation";

export type UserProfileViewScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "UserProfileView"
>;

export interface UserProfileViewParams {
  userId: string;
  avatar: string;
  userName?: string;
}
