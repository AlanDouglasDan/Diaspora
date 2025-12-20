import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "navigation/RootNavigator";

export type VideoCallScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "VideoCall"
>;

export interface VideoCallParams {
  recipientName: string;
  recipientAvatar: any;
}
