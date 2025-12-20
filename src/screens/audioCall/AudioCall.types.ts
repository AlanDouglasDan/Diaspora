import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "navigation/RootNavigator";

export type AudioCallScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AudioCall"
>;

export interface AudioCallParams {
  recipientName: string;
  recipientAvatar: any;
}
