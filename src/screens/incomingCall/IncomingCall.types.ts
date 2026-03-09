import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "navigation/RootNavigator";

export type IncomingCallScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "IncomingCall"
>;

export interface IncomingCallParams {
  recipientId: string;
  recipientName: string;
  recipientAvatar: any;
  isVideoCall: boolean;
}
