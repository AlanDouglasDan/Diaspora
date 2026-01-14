import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "navigation/RootNavigator";

export type AudioCallScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AudioCall"
>;

export interface AudioCallParams {
  recipientId: string;
  recipientName: string;
  recipientAvatar: any;
}
