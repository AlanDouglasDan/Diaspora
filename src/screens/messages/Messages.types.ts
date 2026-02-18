import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { MainTabParamList } from "navigation/MainTabNavigator";

export type MessagesScreenProps = BottomTabScreenProps<
  MainTabParamList,
  "Messages"
>;

export interface Message {
  id: string;
  recipientId?: string;
  name: string;
  avatar: any;
  countryFlag: string;
  lastMessage: string;
  isPremium?: boolean;
  isOnline?: boolean;
}
