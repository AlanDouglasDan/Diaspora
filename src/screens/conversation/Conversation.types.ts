import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "navigation/RootNavigator";

export type ConversationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Conversation"
>;

export interface ChatMessage {
  id: string;
  text?: string;
  image?: any;
  isMe: boolean;
  timestamp: Date;
  isLoveLetter?: boolean;
  isCall?: boolean;
  callType?: "voice" | "video";
  callDuration?: number;
}

export interface ConversationParams {
  recipientId: string;
  recipientName: string;
  recipientAvatar: any;
  matchDate?: string;
  channelId?: string;
}
